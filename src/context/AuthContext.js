import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
<<<<<<< HEAD
=======
  signOut,
>>>>>>> c9827c454be3b9d511cd600c3c24a0c41639634d
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../utils/firebase";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const register = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

<<<<<<< HEAD
  const signout = async () => {
    await auth.logout();
=======
  const logout = async () => {
    await signOut(auth);
>>>>>>> c9827c454be3b9d511cd600c3c24a0c41639634d
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const exports = {
    user,
    register,
    login,
<<<<<<< HEAD
    signout,
=======
    logout,
>>>>>>> c9827c454be3b9d511cd600c3c24a0c41639634d
  };

  return (
    <AuthContext.Provider value={exports}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { useAuth };
