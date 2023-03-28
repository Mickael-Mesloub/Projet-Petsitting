import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMethod } from "../../../helpers/fetch.js";
import Header from "../../../components/Header.js";
import AdminLinks from "../../../components/AdminLinks.js";

const AdminNews = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        getMethod('http://localhost:9900/admin/news')
            .then((data) => {setNews(data)})
            .catch((error) => console.log(error))
    },[])



    return (
        <>
            <Header />
            <AdminLinks />
            <main>
                <h1>Actualités</h1>
                <div className="news-container">
                    {news && news.length === 0 ? 
                        <>
                            <div>Aucune news créée pour le moment</div>
                            <div className="admin-links-container">
                                <Link className="admin-link" to="/admin/news/create-article">Nouvel article</Link>
                            </div>
                        </>
                    
                    :

                    <>
                        {news.map((article, i) => 
                            <div key={i} className="admin-article">
                                <div><Link to={`/admin/news/${article._id}`}>{article.title}</Link></div>
                                <div>{article.content}</div>
                                <>
                                    {article.images.length === 0 ?
                                        <div>Aucune image n'a été ajoutée pour cet article</div>
                                        
                                    :
                                        <>
                                            {article.images.map((image, i) => 
                                                <div key={i} className="admin-news-image"><Link key={i} to={`http://localhost:9900/${image}`}>${image}</Link></div>)}
                                        </>
                                    }
                                        
                                </>
                                <div>{article.name}</div>
                            </div>
                        )}
                    </>
            
                }
                </div>
                <div className="admin-links-container">
                <Link className="admin-link" to="/admin/news/create-article">Nouvel article</Link>
                </div>
            </main>
        </>
    )

}

export default AdminNews;