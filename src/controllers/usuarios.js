const db = require('../dataBase/connection');

module.exports = {
    // LISTAR USUÁRIOS ATIVOS
    async listarUsuarios(request, response) {
        try {
            const sql = `
                SELECT usu_id, usu_email, usu_nome, usu_senha, usu_tipo_usuario, usu_data_criacao
                FROM usuarios
                WHERE usu_status = 1;
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

    // CADASTRAR USUÁRIO
    async cadastrarUsuarios(request, response) {
        try {
            const { email, nome, senha, tipo_usuario } = request.body;

            const sql = `
                INSERT INTO USUARIOS (usu_email, usu_nome, usu_senha, usu_tipo_usuario)
                VALUES (?, ?, ?, ?, 1)
            `;

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
                mensagem: 'Cadastro de usuário realizado com sucesso.',
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

    // EDITAR USUÁRIO
    async editarUsuarios(request, response) {
        try {
            const { email, nome, senha, tipo_usuario, status } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE USUARIOS 
                SET usu_email = ?, usu_nome = ?, usu_senha = ?, usu_tipo_usuario = ?, usu_status = ?
                WHERE usu_id = ?
            `;

            const values = [email, nome, senha, tipo_usuario, status, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                id,
                email,
                nome,
                senha,
                tipo_usuario,
                status
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Usuário atualizado com sucesso.',
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

    // EXCLUIR USUÁRIO (FÍSICO — SE PERMITIDO)
    async apagarUsuarios(request, response) {
        try {
            const { id } = request.params;

            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            const values = [id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} excluído com sucesso.`,
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

    // OCULTAR USUÁRIO (EXCLUSÃO LÓGICA)
    async ocultarUsuario(request, response) {
        try {
            const ativo = 0;
            const { id } = request.params;

            const sql = `
                UPDATE usuarios 
                SET usu_status = ? 
                WHERE usu_id = ?
            `;

            const values = [ativo, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} ocultado com sucesso.`,
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
    
    async login(request, response) {
        try {
            // Pegando email e senha do corpo da requisição (POST)
            const { email, senha } = request.body;

            if (!email || !senha) {
            return response.status(400).json({
                sucesso: false,
                mensagem: 'E-mail e senha são obrigatórios.',
                dados: null,
            });
            }

            const sql = `
            SELECT 
                usu_id, usu_nome, usu_tipo
            FROM 
                usuarios
            WHERE 
                usu_email = ? 
                AND usu_senha = ? 
                AND usu_ativo = 1
            `;

            const values = [email, senha];
            const [rows] = await db.query(sql, values);

            if (rows.length === 0) {
            return response.status(403).json({
                sucesso: false,
                mensagem: 'Login e/ou senha inválido.',
                dados: null,
            });
            }

            return response.status(200).json({
            sucesso: true,
            mensagem: 'Login efetuado com sucesso.',
            dados: rows,
            });

        } catch (error) {
            return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno no servidor.',
            dados: error.message,
            })
        }
    }
};


