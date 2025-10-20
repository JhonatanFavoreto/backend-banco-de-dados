// Lógica, tratativa de erros e regras de negócio

// Importar o Model
import * as BruxoModel from "./../models/bruxoModel.js";

export const listarTodos = async (req, res) => {
  try {
    const bruxos = await BruxoModel.findAll();

    if (!bruxos || bruxos.length === 0) {
      res.status(404).json({
        total: bruxos.length,
        mensagem: "Nenhum bruxo encontrado",
      });
    }

    res.status(200).json({
      total: bruxos.length,
      mensagem: "Lista de bruxos",
      bruxos,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno no servidor",
      detalhes: error.message,
      status: 500,
    });
  }
};
