const db = require('../dataBase/connection');

module.exports = {
    async listarTitulos(request, response) {

        const sql = `
           SELECT tit_id,tit_nome,tit_descricao,tit_icone, tit_quant_resenhas FROM titulo;
        `;

        const [rows] = await db.query(sql);

        const nRegistros = rows.length;
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de títulos',
                nRegistros,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async cadastrarTitulos(request, response) {

        const {nome, descricao, icone, quant_resenhas} = request.body;

        const sql = `INSERT INTO TITULO (tit_nome, tit_descricao, tit_icone, tit_quant_resenhas) 
VALUES (?,?,?,?)`;

        const values = [nome, descricao, icone, quant_resenhas];

        const [result] = await db.query(sql, values);

        const dados = {
            id: result.insertId,
            nome, 
            descricao, 
            icone, 
            quant_resenhas
        };

        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de títulos',
                dados: dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarTitulos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Alteração no cadastro de título',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async apagarTitulos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Exclusão de título',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
};  