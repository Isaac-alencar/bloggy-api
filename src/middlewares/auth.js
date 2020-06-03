import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

module.exports = (req, res, next) => {
  /**
   * O argumento next é o que vai definir se o usuário está autenticado
   * e pode executar alguma ação.
   */
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provider" });
  }
  //Verificando se o token está no formato esperado
  const parts = authHeader.split(' ');
  if (!parts.length === 2) return res.status(401).send({ error: 'Invalid token' });
  //Verificando por expressão regular se o token contém a parte que espramos `Bearer`
  const [ scheme, token ] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformated' });
  }

  //Validação final, do token
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    //Comparando o token recebido com o token definido pelo secret
    if (err) return res.status(401).send({ error: 'Invalid token' });
    /**
     * Agora vamos incluir essa informação do user_id
     * nas próximas rotas da aplicação
     */
    req.userId = decoded.id;
    return next();
  })

}