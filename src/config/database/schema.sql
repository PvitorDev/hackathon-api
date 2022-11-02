
CREATE DATABASE hackathon;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULl
)