import { Typography } from "@material-ui/core";
import React from "react";
import classes from "../../styles/browse.module.css";
import Image from "next/dist/client/image";
import { makeStyles } from "@material-ui/core";
import { genre } from "../../assets/data/genre";
import { moods1 } from "../../assets/data/moods";
import { moods2 } from "../../assets/data/moods";

const useStyle = makeStyles({
  browseText: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
});

const browse = () => {
  const style = useStyle();

  return (
    <section className={classes.browseSection}>
      <div className={classes.browseContainer}>
        <div className={classes.browse}>
          <Typography className={style.browseText}>Browse</Typography>

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
          <Typography className={style.browseText}>Moods</Typography>

          <div className={classes.songCategory}>
            {moods1.map((cur) => {
              return (
                <div className={classes.genre}>
                  <Image src={cur.image} width="225px" height="128px" alt="" />
                </div>
              );
            })}
          </div>
          <div className={classes.songCategory}>
            {moods2.map((cur) => {
              return (
                <div className={classes.genre}>
                  <Image src={cur.image} width="225px" height="128px" alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default browse;
