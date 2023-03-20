import { Link } from "react-router-dom";

const adminNews = () => {

    return (
        <>
            <h1>Actualités</h1>
            <Link to="/admin/news/create-article">Nouveau post</Link>
        </>
    )

}

export default adminNews;