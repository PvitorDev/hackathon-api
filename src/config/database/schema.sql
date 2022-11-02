
CREATE DATABASE hackathon;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    trilha TEXT,
    adm TEXT ,
    funcao TEXT,
     xp int 
)

CREATE TABLE conteudos(
    id SERIAL PRIMARY KEY,
    id_usuario int,
    titulo TEXT NOT NULL,
    tipo TEXT NOT NULL ,
    criador_nome TEXT ,
    duracao TEXT ,
    link TEXT NOT NULL,
    notion smallint default 0,
    likes INT DEFAULT 0
    foreign key(id_usuario) references usuarios (id)
)
CREATE TABLE perguntas(
  id SERIAL PRIMARY KEY,
  id_usuario int,
  titulo TEXT NOT NULL,
  descricao text not null,
  tipo TEXT NOT NULL,
  criador_nome TEXT,
  likes INT DEFAULT 0

)
CREATE TABLE respostas {
    id SERIAL PRIMARY KEY,
    id_usuario int,
   resposta text not null,
   resposta_id int,
  foreign key(resposta_id) references perguntas (id)
}