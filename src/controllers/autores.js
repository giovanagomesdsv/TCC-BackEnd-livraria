const db = require('../database/connection');

module.exports = {
    async listarAutores(request, response) {
        try {

            const sql = `
                SELECT aut_id, aut_nome, aut_bio, aut_foto FROM autores;


           `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Autores',
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
    async cadastrarAutores(request, response) {
        try {

            const { nome, bio, foto } = request.body;

            const sql = `
            
            INSERT INTO AUTORES (aut_nome, aut_bio, aut_foto) 
            VALUES (?,?,?)

`;

            const values = [nome, bio, foto];
            const [result] = await db.query(sql, values);
            const dados = {
                id: result.insertId,
                nome,
                bio,
                foto
            };


            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de Autores',
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
    async editarAutores(request, response) {
        try {
            const { nome, bio, foto } = request.body;
            const { id } = request.params;
            const sql = `
            

            UPDATE autores SET
            aut_nome=?, aut_bio=?, aut_foto=?
            WHERE aut_id=?

            
`;

            const values = [nome, bio, foto, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Autor ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                id,
                nome,
                bio,
                foto
            };

            return response.status(200).json({
                sucesso: true,
                mensagem:`Autor ${id} atualizado com sucesso!`,
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
    async apagarAutores(request, response) {
        try {

            
            const { id } = request.params;
            const sql = `DELETE FROM autores WHERE aut_id=?`;
            const values = [id];
            const [result] = await db.query(sql, values);
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    sucesso: false,
                    mensagem: `Autor ${aut_id} não encontrado!`,
                    dados: null
                });
            }
            return response.status(200).json({
                sucesso: true,
                mensagem:  `Autor ${id} excluído com sucesso!`,
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