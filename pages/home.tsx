import { Typography } from "@material-ui/core";
import React from "react";
import classes from "../styles/home.module.css";
import recentlyplayed1 from "../assets/images/recentlyplayed1.png";
import Image from "next/dist/client/image";
import { makeStyles } from "@material-ui/core";
import { genre } from "../assets/data/genre";
import { podcastCategory } from "../assets/data/podcast";
import { newreleases } from "../assets/data/newreleases";
import { recommendations } from "../assets/data/recommendations";
import Like from "../assets/icons/Likes";
import { useAppContext } from "../store/authContext";
import Player from "../components/Player";
import useAuth from "../store/useAuth";

const useStyle = makeStyles({
  browseText: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  browseSubText: {
    fontSize: "14px",
    letterSpacing: ".6px",
    fontWeight: "normal",
  },
});

const home = () => {
  const ctx = useAppContext();
  const style = useStyle();
  // const accessToken = useAuth(ctx.code);

  // console.log(accessToken);

  return (
    <section className={classes.homeSection}>
      <div className={classes.homeContainer}>
        <div className={classes.recentlyPlayed}>
          <div className={classes.recentlyPlayedImage}>
            <Image src={recentlyplayed1} alt="" />
          </div>
        </div>
        <div className={classes.browse}>
          <Typography className={style.browseText}>Browse</Typography>
          <Typography variant="body2" className={style.browseSubText}>
            Explore by genre and mood
          </Typography>
          <div className={classes.songCategory}>
            {genre.map((cur) => {
              return (
                <div className={classes.genre}>
                  <Image src={cur.image} width="225px" height="128px" alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.browse}>
          <Typography className={style.browseText}>Podcast</Typography>
          <Typography variant="body2" className={style.browseSubText}>
            Explore by categories and popularity
          </Typography>
          <div className={classes.songCategory}>
            {podcastCategory.map((cur) => {
              return (
                <div className={classes.genre}>
                  <Image src={cur.image} width="225px" height="128px" alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.browse}>
          <Typography className={style.browseText}>
            New releases for you
          </Typography>
          <div className={classes.songCategory}>
            {newreleases.map((cur) => {
              return (
                <div>
                  <div className={classes.genre}>
                    <Image
                      src={cur.image}
                      width="225px"
                      height="225px"
                      alt=""
                    />
                  </div>
                  <Typography variant="body2" className={style.browseSubText}>
                    {cur.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ color: "#99999F", lineHeight: "8px" }}
                    className={style.browseSubText}
                  >
                    {cur.artist}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.browse}>
          <Typography className={style.browseText}>
            You might like these artists
          </Typography>
          <div className={classes.songCategory}>
            {recommendations.map((cur) => {
              return (
                <div className={classes.recommendationBox}>
                  <div className={classes.genre}>
                    <Image
                      src={cur.image}
                      width="225px"
                      height="225px"
                      alt=""
                    />
                  </div>
                  <Typography variant="body2" className={style.browseSubText}>
                    {cur.name}
                  </Typography>
                  <div className={classes.likeBox}>
                    <Like />
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: "#99999F",
                        lineHeight: "8px",
                        marginLeft: "5px",
                      }}
                      className={style.browseSubText}
                    >
                      {cur.likes}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default home;
