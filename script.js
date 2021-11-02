const searchKeyword = document.getElementById('search-keyword');
const cardWrapper = document.querySelector('.card-wrapper');

searchKeyword.addEventListener('change', async function (e) {
    e.preventDefault();
    
    const keyword = searchKeyword.value;
    try {
        const user = await getUser(keyword);
        cardWrapper.innerHTML = getCard(user);
    } catch (error) {
        alert(error);
    }
})


function getUser(user) {
    const url = `https://api.github.com/users/${user}`
    return fetch(url)
        .then(response =>  {
            console.log(response.ok);
            if(!response.ok) throw new Error(response.status);
            return response;
        })
        .then(response => response.json())
}

function getCard(user) {
    return `
    <div class="card">
        <div class="card-image">
            <img src="${user.avatar_url}" alt="profile-image">
        </div>
        <div class="card-content">
            <h1>${user.name}</h1>
            <p>${user.bio}</p>

            <div class="public-activity">
                <p>${user.followers} <span>Followers</span></p>
                <p>${user.public_repos} <span>Repos</span></p>
                <p>${user.following} <span>Following</span></p>
            </div>

            <div class="repos-activity">
                <h1>Repos</h1>
                    <div class="repos">
                    <span>Javascript</span>
                    <span>Laravel</span>
                    <span>Node Js</span>
                    <span>laravel Breeze</span>
                    <span>Express Js</span>
                    <span>Redis Caching</span>
                    <span>Laravel Jetstream</span>
                </div>
            </div>
        </div>
    </div>
    `
}