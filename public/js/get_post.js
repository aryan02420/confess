const errorElem = document.querySelectorAll('.error')[0];
const name = document.querySelector('#name');
const time = document.querySelector('#time');
const post_img = document.querySelector('#post_img');
const comments = document.querySelector('#comments');
const API_URL1 = '/api/post';
const id = location.pathname.match( /([0-9a-f]{24})/ )[0];

errorElem.style.display = 'none';

fetch(API_URL1+'?post_id='+id.toString())
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
    name.innerText = data.author.name;
    name.style.color =  (data.author.color || (data.author.rank.includes('admin') ? '#cc3333' : (data.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
    time.innerText = data.time;
    post_img.src = data.image;
    data.comments.reverse().forEach((comment) => {

        const nam = document.createElement('span');
        nam.style.color =  (comment.author.color || (comment.author.rank.includes('admin') ? '#cc3333' : (comment.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
        nam.innerText = comment.author.name;
        if (comment.author.rank.includes('op')) {
            nam.classList.add('op');
        }

        const cont = document.createElement('span');
        cont.innerText = ": " + comment.body;

        const body = document.createElement('div');
        body.appendChild(nam);
        body.appendChild(cont);

        const tim = document.createElement('div');
        tim.innerText = comment.date;

        const userCom = document.createElement('div');
        userCom.classList.add('user-comment');
        userCom.appendChild(body);
        userCom.appendChild(tim);

        comments.appendChild(userCom);
        
    });
}).catch(errorMessage => {
    console.error(errorMessage);
    errorElem.textContent = errorMessage;
    errorElem.style.display = '';
    setTimeout(() => errorElem.style.display = 'none', 3000);
});
