const pool = require("../database/conexao");

const campoEndereco = require("../utils/campoEndereco");

const cadastrarTarefa = async (req, res) => {
  const { tarefa, ativo, cep } = req.body;

  if (!tarefa) {
    return res.status(400).json({ mensagem: "O campo tarefa é obrigatorio" });
  }

  const enderecoData = await campoEndereco.getEndereco(cep);

  const enderecoFormatado = campoEndereco.formatarEndereco(enderecoData);

  try {
    const query = `insert into todos(usuario_id, tarefa, ativo, data, endereco) values ($1,$2, $3, $4, $5) returning *`;

    const params = [
      req.usuario.id,
      tarefa,
      ativo,
      new Date(),
      enderecoFormatado,
    ];

    const { rows } = await pool.query(query, params);

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

const atualizarTarefa = async (req, res) => {
  const { tarefa, ativo } = req.body;
  const { id } = req.params;
  ativo;
  try {
    const { rowCount } = await pool.query(
      "select * from todos where id = $1 and usuario_id = $2",
      [id, req.usuario.id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "tarefa não encontrada" });
    }

    const queryAtualizadaTarefa =
      "update todos set tarefa = $1, ativo = $2 where id = $3";

    await pool.query(queryAtualizadaTarefa, [tarefa, ativo, id]);

    return res.status(204).json(queryAtualizadaTarefa);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

const listarTarefa = async (req, res) => {
  try {
    const { rows: todos } = await pool.query(
      "select id,tarefa, ativo, data from todos where usuario_id = $1",
      [req.usuario.id]
    );
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

const detalharTarefas = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await pool.query(
      "select tarefa, ativo, data from todos where id = $1 and usuario_id = $2",
      [id, req.usuario.id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "tarefa não encontrada" });
    }

    const todos = rows[0];

    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

const deletarTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await pool.query(
      "select id, tarefa, ativo, data from todos where id = $1 and usuario_id = $2",
      [id, req.usuario.id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "tarefa não encontrada" });
    }

    await pool.query("delete from todos where id = $1", [id]);

    const todosDel = rows[0];

    return res.status(204).json(todosDel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

module.exports = {
  atualizarTarefa,
  cadastrarTarefa,
  deletarTarefa,
  listarTarefa,
  detalharTarefas,
};
