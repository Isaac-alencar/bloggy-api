import Sequelize from 'sequelize';
import dbConfig from '../config/database';

const User = require('../models/Users');
const Post = require('../models/Posts');

const connection = new Sequelize(dbConfig);

/**
 * Após ter criado o model de Users, a linha abaixo chama o método estático init
 * que recebe a conexão com o bando de dados
 */
User.init(connection);
Post.init(connection);
/**
 * Método da classe post que chama o relacionamento entre as tabelas
 */
User.associate(connection.models);
Post.associate(connection.models);


module.exports = connection;