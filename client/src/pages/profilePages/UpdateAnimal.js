import { getMethod, putMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from './../../components/Header';
import { loginUser } from "../../store/slices/user/userSlice";
import './styles/animal.scss';

const UpdateAnimal = () => {

    const [animal, setAnimal] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [images, setImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    /*
        créer un tableau d'images à supprimer
        quand je clique sur l'image, ça met à jour le tableau (ajoute ou supprime l'image)
        quand je clique sur l'image, ça change la classeName de l'image pour que l'image se grise quand elle est sélectionnée
        quand je supprime, récupérer le tableau d'images à supprimer et supprimer les images de la base de données

    */

    const formData = new FormData();
    const { userId,animalId } = useParams();
    const dispatch = useDispatch();
    

    useEffect(() => {
        getMethod(`http://localhost:9900/profile/${userId}/animals/${animalId}`)
            .then((data) => setAnimal(data.animal))
            .catch((error) => console.log(error))
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        formData.append('name' , name)
        formData.append('description' , description)
        formData.append('size' , size)
        if(images && images.length > 0){
            for(const image of images) {
                formData.append('file' , image)
            }
        }

        putMethod(`http://localhost:9900/profile/${userId}/animals/${animalId}/update-animal` , formData)
            .then((data) => setAnimal(data))

    }

    useEffect(() => {
        console.log(animal.images);
    },[])

    
       

    return (

        <>
            <Header />
            <h1>Modifier l'animal</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" >Nom : </label>
                <input type="text" name="name" onChange={(event) => setName(event.target.value)}  />
                <label htmlFor="description">Présentation : </label>
                <textarea name="description" rows="5" cols="50" onChange={(event) => setDescription(event.target.value)}></textarea>
                <label htmlFor="size">Taille : </label>
                <select name="size" onChange={(event) => setSize(event.target.value)} defaultValue={size}>
                    <option value="small">Petit toutou (moins de 10kg)</option>
                    <option value="medium">Moyen toutou (entre 10kg et 25kg)</option>
                    <option value="large">Grand toutou (plus de 25kg)</option>
                </select>
                <input type="file" name="file" accept="image/png, image/jpeg" onChange={(event) => setImages(event.target.files)} multiple />
                {animal.images && animal.images.length > 0 &&
                    <fieldset>
                        <legend>Sélectionnez les images à remplacer</legend>
                        {animal.images.map((image, i) => 
                            <>
                                <input type="checkbox" name="deleteImages[0]"/>
                                <div key={i} className={deleteImages.includes(image) ? "selected-image" : "choose-animal-image"}>
                                    <img src={`http://localhost:9900/${image}`} alt="" />
                                </div>
                            </>
                        )}
                    </fieldset>
                    
                }
                <input type="submit" value="Modifier" />
            </form>
            
        </>

    )
}

export default UpdateAnimal;