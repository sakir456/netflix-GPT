import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adduser, removeuser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLangage } from "../utils/confligSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)



const handleSignOut = () => {
  signOut(auth)
  .then(() => {})
  .catch((error) => {
    navigate("/error");
  });
}


useEffect(() =>{
 const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const { uid, email, displayName, photoURL} = user;
      dispatch(
        adduser({
          uid: uid, 
          email: email, 
          displayName: displayName, 
          photoURL: photoURL,
        })
        );
        navigate("/browse");
    } else {
      // User is signed out
      dispatch(removeuser());
      navigate("/")
      }
     });
     // unsubscribe when component unmounts
     return () => unsubscribe();
}, [])

const handleGptSearchClick = () => {
  // Toggle GPT Search
  dispatch(toggleGptSearchView());
}

const handleLanguageChange = (e) => {
  dispatch(changeLangage(e.target.value));
}

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
    <img
    className="w-44" src={LOGO} alt="logo" />
     { user && (
      <div className="flex p-2 ">
      { showGptSearch && 
      ( <select className="p-2 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map((lang) => (
      <option key={lang.identifier} value={lang.identifier}>
      {lang.name}
      </option> 
     ))}
        
      </select>
      )}
      <button className=" py-0 px-2 m-3 bg-red-600 text-white rounded-md"
      onClick={handleGptSearchClick}
      >
     {showGptSearch ? "HomePage" : "GPT Search"} 
      </button>
        <img 
        className="w-12 h-12 "
        alt="usericon"
        src={user?.photoURL}
        />
        <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
      </div>
)}

      
      
      </div>
  )
}

export default Header