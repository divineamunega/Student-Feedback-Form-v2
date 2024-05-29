import styles from "./LoginAndSignUp.module.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault();
    try {
      if (email === "" || password === "" || name === "")
        throw new Error("Please Fill all the required feilds.");
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      await setPersistence(auth, browserLocalPersistence);

      toast.success("Account Created Successfully!");
      navigate("/page");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <>
      <form onSubmit={signUp} className={styles.formBox}>
        <h1>Welcome!</h1>
        <h2>Nice to have you here</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Already have an account <Link to="/auth/login">Sign In!</Link>
        </p>
        <div className={styles.btnField}>
          <button type="submit" className={styles.actionBtn}>
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;