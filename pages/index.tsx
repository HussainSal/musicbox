import Head from "next/head";
import Image from "next/image";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import { Fragment } from "react";
import classes from "../styles/index.module.css";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { height } from "@mui/system";
import flowImage from "../assets/images/flowimage.png";
import flowIcon from "../assets/images/flowicon.png";
import phone from "../assets/images/phone.png";
import { useAppContext } from "../store/authContext";

const useStyle = makeStyles({
  header_heading: {
    textAlign: "center",
  },
  button_header: {
    width: "230px",
    height: "46px",
    border: "2px solid #FFF",
    borderRadius: "20px",
    color: "#FFF",
  },
  button_premium: {
    color: "#FFF",
    border: "0",
    backgroundImage:
      "linear-gradient(to right, #35EDFB -8%, #2D9BEF 60%, #9B2DEF 105%)",
  },
});

export default function Home() {
  const ctx = useAppContext();
  const style = useStyle();
  const [code, setCode] = useState("");

  console.log(ctx.login, ctx.signup);

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);

  console.log(ctx.login, ctx.signup);

  return (
    <Fragment>
      {/* {code ? <Dashboard code={code} /> : <Login />} */}

      <header className={classes.header}>
        <div className={classes.header_container}>
          <Typography
            className={style.header_heading}
            color="primary"
            variant="h2"
          >
            Open the world of music. <br /> It's all here.
          </Typography>
          <div className={classes.buttonGroup}>
            <Button
              className={`${style.button_header} ${style.button_premium}`}
            >
              musicbox premium
            </Button>
            <Button className={style.button_header}>musicbox free</Button>
          </div>
          <div className={classes.pricebox}>
            <Typography color="primary" variant="subtitle2">
              1-month free trial
            </Typography>
            <Typography color="primary" variant="subtitle2">
              <span className={classes.skyblue_text}>$7.99</span>/month after
            </Typography>
          </div>
        </div>
      </header>

      <section className={classes.flow_section}>
        <div className={classes.flow_container}>
          <div className={classes.flow_imagebox}>
            <Image src={flowImage} alt="" />
          </div>
          <div className={classes.flow_textbox}>
            <div className={classes.flow_heading}>
              <Image src={flowIcon} width="48px" height="48px" alt="" />
              <Typography
                style={{ marginLeft: "20px", textTransform: "uppercase" }}
                variant="h1"
              >
                flow
              </Typography>
            </div>
            <Typography variant="subtitle1">
              Listen to a personalized mix of tracks based on your listening
              history, or create your own mix of genres, artists and playlists -
              letting you enjoy more of the music you love
            </Typography>
          </div>
        </div>
      </section>

      <section className={classes.listenanytime}>
        <div className={classes.listenanytime_container}>
          <div className={classes.listenanytime_textbox}>
            <Typography style={{ marginBottom: "36px" }} variant="h3">
              Listen anytime, anywhere
            </Typography>
            <Typography variant="subtitle1">
              All your favorite songs and episodes are always available - even
              without WiFi or LTE.
            </Typography>
          </div>
        </div>
      </section>

      <section className={classes.flow_section}>
        <div className={classes.flow_container}>
          <div className={classes.findmusic_textbox}>
            <Typography style={{ marginBottom: "36px" }} variant="h3">
              Find music you want
            </Typography>
            <Typography variant="subtitle1">
              Search for your favorite songs using the description, or turn on
              the <span className={classes.skyblue_text}>Music Finder</span>{" "}
              feature to find the song that is playing near you
            </Typography>
          </div>
          <div className={classes.flow_imagebox}>
            <Image src={phone} alt="" />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
