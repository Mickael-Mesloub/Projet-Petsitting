const verifyToken = async (url, token) => {
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
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export default verifyToken;
