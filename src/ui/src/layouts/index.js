import logOutImg from "../assets/img/log-out.svg";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      background: theme.palette.common.bg,
      overflowY: "auto",
      color: "#fff",
      backgroundImage: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0.2) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,0.2) 0, transparent 50%)",
      backgroundAttachment: "fixed",
    },
    "*::-webkit-scrollbar": {
      width: "8px",
    },
    "*::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0.1)",
    },
    "*::-webkit-scrollbar-thumb": {
      background: "rgba(255,255,255,0.2)",
      borderRadius: "4px",
    },
    "*::-webkit-scrollbar-thumb:hover": {
      background: "rgba(255,255,255,0.3)",
    },
  },

  container: {
    position: "relative",
    padding: theme.spacing(3),
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    background: "rgba(30, 41, 59, 0.4)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    marginBottom: 40,
    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
  },

  logoText: {
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: 12,
    transition: "all 0.2s",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(248, 113, 113, 0.15)",
      borderColor: "rgba(248, 113, 113, 0.3)",
      color: "#f87171",
      "& img": {
        filter: "invert(57%) sepia(85%) saturate(2754%) hue-rotate(320deg) brightness(101%) contrast(97%)", // approximate red tint
      }
    }
  },

  logoutIcon: {
    width: 20,
    height: 20,
    opacity: 0.8,
    transition: "all 0.2s",
  },

  mainContent: {
    flexGrow: 1,
    width: "100%",
  }
}));

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Box className={classes.container}>
        <header className={classes.header}>
          <Typography className={classes.logoText}>
            Apex Dashboard
          </Typography>
          
          <div 
            className={classes.logoutBtn}
            onClick={() => dispatch(userActions.logout())}
          >
            <Typography variant="body2" style={{ fontWeight: 500 }}>Logout</Typography>
            <img
              src={logOutImg}
              alt="Logout"
              className={classes.logoutIcon}
            />             
          </div>
        </header>

        <Box className={classes.mainContent}>
          <main>{children}</main>
        </Box>
      </Box>
    </Container>
  );
}

export default MainLayout;
