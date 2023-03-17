import { getMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import Header from './../../components/Header';
import './styles/news.scss'

const News = () => {

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod('http://localhost:9900/news', token)
            .then((data) => setArticles(data))
            .catch((error) => console.log(error))
    },[])


    return (
        <>
            <Header />
            <h1>News</h1>
            {articles.length === 0 ?
                <p>Aucun articles publié</p>
            :
            <div className="articles-container">
                {articles.map((article, i) => 
                    <div key={i} className="article">
                        <div className="article-image"><img src={`http://localhost:9900/${article.images}`} alt="" /></div>
                        <div className="article-inner-text">{article.title}</div>
                        <div className="article-inner-text">{article.content}</div>
                        
                    </div>                    
                )}
            </div>
            }
        </>
    )

}

export default News;