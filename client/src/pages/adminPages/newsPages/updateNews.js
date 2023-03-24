import Header from "../../../components/Header";
import AdminLinks from "../../../components/AdminLinks";
import { useState, useEffect } from "react";
import {getMethod, putMethod} from "../../../helpers/fetch"
import { useParams } from 'react-router-dom';

const UpdateArticle = () => {

    const {articleId} = useParams();
    const [article, setArticle] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    // Pour la supression d'images : 
        // récupérer article (get) puis setArticle avec la data
        // maper sur articles.images pour créer des inputs checkbox name="deleteImages" / afficher les images à supprimer. 
        // quand ckeck la box ou click image, setDeleteImages
        // 
        

    useEffect(() => {
        getMethod(`http://localhost:9900/admin/news/${articleId}`)
            .then((data) => setArticle(data))
            .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        console.log(article);
    },[article])


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        putMethod(`http://localhost:9900/admin/news/${articleId}` , formData)
    }

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Modifier l'article</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor="title">Titre : </label>
                <input type="text" name="title" />
                <label htmlFor="content">Contenu : </label>
                <textarea name="content" rows="5" cols="50"></textarea>
                <label htmlFor="file">Images : </label>
                <input type="file" name="file" accept="image/jpeg, image/png"/>
                <input type="submit" value="Modifier"/>
            </form>
        </>
    )

}

export default UpdateArticle;