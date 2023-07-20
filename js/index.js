window.onload = function() {
  const form = document.getElementById('github-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the form from refreshing the page
    let searchText = e.target.elements[0].value;
    searchUsers(searchText);
  });

  function searchUsers(searchText) {
    fetch(`https://api.github.com/search/users?q=${searchText}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(response => response.json())
      .then(data => displayUsers(data.items));
  }

  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // clear the list
    users.forEach(user => {
      let li = document.createElement('li');
      li.innerHTML = `
        <img src="${user.avatar_url}" width="50" height="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button onclick="fetchRepos('${user.login}')">Show Repos</button>
      `;
      userList.appendChild(li);
    });
  }

  window.fetchRepos = function(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(response => response.json())
      .then(repos => displayRepos(repos));
  }

  function displayRepos(repos) {
    const repoList = document.getElementById('repos-list');
    repoList.innerHTML = ''; // clear the list
    repos.forEach(repo => {
      let li = document.createElement('li');
      li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      repoList.appendChild(li);
    });
  }
}
