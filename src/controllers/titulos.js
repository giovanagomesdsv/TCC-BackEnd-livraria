const db = require('../dataBase/connection'); 

module.exports = {
    async listarTitulos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de títulos', 
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
    async cadastrarTitulos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de títulos', 
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