import express from 'express';
import { createArticle, getAllArticles, getArticle, updateArticle, deleteArticle, deleteAllArticles } from '../../controllers/admin/articleController.js';

const articleRouter = express.Router();

articleRouter.get('/news' , getAllArticles);
articleRouter.get('/news/:id' , getArticle);
articleRouter.post('/news/create-article' , createArticle);
articleRouter.put('/news/:id' , updateArticle);
articleRouter.delete('/news/:id' , deleteArticle);
articleRouter.delete('/news/' , deleteAllArticles);

export default articleRouter;