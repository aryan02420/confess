const form = document.querySelector('#comment-form');
const error = document.querySelectorAll('.error')[1];
const API_URL2 = '/api/comment';

error.style.display = 'none';

form.addEventListener('submit', (event) => {

    event.preventDefault();
    const formData = new FormData(form);
    const text = formData.get('comment').toString().trim();
    const code = location.pathname.match( /([0-9a-zA-Z]{7})/ )[0]

    const comment = {
        text,
        code
    };    

    const isValidComment = (comment) => {
        return comment && comment.toString().trim() !== '' && comment.toString().trim().length <= 200;
    }

    if(isValidComment(comment)) {
        fetch(API_URL2, {
            method: 'POST',
            body: JSON.stringify(comment),
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
            form.reset();
            location.reload();
        }).catch(errorMessage => {
            error.textContent = errorMessage;
            error.style.display = '';
            setTimeout(() => error.style.display = 'none', 3000);
        });
    } else {
        error.textContent = 'Invalid Inputs';
        error.style.display = '';
        setTimeout(() => error.style.display = 'none', 3000);
    }

});
