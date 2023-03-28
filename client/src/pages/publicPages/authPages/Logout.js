import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// À IMPLÉMENTER POUR HOME/LOGIN/REGISTER

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate('/')
        window.location.reload();
    },[])

    return null
}

export default Logout;