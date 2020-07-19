const error = document.querySelector('#error');
const postsElem = document.querySelector('#posts');
const modalElem = document.querySelector('#modal');
const loadElem = document.querySelector('#loading');
const API_URL = '/api/post';

error.style.display = 'none';

let skip = 0;
let loading = false;
let finished = false;


function openModal(id) {
    fetch(API_URL+'?post_id='+id.toString())
    .then((response) => {
        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType.includes('json')) {
                return response.json().then(error => Promise.reject(error.message));
            } else {
                return response.text().then(message => Promise.reject(message));
            }
        } else {
            return response.json();
        }
    }).then((data) => {
        modalElem.innerHTML = '';
        const img = document.createElement('img');
        img.setAttribute('src',data.image);
        const name = document.createElement('p');
        name.textContent = data.name.toString();
        const time = document.createElement('p');
        time.textContent = data.time.toString();
        modalElem.appendChild(img);
        modalElem.appendChild(name);
        modalElem.appendChild(time);
    }).catch(errorMessage => {
        error.textContent = errorMessage;
        error.style.display = '';
        setTimeout(() => error.style.display = 'none', 3000);
    });
}