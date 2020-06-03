const User = require('../models/Users');
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

/**
 * É importante que na aplicação, ao ser criado um novo usuário ele consiga receber um token
 * para validar a sessão iniciada. Portanto, vamos abstrair a parte de geração de token para uma funcão
 * externa à rota de autenticação;
 */
const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}


module.exports = { 

  async index(req, res) {
    const users  = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, username, email, password } = req.body;

    if (await User.findOne({ where: { username } })) {
      return res.status(400).send({ error: "User alredy exists" });
    }

    const user = await User.create({ name, username, email, password });

    return res.json({ 
      user, 
      token: generateToken({ id: user.id })
    })
  },

  async destroy (req, res) {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await user.destroy({ where: { id } });

    return res.json({ message: "User was deleted with successfully" });

  },

  // User route for authenticate(login)
  async authenticate(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    
    if (user.password !== password ) {
      return res.status(400).send({ error: "Ivalid password" });
    }
    
    //Setando a password como undfined para que não seja exibida ao retornar para a chamada da api
    user.password = undefined;
    
    //Contruindo a parte de autenticação por token
    /**
     * O primiero parâmetro do método sign (método para fazer a autenticação)
     * é um objeto que vai reconhecer de forma única o usuário
     * O segundo é um hash, que foi colocado externamente num arquivo 'auth.json' que contém
     * o secret (hash MD5) e por último precisa-se setar quando o token vai expirar
    */
    
    return res.json({ 
      user, 
      token: generateToken({ id: user.id })
    });
    

  },

}