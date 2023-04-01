import { Link } from 'react-router-dom';
import {FiFacebook} from 'react-icons/fi';
import './styles.scss';

const Footer = () => {
    return (

        <footer>
            <div className="social-media-container">
                <Link className="social-media-link" to='https://www.facebook.com'><FiFacebook color="white" fontSize={"44"}/></Link>
            </div>
        </footer>

    )
}

export default Footer;