import styles from "./Feedback.module.css";
import { feedbackRef } from "../firebase";
import { push, set } from "firebase/database";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [noOfCourses, setNoOfCourses] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFeedback = push(feedbackRef);
      await set(newFeedback, {
        name,
        lecturerName,
        courseCode,
        department,
        level,
        feedback,
        email,
      });

      toast.success("Your feedback has beeen recorded");
    } catch (err) {
      console.log(err);
      toast.error("Error");
    } finally {
      setLecturerName("");
      setDepartment("");
      setCourseCode("");
      setFeedback("");
      setLevel("");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
      } else {
        console.log("User Is signed out");
        navigate("/");
      }
    });
  }, [name, email, navigate]);

  return (
    <div className={styles.formContainer}>
      <select
        name="noOfCourses"
        id="noOfCourses"
        value={noOfCourses}
        onChange={(e) => setNoOfCourses(e.target.value)}
      >
        <option value="No of Courses">Select No of Courses</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      {Array.from({ length: noOfCourses }, (_, i) => (
        <form onSubmit={handleSubmit} key={i} className={styles.formElement}>
          <input
            type="text"
            name="lecturer-name"
            id="lecturer-name"
            placeholder="Lecturer's Name"
            value={lecturerName}
            onChange={(e) => setLecturerName(e.target.value)}
          />
          <input
            type="text"
            name="course-code"
            id="course-code"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <textarea
            name="feedback"
            id="feedback"
            placeholder="Enter your Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button type="submit">Send Feedback</button>
        </form>
      ))}
    </div>
  );
}

export default Feedback;
