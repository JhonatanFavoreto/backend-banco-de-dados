import dados from "./../models/dados.js";
const { bruxos } = dados;

const getAllBruxos = (req, res) => {
    const resultado = bruxos;

    res.status(200).json({
        status: 200,
        sucess: true,
        message: "Lista de bruxos foi enconrtrada",
        total: resultado.length,
        bruxos: resultado,
    });
};

const getBruxoById = (req, res) => {
    let id = parseInt(req.params.id);

    const bruxo = bruxos.find((b) => b.id === id);

    if (bruxo) {
        res.status(200).json({
            status: 200,
            success: true,
            message: "Bruxo encontrado por ID",
            bruxo: bruxo,
        });
    } else {
        res.status(404).json({
            status: 404,
            success: false,
            message: "Bruxo não encontrado no registro de Hogwarts",
            error: "Bruxo não encontrado",
            suggestions: ["Verifique o ID informado"],
        });
    }
};

const createBruxo = (req, res) => {
    const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } =
        req.body;

    if (!nome || !casa) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Nome e casa são obrigatórios para o cadastro do bruxo",
            error: "Dados incompletos",
            suggestions: ["Verifique o nome do bruxo", "Verifique a casa do bruxo"],
        });
    }

    const nomeExiste = bruxos.some(
        (b) => b.nome.toLowerCase() === nome.toLowerCase()
    );

    if (nomeExiste) {
        return res.status(409).json({
            status: 409,
            success: false,
            message: "Já existe um bruxo cadastrado com esse nome",
            error: "Nome duplicado",
            suggestions: ["Utilize outro nome para o bruxo"],
        });
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome: nome,
        casa: casa,
        anoNascimento: anoNascimento,
        especialidade: especialidade,
        nivelMagia: nivelMagia,
        ativo: ativo,
    };

    bruxos.push(novoBruxo);

    res.status(201).json({
        status: 201,
        sucess: true,
        message: "Bruxo cadastrado com sucesso!",
        bruxo: novoBruxo,
    });
};

const deleteBruxo = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!",
        });
    }

    const idParaApagar = parseInt(id);

    const bruxoParaRemover = bruxos.find((b) => b.id === idParaApagar);
    if (!bruxoParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Esse bruxo não existe, ${id}`,
        });
    }
    const bruxosFiltrados = bruxos.filter((bruxo) => bruxo.id != id);

    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);
    res.status(200).json({
        sucess: true,
        message: "O bruxo foi removido com sucesso",
        bruxoRemovido: bruxoParaRemover,
    });
};

const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } =
        req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido",
        });
    }

    const bruxoExiste = bruxos.find((b) => b.id === id);

    if (!bruxoExiste) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: "“Não foi possivel reparar, pois não há nada a se fazer",
            error: "Id não encontrado",
            suggestions: ["Verifique o ID do bruxo"],
        });
    }

    const bruxosAtualizados = bruxos.map((b) =>
        b.id === id
            ? {
                ...b,
                ...(nome && {
                    nome,
                }),
                ...(casa && {
                    casa,
                }),
                ...(anoNascimento && {
                    anoNascimento,
                }),
                ...(especialidade && {
                    especialidade,
                }),
                ...(nivelMagia && {
                    nivelMagia,
                }),
                ...(ativo && {
                    ativo,
                }),
            }
            : b
    );

    bruxos.splice(0, bruxos.length, ...bruxosAtualizados);

    const bruxoAtualizado = bruxos.find((p) => p.id === id);

    res.status(200).json({
        status: 200,
        success: true,
        message: "Bruxo cadastrado com sucesso",
        bruxoAtualizado: bruxoAtualizado,
    });
};
export { getAllBruxos, getBruxoById, createBruxo, deleteBruxo, updateBruxo };