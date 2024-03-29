const errorElem = document.querySelectorAll('.error')[0];
const name = document.querySelector('#name');
const time = document.querySelector('#time');
const post_img = document.querySelector('#post_img');
const comments = document.querySelector('#comments');
const API_URL1 = '/api/post';
const id = location.pathname.match( /((?:[a-zA-Z0-9]|\_|\-){7})/ )[0];
errorElem.style.display = 'none';
const SHIELD_A = '&nbsp;<svg height="1em" style="vertical-align: -0.125em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z M19,11 c0,6.134-4.785,9.254-7,9.937C9.785,20.254,5,17.134,5,11V6.3l7-3.111L19,6.3V11z"></path><path transform="matrix(0.31516636,0,0,0.31516636,17.215426,11.405515)" d="m -13.547408,1.6653979 -0.485151,-2.54704153 a 22.606933,22.606933 78.018921 0 0 -0.415018,-1.95568327 c -0.574249,-2.0222272 -1.619335,-3.2054446 -3.135258,-3.5496521 a 4.9217752,4.9217752 0.54938066 0 0 -1.987116,-0.019054 c -0.910242,0.1687197 -1.657358,0.5832473 -2.241347,1.2435828 a 6.546246,6.546246 120.77135 0 0 -1.019476,1.7121321 c -0.584352,1.3136991 -0.926383,2.76586703 -1.026094,4.3565039 a 18.821737,18.821737 90.276397 0 0 -0.0096,1.9990607 c 0.08088,1.8513511 0.393941,3.3466802 0.939195,4.4859872 a 5.9003422,5.9003422 54.836976 0 0 1.146351,1.6272858 c 0.639963,0.6400295 1.377475,1.0481066 2.212538,1.2242306 a 3.7118026,3.7118026 178.24567 0 0 1.975597,-0.06051 c 1.084631,-0.3728869 1.980499,-1.3942692 2.687602,-3.0641466 a 26.491924,26.491924 109.66607 0 0 0.672894,-1.8828316 l 0.552672,-1.6398943 a 3.8105589,3.8105589 93.920184 0 0 0.132255,-1.9299696 z m 2.518936,-5.9416059 1.2933832,-3.8278922 a 1.3934243,1.3934243 144.33464 0 1 1.3201051,-0.947382 h 1.203125 A 0.7177635,0.7177635 54.330595 0 1 -6.53183,-8.104055 l -3.3639637,9.9606143 a 3.8650328,3.8650328 94.155152 0 0 -0.1402953,1.9311531 l 0.421898,2.309892 a 7.076726,7.076726 75.583314 0 0 0.4958616,1.9289209 3.8935058,3.8935058 49.665991 0 0 1.2698089,1.4955069 2.9145575,2.9145575 8.5220702 0 0 1.6991618,0.2546106 0.87080467,0.87080467 54.293309 0 1 0.71875,1.0000002 v 1.046875 a 1,1 135 0 1 -1,1 H -6.5790462 A 8.1031274,8.1031274 3.5307553 0 1 -8.5689135,12.70074 C -9.1634801,12.551036 -9.741749,12.264431 -10.30372,11.840923 a 4.445257,4.445257 48.021145 0 1 -1.325188,-1.472863 c -0.117006,-0.227232 -0.221091,-0.4792288 -0.312256,-0.7559888 a 0.36778601,0.36778601 5.433565 0 0 -0.673528,-0.064065 c -0.427595,0.804903 -0.961716,1.556544 -1.602364,2.254921 a 3.9005401,3.9005401 143.16677 0 1 -1.577783,1.18176 c -0.464571,0.152697 -1.058228,0.251934 -1.780968,0.297712 a 14.283119,14.283119 0.22604762 0 1 -1.998392,-0.0079 c -2.166005,-0.166619 -3.887456,-0.891684 -5.164354,-2.175197 a 8.0363595,8.0363595 52.791064 0 1 -1.206276,-1.5886941 c -1.028592,-1.7397072 -1.599009,-3.941506 -1.711251,-6.6053966 a 24.237721,24.237721 89.974116 0 1 -9.03e-4,-1.9994149 c 0.114443,-2.8307937 0.727028,-5.049696 1.837755,-6.6567069 a 8.7689171,8.7689171 131.81073 0 1 1.33038,-1.487389 c 1.433521,-1.3035591 3.072002,-2.0533657 4.915444,-2.2494198 a 10.041779,10.041779 179.79804 0 1 1.996888,-0.00704 c 3.140654,0.2936684 5.142791,2.0240367 6.006411,5.1911047 a 0.28349502,0.28349502 2.8991877 0 0 0.541633,0.02743 z"></path></svg>'
const SHIELD_M = '&nbsp;<svg height="1em" style="vertical-align: -0.125em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z M19,11 c0,6.134-4.785,9.254-7,9.937C9.785,20.254,5,17.134,5,11V6.3l7-3.111L19,6.3V11z"></path><path transform="matrix(0.31516636,0,0,0.31516636,24.974627,15.835407)" d="M -51.705032,1.9281864 V -26.267126 a 1,1 135 0 1 1,-1 h 1.59375 a 1,1 45 0 1 1,1 v 11.59375 a 20.766948,20.766948 88.683017 0 0 0.04595,1.998559 c 0.09394,0.972453 0.331919,1.796688 0.713943,2.472705 a 4.132637,4.132637 46.889561 0 0 1.353228,1.4455625 c 0.611446,0.3941454 1.351849,0.6437033 2.221208,0.7486736 a 8.6029783,8.6029783 0.10113634 0 0 1.995742,0.00352 c 1.032824,-0.1165219 1.898387,-0.4229072 2.596689,-0.919156 a 4.579014,4.579014 131.75065 0 0 1.321143,-1.4801829 c 0.469627,-0.827481 0.752329,-1.864317 0.848107,-3.110509 a 26.071827,26.071827 91.054819 0 0 0.03681,-1.999019 v -10.753906 a 1,1 135 0 1 1,-1 h 1.59375 a 1,1 45 0 1 1,1 v 14.835937 a 11.006098,11.006098 87.752012 0 0 0.07834,1.9955731 1.4361187,1.4361187 49.97824 0 0 1.066291,1.2697759 1.6494238,1.6494238 174.07329 0 0 0.749904,-0.077848 c 0.859375,-0.3515625 0.859375,-0.3515625 0.859375,-0.3515625 v 1.890625 a 1.5284086,1.5284086 121.9281 0 1 -0.897335,1.4400539 5.5217711,5.5217711 165.33871 0 1 -1.604952,0.4198928 3.9613929,3.9613929 4.2012008 0 1 -1.397541,-0.1026584 c -0.11081,-0.02987 -0.217669,-0.065241 -0.320579,-0.1061145 a 2.8253962,2.8253962 42.981513 0 1 -1.431168,-1.3337224 c -0.09069,-0.1718113 -0.172178,-0.3581468 -0.244451,-0.5590066 a 0.49348292,0.49348292 10.501184 0 0 -0.842528,-0.1561712 c -0.302421,0.3641246 -0.630161,0.6853167 -0.983221,0.9635763 a 5.8395125,5.8395125 151.52029 0 1 -1.749147,0.9489075 c -0.43872,0.1478355 -0.907448,0.2506578 -1.406186,0.308467 a 8.9756183,8.9756183 179.88547 0 1 -1.996074,0.00399 c -0.530994,-0.057278 -1.025373,-0.1621567 -1.483136,-0.3146362 a 5.3668695,5.3668695 28.786963 0 1 -1.742404,-0.9573786 c -0.308522,-0.2567832 -0.589263,-0.5509261 -0.842225,-0.8824286 a 0.29689678,0.29689678 163.55401 0 0 -0.539521,0.1592604 l 0,8.8007809 a 1,1 135 0 1 -1,1 l -1.59375,0 a 1,1 45 0 1 -1,-1 z"></path></svg>'
const MEDAL = '&nbsp;<svg height="1em" style="vertical-align: -0.125em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 4 2 L 4.0039062 7 L 12.003906 11 L 20.003906 7 L 20 2 L 4 2 z M 12.003906 11 L 10.150391 14.621094 L 6.0058594 15.201172 L 9.0039062 18.019531 L 8.296875 22 L 12.003906 20.121094 L 15.708984 22 L 15.001953 18.019531 L 18 15.201172 L 13.855469 14.621094 L 12.003906 11 z M 10 4 L 14 4 L 14 7.765625 L 12.003906 8.7636719 L 10 7.7617188 L 10 4 z"></path></svg>'
const OP = '&nbsp;<svg height="1em" style="vertical-align: -0.125em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 20 3 L 19 4.2851562 L 6 9 L 6 15 L 8.4511719 15.888672 L 8.1679688 16.689453 C 7.9549687 17.290453 8.2690937 17.949109 8.8710938 18.162109 L 11.048828 18.933594 C 11.649828 19.146594 12.310437 18.830516 12.523438 18.228516 L 12.792969 17.464844 L 19 19.714844 L 20 21 L 22 21 L 22 3 L 20 3 z M 20 6.0507812 L 20 17.949219 L 19.681641 17.833984 L 8 13.597656 L 8 10.402344 L 19.681641 6.1660156 L 20 6.0507812 z M 2 9 L 2 15 L 4 15 L 4 9 L 2 9 z"></path></svg>'

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
    const {post, comments:comms, votes} = data;
    name.innerText = post.author.name;
    if (post.author.rank.includes('admin')) name.innerHTML += SHIELD_A;
    else if (post.author.rank.includes('moderator')) name.innerHTML += SHIELD_M;
    if (post.author.rank.includes('patreon')) name.innerHTML += MEDAL;
    if (post.author.rank.includes('deleted')) {
        name.classList.add('deleted');
    }
    name.style.color = post.author.color || ((post.author.rank.includes('admin') ? '#cc3333' : (post.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
    name.style.fill = post.author.color || ((post.author.rank.includes('admin') ? '#cc3333' : (post.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
    time.innerText = post.time;
    document.querySelector('#votecount').innerText = votes.total;
    if (votes.voted === 'UP') {
        document.querySelector('#upvote').classList.add('soft-inv')
    } else if (votes.voted === 'DOWN') {
        document.querySelector('#downvote').classList.add('soft-inv')
    }
    post_img.src = `/img/${post.code}`;
    comms.reverse().forEach((comment) => {

        const nam = document.createElement('span');
        nam.style.color = comment.author.color || ((comment.author.rank.includes('admin') ? '#cc3333' : (comment.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
        nam.style.fill = comment.author.color || ((comment.author.rank.includes('admin') ? '#cc3333' : (comment.author.rank.includes('moderator') ? '#00aa00' : '#1155dd')));
        nam.innerText = comment.author.name;
        if (comment.author.rank.includes('admin')) nam.innerHTML += SHIELD_A;
        else if (comment.author.rank.includes('moderator')) nam.innerHTML += SHIELD_M;
        if (comment.author.rank.includes('patreon')) nam.innerHTML += MEDAL;
        if (comment.author.rank.includes('op')) {
            nam.innerHTML += OP;
        }
        if (comment.author.rank.includes('deleted')) {
            nam.classList.add('deleted');
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
