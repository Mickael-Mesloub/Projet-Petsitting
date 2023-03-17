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
                    if(response.ok) {
                        resolve(data)
                        console.log(data);
                    } else {
                        reject(data)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
            })
            .catch((error) => {
                reject(error)
            })
    })
};

export const postMethod = async (url, JWT, formData) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
            .catch(error => {
                reject(error)
            })
    })
};