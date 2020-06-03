'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allownull: false
        },
        name: {
          type: Sequelize.STRING,
          allownull: false
        },
        username: {
          type: Sequelize.STRING,
          allownull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allownull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allownull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allownull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allownull: false,
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.dropTable('users');
  }
};
