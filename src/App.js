import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {

        firebase.auth().signInWithPopup(provider)
            .then(result => {
                // console.log(result);
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                console.log(displayName, email, photoURL);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })
    }

    const handleSignOut = () => {
        // console.log('signOut clicked');
        firebase.auth().signOut()
            .then(result => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setUser(signedOutUser);
                console.log(result);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })
    }

    const handleBlur = (e) => {
        console.log(e.target.name, e.target.value);
        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            console.log(isEmailValid);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            console.log(isPasswordValid && passwordHasNumber);
        }
    }

    const handleSubmit = () => {

    }

    return (
        <div className="App">
            {
                user.isSignedIn ? <button onClick={handleSignOut}>sign out</button> :
                    <button onClick={handleSignIn}>sign In</button>
            }
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>your e-mail: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our own authentication</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onBlur={handleBlur} placeholder="enter your email address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="enter your password" required />
                <br />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}

export default App;
