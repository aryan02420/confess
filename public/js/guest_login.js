const POST_URL = '/auth/guest'
let formData = new URLSearchParams();
formData.append('username', 'guest');
formData.append('password', 'guest');
document.querySelector('#guest-signin')
.addEventListener('click', () => {
    event.preventDefault();
    fetch(POST_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => {})
    .then(data => window.location.replace('/'))
    .catch(error => console.log(error))
});