import { $ } from "./modules/helper.js";
import { getGithubData } from "./modules/api.js";

async function CreateCubes() {
  const { user, repos } = await getGithubData();

  const cubeGrid = $('#cube-grid');
  const repositoryTitle = $('#repository-title');
  const repositoryDescription = $('#repository-description');
  const repositoryLanguages = $('#repository-languages');
  const repositoryDetails = $('#repository-details'); // Get the reference to the #repository-details element

  function showRepositoryInfo(title, description, languages) {
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

    repositoryDetails.classList.add('active'); // Add the .active class when hovering over a cube
  }

  function clearRepositoryInfo() {
    repositoryTitle.textContent = '';
    repositoryDescription.textContent = '';
    repositoryLanguages.innerHTML = '';

    repositoryDetails.classList.remove('active'); // Remove the .active class when not hovering over a cube
  }

  repos.forEach((repo) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = repo.html_url;
    a.target = '_blank';

    const cube = document.createElement('div');
    cube.classList.add('cube');

    cube.addEventListener('mouseover', () => showRepositoryInfo(repo.name, repo.description, repo.languages));
    cube.addEventListener('mouseout', clearRepositoryInfo);

    const faceClasses = ['top', 'bottom', 'left', 'right', 'front', 'back'];
    faceClasses.forEach((faceClass) => {
      const face = document.createElement('div');
      face.classList.add('face', faceClass);
      cube.appendChild(face);
    });

    a.appendChild(cube);
    li.appendChild(a);
    cubeGrid.appendChild(li);
  });
}

CreateCubes();
