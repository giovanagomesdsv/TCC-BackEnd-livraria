const express = require('express');

const app = express();

const porta = 3333;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta  ${porta}`); // template string, forma mais moderna sem concatenação parando o texto
});