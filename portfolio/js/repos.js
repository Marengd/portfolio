import { $ } from "./modules/helper.js";
import { getGithubData } from "./modules/api.js";

async function CreateCubes() {
  const { user, repos } = await getGithubData();

  const cubeGrid = $('#cube-grid');
  const repositoryID = $('#repository-id');
  const repositoryTitle = $('#repository-title');
  const repositoryDescription = $('#repository-description');
  const repositoryLanguages = $('#repository-languages');
  const repositoryDetails = $('#repository-details');

  function showRepositoryInfo(id, title, description, languages) {
    repositoryID.textContent = id;
    repositoryTitle.textContent = title;
    repositoryDescription.textContent = description;

    repositoryLanguages.innerHTML = '';

    languages.forEach((language) => {
      const li = document.createElement('li');
      li.textContent = language;
      repositoryLanguages.appendChild(li);
    });

    repositoryDetails.classList.add('active');
  }

  function clearRepositoryInfo() {
    repositoryID.textContent = '';
    repositoryTitle.textContent = '';
    repositoryDescription.textContent = '';
    repositoryLanguages.innerHTML = '';

    repositoryDetails.classList.remove('active');
  }

  repos.forEach((repo) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = repo.html_url;
    a.target = '_blank';

    const cube = document.createElement('div');
    cube.classList.add('cube');

    cube.addEventListener('mouseover', () => {
      showRepositoryInfo(repo.id, repo.name, repo.description, repo.languages);
      cube.querySelectorAll('.face img').forEach(img => img.classList.add('active'));
    });

    cube.addEventListener('mouseout', () => {
      clearRepositoryInfo();
      cube.querySelectorAll('.face img').forEach(img => img.classList.remove('active'));
    });

    const faceClasses = ['top', 'bottom', 'left', 'right', 'front', 'back'];
    faceClasses.forEach((faceClass) => {
      const face = document.createElement('div');
      face.classList.add('face', faceClass);

      const img = document.createElement('img');
      img.src = 'https://plus.unsplash.com/premium_photo-1664879065853-0360d722eda9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60';
      face.appendChild(img);

      cube.appendChild(face);
    });

    a.appendChild(cube);
    li.appendChild(a);
    cubeGrid.appendChild(li);
  });
}

CreateCubes();
