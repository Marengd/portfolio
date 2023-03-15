export async function getGithubData() {
   const userResponse = await fetch('https://api.github.com/users/marengd');
   const user = await userResponse.json();
 
   const reposResponse = await fetch('https://api.github.com/users/marengd/repos');
   const repos = await reposResponse.json();

    // Fetch languages for each repository
  const languagePromises = repos.map(async (repo) => {
    const languagesResponse = await fetch(repo.languages_url);
    const languages = await languagesResponse.json();
    return Object.keys(languages);
  });

  const allLanguages = await Promise.all(languagePromises);

  // Add languages to the repository objects
  repos.forEach((repo, index) => {
    repo.languages = allLanguages[index];
  });

  return { user, repos };
 }