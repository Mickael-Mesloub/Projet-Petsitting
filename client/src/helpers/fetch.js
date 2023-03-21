const findToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
        return token;
    } else {
        return ""
    };
};

const token = findToken();

export const getMethod = (url, JWT) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JWT}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data);
                            console.log(data);
                        } else {
                            reject(data)
                        };
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const postMethod = async (url, formData) => {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data);
                        } else {
                            reject(data);
                        };
                    })
                    .catch((err) => reject(err));
            })
            .catch(error => reject(error));
    });
};

export const deleteMethod = async (url, token) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                console.log(response);
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
