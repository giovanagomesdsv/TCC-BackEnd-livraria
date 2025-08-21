const db = require('../dataBase/connection');

module.exports = {
    async listarLivros(request, response) {
        try {

            const sql = `
                SELECT livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto
                FROM livros;
                        `;

            const [rows] = await db.query(sql);

            const nRegistros = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de livros',
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
    async cadastrarLivros(request, response) {
        try {

            const { livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto } = request.body;

            const sql = `
                INSERT INTO Livros (livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto)
                VALUES (?,?,?,?,?,?,?)`;


            const values = [livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                livro_titulo,
                livro_sinopse, 
                livro_editora, 
                livro_isbn, 
                livro_ano, 
                livro_classidd, 
                livro_foto,

            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de livro',
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
    async editarLivros(request, response) {
        try {

            const { livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto } = request.body;
            const { id } = request.params;
            const sql = `
                UPDATE Livros SET
                livro_titulo=?, livro_sinopse=?, livro_editora=?, livro_isbn=?, livro_ano=?, livro_classidd=?, livro_foto=?
                WHERE livro_id=?                     
            `;

            const values = [livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Livro ${id} não encontrada!`,
                    dados: null
                });
            }

            const dados = {
                livro_titulo,
                livro_sinopse, 
                livro_editora, 
                livro_isbn, 
                livro_ano, 
                livro_classidd, 
                livro_foto,
            };
            return response.status(200).json({
                sucesso: true,
                mensagem: `Livro ${id} atualizada com sucesso!`,
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
    async apagarLivros(request, response) {
        try {
            const { id } = request.params;
            const sql = `DELETE FROM livros WHERE livro_id = ?`;
            const values = [id];
            const [result] = await db.query(sql, values);
    
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Livro ${id} não encontrado`,
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

    async listarLivrosComParâmetros(request, response) {
        try {
            const { nome } = request.query;

            const livro_titulo = nome ? `%${nome}%` : '%';
            const sql = `
            SELECT
                livro_titulo,
                livro_sinopse, 
                livro_editora, 
                livro_isbn, 
                livro_ano, 
                livro_classidd, 
                livro_foto
            FROM
                livros
            WHERE
                livro_titulo like ?;
            `;

            const values = [livro_titulo];

            const [rows] = await db.query(sql, values);
            const nItens = rows.length;

            return response.status(200).json({
            sucesso: true,
            mensagem: 'Lista de Livros.',
            nItens,
            dados: rows
            });
        } catch (error) {
            return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro na requisição.',
            dados: error.message
            });
        }
    }
};

