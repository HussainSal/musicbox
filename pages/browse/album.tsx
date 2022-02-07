import React from "react";
import classes from "../../styles/album.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../store/authContext";
import Image from "next/image";

const album = () => {
  const ctx = useAppContext();
  const router = useRouter();
  const [albums, setAlbums] = useState();
  const [singleAlbum, setSingleAlbum] = useState(null);

  let albumId = router.query.album;

  useEffect(() => {
    if (!ctx.accessToken || !ctx.spotifyApiCtx) return;
    ctx.spotifyApiCtx.getPlaylistTracks(albumId).then((res) => {
      setAlbums(res);
    });

    ctx.spotifyApiCtx.getPlaylist(albumId).then((res) => {
      setSingleAlbum(res.body);
    });
  }, [ctx.accessToken, ctx.spotifyApiCtx]);

  console.log(albums);
  return (
    <section className={classes.albumSection}>
      <div className={classes.albumContainer}>
        <div className={classes.albumInfo}>
          {singleAlbum && (
            <div className={classes.imageBox}>
              <Image
                unoptimized
                loader={() => singleAlbum.images[0].url}
                src={singleAlbum.images[0].url}
                width="225px"
                height="225px"
              />
            </div>
          )}
          {/* <div className={classes.imageBox}></div> */}
        </div>
      </div>
    </section>
  );
};

export default album;
