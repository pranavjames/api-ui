import React, { useState, useEffect } from 'react';
const baseURL = process.env.REACT_APP_API_BASE_URL;
const apiUrl = `${baseURL}/api/v1`;
function ListManager() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');

  // Fetch the list when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
        console.log(`${apiUrl}/getall`);
      const response = await fetch(`${apiUrl}/getall`);
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  const addItem = async () => {
    if (input.trim() === '') return;
    try {
      await fetch(`${apiUrl}/add/${input}`, {
        method: 'GET',
      });
      setInput('');
      fetchList(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (item) => {
    try {
      await fetch(`${apiUrl}/delete/${item}`, {
        method: 'GET',
      });
      fetchList(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>Manage List</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a new item" 
      />
      <button onClick={addItem}>Add</button>
      
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item} 
            <button onClick={() => deleteItem(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListManager;
