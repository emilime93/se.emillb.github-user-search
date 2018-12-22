const ROOT = "https://api.github.com";

/* IMPORTANT GRABBABLE ITEMS */
const searchBox = document.getElementById("search");
const resHeader = document.getElementById("res_header");
const resBody1 = document.getElementById("res_body1");
const resBody2 = document.getElementById("res_body2");
const container = document.querySelector(".container");
const searchResArea = document.getElementById("res-area");

searchBox.onkeyup = (e) => {
    if (!(searchBox.value.length > 2 && e.key === "Enter"))
        return;
    searchProfile(searchBox.value);
}

function purgeSearchAndDisplay(event) {
    let wantedSource = event.path.find((ele) => {
        return ele.className === "search-res";
    });
    let username = wantedSource.querySelector("p").textContent;
    displayUser(username);
    while (searchResArea.firstChild) {
        searchResArea.removeChild(searchResArea.firstChild);
    }
}

function displayProfile(username, name, bio, avatar_url) {
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

let isShowing = false;
function displayResArea(shouldShow) {
    isShowing = shouldShow;
    searchResArea.style.display = shouldShow;
}

function displaySearchRes(username, avatar_url) {
    let wrappingAnchor = document.createElement("a");
    wrappingAnchor.href = "#";

    let resContainer = document.createElement("div");
    resContainer.className = "search-res";

    let thumbnail = document.createElement("img");
    thumbnail.src = avatar_url;

    let displayName = document.createElement("p");
    displayName.textContent = `${username}`;

    resContainer.appendChild(thumbnail);
    resContainer.appendChild(displayName);

    wrappingAnchor.appendChild(resContainer);
    searchResArea.appendChild(wrappingAnchor);

    wrappingAnchor.onclick = purgeSearchAndDisplay;
}

const MAX_SEARCH_RES = 10;
async function searchProfile(query) {
    let promise = await fetch(`${ROOT}/search/users?q=${query}`);
    if (promise.status !== 200) {
        console.log("search fetch failed...");
        return;
    }
    let data = await promise.json();
    for (let i = 0; i < Math.min(data.total_count, MAX_SEARCH_RES); i++) {
        displaySearchRes(data.items[i].login, data.items[i].avatar_url);
    }
    console.log(data);
}

async function displayUser(username) {
    let promise = await fetch(`${ROOT}/users/${username}`);
    if (promise.status !== 200) {
        console.log("user fetch failed...");
        return;
    }
    let data = await promise.json();
    console.log(data);
    displayProfile(data.login, data.name, data.bio, data.avatar_url);
}