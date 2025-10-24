const db = require('../dataBase/connection');
const fs = require('fs');
const path = require('path');

const { gerarUrl } = require('../../utils/gerarUrl');


module.exports = {
    async listarLivros(request, response) {
        try {
            // Parâmetros opcionais para filtro
            const { genero, autor, livraria } = request.query;

            let sql = `
                SELECT l.livro_id, l.livro_titulo, l.livro_sinopse, l.livro_editora, l.livro_isbn, l.livro_ano, l.livro_classidd, l.livro_foto
                FROM livros l
            `;
            let joins = '';
            let wheres = [];
            let values = [];

            if (genero) {
                joins += ' INNER JOIN LIVRO_GENEROS lg ON l.livro_id = lg.livro_id INNER JOIN GENEROS g ON lg.gen_id = g.gen_id';
                wheres.push('g.gen_nome LIKE ?');
                values.push(`%${genero}%`);
            }
            if (autor) {
                joins += ' INNER JOIN LIVRO_AUTORES la ON l.livro_id = la.livro_id INNER JOIN AUTORES a ON la.aut_id = a.aut_id';
                wheres.push('a.aut_nome LIKE ?');
                values.push(`%${autor}%`);
            }
            if (livraria) {
                joins += ' INNER JOIN LIVRARIAS_LIVROS ll ON l.livro_id = ll.livro_id INNER JOIN LIVRARIAS lv ON ll.liv_id = lv.liv_id';
                wheres.push('lv.liv_nome LIKE ?');
                values.push(`%${livraria}%`);
            }

            sql += joins;
            if (wheres.length > 0) {
                sql += ' WHERE ' + wheres.join(' AND ');
            }
            sql += ';';

            const [rows] = await db.query(sql, values);
            const nRegistros = rows.length;

            // Se algum filtro foi passado e não há correspondência, retorna vazio
            if ((genero || autor || livraria) && nRegistros === 0) {
                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'Nenhum livro encontrado para o filtro informado.',
                    nRegistros: 0,
                    dados: []
                });
            }

            // Retorna os livros encontrados (com ou sem filtro)
            const dados = rows.map(livros => ({
                id: livros.livro_id,
                nome: livros.livro_titulo,
                img: gerarUrl(livros.livro_foto, 'livros', 'sem.svg')
            }));

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de livros',
                nRegistros,
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
    async cadastrarLivros(request, response) {
        try {

            const { livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto } = request.body;
            const imagem = request.file;

            // tenta determinar o filename real a salvar no DB
            let filename = null;

            if (imagem && imagem.filename) {
                filename = imagem.filename;
            }

            // se veio um valor livro_foto no body e existir no disco, usa ele
            if (!filename && livro_foto) {
                const candidate = path.join(process.cwd(), 'public', 'livros', livro_foto);
                if (fs.existsSync(candidate)) {
                    filename = livro_foto;
                }
            }

            // tentativa inteligente: procurar arquivo em public/livros com nome parecido ao título
            if (!filename && livro_titulo) {
                try {
                    const folder = path.join(process.cwd(), 'public', 'livros');
                    if (fs.existsSync(folder)) {
                        const files = fs.readdirSync(folder);
                        const normalize = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').replace(/[^a-z0-9\.\-\_]/g, '');
                        const titleNorm = normalize(livro_titulo.replace(/\.[^.]+$/, ''));
                        for (const f of files) {
                            const fNoExt = f.replace(/\.[^.]+$/, '');
                            if (normalize(fNoExt) === titleNorm) {
                                filename = f;
                                break;
                            }
                        }
                    }
                } catch (err) {
                    // ignore and fallback to default
                }
            }

            // default
            if (!filename) filename = 'sem.svg';

            const sql = `
                INSERT INTO Livros (livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto)
                VALUES (?,?,?,?,?,?,?)`;

            const values = [
                livro_titulo,
                livro_sinopse,
                livro_editora,
                livro_isbn,
                livro_ano,
                livro_classidd,
                filename
            ];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId,
                livro_titulo,
                livro_sinopse,
                livro_editora,
                livro_isbn,
                livro_ano,
                livro_classidd,
                livro_foto: filename,
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

            const dados = rows.map(row => ({
                id: row.livro_id,
                nome: row.livro_titulo,
                sinopse: row.livro_sinopse, 
                editora: row.livro_editora, 
                isbn: row.livro_isbn, 
                ano: row.livro_ano, 
                classif_idade: row.livro_classidd, 
                img: gerarUrl(row.livro_foto, 'livros', 'sem.svg'),
            }));

            const nItens = rows.length;

            return response.status(200).json({
            sucesso: true,
            mensagem: 'Lista de Livros.',
            nItens,
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

    async listarLivrosAvaliados(request, response) {
        try {
            const { limit } = request.query;

            let sql = `
                SELECT
                    l.livro_id,
                    l.livro_titulo,
                    l.livro_foto,
                    COUNT(r.resenha_id) AS nAvaliacoes,
                    ROUND(AVG(r.resenha_avaliacao),2) AS mediaAvaliacao
                FROM livros l
                JOIN resenhas r ON l.livro_id = r.livro_id
                GROUP BY l.livro_id, l.livro_titulo, l.livro_foto
                HAVING COUNT(r.resenha_id) > 0
                ORDER BY nAvaliacoes DESC
            `;

            const values = [];
            if (limit && Number(limit) > 0) {
                sql += ' LIMIT ?';
                values.push(Number(limit));
            }

            const [rows] = await db.query(sql, values);

            const dados = rows.map(row => ({
                id: row.livro_id,
                nome: row.livro_titulo,
                img: gerarUrl(row.livro_foto, 'livros', 'sem.svg'),
                nAvaliacoes: row.nAvaliacoes,
                mediaAvaliacao: row.mediaAvaliacao
            }));

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Livros mais avaliados',
                nRegistros: dados.length,
                dados
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

