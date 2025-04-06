import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {checkValidateData} from "../utils/validate";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const message = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(message);

        //if(message === null){}
        //if(!message){}
        if(message) return;

        if(!isSignInForm){
            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value, 
                        photoURL: USER_AVATAR
                    }).then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                            dispatch(addUser({
                                uid: uid, 
                                email: email, 
                                displayName: displayName, 
                                photoURL: photoURL
                            })
                        );
                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });

                    console.log(user);
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + '-' + errorMessage);
                });

        } else {
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    //console.log(user);
                    //navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + '-' + errorMessage);
                });
        }
    }
    

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <Header/>
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_large.jpg" alt="bck-img" />
            </div>
            <form 
                onSubmit={(e) => e.preventDefault() }
                className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" />
                )}
                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700" />
                <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
                <p className="text-red-500 text-lg py-2">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now" : "Already registered? Sign In now"}</p>
            </form>
        </div>
    )
}

export default Login