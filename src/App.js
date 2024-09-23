import './App.css';
import Ideas from './Ideas';
import Form from './Form';
import { useState, useEffect } from 'react';

function App() {
  // const dummyIdeas = [
  //   { id: 1, title: 'Prank Travis', description: 'Stick googly eyes on all his stuff' },
  //   { id: 2, title: 'Make a secret password app', description: 'So you and your rideshare driver can both know neither one of you is lying' },
  //   { id: 3, title: 'Learn a martial art', description: 'To exact vengeance upon my enemies' },
  // ]
  const [ideas, setIdeas] = useState([]);

  // async function getIdeas() {
  //   const url = "http://localhost:3001/api/v1/ideas"
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`)
  //     }
  //     const fetchedIdeas = await response.json();
  //     setIdeas([... ideas, fetchedIdeas]);
  //     console.log('success!', json);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  function getIdeas() {
    fetch('http://localhost:3001/api/v1/ideas')
    .then(response => response.json())
    .then(data => setIdeas([...ideas, ...data]))
    .catch(error => console.log(error.message))
  }

  useEffect(() => {
    getIdeas();
  }, [])

  function addIdea(newIdea) {
    fetch('http://localhost:3001/api/v1/ideas', { 
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIdea)
    })
    .then(response => response.json())
    .then(data => setIdeas([...ideas, data]))
    .catch(error => console.log(error.message))
  }

  function deleteIdea(id) {
    fetch(`http://localhost:3001/api/v1/ideas/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
    .then(() => {
        const filteredIdeas = ideas.filter(idea => idea.id !== id)
        setIdeas(filteredIdeas)
      })
    .catch(error => console.log(error.message))
  }

  return(
    <main className='App'>
      <h1>IdeaBox</h1>
      {!ideas.length && <h2>No ideas yet -- add some!</h2>}
      <Form addIdea={addIdea}/>
      <Ideas ideas={ideas} deleteIdea={deleteIdea}/>
    </main>
  )
}

export default App;