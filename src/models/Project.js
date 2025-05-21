const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'em andamento'
    },
    priority: {
      type: DataTypes.ENUM('baixa', 'média', 'alta'),
      defaultValue: 'média'
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  return Project;
};