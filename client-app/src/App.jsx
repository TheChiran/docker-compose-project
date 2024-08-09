import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const apiURL = "http://192.168.10.167:4001"; // change or replace this with localhost:4001 in windows environment
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);

  const submitStudent = async () => {
    if (!student) {
      alert("Please enter student name");
      return;
    }

    axios
      .post(`${apiURL}/api/students`, {
        name: student,
      })
      .then((response) => {
        if (response.status === 200) {
          fetchStudents();
          setStudent(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`${apiURL}/api/students/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchStudents();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStudents = async () => {
    axios
      .get(`${apiURL}/api/students`)
      .then((response) => {
        const { students } = response.data.data;
        setStudents(students);
      })
      .catch((error) => {
        console.log(error);
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
      {students?.length > 0
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
