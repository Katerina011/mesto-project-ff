const cfg = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
    headers: {
        authorization: 'c7d26831-3d4c-42e2-9340-78bdc85f0f68',
        'Content-Type': 'application/json'
    }
};

const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${cfg.baseUrl}/cards`, {
    method: 'GET',
    headers: cfg.headers
  })
  .then(handleResponse)
};

export const postCard = (name, link) => {
    return fetch(`${cfg.baseUrl}/cards`, {
        method: 'POST',
        headers: cfg.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(handleResponse)
};

export const deleteCard = (cardId) => {
    return fetch(`${cfg.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: cfg.headers
    })
    .then(handleResponse)
};

export const getUserInfo = () => {
    return fetch(`${cfg.baseUrl}/users/me`, {
        method: 'GET',
        headers: cfg.headers
    })
    .then(handleResponse)
};

export const patchUserInfo = (data) => {
    return fetch(`${cfg.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: cfg.headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    })
    .then(handleResponse)
};

export const patchAvatar = (link) => {
    return fetch(`${cfg.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: cfg.headers,
        body: JSON.stringify({
           avatar: link
        })
    })
    .then(handleResponse)
};

export const putCardLike = (cardId) => {
    return fetch(`${cfg.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: cfg.headers
    })
    .then(handleResponse)
};

export const deleteCardLike = (cardId)  => {
    return fetch(`${cfg.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: cfg.headers
    })
    .then(handleResponse)
};