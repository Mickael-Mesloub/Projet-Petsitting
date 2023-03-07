import express from 'express';
import { createArticle } from '../../controllers/admin/articleController.js';

const articleRouter = express.Router();

articleRouter.post('/' , createArticle);
// articleRouter.get('/' , getAllarticle);

export default articleRouter;