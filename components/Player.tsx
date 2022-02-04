import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import useAuth from "../store/useAuth";
import { useAppContext } from "../store/authContext";

const Player = () => {
  const ctx = useAppContext();
  // const accessToken = useAuth(ctx.code);
  const accessToken = ctx.accessToken;
  console.log(ctx.accessToken);
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      uris={ctx.playingSong ? [ctx.playingSong] : []}
    />
  );
};

export default Player;
