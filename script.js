const input_id = document.getElementById("input-id");
const Search_btn = document.getElementById("Search-btn");
const profile_card = document.getElementById("datahub");

let profile_data = "";

Search_btn.addEventListener('click', function(event){
    showProfile();
})

const showProfile = async () => {
    profile_data = input_id.value;
    console.log(profile_data);

    const prof = await fetch(`https://api.github.com/users/${profile_data}`);
    const prof_data = await prof.json();
    console.log(prof_data);

    if(prof_data.message === 'Not Found'){
        profile_card.innerText = "User Not Found"
    }else{
        const avatar = document.createElement('img');
        avatar.src = prof_data.avatar_url;


        profile_card.innerHTML = `
        <div id="datahub">
            <div class="data">
            <img src = "${avatar.src}">
                <div class="name-id">
                    <h1>${(prof_data.name) ? prof_data.name : '-'}</h1>
                    <a href="${prof_data.html_url}" class="username" target="_blank">@${prof_data.login}</a>
                </div>
                <p>Joined ${new Date(prof_data.created_at).toLocaleDateString('en-US')}</p>
            </div>
            <div>
                ${(prof_data.bio) ? prof_data.bio : '-'}
            </div>
            <div class="white-band">
                <div>
                    Repos <br>
                    <p>${prof_data.public_repos}</p>
                </div>
                <div>
                    Followers <br>
                    <p>${prof_data.followers}</p>
                </div>
                <div>
                    Following <br>
                    <p>${prof_data.following}</p>
                </div>
            </div>

            <div class="ul-list">
                <ul>
                    <li><i class="fa-solid fa-location-crosshairs"></i> ${(prof_data.location) ? prof_data.location : '-'}</li>
                    <li><i class="fa-solid fa-link"></i> ${(prof_data.blog) ? prof_data.blog : '-'}</li>
                </ul>
                <ul>
                    <li><i class="fa-brands fa-twitter"></i> ${(prof_data.twitter_username) ? prof_data.twitter_username : '-'}</li>
                    <li><i class="fa-solid fa-building"></i> ${(prof_data.company) ? prof_data.company : '-'}</li>
                </ul>
            </div>
        </div>
        `
        // profile_card.innerText = `${prof_data.public_repos}`;
        // profile_card.appendChild(avatar);
    }

}

const themeChange = document.getElementById('theme-button');
let isOn = false;

themeChange.addEventListener('click', function () {
    isOn = !isOn;

    if (isOn) {
        document.body.style.backgroundColor = 'grey';
    } else {
        document.body.style.backgroundColor = 'lightgreen';
    }
});