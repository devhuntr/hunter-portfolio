const fs = require("node:fs/promises");
const path = require("node:path");
require("dotenv").config();

async function refreshGithub() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  if (!token || !username) {
    throw new Error(
      "Set GITHUB_TOKEN and GITHUB_USERNAME before running github:refresh."
    );
  }
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "hunter-portfolio"
    },
    body: JSON.stringify({
      query: `query Portfolio($username: String!) {
        user(login: $username) {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            edges { node { ... on Repository {
              id name description url forkCount diskUsage
              stargazers { totalCount }
              primaryLanguage { name color }
            } } }
          }
        }
      }`,
      variables: {username}
    })
  });
  if (!response.ok)
    throw new Error(`GitHub request failed (${response.status}).`);
  const data = await response.json();
  if (data.errors || !Array.isArray(data?.data?.user?.pinnedItems?.edges)) {
    throw new Error(
      "GitHub returned no valid pinned-repository data. Existing snapshot was left unchanged."
    );
  }
  await fs.writeFile(
    path.join(__dirname, "public", "profile.json"),
    JSON.stringify(data, null, 2)
  );
  console.log(
    "Saved public/profile.json. Enable openSource.display to show pinned repositories."
  );
}

refreshGithub().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
