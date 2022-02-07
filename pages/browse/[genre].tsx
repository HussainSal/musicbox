import React, { useState } from "react";
import classes from "../../styles/browse.module.css";
import { Grid } from "@mui/material";
import Image from "next/dist/client/image";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useAppContext } from "../../store/authContext";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";

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

const genre = () => {
  const style = useStyle();
  const ctx = useAppContext();
  const router = useRouter();
  const [playlist, setPlaylist] = useState([]);

  let categorySong = router.query.category;

  useEffect(() => {
    if (!ctx.accessToken || !ctx.spotifyApiCtx) return;
    categorySong &&
      ctx.spotifyApiCtx.getPlaylistsForCategory(categorySong).then((res) => {
        setPlaylist(res.body.playlists.items);
      });
  }, [ctx.accessToken, ctx.spotifyApiCtx]);

  // playlist.length > 0 && console.log(playlist[0].images[0].url);
  console.log(playlist);

  return (
    <section className={classes.genreSection}>
      {playlist.length > 0 && (
        <div
          className={classes.overlayImage}
          style={{
            backgroundImage: `url(${playlist[0].images[0].url})`,
            backdropFilter: "blur(80px)",
          }}
        />
      )}
      <div className={classes.genreContainer}>
        <Typography
          variant="h1"
          style={{ textTransform: "capitalize", marginBottom: "60px" }}
        >
          {router.query.category}
        </Typography>

        <Grid container rowGap="26px" columnGap="26px">
          {playlist &&
            playlist.map((cur) => {
              return (
                <NextLink href={`/browse/album?album=${cur.id}`}>
                  <Grid item className={classes.genre}>
                    <div>
                      <div className={classes.genre}>
                        <Image
                          loader={() => cur.images[0].url}
                          unoptimized
                          src={cur.images[0].url}
                          width="225px"
                          height="225px"
                          alt=""
                        />
                      </div>
                      <Typography
                        variant="body2"
                        className={style.browseSubText}
                      >
                        {cur.name}
                      </Typography>
                    </div>
                  </Grid>
                </NextLink>
              );
            })}
        </Grid>
      </div>
    </section>
  );
};

export default genre;
