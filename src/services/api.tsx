const URL = 'https://dog.ceo/api/breed/hound/images';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject(err);
  });
};

export const  getData = () => {
  return fetch(URL).then(checkResponse);
};

export const  getId = () => {
  return fetch('http://80.78.246.144:8888/get_supplier_cards?supplier_id=31460').then(checkResponse);
};

export const  getCards = (data: number[]) => {
  return fetch('http://80.78.246.144:8888/cards_detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nm_ids": data,   
  })
}).then(checkResponse)
};

export const  getPhotos = (data: number[]) => {
  return fetch('http://80.78.246.144:8888/cards_photo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nm_ids": data,   
  })
}).then(checkResponse)
};



