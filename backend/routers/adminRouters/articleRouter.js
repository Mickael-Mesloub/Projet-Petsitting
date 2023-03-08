import express from 'express';
import { createArticle, getAllArticles, getArticle, updateArticle, deleteArticle } from '../../controllers/admin/articleController.js';

const articleRouter = express.Router();

articleRouter.get('/news' , getAllArticles);
articleRouter.get('/news/:id' , getArticle);
articleRouter.post('/news/create-article' , createArticle);
articleRouter.put('/news/:id' , updateArticle);
articleRouter.delete('/news/:id' , deleteArticle);


// articleRouter.get('/' , getAllarticle);

export default articleRouter;