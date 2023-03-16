const verifyToken = async (url, token, dispatch, actionCreator) => {

// pour secret key : voir process.env

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(actionCreator(data.user));
        }
    } 
    catch (error) {
        console.log(error);
    }
};

export default verifyToken;