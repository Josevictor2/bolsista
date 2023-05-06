import { useState } from "react";
import { auth, db } from "../../config.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";


const SignIn = () => {
    const [user] = useAuthState(auth); 
   
    const [isSignedIn, setIsSignedIn] = useState(false);
    type token = string | null;

    const [token, setToken] = useState<token>(null);

    const SignInGmail = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
            .then((result) => {
                console.log(result);
                // This gives you a Google Access Token. You can use it to access the Google API. 
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                
                // add user to firestore 
               setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    lastSeen: serverTimestamp(),
                });
                

                user?.getIdToken().then((token) => {
                    setToken(token);
                    setIsSignedIn(true);
                    }
                ); 
            }).catch((error) => {
                console.log(error);
            });
    };
        
    const navigate = useNavigate();
    const directUser = () => navigate('/dashboard');
    console.log(isSignedIn)
    if (isSignedIn) {
        directUser();
    }

    return (
        <div>
           <button onClick={SignInGmail} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Entrar com gmail
                </span>
            </button>
        </div>
    );
};


export default SignIn;