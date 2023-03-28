import Header from "../../../components/Header"
import AdminLinks from './../../../components/AdminLinks';
import { useState, useEffect } from "react";
import { deleteMethod, getMethod } from "../../../helpers/fetch";
import { Link, useParams } from "react-router-dom"; 

const AdminNewsDetails = () => {

    const { articleId } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/news/${articleId}`)
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
                                <div key={i} className="admin-news-image"><Link key={i} to={`${process.env.REACT_APP_BACKEND_URL}/${image}`}>${image}</Link></div>)}
                        </>
                        :
                        <div>Aucune image n'a été ajoutée pour cet article</div>
                    }
                        <button onClick={() => {

                            if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer cet article ?")) {
                                deleteMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/news/${articleId}`);
                        }

                        }}>Supprimer</button>
                        <Link className="admin-link" to={`/admin/news/${articleId}/update-article`}>Modifier l'article</Link>
                </div>
            }
        </>
    )

}

export default AdminNewsDetails;
