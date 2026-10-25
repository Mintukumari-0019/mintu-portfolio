// server/src/models/Project.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  demo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#',
  },
  github: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  theme: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  tableName: 'projects',
});

export default Project;
