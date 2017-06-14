$(document).ready(function () {


});

function searchRepositories() {

  $.get(`https://api.github.com/search/repositories?q=${window.searchTerms.value}`, data => {
      console.log(data)
      if (data.items.length < 1) {
        document.getElementById('results').insertAdjacentHTML('afterbegin', `<h3 style="color:red">No Results!</h3>`)
      }
      const html = `<ul>` + data.items.map(r => {
        return (`
          <li>
            <h2><a href="${r.html_url}">${r.name}</a></h2>
              <p>Description: ${r.description}</p>
              <p><a href="${r.owner.html_url}">${r.owner.login}</p><br>
              <img src="${r.owner.avatar_url}" height="32" width="32">
              <a href="#" onclick="showCommits('${r.commits_url.replace("{/sha}", "")}')">Show Commits</a>
          </li><hr>`
        )
      }).join('') + "</ul>"
      document.getElementById('results').insertAdjacentHTML('afterbegin', html)
    
    }
  ).fail(displayError)
}

function showCommits(url) {
    
  $.get(url, data => {
    console.log(data)
      const html = `<ul>` + data.map(c => {
        return (`
          <li>
            <h4>${c.sha}</h4>
              <p>Author: ${c.commit.author.name}</p>
              <p>Login: ${c.committer.login}</p>
              <img src="${c.committer.avatar_url}" height="32" width="32">
           </li>`
         )
      }).join('') + "</ul>"
      document.getElementById('details').insertAdjacentHTML('afterbegin', html)
   
   }
 ).fail(displayError)
}

function displayError(error) {
  document.getElementById('errors').insertAdjacentHTML('afterbegin', `<h3 style="color:red;">${error.status}</h3>`)
  document.getElementById('errors').insertAdjacentHTML('afterbegin', `<p style="color:red">${error.responseText}</p>`)
}



