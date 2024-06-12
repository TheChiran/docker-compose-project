import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const apiURL = "http://localhost:4001";
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);

  const submitStudent = () => {
    if (!student) {
      alert("Please enter student name");
      return;
    }
    fetch(`${apiURL}/api/students`, {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        name: student,
      }),
      headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
    })
      // Converting to JSON
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => {
        if (json.status === 200) {
          fetchStudents();
          setStudent(null);
        }
      });
  };

  const deleteStudent = (id) => {
    fetch(`${apiURL}/api/students/${id}`, { method: "DELETE" })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status === 200) {
          fetchStudents();
        }
      });
  };

  const fetchStudents = () => {
    fetch(`${apiURL}/api/students`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { students } = response.data;
        setStudents(students);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <h2>Welcome to devops course, batch: 4</h2>
      <h3>Add new student</h3>
      <section>
        <>
          <label htmlFor="">Name</label>
          <input
            type="text"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
          />
          <button onClick={submitStudent}>Add</button>
        </>
      </section>
      <p>Our Students:</p>
      {students.length > 0
        ? students.map((student) => {
            return (
              <p key={student.id}>
                Name: {student.name}{" "}
                <button onClick={() => deleteStudent(student.id)}>X</button>
              </p>
            );
          })
        : null}
    </>
  );
}

export default App;
