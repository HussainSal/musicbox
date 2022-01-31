import { useContext, createContext } from "react";
import { useState } from "react";

const Appcontext = createContext({
  login: false,
  setLogin: null,
  signup: false,
  setSignup: null,
  code: null,
  setCode: null,
});

export function Appwrapper({ children }) {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [data, setData] = useState(null);
  const [code, setCode] = useState();
  return (
    <Appcontext.Provider
      value={{ login, setLogin, signup, setSignup, code, setCode }}
    >
      {children}
    </Appcontext.Provider>
  );
}

export function useAppContext() {
  return useContext(Appcontext);
}
