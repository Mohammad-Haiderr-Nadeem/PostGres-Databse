'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn(
        'Employees',
          'age',
          {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 1
          },
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn(
        'Employees',
        'age'
      )
    ])
  }
};
