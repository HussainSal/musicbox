import React from "react";
import { Button } from "@material-ui/core";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=c1af256ebd144ae18d2cdd24146ef6fc&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return (
    <div>
      <Button href={AUTH_URL}>login</Button>
    </div>
  );
};

export default Login;
