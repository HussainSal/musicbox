import React from "react";
import classes from "../../styles/podcast.module.css";
import { makeStyles, Typography } from "@material-ui/core";
import Image from "next/dist/client/image";
import { podcastShows1 } from "../../assets/data/podcast";
import { podcastShows2 } from "../../assets/data/podcast";
import { podcastCategory } from "../../assets/data/podcast";

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

const podcast = () => {
  const style = useStyle();

  return (
    <section className={classes.podcastSection}>
      <div className={classes.podcastContainer}>
        <div className={classes.podcast}>
          <Typography className={style.browseText}>
            Popular this week
          </Typography>
          <div className={classes.songCategory}>
            {podcastShows1.map((cur) => {
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
          <div className={classes.songCategory}>
            {podcastShows2.map((cur) => {
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

        <Typography className={style.browseText}>Categories</Typography>
        <div className={classes.songCategory}>
          {podcastCategory.map((cur) => {
            return (
              <div>
                <div className={classes.genre}>
                  <Image src={cur.image} width="225px" height="128px" alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default podcast;
