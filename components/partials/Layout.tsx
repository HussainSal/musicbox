import React, { useEffect } from "react";
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
  useEffect(() => {
    !ctx.login ? router.push("/") : router.push("/home");
  }, [ctx.login]);

  return (
    <Fragment>
      {!ctx.login && !ctx.signup ? (
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
                  onClick={() => ctx.setLogin(true)}
                  variant="outlined"
                  className={style.loginButton}
                >
                  Log in
                </Button>
                <Button
                  disableElevation
                  onClick={() => ctx.setSignup(true)}
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
          className={`${classes.navigation} ${
            !ctx.login && !ctx.signup ? "" : classes.navcolor
          } `}
        >
          <div
            className={`${classes.innernavigation} ${classes.innernavigation_logedin}`}
          >
            <div className={classes.options_logedin}>
              <div className={classes.logo}>
                <Image src={logo} width="100px" height="45px" alt="" />
              </div>
              <Nextlink href={"/browse"}>
                <Typography className={style.loggedin_navtext} variant="body1">
                  Browse
                </Typography>
              </Nextlink>
              <Typography className={style.loggedin_navtext} variant="body1">
                library
              </Typography>
              <div className={classes.buttonGradient}>
                <Nextlink href={"/home"}>
                  <Button
                    className={`${style.loginButton} ${style.homebutton} `}
                  >
                    Home
                  </Button>
                </Nextlink>
              </div>
            </div>
            {router.pathname.includes("/browse") && (
              <div className={classes.browseCategories}>
                <Nextlink href={"/browse"}>
                  <Typography
                    variant="body1"
                    className={`${classes.browseCategoriesText}   ${
                      router.pathname == "/browse" && style.browseCategoriesText
                    } `}
                  >
                    Generes & Moods
                  </Typography>
                </Nextlink>
                <Nextlink href={"/browse/newreleases"}>
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
                </Nextlink>
              </div>
            )}
            <div className={classes.searchBox}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <input className={classes.input} placeholder="Search"></input>
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
                        ctx.setLogin(false);
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
      <main>{children}</main>
      {!ctx.signup && !ctx.login && (
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
