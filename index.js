// create a request
function getRepositories() {
  // initiate our XHR request
  //1. we create a new instance of a XMLHttpRequest
  const req = new XMLHttpRequest()
  //4. we set an listener that listen for the load event of the request = request is complete
  // the callback function showRepositories will be fire when the event fires and this will then be req
  req.addEventListener("load", showRepositories);
  //2. we call open with the http verb and the uri for the request
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  //3. send make the request happen
  req.send()
}




// The second part of XHR is handling the response once we've made the request. 
// We do this by defining an event listener on the request to listen for the load event, 
// which will tell us that the request is complete. We'll give this listener a callback function, 
// which is simply a function that will get called when the event fires.

function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  //parse the response in JSON to let the interpreter know the format
  var repos = JSON.parse(this.responseText)
  //show the full response of the request made
  console.log(repos)
  // iterate over each repository of the response and design them
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  // append the repositories to the repositories div
  document.getElementById("repositories").innerHTML = repoList
}
 
 // Here we grab that data-repo value through the dataset property, then set up an XHR request, with an event listener and callback function
function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}