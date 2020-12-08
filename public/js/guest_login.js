const POST_URL = '/auth/guest'
let formData = new URLSearchParams();
formData.append('username', 'guest');
formData.append('password', 'guest');
document.querySelector('#guest-signin')
.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(POST_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => {
        return response.json()
    }).then( data => {
        location.href = data.redirectTo || ''
    })
    .catch(error => console.log(error))
});