const db = require('../dataBase/connection');

module.exports = {
    async listarLivrariaLivros(request, response) {
        const sql = `SELECT liv_livro_id, liv_id, livro_id, liv_livro_idioma, liv_livro_pag, liv_livro_tipo, liv_livro_preco, liv_livro_obsadicionais, liv_livro_status, liv_livro_dtpublicacao FROM livrarias_livros;`;
        const [rows] = await db.query(sql);
        const nRegistros = rows.length;

        try {
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

    async cadastrarLivrariaLivros(request, response) {
        try {
            const { id_liv, id_livro, idioma, pagina, tipo, preco, obsadicionais } = request.body;

            const sql = `
                INSERT INTO LIVRARIAS_LIVROS 
                (liv_id, livro_id, liv_livro_idioma, liv_livro_pag, liv_livro_tipo, liv_livro_preco, liv_livro_obsadicionais)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;

            const values = [id_liv, id_livro, idioma, pagina, tipo, preco, obsadicionais];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                id_liv,
                id_livro,
                idioma,
                pagina,
                tipo,
                preco,
                obsadicionais
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de livros',
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

    async editarLivrariaLivros(request, response) {
        try {
            const { id_liv, id_livro, idioma, pagina, tipo, preco, obsadicionais } = request.body;

            const { id } = request.params;

            const sql = `
              UPDATE livrarias_livros SET
                 liv_id =  ?, livro_id = ?, liv_livro_idioma = ?, liv_livro_pag = ?, liv_livro_tipo = ?, liv_livro_preco = ? , liv_livro_obsadicionais = ?
             WHERE
                liv_livro_id = ?; 
            `;

            const values = [id_liv, id_livro, idioma, pagina, tipo, preco, obsadicionais, id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: true,
                    mensagem: ` Publicação ${id} não encontrado`,
                    dados: null
                });

            }
            const dados = {
                id,
                id_liv, 
                id_livro, 
                idioma, 
                pagina,
                 tipo, 
                 preco, 
                 obsadicionais
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: ` Publicação ${id} não encontrado`,
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
    async apagarLivrariaLivros(request, response) {
        try {

            const { id } = request.params;
            const sql = `DELETE FROM livrarias_livros WHERE liv_livro_id  = ?`;
            const values = [ id ];
            const [ result ] = await db.query(sql, values);
             
            if (result.affectedRows === 0 ) {
      return response.status(404).json({
        sucesso:false,
        mensagem: `Publicação ${id} não encontrada!`,
        dados:null
      });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Publicação ${id}  excluida com sucesso`,
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
    async ocultarLivrariaLivros(request, response) {
        try {
            const inativo = 0;
            const { id } = request.params;
    
            const sql = `
                UPDATE livrarias_livros SET 
                    liv_livro_status = ? 
                WHERE 
                    liv_livro_id = ?;
            `;
    
            const values = [inativo, id];
            const [result] = await db.query(sql, values);
    
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Publicação ${id} não encontrada.`,
                    dados: null
                });
            }
    
            return response.status(200).json({
                sucesso: true,
                mensagem: `Publicação ${id} ocultada com sucesso.`,
                dados: null
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
