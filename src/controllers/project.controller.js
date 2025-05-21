const db = require('../models');
const Project = db.Project;

exports.getAll = async (req, res) => {
  const { role, id } = req.user;
  try {
    if (role === 'admin' || role === 'gerente_portfolio') {
      const projects = await Project.findAll();
      return res.json(projects);
    }
    if (role === 'gerente_projetos') {
      const projects = await Project.findAll({ where: { ownerId: id } });
      return res.json(projects);
    }
    return res.status(403).json({ message: 'Acesso negado para analistas.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar projetos.', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  const { role, id } = req.user;
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado.' });

    if (
      role === 'admin' ||
      role === 'gerente_portfolio' ||
      (role === 'gerente_projetos' && project.ownerId === id)
    ) {
      return res.json(project);
    }

    return res.status(403).json({ message: 'Acesso negado.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar projeto.', error: err.message });
  }
};

exports.create = async (req, res) => {
  const { role, id } = req.user;
  try {
    if (role === 'analista') return res.status(403).json({ message: 'Analistas não podem criar projetos.' });

    const project = await Project.create({ ...req.body, ownerId: id });
    return res.status(201).json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar projeto.', error: err.message });
  }
};

exports.update = async (req, res) => {
  const { role, id } = req.user;
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado.' });

    const canEdit =
      role === 'admin' ||
      role === 'gerente_portfolio' ||
      (role === 'gerente_projetos' && project.ownerId === id);

    if (!canEdit) return res.status(403).json({ message: 'Acesso negado para edição.' });

    await project.update(req.body);
    return res.json({ message: 'Projeto atualizado.', project });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao atualizar projeto.', error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { role, id } = req.user;
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Projeto não encontrado.' });

    const canDelete = role === 'admin' || (role === 'gerente_portfolio' && project.ownerId === id);

    if (!canDelete) return res.status(403).json({ message: 'Acesso negado para exclusão.' });

    await project.destroy();
    return res.json({ message: 'Projeto excluído com sucesso.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao excluir projeto.', error: err.message });
  }
};