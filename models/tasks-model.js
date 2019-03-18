module.exports = (sequelize, type) => {
  return sequelize.define('task', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    description: {
      type: type.STRING,
      defaultValue: ''
    },
    status: {
      type: type.STRING,
      defaultValue: 'todo'
    },
    userId: type.INTEGER,
    parentId: {
      type: type.INTEGER,
      defaultValue: 0
    }
  })
};
