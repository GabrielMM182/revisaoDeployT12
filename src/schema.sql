CREATE TABLE IF NOT EXISTS usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    tarefa TEXT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data DATE NOT NULL DEFAULT NOW(),
    endereco TEXT NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
);

-- INSERT INTO usuarios (id, nome, email, senha) VALUES (1,"gab", "gab@email.com", "123")