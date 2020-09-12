const errorElem = document.querySelectorAll('.error')[0];
const name = document.querySelector('#name');
const time = document.querySelector('#time');
const post_img = document.querySelector('#post_img');
const comments = document.querySelector('#comments');
const API_URL1 = '/api/post';
const id = location.pathname.match( /([0-9a-zA-Z]{7})/ )[0];
errorElem.style.display = 'none';
const SHIELD = '&nbsp;<svg height="1em" style="vertical-align: -0.125em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z M19,11 c0,6.134-4.785,9.254-7,9.937C9.785,20.254,5,17.134,5,11V6.3l7-3.111L19,6.3V11z"></path></svg>'
const MEDAL = '&nbsp;<svg height="1em" style="vertical-align: -0.125em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 4 2 L 4.0039062 7 L 12.003906 11 L 20.003906 7 L 20 2 L 4 2 z M 12.003906 11 L 10.150391 14.621094 L 6.0058594 15.201172 L 9.0039062 18.019531 L 8.296875 22 L 12.003906 20.121094 L 15.708984 22 L 15.001953 18.019531 L 18 15.201172 L 13.855469 14.621094 L 12.003906 11 z M 10 4 L 14 4 L 14 7.765625 L 12.003906 8.7636719 L 10 7.7617188 L 10 4 z"></path></svg>'
const TICK = '&nbsp;<svg height="1em" style="vertical-align: -0.125em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 9.0019531 2.0097656 C 7.9234063 2.0645156 6.8980781 2.6869844 6.3925781 3.6777344 L 5.4746094 5.4746094 L 3.6777344 6.3925781 C 2.3237344 7.0835781 1.6823906 8.6350781 2.1503906 10.080078 L 2.7714844 12 L 2.1503906 13.921875 C 1.6813906 15.366875 2.3217812 16.917375 3.6757812 17.609375 L 5.4726562 18.525391 L 6.3925781 20.322266 C 7.0675781 21.644266 8.670125 22.309562 10.078125 21.851562 L 12 21.228516 L 13.919922 21.849609 C 14.226922 21.949609 14.545188 22 14.867188 22 C 16.029188 22 17.078422 21.357266 17.607422 20.322266 L 18.525391 18.525391 L 20.324219 17.607422 C 21.677219 16.915422 22.318609 15.363922 21.849609 13.919922 L 21.228516 12 L 21.849609 10.080078 C 22.318609 8.6340781 21.678219 7.0835781 20.324219 6.3925781 L 18.527344 5.4746094 L 17.607422 3.6777344 C 16.934422 2.3567344 15.328875 1.6933906 13.921875 2.1503906 L 12 2.7714844 L 10.080078 2.1523438 C 9.7258281 2.0370937 9.3614688 1.9915156 9.0019531 2.0097656 z M 9.0820312 4.0019531 C 9.2083281 3.9958125 9.3383437 4.0109844 9.4648438 4.0527344 L 11.691406 4.7734375 C 11.892406 4.8384375 12.109547 4.8384375 12.310547 4.7734375 L 14.539062 4.0507812 C 15.033063 3.8887813 15.591172 4.1239375 15.826172 4.5859375 L 16.892578 6.671875 C 16.988578 6.858875 17.139172 7.0114219 17.326172 7.1074219 L 19.414062 8.1738281 C 19.887063 8.4158281 20.111266 8.9588437 19.947266 9.4648438 L 19.226562 11.691406 C 19.161562 11.891406 19.161562 12.106641 19.226562 12.306641 L 19.326172 12.615234 L 19.947266 14.535156 C 20.111266 15.041156 19.888063 15.584172 19.414062 15.826172 L 17.326172 16.892578 C 17.139172 16.988578 16.988578 17.139172 16.892578 17.326172 L 15.826172 19.412109 C 15.591172 19.873109 15.041109 20.112266 14.537109 19.947266 L 12.308594 19.226562 C 12.208594 19.193562 12.104 19.177734 12 19.177734 C 11.896 19.177734 11.791406 19.192563 11.691406 19.226562 L 9.4628906 19.949219 C 8.9678906 20.111219 8.4078281 19.875062 8.1738281 19.414062 L 7.109375 17.328125 C 7.013375 17.141125 6.8608281 16.988578 6.6738281 16.892578 L 4.5878906 15.826172 C 4.1148906 15.584172 3.8887344 15.041156 4.0527344 14.535156 L 4.7734375 12.308594 C 4.8384375 12.108594 4.8384375 11.893359 4.7734375 11.693359 L 4.0527344 9.4648438 C 3.8887344 8.9588438 4.1138906 8.4158281 4.5878906 8.1738281 L 6.6738281 7.1074219 C 6.8598281 7.0114219 7.0124219 6.8608281 7.1074219 6.6738281 L 8.1738281 4.5878906 C 8.3500781 4.2413906 8.7031406 4.020375 9.0820312 4.0019531 z M 16.292969 8.2929688 L 11 13.585938 L 8.7070312 11.292969 L 7.2929688 12.707031 L 11 16.414062 L 17.707031 9.7070312 L 16.292969 8.2929688 z"></path></svg>'

fetch(API_URL1+'?c='+id.toString())
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
    if (data.author.rank.includes('admin') || data.author.rank.includes('moderator')) name.innerHTML += SHIELD;
    if (data.author.rank.includes('patreon')) name.innerHTML += MEDAL;
    name.style.color =  (data.author.color || (data.author.rank.includes('admin') ? '#cc3333' : (data.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
    name.style.fill =  (data.author.color || (data.author.rank.includes('admin') ? '#cc3333' : (data.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
    time.innerText = data.time;
    document.querySelector('#votecount').innerText = data.votes;
    if (data.voted === 'UP') {
        document.querySelector('#upvote').classList.add('soft-inv')
    } else if (data.voted === 'DOWN') {
        document.querySelector('#downvote').classList.add('soft-inv')
    }
    post_img.src = data.image;
    data.comments.reverse().forEach((comment) => {

        const nam = document.createElement('span');
        nam.style.color =  (comment.author.color || (comment.author.rank.includes('admin') ? '#cc3333' : (comment.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
        nam.style.fill =  (comment.author.color || (comment.author.rank.includes('admin') ? '#cc3333' : (comment.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
        nam.innerText = comment.author.name;
        if (comment.author.rank.includes('admin') || comment.author.rank.includes('moderator')) nam.innerHTML += SHIELD;
        if (comment.author.rank.includes('patreon')) nam.innerHTML += MEDAL;
        if (comment.author.rank.includes('op')) {
            nam.innerHTML += TICK;
        }
        if (comment.author.rank.includes('you')) {
            nam.classList.add('you');
        }

        const cont = document.createElement('span');
        cont.innerText = " : " + comment.body;

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
