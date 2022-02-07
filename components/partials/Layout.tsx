import React, { useEffect, useState } from "react";
import classes from "./Layout.module.css";
import { Fragment } from "react";
import Image from "next/dist/client/image";
import logo from "../../assets/images/logo.png";
import Nextlink from "next/link";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { legaldata } from "../../assets/data/footer";
import { footeroptions } from "../../assets/data/footer";
import Facebook from "../../assets/icons/Facebook";
import Instagram from "../../assets/icons/Instagram";
import Twitter from "../../assets/icons/Twitter";
import { useAppContext } from "../../store/authContext";
import { useRouter } from "next/dist/client/router";
import Search from "../../assets/icons/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Player from "../Player";

const category = ["Generes & Moods", "New Releases", "Podcast"];

const page = ["browse", "library", "home"];

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=c1af256ebd144ae18d2cdd24146ef6fc&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const useStyle = makeStyles({
  loginButton: {
    width: "105px",
    height: "36px",
    borderRadius: "20px",
    color: "#FFF",
    border: "2px solid #FFF",
  },
  signupButton: {
    width: "120px",
    height: "36px",
    borderRadius: "20px",
  },
  legalText: {
    letterSpacing: "6",
    fontWeight: "normal",
  },
  loggedin_navtext: {
    fontSize: "20px",
    lineHeight: "52px",
    color: "#99999F",
    cursor: "pointer",
  },
  homebutton: {
    border: "0px",
    background: "#161A1A",
    color: "#2DCEEF",

    "&:hover": {
      background: "#161A1A",
    },
  },
  nonHomebutton: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#99999F",
    cursor: "pointer",
    border: "0px",
    background: "#161A1A",

    "&:hover": {
      background: "#161A1A",
    },
  },

  browseCategoriesText: {
    color: "#FFF",
  },
});

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const ctx = useAppContext();
  const style = useStyle();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!ctx.accessToken || !ctx.spotifyApiCtx || !search) return;
    ctx.spotifyApiCtx.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [ctx.accessToken, ctx.spotifyApiCtx, search]);

  console.log(ctx.activeLink);

  // useEffect(() => {
  //   if (!accessToken) return;
  //   spotifyApi.setAccessToken(accessToken);
  // }, [accessToken]);

  // useEffect(() => {
  //   if (!search) return;
  //   if (!accessToken) return;

  //   let cancel = false;
  //   spotifyApi.searchTracks(search).then((res) => {
  //     // console.log(res.body.tracks);
  //     ctx.setData(res.body.tracks);

  //     if (cancel) return;
  //     setSearchResults(
  //       res.body.tracks.items.map((track) => {
  //         const smallestAlbumImage = track.album.images.reduce(
  //           (smallest, image) => {
  //             if (image.height < smallest.height) return image;
  //             return smallest;
  //           },
  //           track.album.images[0]
  //         );

  //         return {
  //           artist: track.artists[0].name,
  //           title: track.name,
  //           uri: track.uri,
  //           albumUrl: smallestAlbumImage.url,
  //         };
  //       })
  //     );

  //     return () => (cancel = true);
  //   });
  // }, [search, accessToken]);

  // console.log(searchResults);

  const code = true;
  const login = false;
  const signup = false;

  return (
    <Fragment>
      {!ctx.accessToken ? (
        <nav className={classes.navigation}>
          <div className={classes.innernavigation}>
            <div className={classes.logo}>
              <Image src={logo} width="100px" height="45px" alt="" />
            </div>
            <div className={classes.options}>
              <div className={classes.linkBox}>
                <Nextlink href="">
                  <Typography color="primary">Download</Typography>
                </Nextlink>
                <Nextlink href="">
                  <Typography color="primary">Help</Typography>
                </Nextlink>
              </div>
              <div className={classes.buttonBox}>
                <Button
                  variant="outlined"
                  className={style.loginButton}
                  href={AUTH_URL}
                >
                  Log in
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  className={style.signupButton}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav
          className={`${classes.navigation} ${code ? "" : classes.navcolor} `}
        >
          <div
            className={`${classes.innernavigation} ${classes.innernavigation_logedin}`}
          >
            <div className={classes.options_logedin}>
              <div className={classes.logo}>
                <Image src={logo} width="100px" height="45px" alt="" />
              </div>
              {page.map((cur) => {
                return (
                  <div
                    className={`${
                      ctx.pageButton == cur && classes.buttonGradient
                    }`}
                  >
                    <Nextlink href={`/${cur}`}>
                      <Button
                        onClick={() => {
                          ctx.setPageButton(cur);
                        }}
                        className={`${style.loginButton} ${
                          ctx.pageButton == cur
                            ? style.homebutton
                            : style.nonHomebutton
                        } `}
                      >
                        {cur}
                      </Button>
                    </Nextlink>
                  </div>
                );
              })}
            </div>
            {router.query.category && (
              <div className={classes.categoryBox}>
                <Typography color="secondary">Generes /</Typography>
                <Typography
                  color="primary"
                  style={{ textTransform: "uppercase", marginLeft: "2px" }}
                >
                  {router.query.category}
                </Typography>
              </div>
            )}
            {router.pathname == "/browse" && (
              <div className={classes.browseCategories}>
                {category.map((cur) => {
                  return (
                    <div className={classes.categorySong}>
                      <Typography
                        onClick={() => {
                          ctx.setActiveLink(cur);
                        }}
                        variant="body1"
                        className={`${classes.browseCategoriesText} ${
                          ctx.activeLink == cur && style.browseCategoriesText
                        }`}
                      >
                        {cur}
                      </Typography>
                      {ctx.activeLink == cur && (
                        <div className={classes.activeBorderBottom} />
                      )}
                    </div>
                  );
                })}
                {/* <Nextlink href={"/browse/newreleases"}>
                  <Typography
                    variant="body1"
                    className={`${classes.browseCategoriesText} ${
                      router.pathname == "/browse/newreleases" &&
                      style.browseCategoriesText
                    } `}
                  >
                    New Releases
                  </Typography>
                </Nextlink>
                <Nextlink href={"/browse/podcast"}>
                  <Typography
                    variant="body1"
                    className={`${classes.browseCategoriesText} ${
                      router.pathname == "/browse/podcast" &&
                      style.browseCategoriesText
                    } `}
                  >
                    Podcast
                  </Typography>
                </Nextlink> */}
              </div>
            )}
            <div className={classes.searchBox}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <input
                className={classes.input}
                placeholder="Search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <div className={classes.accountholder}>
                <AccountCircleOutlinedIcon />
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    color="primary"
                  >
                    John Doe
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose;
                        // ctx.setLogin(false);
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main>
        {search ? (
          <div className={classes.searchMusic}>
            {searchResults.map((item) => {
              console.log(item);
              return (
                <div className={classes.song}>
                  <div
                    onClick={() => ctx.setPlayingSong(item.uri)}
                    className={classes.imageBox}
                  >
                    <Image
                      loader={() => item.albumUrl}
                      unoptimized
                      width={50}
                      height={50}
                      src={item.albumUrl}
                      alt=""
                    />
                  </div>
                  <div className={classes.songInfoBox}>
                    <Typography>{item.title}</Typography>
                    <Typography>{item.artist}</Typography>
                  </div>
                </div>
              );
            })}
            <div className={classes.player}>
              <Player />
            </div>
          </div>
        ) : (
          children
        )}
      </main>
      {signup && login && (
        <footer className={classes.footer}>
          <div className={classes.innerFotterContainer}>
            <div className={classes.footerOptions_box}>
              <div className={classes.logoBox}>
                <div className={classes.logo}>
                  <Image src={logo} width="100px" height="60px" alt="" />
                </div>
                <div className={classes.legalBox}>
                  {legaldata.map((cur) => {
                    return (
                      <Typography
                        color="secondary"
                        className={style.legalText}
                        variant="subtitle1"
                      >
                        {cur}
                      </Typography>
                    );
                  })}
                </div>
              </div>
              <div className={classes.footerOptions}>
                <div className={classes.options}>
                  {footeroptions.map((cur) => {
                    return (
                      <div className={classes.optionItem}>
                        <Typography
                          style={{ textTransform: "uppercase" }}
                          color="secondary"
                          variant="subtitle2"
                        >
                          {cur.heading}
                        </Typography>
                        {cur.content.map((item) => {
                          return (
                            <Typography
                              style={{
                                cursor: "pointer",
                                textTransform: "capitalize",
                              }}
                              color="primary"
                              variant="subtitle2"
                            >
                              {item}
                            </Typography>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={classes.socialmediaBox}>
              <div className={classes.variousSocialApp}>
                <Facebook />
                <Twitter />
                <Instagram />
              </div>
              <Typography
                variant="body2"
                color="secondary"
                style={{ fontWeight: "normal", fontSize: "12px" }}
              >
                2021MusicBox
              </Typography>
            </div>
          </div>
        </footer>
      )}
    </Fragment>
  );
};

export default Layout;
