import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {

    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {

        firebase.auth().signInWithPopup(provider)
            .then(result => {
                // console.log(result);
                const { displayName, email, photoURL } = result.user;
                console.log(displayName, email, photoURL);
            })
    }
    return (
        <div className="App">
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}

export default App;
