import { Router } from 'express';

import UserController from './controllers/UserControllers';
import PostController from './controllers/PostControllers';
import authMiddleware from './middlewares/auth';


const routes = Router();

//Users CRUD
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.delete("/users/:id", UserController.destroy);

//Users authenticate route
routes.post("/users/authenticate", UserController.authenticate);
//Middlewares
routes.use(authMiddleware);

//Posts CRUD
routes.get("/users/post", PostController.index);
routes.post("/users/post", PostController.store);
routes.delete("/posts/delete/:id", PostController.destroy);


module.exports = routes;