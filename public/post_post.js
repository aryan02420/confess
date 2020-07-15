const form = document.querySelector('#post_form');
const error = document.querySelector('.error');
const API_URL = '/api/posts/new';

error.style.display = 'none';

function isValidData(data) {
    const delay = ( parseInt(Number(Date.now())) - parseInt(Number(data.time.toString().trim())) );
    const mt = data.maintext && data.maintext.toString().trim() !== '' && data.maintext.toString().trim().length <= 683;
    const si = data.sign && data.sign.toString().trim() !== '' && data.sign.toString().trim().length <= 24;
    const ti = data.time && data.time.toString().trim() !== '' && delay >= 0 && delay <= 200;
    const im = data.image && data.image.toString().trim() !== '' && data.image.toString().trim().startsWith("data:image/jpeg;base64,");
    const th = data.thumb && data.thumb.toString().trim() !== '' && data.thumb.toString().trim().startsWith("data:image/jpeg;base64,");
    return mt && si && ti && im && th;
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    change();
    canvasDataURL();
    const formData = new FormData(form);
    const maintext = formData.get('maintext').toString().replace(/^\s+/gm,'').replace(/(^(?:[^\r\n]*[\r\n]){17}[^\r\n]*)[\r\n].*/gm, '$1').replace(/\s+/gm,' ').trim();
    const sign = formData.get('sign').toString().replace(/^\s+|\s{2,}$|\s*\n.*/gm,'').replace(/(.{0,24}).*/gm, '$1').trim();
    const time = formData.get('time').toString().trim();
    const image = formData.get('image').toString().trim();
    const thumb = formData.get('thumbnail').toString().trim();

    const data = {
        maintext,
        sign,
        time,
        image,
        thumb
    };

    if(isValidData(data)) {
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
            init();
            change();
            setTimeout(() => window.location.replace('/posts'), 1000);
        }).catch(errorMessage => {
            form.style.display = '';
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