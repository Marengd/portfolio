export async function getGithubData() {
   const userResponse = await fetch('https://api.github.com/users/marengd');
   const user = await userResponse.json();
 
   const reposResponse = await fetch('https://api.github.com/users/marengd/repos');
   const repos = await reposResponse.json();

   return { user, repos };
 }