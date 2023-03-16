import { getGithubData } from './api.js';
import { $ } from './helper.js';

function formatDate(date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = monthNames[monthIndex];

  return `${day}, ${monthName} ${year} — ${hours}:${minutes}:${seconds}`;
}


async function displayRepositoryInformation() {
  const { user, repos } = await getGithubData();

  $('#github-bio').innerText = user.bio;
  $('#full-name').innerText = user.name;

  // Make the website URL clickable
  const websiteLink = document.createElement('a');
  websiteLink.href = user.blog;
  websiteLink.target = '_blank';
  websiteLink.innerText = user.blog;
  const websiteElement = $('#website');
  websiteElement.innerHTML = '';
  websiteElement.appendChild(websiteLink);

  // Make the GitHub username clickable
  const githubLink = document.createElement('a');
  githubLink.href = user.html_url;
  githubLink.target = '_blank';
  githubLink.innerText = user.login;
  const githubUsernameElement = $('#github-username');
  githubUsernameElement.innerHTML = '';
  githubUsernameElement.appendChild(githubLink);

  $('#github-id').innerText = user.id;
  $('#github-follower-amount').innerText = user.followers;
  $('#github-following-amount').innerText = user.following;
  $('#github-repository-amount').innerText = user.public_repos;

  // Find the latest update among the repositories
  const latestUpdate = repos.reduce((latest, repo) => {
    const repoUpdatedAt = new Date(repo.updated_at);
    return repoUpdatedAt > latest ? repoUpdatedAt : latest;
  }, new Date(repos[0].updated_at));

  $('#github-latest-update').innerText = formatDate(latestUpdate);
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
