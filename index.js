const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

const { verifyFolder } = require('./functions');
const { listFolder } = require('./listFolders');

const app = express();
const port = 3000;
// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public', )));
app.use(express.static(path.join(__dirname, 'public', 'gallery', )));
app.use(express.static(path.join(__dirname, 'public', 'styles', )));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.use(fileUpload({ createParentPath: true }));

const checkBody = (req, res, next) => {
    if (!req.body.folderSelect) {
        return res.status(400).json({ message: 'El campo folderSelect es requerido' });
    }
    next();
};

// Rutas para servir archivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/image1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'image1.html'));
});

app.get('/imagenes.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'imagenes.json'));
});

app.post('/list', async (req, res) => {
    try {
        //console.log(req.body);
        //console.log(req.body.site);
        var result = req.body.site;
        var cameraPath = path.join(__dirname, `${req.body.site}`);
        //console.log(cameraPath);
        
        if ( String(req.body.site) == 'public/gallery/Camera/'){
            await listFolder(cameraPath, result);
            res.status(200).json({ message: 'Listado de imágenes completado' });

        } else if ( String(req.body.site) == 'public/gallery/New Photos' ){
            await listFolder(cameraPath, result);
            res.status(200).json({ message: 'Listado de imágenes completado' });

        } else if ( String(req.body.site) == 'public/gallery/Old Photos' ){
            await listFolder(cameraPath, result);
            res.status(200).json({ message: 'Listado de imágenes completado' });
            
        } else {
            console.log('Error en el envio de ruta')
        }


    } catch (error) {
        console.error('Error al listar las imágenes:', error);
        res.status(500).json({ message: 'Error al listar las imágenes', error: error.message });
    }
});

app.post('/upload', checkBody, (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se recibió ningún archivo' });
    }

    const fileInput = req.files.fileInput;
    const folderSelect = req.body.folderSelect;

    try {
        let uploadPath = '';

        if (folderSelect === 'uploads1') {
            uploadPath = path.join(__dirname, 'public', 'gallery', 'New Photos');
        } else if (folderSelect === 'uploads2') {
            uploadPath = path.join(__dirname, 'public', 'gallery', 'Old Photos');
        } else {
            throw new Error('Carpeta de destino no válida');
        }

        verifyFolder( uploadPath);

        fileInput.mv(path.join(uploadPath, fileInput.name), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar el archivo', error: err.message });
            }
            res.json({ message: 'Imagen subida exitosamente', file: fileInput.name });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
