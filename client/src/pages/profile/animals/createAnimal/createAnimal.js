import '../../../../assets/styles/forms.scss'
import { getMethod, postMethod } from '../../../../helpers/fetch';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../../components/header/Header';


const CreateAnimal = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [files, setFiles] = useState([]);

    const { userId } = useParams();

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`)
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('size', size);

        for(const file of files) {
            formData.append('file', file)
        }
        
        postMethod(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/create-animal` , formData)
    }
    
    return (
        <>
            <Header />
            <h1>Ajouter un animal</h1>
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
                <input type="file" name="file" accept="image/png, image/jpeg" onChange={(event) => setFiles(event.target.files)} multiple />
                <input type="submit" value="Ajouter un animal" />
            </form>
        </>
    )

}

export default CreateAnimal;