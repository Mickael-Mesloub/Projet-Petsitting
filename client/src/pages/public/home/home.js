import { useSelector } from 'react-redux';
import Header from '../../../components/Header';
import './styles.scss'

const Home = () => {

    const {user} = useSelector(state => state);

    return (
        <>  
            <Header/>
            <h1>Accueil</h1>            
        </>
    )
}

export default Home;