// import { createContext, useContext, useEffect, useState } from 'react'
// import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../utils/firebase'

// const AuthContext = createContext();

// const useAuth = () => {
//     return useContext(AuthContext);
// }

// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState();

//     const register = async({email, password}) => {
//         await createUserWithEmailAndPassword(auth, email, password);
//     }

//     const login = async({email, password}) => {
//         await signInWithEmailAndPassword(auth, email, password);
//     }

//     const signout = async() => {
//         await auth.logout();
//     }

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(async (user) => {
//             setUser(user);
//         });
//         return () => {
//             unsubscribe();
//         }
//     }, [])

//     const exports = {
//         user,
//         register,
//         login,
//         signout
//     }

//     return (
//         <AuthContext.Provider value={exports}>{children}</AuthContext.Provider>
//     )
// }

// export default AuthProvider;
// export { useAuth };
