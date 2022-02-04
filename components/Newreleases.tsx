import React from "react";
import classes from "../styles/newreleases.module.css";
import { Typography, makeStyles } from "@material-ui/core";
import Image from "next/dist/client/image";
import { newreleases1 } from "../assets/data/newreleases";
import { newreleases2 } from "../assets/data/newreleases";

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

const Newreleases = () => {
  const style = useStyle();

  return (
    <section className={classes.newreleaseSection}>
      <div className={classes.newreleaseContainer}>
        <div className={classes.newreleasedContainer}>
          <Typography className={style.browseText}>
            Popular this week
          </Typography>
          <div className={classes.songCategory}>
            {newreleases1.map((cur) => {
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
            {newreleases2.map((cur) => {
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
      </div>
    </section>
  );
};

export default Newreleases;
