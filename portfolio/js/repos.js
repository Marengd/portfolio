import { $ } from "./modules/helper.js";
import { getGithubData } from "./modules/api.js";

async function CreateCubes() {
  // Fetch user and repositories data from GitHub API
  const { user, repos } = await getGithubData();

  // Get DOM elements
  const cubeGrid = $('#cube-grid');
  const repositoryTitle = $('#repository-title');
  const repositoryDescription = $('#repository-description');
  const repositoryLanguages = $('#repository-languages');
  const repositoryDetails = $('#repository-details'); // Get the reference to the #repository-details element

  // Show repository information when hovering over a cube
  function showRepositoryInfo(title, description, languages) {
    // Update the title and description elements with repository data
    repositoryTitle.textContent = title;
    repositoryDescription.textContent = description;

    // Clear existing languages
    repositoryLanguages.innerHTML = '';

    // Add languages to the repository-languages unordered list
    languages.forEach((language) => {
      const li = document.createElement('li');
      li.textContent = language;
      repositoryLanguages.appendChild(li);
    });

    // Add the .active class when hovering over a cube
    repositoryDetails.classList.add('active');
  }

  // Clear repository information and remove the .active class when not hovering over a cube
  function clearRepositoryInfo() {
    repositoryTitle.textContent = '';
    repositoryDescription.textContent = '';
    repositoryLanguages.innerHTML = '';

    // Remove the .active class when not hovering over a cube
    repositoryDetails.classList.remove('active');
  }

  // Iterate through the repositories and create cubes
  repos.forEach((repo) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = repo.html_url;
    a.target = '_blank';

    const cube = document.createElement('div');
    cube.classList.add('cube');

    // Add event listeners to show and clear repository information on mouseover and mouseout events
    cube.addEventListener('mouseover', () => showRepositoryInfo(repo.name, repo.description, repo.languages));
    cube.addEventListener('mouseout', clearRepositoryInfo);

    // Create cube faces
    const faceClasses = ['top', 'bottom', 'left', 'right', 'front', 'back'];
    faceClasses.forEach((faceClass) => {
      const face = document.createElement('div');
      face.classList.add('face', faceClass);
      cube.appendChild(face);
    });

    // Add cube to the anchor element and list item, then append it to the cube grid
    a.appendChild(cube);
    li.appendChild(a);
    cubeGrid.appendChild(li);
  });
}

CreateCubes();
