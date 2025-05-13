const db = require('../dataBase/connection');

module.exports = {
    async listarResenhistas(request, response) {

        try {

            const sql = `
            SELECT res_id, tit_id, res_nome_fantasia, res_cidade, res_estado, res_telefone  ,  res_foto, res_perfil,res_social FROM resenhistas;
        `;

        const [rows] = await db.query(sql);

        const nRegistros = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de resenhistas',
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
    async cadastrarResenhistas(request, response) {

        try {

            
        const { id, nome_fantasia, cidade, estado, telefone, foto, perfil, instagram } = resquest.body;

        const sql = `INSERT INTO RESENHISTAS (res_id, res_nome_fantasia, res_cidade, res_estado, res_telefone, res_foto, res_perfil, res_social) 
VALUES (?,?,?,?,?,?,?,?)`;

        const values = [id, nome_fantasia, cidade, estado, telefone, foto, perfil, instagram];

        const [result] = await db.query(sql, values);

        const dados = {
            id: result.InsertId,
            nome_fantasia,
            cidade,
            estado,
            telefone,
            foto,
            perfil,
            instagram
        }
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de resenhistas',
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
    async editarResenhistas(request, response) {
        try {

            const { nome_fantasia, cidade, estado, telefone, foto, perfil, instagram } = resquest.body;

            const { id } = request.params;
    
            const sql = `UPDATE RESENHISTAS SET res_nome_fantasia=?, res_cidade=?, res_estado=?, res_telefone=?, res_foto=?, res_perfil=?, res_social=?
            WHERE res_id = ?`;
    
            const values = [nome_fantasia, cidade, estado, telefone, foto, perfil, instagram, id];
    
            const result = await db.query(sql, values);
    
    
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: true,
                    mensagem: `Resenhista ${id} não encontrado!`,
                    dados: null
                });
            }
    
            const dados = {
                id,
                nome_fantasia, 
                cidade, 
                estado, 
                telefone, 
                foto, 
                perfil, 
                instagram
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Resenhista ${id} atualizado com sucesso!`,
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
    async apagarResenhistas(request, response) {

        try {
            const {id} = request.params;

            const sql = `DELETE FROM RESENHISTAS WHERE res_id = ?`;
    
            const values = [id];
    
            const [result] = await db.query(sql, values);
    
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `resenhista ${id} não encontrado!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Exclusão de resenhista ${id}`,
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