import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "c1af256ebd144ae18d2cdd24146ef6fc",
});

const Appcontext = createContext({
  playingSong: null,
  setPlayingSong: null,
  spotifyApiCtx: null,
  accessToken: null,
  setAccessToken: null,
  activeLink: null,
  setActiveLink: null,
  pageButton: null,
  setPageButton: null,
});

export function Appwrapper({ children }) {
  const [playingSong, setPlayingSong] = useState();
  const [code, setCode] = useState();
  const [activeLink, setActiveLink] = useState("Generes & Moods");
  const [pageButton, setPageButton] = useState("home");

  /*TOKENS */

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [spotifyApiCtx, setSpotifyApiCtx] = useState();

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);

  useEffect(() => {
    if (!code) return;
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        // console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.log(err);
          // window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setSpotifyApiCtx(spotifyApi);
  }, [accessToken]);

  return (
    <Appcontext.Provider
      value={{
        playingSong,
        setPlayingSong,
        setAccessToken,
        spotifyApiCtx,
        accessToken,
        activeLink,
        setActiveLink,
        pageButton,
        setPageButton,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
}

export function useAppContext() {
  return useContext(Appcontext);
}
