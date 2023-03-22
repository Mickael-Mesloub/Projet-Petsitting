import Header from "../../../components/Header"
import AdminLinks from './../../../components/AdminLinks';
import { useState, useEffect } from "react";
import { getMethod } from "../../../helpers/fetch";
import { Link, useParams } from "react-router-dom"; 

const AdminNewsDetails = () => {

    const { articleId } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod(`http://localhost:9900/admin/news/${articleId}`, token)
            .then((data) => setArticle(data))
            .catch((error) => console.log(error))
    },[articleId])

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Détails de l'article</h1>
            {article &&
                <div className="admin-news-article">
                    <div>{article.title}</div>
                    <div>{article.content}</div>
                    {article.images ?
                        <>
                            {article.images.map((image, i) =>
                                <div key={i} className="admin-news-image"><Link key={i} to={`http://localhost:9900/${image}`}>${image}</Link></div>)}
                        </>
                        :
                        <div>Aucune image n'a été ajoutée pour cet article</div>
                    }
                </div>
            }
        </>
    )

}

export default AdminNewsDetails;
