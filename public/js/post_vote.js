const API_URL3 = '/api/vote';
const up = document.querySelector('#upvote');
const down = document.querySelector('#downvote');

let vote = '';
const code = location.pathname.match( /((?:[a-zA-Z0-9]|\_|\-){7})/ )[0];

error.style.display = 'none';

up.addEventListener('click', (event) => {

    event.preventDefault();
    vote = up.classList.contains('soft-inv') ? 'UNVOTE' : 'UP';
    Vote();

});

down.addEventListener('click', (event) => {

    event.preventDefault();
    vote = down.classList.contains('soft-inv') ? 'UNVOTE' : 'DOWN';
    Vote();

});

const Vote = () => {

    const data = {
        vote,
        code
    };
    

    const isValidVote = (data) => {
        return data.vote && (data.vote.toString().trim() === 'UP' || 'DOWN' || 'UNVOTE') &&
        data.code && data.code.toString().trim() === location.pathname.match( /((?:[a-zA-Z0-9]|\_|\-){7})/ )[0];
    }

    if(isValidVote(data)) {
        fetch(API_URL3, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'content-type': 'application/json'}
        }).then(response => { 
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType.includes('json')) {
                    return response.json().then(error => Promise.reject(error.message));
                } else {
                    return response.text().then(message => Promise.reject(message));
                }
            }
        }).then(() => {
            location.reload();
        }).catch(errorMessage => {
            error.textContent = errorMessage;
            error.style.display = '';
            setTimeout(() => error.style.display = 'none', 3000);
        });
    } else {
        error.textContent = 'Error! cannot vote';
        error.style.display = '';
        setTimeout(() => error.style.display = 'none', 3000);
    }}


