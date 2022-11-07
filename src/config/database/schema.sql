CREATE DATABASE hackathon_database


CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    trilha TEXT,
    adm BOOLEAN DEFAULT false ,
    funcao TEXT DEFAULT 'usuario',
    xp INT DEFAULT 0 ,
    nivel INT DEFAULT 0, 
    posts INT DEFAULT 0,
    respostas INT DEFAULT 0 , 
    likes INT DEFAULT 0,
    conteudos INT DEFAULT 0
);

CREATE TABLE conteudos(
    id SERIAL PRIMARY KEY,
    id_usuario int,
    titulo TEXT NOT NULL,
    tipo TEXT NOT NULL ,
    criador_nome TEXT ,
    duracao TEXT ,
    link TEXT NOT NULL,
    notion smallint default 0,
    likes INT DEFAULT 0,
    foreign key (id_usuario) references usuarios (id)
);

CREATE TABLE postagens(
  id SERIAL PRIMARY KEY,
  id_usuario int,
  titulo TEXT NOT NULL,
  descricao text not null,
  tipo TEXT NOT NULL,
  criador_nome TEXT,
  likes INT DEFAULT 0,
  foreign key (id_usuario) references usuarios (id)
);


CREATE TABLE respostas (
    id SERIAL PRIMARY KEY,
    id_usuario int,
  foreign key (id_usuario) references usuarios (id),
   resposta text not null,
   resposta_id INT ,
   foreign key (resposta_id) references perguntas (id)
);
