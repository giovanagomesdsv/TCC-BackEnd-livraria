

create table USUARIOS(
usu_id INT primary key not null AUTO_INCREMENT,
usu_email VARCHAR (80) not null,
usu_nome VARCHAR (50) not null,
usu_senha VARCHAR (64) not null,
usu_tipo_usuario VARCHAR (30) not null,
usu_data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
usu_status TINYINT DEFAULT 1 not null
);

create table LIVRARIAS (
liv_id INT primary key not null,
liv_nome VARCHAR (50) not null,
liv_cidade VARCHAR (30) not null,
liv_estado VARCHAR (2) not null,
liv_endereco VARCHAR (100) not null,
liv_telefone BIGINT not null,
liv_email VARCHAR (60),
liv_foto VARCHAR (255),
liv_perfil VARCHAR (5000),
liv_social VARCHAR (255)
);

create table TITULO (
tit_id INT primary key not null AUTO_INCREMENT,
tit_nome VARCHAR (50) not null,
tit_descricao VARCHAR (6000) not null,
tit_icone VARCHAR (255) not null,
tit_quant_resenhas INT not null
);

create table RESENHISTAS (
res_id INT primary key not null,
tit_id INT DEFAULT 1 not null,
res_nome_fantasia VARCHAR (50) not null,
res_cidade VARCHAR (30) not  null,
res_estado VARCHAR (2) not null,
res_telefone BIGINT not null,
res_foto VARCHAR (255) not null,
res_perfil VARCHAR (1024),
res_social VARCHAR (255)
);


create table LIVROS (
livro_id INT primary key not null AUTO_INCREMENT,
livro_titulo VARCHAR (60) not null,
livro_sinopse VARCHAR (1500) not null,
livro_editora VARCHAR (30) not null,
livro_isbn VARCHAR (20),
livro_ano SMALLINT not null,
livro_classidd VARCHAR (5) not null,
livro_foto VARCHAR (255) not null
);

create table LIVRARIAS_LIVROS (
liv_livro_id INT primary key not null AUTO_INCREMENT,
liv_id INT not null,
livro_id INT not null,
liv_livro_idioma VARCHAR (30) not null,
liv_livro_pag SMALLINT not null,
liv_livro_tipo VARCHAR (30) not null,
liv_livro_preco DECIMAL (8,2) not null,
liv_livro_obsadicionais VARCHAR (255),
liv_livro_status TINYINT DEFAULT 1 not null,
liv_livro_dtpublicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table AUTORES (
aut_id INT primary key not null AUTO_INCREMENT,
aut_nome VARCHAR (50) not null,
aut_bio VARCHAR (1500) not null,
aut_foto VARCHAR (255) not null
);

create table LIVRO_AUTORES (
livro_id INT not null,
aut_id INT not null,
PRIMARY KEY (livro_id, aut_id)
);

create table GENEROS (
gen_id INT primary key not null AUTO_INCREMENT,
gen_nome VARCHAR (30) not null,
gen_icone VARCHAR (255) not null
);

create table LIVRO_GENEROS (
livro_id INT not null,
gen_id INT not null,
PRIMARY KEY (livro_id, gen_id)
);

create table RESENHAS (
resenha_id INT primary key not null AUTO_INCREMENT,
res_id INT not null,
livro_id INT not null,
resenha_titulo VARCHAR (50) not null,
resenha_texto VARCHAR (12000) not null,
resenha_status TINYINT default 0, 
resenha_avaliacao TINYINT not null,
resenha_dtpublicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
resenha_dtatualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
