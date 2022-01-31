// import classes from "./Dashboard.module.css";
import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useState } from "react";

import useAuth from "../store/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: "c1af256ebd144ae18d2cdd24146ef6fc",
});
import { useAppContext } from "../store/authContext";
import classes from "./partials/Layout.module.css";

const Dashboard = () => {
  const ctx = useAppContext();
  const accessToken = useAuth(ctx.code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      console.log(res.body.tracks);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [search, accessToken]);

  return (
    <div className={classes.loginButtonBox}>
      <input
        className={classes.input}
        placeholder="Search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </div>
  );
};

export default Dashboard;
