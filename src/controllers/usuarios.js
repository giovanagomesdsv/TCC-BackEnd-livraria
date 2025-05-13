const db = require('../dataBase/connection');

module.exports = {
    async listarUsuarios(request, response) {
        try {

            const sql = `
               SELECT usu_id, usu_email, usu_nome,usu_senha,usu_tipo_usuario, usu_data_criacao,usu_status FROM usuarios;
            `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários',
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
    async cadastrarUsuarios(request, response) {
        try {
            const { email, nome, senha, tipo_usuario } = request.body;
            const sql = `INSERT INTO USUARIOS (usu_email, usu_nome, usu_senha, usu_tipo_usuario)
                         VALUES 
                         (?, ?, ?, ?)`;

            const values = [email, nome, senha, tipo_usuario];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                email,
                nome,
                senha,
                tipo_usuario
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de usuários',
                dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarUsuarios(request, response) {

        try {

            
        const { email, nome, senha, tipo_usuario } = request.body;

        const { id } = request.params;

        const sql = `UPDATE USUARIOS SET usu_email =?, usu_nome=?, usu_senha=?, usu_tipo_usuario=? WHERE usu_id = ?`;

        const values = [email, nome, senha, tipo_usuario, id];

        const result = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return response.status(404).json({
                sucesso: true,
                mensagem: `Usuário ${id} não encontrado!`,
                dados: null
            });
        }

        const dados = {
            id,
            email, 
            nome, 
            senha, 
            tipo_usuario
        }
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Alteração no cadastro de usuário',
                dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async apagarUsuarios(request, response) {

        try {
            const {id} = request.params;

            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
    
            const values = [id];
    
            const [result] = await db.query(sql, values);
            
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `usuário ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Exclusão de usuário ${id}`,
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