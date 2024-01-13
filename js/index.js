// Get the necessary elements
let resultsContainer = document.getElementById("cont");
let rightDiv = document.getElementById("right");
let repoList = document.getElementById("repo-list");

// Event listener for the form submission
document.getElementById("github-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let user = e.target.search.value;

    // Fetch user information
    fetch(`https://api.github.com/search/users?q=${user}`)
        .then((response) => response.json())
        .then((data) => render(data));

    // Fetch user repositories
    fetch(`https://api.github.com/users/${user}/repos`)
        .then((repos) => repos.json())
        .then((data) => renderRepos(data));
});

// Function to render user information
function render(data) {
    let ul = document.createElement("ul");

    // Iterate through each user
    data.items.forEach((element) => {
        let user = document.createElement("li");
        let userName = document.createElement("h4");
        let userImage = document.createElement("img");
        let userLink = document.createElement("a");
        let userButton = document.createElement("button");

        userName.textContent = element.login;
        userImage.src = element.avatar_url;
        userLink.textContent = `Link to ${element.login}'s GitHub Repositories`;
        userLink.href = element.html_url;
        userButton.textContent = `Click to view ${element.login}'s GitHub Repositories`;

        // Append user attributes to the user list
        user.appendChild(userName);
        user.appendChild(userImage);
        user.appendChild(userLink);
        user.appendChild(userButton);

        // Append the user list to the main unordered list
        ul.appendChild(user);
    });

    // Append the main unordered list to the right div
    rightDiv.innerHTML = ""; // Clear previous content
    rightDiv.appendChild(ul);
}

// Function to render user repositories
function renderRepos(data) {
    let repoUl = document.createElement("ul");

    // Iterate through each repository
    data.forEach((element) => {
        let eachRepo = document.createElement("li");
        let repoLink = document.createElement("a");

        repoLink.href = element.html_url;
        repoLink.textContent = element.name;

        eachRepo.appendChild(repoLink);
        repoUl.appendChild(eachRepo);
    });

    // Clear previous content in repoList and append the new content
    repoList.innerHTML = "";
    repoList.appendChild(repoUl);
}

