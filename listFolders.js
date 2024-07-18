const fs = require('fs/promises');
const path = require('path');

function listFolder(directoryPath) {
    return new Promise((resolve, reject) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

        console.log(`Leyendo el directorio: ${directoryPath}`);
        fs.readdir(directoryPath)
            .then(files => {
                // console.log(`Archivos encontrados: ${files}`);

                const imageFiles = files.filter(file => {
                    return imageExtensions.includes(path.extname(file).toLowerCase());
                });

                const jsonOutput = {
                    totalImages: imageFiles.length,
                    images: imageFiles
                };

                const jsonPath = path.join(__dirname, './public/imagenes.json');
                // console.log(`Escribiendo nombres en el archivo JSON en: ${jsonPath}`);
                return fs.writeFile(jsonPath, JSON.stringify(jsonOutput, null, 2));
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