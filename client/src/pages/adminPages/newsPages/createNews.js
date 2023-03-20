import { Link } from "react-router-dom";

const createNews = () => {

    return (
        <>
            <h1>Nouveau post</h1>
            <form>
                <label htmlFor="title">Titre : </label>
                <input type="text" name="title" />
                <label htmlFor="content">Contenu : </label>
                <textarea name="content" rows="5" cols="50"></textarea>
                <label htmlFor="file">Images : </label>
                <input type="file" name="file"/>
                <input type="submit" value="Créer"/>
            </form>
        </>
    )

}

export default createNews;