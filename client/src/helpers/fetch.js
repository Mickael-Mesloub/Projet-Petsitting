export const findToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    return token;
  } else {
    return "";
  }
};

export const getMethod = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${findToken()}`,
      },
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (response.ok) {
              resolve(data);
            } else {
              reject(data);
            }
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

export const postMethod = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${findToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (response.ok) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((err) => reject(err));
      })
      .catch((error) => reject(error));
  });
};

export const postFormData = (url, formData) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${findToken()}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
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
          throw new Error(response.statusText);
        }
        return response;
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
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${findToken()}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
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

export const putMethod = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${findToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
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
