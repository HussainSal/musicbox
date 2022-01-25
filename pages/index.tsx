import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);
  return <div></div>;
}

{
  /* {code ? <Dashboard code={code} /> : <Login />} */
}
