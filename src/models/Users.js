import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init (sequelize) {
    /**
     * Usasndo o método static para recebe a conexão com o banco de dados como parâmetro
     * em seqguida chama um método do classe pai "Model" que cria um registro da tabela
     * do banco de dados
     */
    super.init({
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },{
      /**
       * Defininando aqui as configurações de conexão com o bando de dados
       */
      sequelize
    })
  }

  static associate(models) {
    /**
     * Agora para como é um relacionamento 1-N 
     * precisamos relacionar as tabelas de forma inversa
     */
    this.hasMany(models.Post, { foreignKey: 'user_id', as: "posts" });
  }
};

module.exports= User;