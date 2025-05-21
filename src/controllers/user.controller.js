const db = require('../models');
const User = db.User;

// Apenas admin pode listar todos
exports.findAll = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acesso negado.' });
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários.', error: err.message });
  }
};

// Admin ou dono do ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== id)
    return res.status(403).json({ message: 'Acesso negado.' });

  try {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário.', error: err.message });
  }
};

// Atualizar
exports.update = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== id)
    return res.status(403).json({ message: 'Acesso negado.' });

  try {
    const [updated] = await User.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error: err.message });
  }
};

// Somente admin pode deletar
exports.delete = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acesso negado.' });

  try {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir usuário.', error: err.message });
  }
};