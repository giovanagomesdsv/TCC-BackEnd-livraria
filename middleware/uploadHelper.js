const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadImage = (destinationFolder) => {
    if (!destinationFolder) {
        throw new Error("O nome da pasta de destino é obrigatório.");
    }

    const fullPath = path.join(__dirname, '..', 'public', destinationFolder);

    // Garante que o diretório exista
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }

    // Configuração do storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, fullPath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const extension = file.mimetype.split('/')[1];
            cb(null, `${uniqueSuffix}.${extension}`);
        }
    });

    // Filtro para aceitar apenas imagens
    const fileFilter = (req, file, cb) => {
        if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de imagem não suportado! Use JPEG, JPG, PNG ou GIF.'), false);
        }
    };
    
    return multer({
        storage,
        limits: { fileSize: 1024 * 1024 * 5 }, // até 5MB
        fileFilter
    });
};

module.exports = uploadImage;
