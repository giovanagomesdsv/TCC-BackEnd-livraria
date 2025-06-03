const db = require('../dataBase/connection'); 

module.exports = {
    async listarLivroGeneros(request, response) {
        try {

            const sql = `
            SELECT livro_id, gen_id FROM livro_generos;
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
    async cadastrarLivroGeneros(request, response) {
        try {

            const { livro_id, gen_id } = request.body;
            const usu_ativo = 1;

            // instrução SQL
            const sql = `
            INSERT INTO LIVRO_GENEROS
                (livro_id, gen_id)
            VALUES
                (?,?)`;

            // definição dos dados a serem inseridos em um array
            const values = [livro_id, gen_id];

            //execução da instrução SQL passando os parâmetros
            const [result] = await db.query(sql, values);

            // identificação do ID do registro inserido
            const dados = {
                id: result.insertId,
                livro_id,
                gen_id
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
        const { livro_id, gen_id } = request.body;

        // instrução SQL
        const sql = `
        UPDATE livro_generos SET
            livro_id = ?
         WHERE
            gen_id = ?;
        `;

        // preparo do array com dados que serão atualizados
        const values = [livro_id, gen_id];

        // execução e obtenção de confirmação da atualização
        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return response.status(404).json({
                sucesso: false,
                mensagem: `Gênero ${gen_id} não encontrado!`,
                dados: null
            });
        }

        const dados = {
            gen_id,
            livro_id
        };

        return response.status(200).json({
            sucesso: true,
            mensagem: `Gênero ${gen_id} atualizado com sucesso!`,
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
    async editarLivroGeneros(request, response) {
        try {

            // parâmetros recebidos pelo corpo da requisição
        const { livro_id, gen_id } = request.body;
        // parâmetro recebido pela URL via params /:usuario/1
        const { id } = request.params;
        // instruções SQL
        const sql = `
            UPDATE livro_generos SET
                livro_id = ?
            WHERE
                gen_id = ?;
        `;
        // preparo do array com dados que serão atualizados
        const values = [ livro_id, gen_id ];
        // execução e obtenção de confirmação da atualização realizada
        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return response.status(404).json({
                sucesso: false,
                mensagem: `Usuário ${id} não encontrado!`,
                dados: null
            });
        };
        const dados = {
            gen_id,
            livro_id
        };

        return response.status(200).json({
            sucesso: true,
            mensagem: `Usuário ${gen_id} atualizado com sucesso!`,
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
    async apagarLivroGeneros(request, response) {
        try {

            // parâmetro passado via url na chamada da api pelo front-end
            const { gen_id } = request.params;

            // comando de exclusão
            const sql = 'DELETE FROM LIVRO_GENEROS WHERE livro_id = ?';

            // array com parâmetros da exclusão
            const values = [gen_id];

            // executa instrução no banco de dados
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Usuário ${gen_id} não encontrado!`,
                dados: null
            });
            }

            
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Exclusão de generos', 
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