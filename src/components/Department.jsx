import styles from './Department.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Department() {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [level, setLevel] = useState("");

    const navigate = useNavigate();

    function goToFeedback() {
      navigate("/page/feedback");
    }

    return (
      <div className={styles.page}>
        <header className={styles.header}>Welcome {name}!</header>
        <div className={styles.app}>
          <form action="">
            <input
              type="text"
              name="department"
              id="department"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <input
              type="text"
              name="level"
              id="level"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <button onClick={goToFeedback}>Next</button>
          </form>
        </div>
      </div>
    );
}

export default Department
