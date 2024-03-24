// This Script is used to store locally the form data

$(document).ready(function () {
    const db = new Dexie('FormApp');
    db.version(1).stores({
        form: '++id, nombre, sector, nivel_escolar, latitud, longitud'
    });

    $(document).on('submit', '#formulario', async function(e){
        e.preventDefault();
        const formData = $(this).serializeArray();
        try {
            const posicionActual = await getPosicion();
            db.form.put({
                nombre: formData[0].value,
                sector: formData[1].value,
                nivel_escolar: formData[2].value,
                latitud: posicionActual[0],
                longitud: posicionActual[1]
            })
        }catch(e){
            alert(e);
        }
    });
});

getPosicion = function(){
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation) {
            reject('Tu navegador no soporta geolocalización');
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                resolve([latitude, longitude]);
            },
            (error) => {
                if (error.code !== error.PERMISSION_DENIED) {
                    reject('Error al obtener la posición, intenta nuevamente.');
                    return [];
                }
                reject('Debes activar la geolocalización para poder enviar el formulario.');
            }
        );
    });
}