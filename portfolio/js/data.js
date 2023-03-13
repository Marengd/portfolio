// Imports

import { getGithubData } from "./modules/api.js";




// Logic

displayUserData();

// Display All The Data Stored Inside Of User Data
async function displayUserData() {
  const userData = await getGithubData();
  const user = userData.user;

  console.log(user);

  const ul = document.createElement('ul');

  for (const property in user) {
    const li = document.createElement('li');
    li.textContent = `${property}: ${user[property]}`;
    ul.appendChild(li);
  }

  document.body.appendChild(ul);
}
 

displayRepoData();

 // Display Data Stored Inside Of Repo Data
 async function displayRepoData() {
  const repos = (await getGithubData()).repos;

  const ol = document.createElement('ol');

  for (const repo of repos) {
    const id = repo.id;
    const name = repo.name;
    const fullname = repo.full_name;

    const li = document.createElement('li');
    li.textContent = `${id}, ${name}, ${fullname}`;
    ol.appendChild(li);
  }

  document.body.appendChild(ol);
}



 