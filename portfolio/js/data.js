// Imports

import { $ } from "./modules/helper.js";
import { getGithubData } from "./modules/api.js";




// Logic

async function displayUserData() {
  const userData = await getGithubData();
  const user = userData.user;

  console.log(user);

  // Select the element with the ID "name"
  const nameElement = $('#name');

  // Update the content of the selected element with your name
  nameElement.textContent = user.name;
}

displayUserData();





 