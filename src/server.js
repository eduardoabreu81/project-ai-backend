const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const i18n = require('i18n');
const path = require('path');
const db = require('./models');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

i18n.configure({
  locales: ['pt-BR', 'en'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'pt-BR',
  objectNotation: true
});

app.use(cors());
app.use(express.json());
app.use(i18n.init);

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send(res.__('Bem-vindo ao backend do Project.AI!'));
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});