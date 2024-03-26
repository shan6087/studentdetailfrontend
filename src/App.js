import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://127.0.0.1:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStudent = () => {
    const newStudent = {
      name: name,
      age: age,
      grade: grade,
    };

    axios
      .post("http://127.0.0.1:5000/students", newStudent)
      .then((response) => {
        console.log(response.data);
        setName("");
        setAge("");
        setGrade("");
        fetchStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/students/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Student Details</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button type="button" onClick={addStudent}>
          Add Student
        </button>
      </form>

      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name}, {student.age}, {student.grade}
            <button type="button" onClick={() => deleteStudent(student._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
