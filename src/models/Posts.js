import { Model, DataTypes } from 'sequelize';

class Post extends Model {
  
  static init (sequelize) {
    super.init({
      content: DataTypes.STRING,
    },{
      sequelize
    })
  }

  static associate(models) {
    /**
     * Este método cria um relacionamento entre as tabelas
     * onde cada post pertence á um só usuário e cada usuário pode ter vários posts
     */
    this.belongsTo(models.User, { foreignKey: 'user_id', as: "owner" });
  }
};

module.exports = Post;