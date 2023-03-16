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

  // Add your repository names and their corresponding image sources
  const repoImageMapping = {
    'bedieningspaneel': 'https://images.unsplash.com/photo-1670272505391-8efda8e7a99c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'buy_dero_web_server': 'https://images.unsplash.com/photo-1674574124567-79b2ee3d22fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'kwoot': 'https://images.unsplash.com/photo-1670272505391-8efda8e7a99c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'Marengd': 'https://plus.unsplash.com/premium_photo-1661660059550-dded7430ee3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'Matchingapp-team2': 'https://images.unsplash.com/photo-1670272505391-8efda8e7a99c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'portfolio-in-a-week': 'https://plus.unsplash.com/premium_photo-1661660059550-dded7430ee3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'pt-matching-app': 'https://images.unsplash.com/photo-1670272505391-8efda8e7a99c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    // ...
  };

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
