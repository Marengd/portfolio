import { getGithubData } from './modules/api.js';
import { $ } from './modules/helper.js';

async function displayRepositoryInformation() {
    const { user, repos } = await getGithubData();
  
    $('#github-bio').innerText = user.bio;
    $('#full-name').innerText = user.name;
    $('#email').innerText = user.email;
    $('#website').innerText = user.blog;
  
    $('#github-username').innerText = user.login;
    $('#github-id').innerText = user.id;
    $('#github-follower-amount').innerText = user.followers;
    $('#github-following-amount').innerText = user.following;
    $('#github-repository-amount').innerText = user.public_repos;
  
    // Find the latest update among the repositories
    const latestUpdate = repos.reduce((latest, repo) => {
      const repoUpdatedAt = new Date(repo.updated_at);
      return repoUpdatedAt > latest ? repoUpdatedAt : latest;
    }, new Date(repos[0].updated_at));
  
    $('#github-latest-update').innerText = latestUpdate.toLocaleString();
  }
  
  window.addEventListener("hashchange", function() {
    if (window.location.hash === "#info") {
      displayRepositoryInformation();
    }
  });
  
  // Run the function on page load if the hash is already set to #info
  if (window.location.hash === "#info") {
    displayRepositoryInformation();
  }