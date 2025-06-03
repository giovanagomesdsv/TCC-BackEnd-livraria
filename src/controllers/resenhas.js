const db = require('../dataBase/connection');

module.exports = {
    async listarResenhas(request, response) {
        try {

            const sql = `
         SELECT resenha_id,res_id,livro_id, resenha_titulo,resenha_texto,resenha_status,resenha_avaliacao,resenha_dtpublicacao,resenha_dtatualizacao FROM resenhas;


      `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de resenhas',
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
    async cadastrarResenhas(request, response) {
        try {

            const { res_id, livro_id, titulo, texto, avaliacao } = request.body;

            const sql = `
                INSERT INTO resenhas (res_id, livro_id, resenha_titulo, resenha_texto,resenha_avaliacao)
                VALUES (?,?,?,?,?)
            `;


            const values = [res_id, livro_id, titulo, texto, avaliacao];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                res_id,
                livro_id,
                titulo,
                texto,
                avaliacao
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de resenha',
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
    async editarResenhas(request, response) {
        try {

            const { res_id, livro_id, titulo, texto, avaliacao } = request.body;
            const { id } = request.params;
            const sql = `
            UPDATE resenhas SET
                res_id=?, livro_id=?, resenha_titulo=?, resenha_texto=?, resenha_avaliacao=?
            WHERE resenha_id=?
            `;

            const values = [res_id, livro_id, titulo, texto, avaliacao, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `resenha ${id} não encontrada!`,
                    dados: null
                });
            }

            const dados = {
                res_id,
                livro_id,
                titulo,
                texto,
                avaliacao,
                id
            };
            return response.status(200).json({
                sucesso: true,
                mensagem: `resenha ${id} atualizada com sucesso!`,
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
    async apagarResenhas(request, response) {
        try {
            //parâmetro passado via url na chamada da api pelo front-end  
            const { id } = request.params;
            //comando de exclusão
            const sql = `DELETE from resenhas WHERE resenha_id = ?`;
            // array com parametros de exclusao
            const values = [id];
            //executa instruçoes no banco de dados
            const [result] = await db.query(sql, values)

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: `Resenha ${id} não encontrado`,
                    dados: null
                });
            }
            return response.status(200).json({
                sucesso: true,
                mensagem: `Exclusão de ${id} realizada com sucesso`,
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

