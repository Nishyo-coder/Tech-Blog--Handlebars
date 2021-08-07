// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created 
// for that post and have the option to leave a comment

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
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exhibition_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'comment',
    },
    
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Bpost',
  }
);

module.exports = Posts;
