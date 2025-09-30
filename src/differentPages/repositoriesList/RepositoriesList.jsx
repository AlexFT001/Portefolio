import { useState, useEffect } from "react";

import './RepositoriesList.css';

function RepositoriesList() {
  const [repos, setRepos] = useState([]);
  const username = "alexft001";
  const portfolioLink = `${username}.github.io`;

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(repositories => {
        // Filter repos that have GitHub Pages and are not the main portfolio repo
        const filtered = repositories.filter(repo => 
          repo.has_pages && repo.name.toLowerCase() !== portfolioLink.toLowerCase()
        );
        setRepos(filtered);
      })
      .catch(error => {
        console.error('Error fetching repositories', error);
        setRepos([{ name: 'Failed to load repositories', description: '' }]);
      });
  }, []); // empty dependency = run once on mount

  return (
    <div className="container">
      <div className="repositories">
        <h3>Repositories</h3>
        <div className="repo-list">
          {repos.map((repo, index) => (
            <div key={repo.id} className="repo">
              {repo.name === 'Failed to load repositories' ? (
                <p>{repo.name}</p>
              ) : (
                <a
                  href={`https://${portfolioLink}/${repo.name}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepositoriesList;
