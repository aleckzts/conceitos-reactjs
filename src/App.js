import React, { useEffect } from "react";
import api from 'services/api';

import "./styles.css";
import { useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const date = String(Date.now());

    const response = await api.post('repositories', {
      title: `Novo Repo ${date}`,
      utl: `http://url.com/${date}`,
      techs: ['Tech1','React','others']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const newRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(newRepositories);
    });
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(...repositories, response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
