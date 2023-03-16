export const authLogin = (event, url, JWT, setJWT, dispatcher, actionCreator) => {

    const formData = new FormData(event.target);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`,
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        })
        .then(response => {
            response.json()
            .then(data => {
                if(response.ok){
                    dispatcher(actionCreator({email: data.user.email, isAdmin: data.user.isAdmin}));
                    setJWT(data.token);
                    localStorage.setItem('jwt' , data.token);
                } else {
                    console.log('err');
                };
            })
            .catch(error => {
                console.log(error);
                formData.get(error);
            });
        });
};

export const authRegister = (event, url, state, setState, dispatcher, actionCreator) => {

    const formData = new FormData();
    formData.append('firstName', event.target.firstName.value);
    formData.append('lastName', event.target.lastName.value);
    formData.append('phone', event.target.phone.value);
    formData.append('email', event.target.email.value);
    formData.append('password', event.target.password.value);
    formData.append('file', event.target.file.files[0]);

    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${state}`,
        }
    })
    .then(response => {
        response.json()
        .then(data => {
            if(response.ok){
                dispatcher(actionCreator({email: data.user.email, isAdmin: data.user.isAdmin}))
                setState(data.token)
                localStorage.setItem('jwt' , data.token)
            } else {
                console.log('err');
            }
        })
        .catch(error => {
            console.log(error)
        })
    })
}