import { $ } from "./helper.js";
import { getGithubData } from "./api.js";

import { repoImageMapping } from './repository-images.js';

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

  function getRandomRotation() {
    const randomX = Math.floor(Math.random() * 360);
    const randomY = Math.floor(Math.random() * 360);
    const randomZ = Math.floor(Math.random() * 360);
    return `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;
  }

  repos.forEach((repo) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = repo.html_url;
    a.target = '_blank';

    const cube = document.createElement('div');
    cube.classList.add('cube');
    cube.style.transform = getRandomRotation();

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
      
      // Use the image source from the mapping or a default image if not found
      img.src = repoImageMapping[repo.name] || 'default-image-source';
      face.appendChild(img);

      cube.appendChild(face);
    });

    a.appendChild(cube);
    li.appendChild(a);
    cubeGrid.appendChild(li);
  });
}

CreateCubes();
