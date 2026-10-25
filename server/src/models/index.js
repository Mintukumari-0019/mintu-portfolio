// server/src/models/index.js
import sequelize from '../config/db.js';
import Project from './Project.js';
import Message from './Message.js';

export {
  sequelize,
  Project,
  Message,
};
