const ROOT = "https://api.github.com";

const searchBox = document.getElementById("search");
const resHeader = document.getElementById("res_header");
const resBody1 = document.getElementById("res_body1");
const resBody2 = document.getElementById("res_body2");
const container = document.querySelector(".container");
console.log(container);
searchBox.onkeyup = (e) => {
    if (!(searchBox.value.length > 4 && e.key === "Enter"))
        return;
    searchProfile(searchBox.value);
    // displayUser(searchBox.value);
}

function createProfile(username, name, bio, avatar_url) {
    // Create the container
    let profileContainer = document.createElement("div");
    profileContainer.className = "profile";

    // Create the profile-pic
    let profilePicture = document.createElement("img");
    profilePicture.src = avatar_url;

    profileContainer.appendChild(profilePicture);

    // Create inner container
    let innerContainer = document.createElement("div");
    innerContainer.className = "profile-info";

    // Create profile header
    let profileName = document.createElement("h2");
    profileName.className = "profile-name";
    profileName.textContent = `${name} (${username})`;

    // Create profile bio
    let profileBio = document.createElement("p");
    profileBio.className = "profile-bio";
    profileBio.textContent = bio;

    innerContainer.appendChild(profileName);
    innerContainer.appendChild(profileBio);

    profileContainer.append(innerContainer);

    container.appendChild(profileContainer);

    searchBox.value = "";
}

async function searchProfile(query) {
    let promise = await fetch(`${ROOT}/search/users?q=${query}`);
    let res = await promise.json();
    console.log(res);
}

async function displayUser(username) {
    let promise = await fetch(`${ROOT}/users/${username}`);
    if (promise.status !== 200)
        return;
    let data = await promise.json();
    console.log(data);
    createProfile(data.login, data.name, data.bio, data.avatar_url);
}