const fs = require('fs/promises');
const path = require('path');

function listFolder(directoryPath, result) {
    return new Promise((resolve, reject) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

        // console.log(`Leyendo el directorio: ${directoryPath}/src`);

        fs.readdir(`${directoryPath}/src/`)
            .then(files => {
                // console.log(`Archivos encontrados: ${files}`);

                const imageFiles = files.filter( file => {
                    return imageExtensions.includes(path.extname(file).toLowerCase());
                });

                const jsonOutput = {
                    total: imageFiles.length,
                    images: imageFiles
                };
                // -------------------------------
                var jsonPath;

                if ( result == 'public/gallery/Camera/'){
                    jsonPath = path.join(__dirname, `./${result}/json/images_camera.json`);
                    return fs.writeFile(jsonPath, JSON.stringify(jsonOutput, null, 2));

                } else if ( result == 'public/gallery/New Photos' ){
                    jsonPath = path.join(__dirname, `./${result}/json/images_new_photos.json`);
                    return fs.writeFile(jsonPath, JSON.stringify(jsonOutput, null, 2));

                } else if ( result == 'public/gallery/Old Photos' ){
                    jsonPath = path.join(__dirname, `./${result}/json/images_Old_photos.json`);
                    return fs.writeFile(jsonPath, JSON.stringify(jsonOutput, null, 2));

                } else { console.log('Error en el envio de ruta') }

            })
            .then(() => {
                console.log('El archivo JSON ha sido guardado con éxito.');
                resolve(); // Resolvemos la promesa si todo ha ido bien
            })
            .catch(err => {
                console.error('Error al procesar el directorio o escribir el archivo JSON: ', err);
                reject(err); // Rechazamos la promesa si hay algún error
            });
    });
}

module.exports = {
    listFolder,
};