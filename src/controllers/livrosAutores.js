const db = require('../dataBase/connection'); 

module.exports = {
    async listarLivroAutores(request, response) {
        
        try {

            const sql = `
            SELECT livro_id, aut_id FROM livro_autores;
        `;

        const [rows] = await db.query(sql);
        const nRegistros = rows.length;

        return response.status(200).json({
            sucesso: true,
            mensagem: `Lista de gêneros (${nRegistros} registros)`,
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
    async cadastrarLivroAutores(request, response) {
        try {

            const { livro_id, aut_id } = request.body;
            const usu_ativo = 1;

            // instrução SQL
            const sql = `
            INSERT INTO LIVRO_AUTORES
                (livro_id, aut_id)
            VALUES
                (?,?)`;

            // definição dos dados a serem inseridos em um array
            const values = [livro_id, aut_id];

            //execução da instrução SQL passando os parâmetros
            const [result] = await db.query(sql, values);

            // identificação do ID do registro inserido
            const dados = {
                id: result.insertId,
                livro_id,
                aut_id
            }

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
    async editarLivroAutores(request, response) {
        try {

            // parâmetros recebidos pelo corpo da requisição
        const { livro_id, aut_id } = request.body;

        // instrução SQL
        const sql = `
        UPDATE livro_autores SET
            livro_id = ?
         WHERE
            aut_id = ?;
        `;

        // preparo do array com dados que serão atualizados
        const values = [livro_id, aut_id];

        // execução e obtenção de confirmação da atualização
        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return response.status(404).json({
                sucesso: false,
                mensagem: `Autor ${aut_id} não encontrado!`,
                dados: null
            });
        }

        const dados = {
            aut_id,
            livro_id
        };

        return response.status(200).json({
            sucesso: true,
            mensagem: `Autor ${aut_id} atualizado com sucesso!`,
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

    async apagarLivroAutores(request, response) {
        try {

            
            // parâmetro passado via url na chamada da api pelo front-end
            const { aut_id } = request.params;

            // comando de exclusão
            const sql = 'DELETE FROM LIVRO_AUTORES WHERE livro_id = ?';

            // array com parâmetros da exclusão
            const values = [aut_id];

            // executa instrução no banco de dados
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Usuário ${aut_id} não encontrado!`,
                dados: null
            });
            }
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Exclusão do Livros autores.', 
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