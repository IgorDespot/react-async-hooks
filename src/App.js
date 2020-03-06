import React, { useState, useEffect } from 'react';
import './App.css';

function useGiphy(query) {

  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=b55y9HDPY8YpA5WgpUoIkDKOhrBJ6ImT&q=${query}&limit=25&offset=0&rating=G&lang=en`
        );
        let json = await response.json();
        setResults(json.data.map(item => { return item.images.preview.mp4 }));
      } catch (error) {
        console.log(error)
      }
    }
    if (query !== '') {
      fetchData();
    }
  }, [query]);

  return results;
}

export default function AsyncHooks() {

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const results = useGiphy(query);

  const onSubmit = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <h1>Async React Hooks</h1>
      <form onSubmit={ onSubmit }>
        <input
          value={ search }
          onChange={ e => setSearch(e.target.value) }
          placeholder="Search for Gifs!"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      {
        results.map(item => (
          <video autoPlay loop key={ item } src={ item } />
        ))
      }
    </div>
  );
}
