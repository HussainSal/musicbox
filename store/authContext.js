import { useContext, createContext } from "react";
import { useState } from "react";

const Appcontext = createContext({
  login: false,
  setLogin: null,
  signup: false,
  setSignup: null,
});

export function Appwrapper({ children }) {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  return (
    <Appcontext.Provider value={{ login, setLogin, signup, setSignup }}>
      {children}
    </Appcontext.Provider>
  );
}

export function useAppContext() {
  return useContext(Appcontext);
}
