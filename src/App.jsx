import "./App.css";
import { auth, googleProvider } from "./config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //new movie
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieRelease, setNewMovieRelease] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };
  const movieCollectionRef = collection(db, "movies");
  const [movieList, setMovieList] = useState([]);

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  ///MOVIEsUBMIT
  const movieSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieRelease,
        oscarWinner: newMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div>
        <input
          placeholder="name"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        ></input>
        <input
          placeholder="releasedate"
          type="number"
          onChange={(e) => setNewMovieRelease(Number(e.target.value))}
        ></input>

        <label htmlFor="oscar">oscar winner</label>
        <input
          type="checkbox"
          id="oscar"
          onChange={() => setNewMovieOscar(!newMovieOscar)}
        ></input>
        <button onClick={movieSubmit}>submit movie</button>
      </div>
      <br></br>
      <input
        placeholder="email.."
        type="email"
        // value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        type="password"
        // value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br></br>
      <br></br>

      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with google</button>
      <button onClick={logout}>logout</button>
      <div className="display">
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
