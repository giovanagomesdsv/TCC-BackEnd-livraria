const db = require('../database/connection');

module.exports = {
    async listarGeneros(request, response) {
        try {

            const sql = `
          SELECT gen_id, gen_nome, gen_icone FROM generos;

      `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Gêneros',
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
    async cadastrarGeneros(request, response) {
        try {

            const { nome, icone } = request.body;

            const sql = `
            INSERT INTO GENEROS (gen_nome, gen_icone)
            VALUES (?, ?)`;

            const values = [nome, icone];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                nome,
                icone
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de Gêneros',
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
    async editarGeneros(request, response) {
        try {


            const { nome, icone } = request.body;
            const { id } = request.params;
            const sql = `
            

            UPDATE generos SET
            gen_nome=?, gen_icone=?
            WHERE gen_id=?

            
`;

            const values = [nome, icone, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Genero ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                id,
                nome,
                icone
            };
            return response.status(200).json({
                sucesso: true,
                mensagem: `Genero ${id} atualizado com sucesso!`,
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
    async apagarGeneros(request, response) {
        try {


            const { id } = request.params;
            const sql = `DELETE FROM generos WHERE gen_id=?`;
            const values = [id];
            const [result] = await db.query(sql, values);
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    sucesso: false,
                    mensagem: `Genero ${gen_id} não encontrado!`,
                    dados: null
                });
            }
            return response.status(200).json({
                sucesso: true,
                mensagem: `Genero ${id} excluído com sucesso!`,
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