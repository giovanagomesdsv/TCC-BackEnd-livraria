const db = require('../dataBase/connection'); 

module.exports = {
    async listarResenhistas(request, response) {

        const sql = `
            SELECT res_id, tit_id, res_nome_fantasia, res_cidade, res_estado, res_telefone  ,  res_foto, res_perfil,res_social FROM resenhistas;
        `;

        const [rows] = await db.query(sql);

        const nRegistros = rows.length;

        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de resenhistas', 
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
    async cadastrarResenhistas(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de resenhistas', 
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
    async editarResenhistas(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração no cadastro de resenhista', 
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
    async apagarResenhistas(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Exclusão de resenhista', 
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