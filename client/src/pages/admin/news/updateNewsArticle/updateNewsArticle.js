import Header from "../../../../components/Header";
import AdminLinks from "../../../../components/AdminLinks";
import { useState, useEffect } from "react";
import {getMethod, putFormData} from "../../../../helpers/fetch"
import { useParams } from 'react-router-dom';
import '../../../../assets/styles/forms.scss'

const UpdateArticle = () => {

    const {articleId} = useParams();
    const [article, setArticle] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    // Pour la supression d'images : 
        // récupérer article (get) puis setArticle avec la data
        // maper sur articles.images pour créer des inputs checkbox name="deleteImages" / afficher les images à supprimer. 
        // quand ckeck la box ou click image, setDeleteImages
        //  => VOIR UPDATE article
        

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/news/${articleId}`)
            .then((data) => setArticle(data))
            .catch((error) => console.log(error))
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
      
        // Supprimer les images sélectionnées
        const formData = new FormData();
        for (const image of selectedImages) {
          formData.append("deleteImages[]", image);
        }
        putFormData(`${process.env.REACT_APP_BACKEND_URL}/admin/news/${articleId}`, formData)
            .then((data) => setArticle(data))
            .then(() => setSelectedImages([]));
        
        formData.append("title", title);
        formData.append("content", content);
        if (images && images.length > 0) {
          for (const image of images) {
            formData.append("file", image);
          }
        }
        putFormData(`${process.env.REACT_APP_BACKEND_URL}/admin/news/${articleId}`, formData)
            .then((data) => setArticle(data));
        };

    useEffect(() => {
        console.log(selectedImages);
    },[selectedImages])

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Modifier l'article</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor="title">Titre : </label>
                <input type="text" name="title" placeholder={article.title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="content">Contenu : </label>
                <textarea name="content" rows="5" cols="50" placeholder={article.content} onChange={(e) => setContent(e.target.value)}></textarea>
                <label htmlFor="file">Images : </label>
                <input type="file" name="file" accept="image/jpeg, image/png" multiple onChange={(e) => setImages(e.target.files)}/>
                {article.images && article.images.length > 0 &&
                    <fieldset>
                        <legend>Sélectionnez les images à remplacer</legend>
                        {article.images.map((image, i) => 
                            <div key={i}>
                                <input type="checkbox" checked={selectedImages.includes(image)} onChange={(e) => 
                                    {
                                        if (e.target.checked) {
                                        setSelectedImages([...selectedImages, image]);
                                        } else {
                                        setSelectedImages(
                                            selectedImages.filter((selectedImage) => selectedImage !== image)
                                        );
                                        }
                                    }}
                                    name={`deleteImages[${i}]`}
                                />

                                <div className={selectedImages.includes(image) ? "selected-image" : "choose-image"}>
                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt="" />
                                </div>
                            </div>
                        )}
                    </fieldset>
                    
                }
                <input type="submit" value="Modifier"/>
            </form>
        </>
    )

}

export default UpdateArticle;