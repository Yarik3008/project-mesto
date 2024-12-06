export const modifyUserProfile = (profileData) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(profileData),
  }).then(handleResponse);
};
export const changeAvatar = (newAvatarUrl) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({ avatar: newAvatarUrl }),
  }).then(handleResponse);
};
export const createNewCard = (cardInfo) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(cardInfo),
  }).then(handleResponse);
};

export const addLikeToCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  }).then(handleResponse);
};
export const removeCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then(handleResponse);
};

export const removeLikeFromCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then(handleResponse);
};



const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: '93f95842-35cd-4ec6-b01c-4331391790c6',
    'Content-Type': 'application/json',
  },
};


export const setAuthToken = (token) => {
  apiConfig.headers.authorization = `Bearer ${token}`;
};


const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status} - ${response.statusText}`);
};

export const fetchInitialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, { headers: apiConfig.headers }).then(handleResponse);
};

export const fetchUserProfile = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, { headers: apiConfig.headers }).then(handleResponse);
};