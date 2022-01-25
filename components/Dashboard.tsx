import React, { useEffect } from "react";
import useAuth from "../store/useAuth";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import classes from "./Dashboard.module.css";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "c1af256ebd144ae18d2cdd24146ef6fc",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      console.log(res.body);
    });
  }, [search, accessToken]);

  return <div className={classes.container}></div>;
};

export default Dashboard;
