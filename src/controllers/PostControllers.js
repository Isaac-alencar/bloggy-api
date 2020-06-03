const Post = require('../models/Posts');
const User = require('../models/Users');

module.exports = {

  async index(req, res) {
    const { userId } = req;
    const user = await User.findByPk(userId, {
    /**
     * Todo método find recebe como parâmetro uma objeto 
     * que pode fazer de forma simples joins entre
     * relacionamentos das tabelas
     */
      include: { association: 'posts' }
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    
    return res.json(user);
  },
  async store (req, res) {
    const { content, user_id } = req.body;
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const post = await Post.create({ content, user_id });
    return res.json(post);

  },

  async destroy(req, res) {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) return res.status(400).json({ error: "Cannot delete this post" });
    await Post.destroy({ 
      where: {
        id
      } 
    });

    return res.json({ message: "Post removed with successfully" });

  }

}