import styles from "./Admin.module.css";
import { feedbackRef } from "../firebase";
import { get } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Admin() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    get(feedbackRef)
      .then((snapshot) => setData(snapshot.val()))
      .catch(() => {
        toast.error("Could not get data");
        navigate("/");
      });
  }, [navigate]);

  return (
    <div className={styles.admin}>
      <h1>FEEDBACKS</h1>
      <ul>
        {Object.values(data).map((el, i) => {
          console.log(el);
          return (
            <li key={i}>
              <p>
                <span>Name:</span> {el.feedback.name}
              </p>
              <p>
                <span>Email:</span> {el.feedback.email}
              </p>
              <p>
                <span>Dept:</span> {el.feedback.department}
              </p>
              <p>
                <span>Level:</span> {el.feedback.level}
              </p>
              <div className={styles.feedBacks}>
                <p>
                  <span>Feedbacks:</span>
                  {el.feedback.feedBacks.map((el, i) => (
                    <aside key={i}>
                      <p>
                        <span>Lecturer Name:</span> {el.lecturerName}
                      </p>
                      <p>
                        <span>Course Code:</span> {el.courseCode}
                      </p>
                      <p>
                        <span>Feedback:</span> {el.feedback}
                      </p>
                    </aside>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  // }
  // <div style={styles.admin}>
  // 	<p>Name : Name</p>
  // 	<p>Email: Email</p>
  // 	<p>Department: Department</p>
  // 	<p>Feedbacks: Feedbacks</p>
  // 	<div></div>
  // </div>
}

export default Admin;
