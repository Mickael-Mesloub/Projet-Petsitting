import { getMethod } from "../../../helpers/fetch";
import { useState, useEffect } from 'react';
import Header from '../../../components/header/Header';
import './styles.scss'

const News = () => {

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        getMethod( `${process.env.REACT_APP_BACKEND_URL}/news`)
            .then((data) => setArticles(data))
            .catch((error) => console.log(error))
    },[]);


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
                        <div className="article-image"><img src={`${process.env.REACT_APP_BACKEND_URL}/${article.images}`} alt="" /></div>
                        <h3>{article.title}</h3>
                        <p className="article-inner-text">{article.content}</p>
                    </div>                    
                )}
            </div>
            }
        </>
    );
};

export default News;