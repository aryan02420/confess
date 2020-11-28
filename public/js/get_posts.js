const error = document.querySelector('#error');
const postsElem = document.querySelector('#posts');
const modalElem = document.querySelector('#modal');
const loadElem = document.querySelector('#loading');
const API_URL = '/api/posts';

error.style.display = 'none';

let skip = 0;
let loading = false;
let finished = false;

getPosts(true,12);

document.addEventListener('scroll', () => {
    const rect = loadElem.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading && !finished) {
        getPosts(false, 6);
    }
});

function getPosts(reset=true,limit=6) {
    loading = true;
    if (reset) {
        postsElem.innerHTML = '';
        skip = 0;
        finished = false;
    }
    fetch(`${API_URL}?skip=${skip}&limit=${limit}`)
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
        data.posts.forEach(post => {
            let q = document.querySelector(`a[href="${post._id}"]`);
            if (q) {return}
            const a = document.createElement('a');
            a.setAttribute('href',`/posts/${post.code}`);
            const img = document.createElement('img');
            img.setAttribute('src',`/img/thumb/${post.code}`);
            a.appendChild(img);
            postsElem.appendChild(a);
        })
        if (!data.info.has_more) {
            finished = true;
        } 
    }).then(() => {
        skip += limit;
    }).catch(errorMessage => {
        error.textContent = errorMessage;
        error.style.display = '';
        setTimeout(() => error.style.display = 'none', 3000);
    }).finally(() => {
        loading = false;
    });
}



postsElem.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() == 'img' && event.target.hasAttribute('data-id')) {
        location.href=`/posts/${event.target.getAttribute('data-id')}`;
    }
});