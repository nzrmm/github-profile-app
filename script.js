const searchUsername = document.getElementById('search-username');
const cardWrapper = document.querySelector('.card-wrapper');

searchUsername.addEventListener('change', async function (e) {
    e.preventDefault();
    
    let username = searchUsername.value;
    try {
        searchUsername.value = "";

        const user = await getUser(username);
        const repos = await getRepos(username);
        
        cardWrapper.style.color = '#121212';
        cardWrapper.innerHTML = getCard(user, repos);
    } catch (error) {
        cardWrapper.style.color = '#666';
        cardWrapper.innerHTML = error;
    }
})


function getUser(username) {
    const url = `https://api.github.com/users/${username}`
    return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error(`${response.status}, not found`);
            }
            return response.json();
        })
        .then(response => {
            if(response.name === null) {
                throw new Error('Username not available !');
            }

            return response;
        })
}

function getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`
    return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error(`${response.status}, not found`);
            }
            return response.json();
        })
        .then(response => response);
}

function getCard(user, repos) {
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
                <p>${user.following} <span>Following</span></p>
                <p>${user.public_repos} <span>Repos</span></p>
            </div>

            <div class="repos-activity">
                <h1>Repos</h1>

                <div class="repos">
                    ${addReposToCard(repos)}
                </div>
            </div>
        </div>
    </div>
    `
}

function addReposToCard(repos) {
    let reposWrapper = ``;
    repos.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 10)
        .forEach(repo => {
            reposWrapper += `
                <a href="${repo.html_url}">${repo.name}</a>
            `
    })

    return reposWrapper
}