import styles from "./LoginAndSignUp.module.css";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function signUp(e) {
    e.preventDefault();
    try {
      if (email === "" || password === "")
        throw new Error("Please Fill all the required feilds.");
      await setPersistence(auth, browserLocalPersistence).then(() =>
        signInWithEmailAndPassword(auth, email, password)
      );

      navigate("/page");
    } catch (err) {
      toast.error(err.message);
      // setName("");
      // setEmail("");
      // setPassword("");
    }
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={signUp} className={styles.formBox}>
        <h1>Welcome!</h1>
        <h2>Nice to meet you again</h2>
        <input
          type="email"
          placeholder="Email"
          className="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p>
          {"Don't have an account"} <Link to="/auth/signup">Sign Up!</Link>
        </p>
        <div className={styles.btnField}>
          <button type="submit" className={styles.actionBtn}>
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
