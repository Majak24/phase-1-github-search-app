document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('github-form');
    var searchInput = document.getElementById('search');
    var userList = document.getElementById('user-list');
    var reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var searchTerm = searchInput.value;
      searchUsers(searchTerm);
    });
  
    function searchUsers(username) {
      fetch('https://api.github.com/search/users?q=' + username, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        displayUsers(data.items);
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
      users.forEach(function(user) {
        var li = document.createElement('li');
        li.innerHTML = 
          '<img src="' + user.avatar_url + '" alt="' + user.login + '" width="50">' +
          '<a href="' + user.html_url + '" target="_blank">' + user.login + '</a>' +
          '<button class="repo-btn" data-username="' + user.login + '">View Repos</button>';
        userList.appendChild(li);
      });
  
      var repoButtons = document.querySelectorAll('.repo-btn');
      for (var i = 0; i < repoButtons.length; i++) {
        repoButtons[i].addEventListener('click', function(e) {
          var username = e.target.getAttribute('data-username');
          fetchRepos(username);
        });
      }
    }
  
    function fetchRepos(username) {
      fetch('https://api.github.com/users/' + username + '/repos', {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(repos) {
        displayRepos(repos);
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(function(repo) {
        var li = document.createElement('li');
        li.innerHTML = 
          '<a href="' + repo.html_url + '" target="_blank">' + repo.name + '</a>' +
          '<p>' + (repo.description || 'No description available') + '</p>';
        reposList.appendChild(li);
      });
    }
  });