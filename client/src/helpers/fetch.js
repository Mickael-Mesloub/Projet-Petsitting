export const findToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
        return token;
    } else {
        return ""
    };
};

export const getMethod = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                console.log(response)
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data);
                            console.log(data);
                        } else {
                            console.log(response.message);
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

export const postMethod = async (url, data) => {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${findToken()}`
            },
            body: JSON.stringify(data)
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

export const deleteMethod = async (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${findToken()}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error(response.statusText);
                }
                console.log(response);
                return response
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const putFormData = (url, formData) => {
    console.log("OK 1");
    return new Promise((resolve, reject) => {
        console.log("OK 2");
        fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${findToken()}`,
                },
            body: formData
        })
            .then((response) => {
                console.log("OK 3");
                if(!response.ok) {
                    console.log("OK 4");
                    throw new Error(response.statusText);
                }
                console.log("OK 5");
                return response.json();
            })
            .then((data) => {
                console.log("OK 6");
                resolve(data);
            })
            .catch((error) => {
                console.log("OK 7");
                reject(error);
            });
    });
};

export const putMethod = (url, data) => {
    return new Promise((resolve, reject) => {
        
        fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${findToken()}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};