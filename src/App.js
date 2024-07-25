import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [arr, setArr] = useState([]);
  const [num, setNum] = useState("");
  const [updateIndex, setUpdateIndex] = useState("");
  const [updateNum, setUpdateNum] = useState("");
  const [deleteIndex, setDeleteIndex] = useState("");

  const baseURL = "https://user-4cek.onrender.com";

  // Fetch the array from the backend
  const getArray = async () => {
    try {
      const response = await axios.get(`${baseURL}/`);
      setArr(response.data);
    } catch (error) {
      console.error("Error fetching array:", error);
    }
  };

  // Add a number to the array
  const addNumberToArray = async () => {
    try {
      const response = await axios.post(`${baseURL}/`, { num: Number(num) });
      setArr(response.data);
      setNum("");
    } catch (error) {
      console.error("Error adding number to array:", error);
    }
  };

  // Update a number in the array by id
  const updateNumberInArray = async () => {
    try {
      const response = await axios.put(`${baseURL}/${updateIndex}`, {
        num: Number(updateNum),
      });
      setArr(response.data);
      setUpdateIndex("");
      setUpdateNum("");
    } catch (error) {
      console.error("Error updating number in array:", error);
    }
  };

  // Delete a number from the array by id
  const deleteNumberFromArray = async () => {
    try {
      const response = await axios.delete(`${baseURL}/${deleteIndex}`);
      setArr(response.data);
      setDeleteIndex("");
    } catch (error) {
      console.error("Error deleting number from array:", error);
    }
  };

  useEffect(() => {
    getArray();
  }, []);

  return (
    <div>
      <h1>Array Management</h1>
      <ul>
        {arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <h2>Add Number</h2>
        <input
          type="text"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="Enter number"
        />
        <button onClick={addNumberToArray}>Add</button>
      </div>
      <div>
        <h2>Update Number</h2>
        <input
          type="text"
          value={updateIndex}
          onChange={(e) => setUpdateIndex(e.target.value)}
          placeholder="Enter index"
        />
        <input
          type="text"
          value={updateNum}
          onChange={(e) => setUpdateNum(e.target.value)}
          placeholder="Enter new number"
        />
        <button onClick={updateNumberInArray}>Update</button>
      </div>
      <div>
        <h2>Delete Number</h2>
        <input
          type="text"
          value={deleteIndex}
          onChange={(e) => setDeleteIndex(e.target.value)}
          placeholder="Enter index"
        />
        <button onClick={deleteNumberFromArray}>Delete</button>
      </div>
    </div>
  );
};

export default App;
