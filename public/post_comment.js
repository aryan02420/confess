const form = document.querySelector('#comment-form');
const error = document.querySelector('.error');
const API_URL = '/api/comment';

error.style.display = 'none';

form.addEventListener('submit', (event) => {

    event.preventDefault();
    const formData = new FormData(form);
    const comment = formData.get('comment').toString().trim();

    const data = {
        comment
    };

    if(true) {
        fetch(API_URL, {
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
