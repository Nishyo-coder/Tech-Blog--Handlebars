// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: 'comments',
    },
    
    },
  
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Posts',
  }
);

module.exports = Posts;
