const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function salvarFoto(fotoBase64, uploadDir) {
    // Se não houver imagem, retorna default
    if (!fotoBase64 || !fotoBase64.startsWith("data:image")) {
        return "default.png";
    }

    // Garante que a pasta exista
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Extrai o conteúdo base64
    const base64Data = fotoBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Nome do arquivo
    const imageName = `foto_${Date.now()}.webp`;
    const outputPath = path.join(uploadDir, imageName);

    // Converte e otimiza
    await sharp(buffer)
        .resize(400)          // largura máxima de 400px
        .webp({ quality: 80 }) // converte para webp com compressão
        .toFile(outputPath);

    return imageName;
}

module.exports = { salvarFoto };
