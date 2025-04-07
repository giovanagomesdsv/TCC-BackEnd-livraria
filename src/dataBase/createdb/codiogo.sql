-- SELECT COM TODOS OS CAMPOS
SELECT res_id, tit_id, res_nome_fantasia, res_cidade, res_estado, res_telefone  ,  res_foto, res_perfil,res_social FROM resenhistas;
SELECT usu_id, usu_email, usu_nome,usu_senha,usu_tipo_usuario, usu_data_criacao,usu_status FROM usuarios;
SELECT liv_id,liv_nome,liv_cidade,liv_estado,liv_endereco,liv_telefone,liv_email,liv_foto,liv_perfil,liv_social FROM livrarias;
SELECT resenha_id,res_id,livro_id, resenha_titulo,resenha_texto,resenha_status,resenha_avaliacao,resenha_dtpublicacao,resenha_dtatualizacao FROM resenhas;
SELECT tit_id,tit_nome,tit_descricao,tit_icone, tit_quant_resenhas FROM titulo;
SELECT liv_livro_id,liv_id,livro_id,liv_livro_idioma,liv_livro_pag,liv_livro_tipo,liv_livro_preco,liv_livro_obsadicionais,liv_livro_status,liv_livro_dtpublicacao FROM livrarias_livros;
SELECT livro_id, livro_titulo, livro_sinopse, livro_editora, livro_isbn, livro_ano, livro_classidd, livro_foto FROM livros;
SELECT gen_id, gen_nome, gen_icone FROM generos;
SELECT livro_id, gen_id FROM livro_generos;
SELECT aut_id, livro_id FROM livro_autores;
SELECT aut_id, aut_nome, aut_bio, aut_foto FROM autores;

-- DESCRIBE DE TODAS AS TABELAS
DESCRIBE resenhistas;
DESCRIBE usuarios;
DESCRIBE resenhas;
DESCRIBE livrarias;
DESCRIBE titulo;
DESCRIBE livros;
DESCRIBE generos;
DESCRIBE livro_generos;
DESCRIBE autores; 
DESCRIBE livro_autores; 
DESCRIBE livrarias_livros;


-- DROP DE TODAS AS TABELAS NA ORDEM DE EXCLUSÃO
DROP TABLE resenhistas;
DROP TABLE usuarios;
DROP TABLE resenhas;
DROP TABLE livrarias; 
DROP TABLE titulo; 
DROP TABLE livros; 
DROP TABLE generos; 
DROP TABLE livro_genero;
DROP TABLE autores; 
DROP TABLE livro_autores;


-- INSTRUÇÃO PARA APAGAR OS REGISTROS

-- INSTRUÇÃO PARA APAGAR OS REGISTROS
DELETE FROM resenhistas;
DELETE FROM usuarios;
DELETE FROM resenhas;
DELETE FROM livrarias;
DELETE FROM titulo;
DELETE FROM livros;
DELETE FROM generos;
DELETE FROM livro_genero;
DELETE FROM autores;
DELETE FROM livro_autores;
DELETE FROM livrarias_livros;


-- RESETAR AUTO INCREMENTO - APENAS DAS TABELAS QUE TEM A CHAVE PRIMÁRIA COMO AUTOINCREMENTO
ALTER TABLE usuarios AUTO_INCREMENT = 1;
ALTER TABLE titulo AUTO_INCREMENT = 1;
ALTER TABLE livros AUTO_INCREMENT = 1;
ALTER TABLE livrarias_livros AUTO_INCREMENT = 1;
ALTER TABLE autores AUTO_INCREMENT = 1;
ALTER TABLE generos AUTO_INCREMENT = 1;
ALTER TABLE resenhas AUTO_INCREMENT = 1;


