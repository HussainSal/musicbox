import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes from "../../styles/browse.module.css";
import Image from "next/dist/client/image";
import { makeStyles } from "@material-ui/core";
import { genre } from "../../assets/data/genre";
import { moods1 } from "../../assets/data/moods";
import { moods2 } from "../../assets/data/moods";
import { useAppContext } from "../../store/authContext";
import Newreleases from "../../components/Newreleases";
import Podcast from "../../components/Podcast";
import { Grid } from "@mui/material";
import Nextlink from "next/link";

const useStyle = makeStyles({
  browseText: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginBottom: "30px",
  },
});

const index = () => {
  const style = useStyle();
  const ctx = useAppContext();
  const [songCategory, setSongCategory] = useState([]);

  useEffect(() => {
    if (!ctx.accessToken || !ctx.spotifyApiCtx) return;
    ctx.spotifyApiCtx.getCategories({ limit: 30 }).then((res) => {
      setSongCategory(res.body.categories.items);
    });
  }, [ctx.accessToken, ctx.spotifyApiCtx]);

  return ctx.activeLink == "Generes & Moods" ? (
    <section className={classes.browseSection}>
      <div className={classes.browseContainer}>
        <div className={classes.browse}>
          <Typography className={style.browseText}>Browse</Typography>
          <Grid container rowGap="26px" columnGap="26px">
            {songCategory &&
              songCategory.map((cur) => {
                return (
                  <Nextlink href={`/browse/genre?category=${cur.id}`}>
                    <Grid item className={classes.genre}>
                      <div className={classes.imageBox}>
                        <div className={classes.overlay} />
                        <Image
                          loader={() => cur.icons[0].url}
                          unoptimized
                          src={cur.icons[0].url}
                          width="225px"
                          height="128px"
                          alt=""
                        />
                      </div>
                      <Typography className={classes.categoryName}>
                        {cur.name}
                      </Typography>
                    </Grid>
                  </Nextlink>
                );
              })}
          </Grid>
        </div>
        {/* <div className={classes.browse}>
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
        </div> */}
      </div>
    </section>
  ) : ctx.activeLink == "New Releases" ? (
    <Newreleases />
  ) : (
    <Podcast />
  );
};

export default index;
