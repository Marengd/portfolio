// Imports

import { getGithubData } from "./modules/api.js";

// Display All The Data Stored Inside Of User Data
async function displayUserData() {
  const userData = await getGithubData();
  const user = userData.user;

  console.log(user);

  const ul = document.querySelector('#here');

  for (const property in user) {
    const li = document.createElement('li');
    li.textContent = `${property}: ${user[property]}`;
    ul.appendChild(li);
  }
}

window.addEventListener("hashchange", function() {
  if (window.location.hash === "#about") {
    displayUserData();
  }
});
