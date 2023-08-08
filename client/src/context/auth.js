import { useState, useEffect, createContext, useContext } from "react";

//create context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      setAuth(() => {
        return {
          data,
        };
      });
    }

    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
