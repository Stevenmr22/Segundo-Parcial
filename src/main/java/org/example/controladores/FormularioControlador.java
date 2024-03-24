package org.example.controladores;

import io.javalin.Javalin;
import io.jsonwebtoken.Claims;
import org.example.encapsulaciones.NivelEscolar;
import org.example.utilitarios.BaseControlador;

import java.util.Map;

import static org.example.controladores.UsuarioControlador.obtenerClaims;
import static org.example.utilitarios.Utilitario.modeloBase;

public class FormularioControlador extends BaseControlador {
    public FormularioControlador(Javalin app) {
        super(app);
    }

    @Override
    public void aplicarRutas() {
        app.get("/capturar-respuesta", ctx -> {
            Claims claims = obtenerClaims(ctx);

            if(claims == null){
                ctx.redirect("/login");
                return;
            }

            Map<String, Object> model = modeloBase(claims);
            model.put("niveles", NivelEscolar.values());
            ctx.render("/vistas/registro-formulario.html", model);
        });
        app.get("/listar-formulario", ctx -> {
            Claims claims = obtenerClaims(ctx);

            if(claims == null){
                ctx.redirect("/login");
                return;
            }

            Map<String, Object> model = modeloBase(claims);
            ctx.render("/vistas/listar-formulario.html", model);
        });
    }
}
