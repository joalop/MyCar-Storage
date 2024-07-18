const fs = require('fs');


const verifyFolder = (galleryPath) => {
    const galleryRoute = galleryPath

    // console.log('aqui')
    try {
        // Verificar si la carpeta ya existe
        if ( !fs.existsSync(galleryRoute) === true ) {
            // Si no existe, crearla
            fs.mkdirSync(galleryRoute, { recursive: true });
        }
        // No es necesario hacer nada si la carpeta ya existe
    } catch (err) {
        if (err.code === 'EEXIST') {

            console.log(galleryRoute)

            // La carpeta ya existe, no es un error en este contexto
            console.log(`La carpeta ${galleryRoute} ya existe.`);
        } else if (err.code === 'ENOENT') {
            // La ruta no existe
            console.log(galleryRoute)

            throw new Error(`Error al verificar o crear directorio: la ruta ${galleryRoute} no existe.`);
        } else {
            // Otro tipo de error
            console.log(galleryRoute)

            throw new Error(`Error al verificar o crear directorio: ${err.message}`);
        }
    }
    // return galleryRoute;
};

module.exports = {
    verifyFolder,
};