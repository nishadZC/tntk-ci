import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Card, CardContent, CardActions, Typography, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { apiConfig } from "../helpers/api";
import Layout from "../layouts/index";
import { openModal } from "../redux/actions/modal";
import { saveAs } from 'file-saver';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
    flexWrap: "wrap",
    gap: 20,
  },
  welcomeText: {
    fontSize: "2.5rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #fff 0%, #cbd5e1 100%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: 24,
    color: "#fff",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.1)",
      border: "1px solid rgba(59, 130, 246, 0.3)",
      "&:before": {
        opacity: 1,
      }
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  fileName: {
    fontWeight: 600,
    fontSize: "1.15rem",
    wordBreak: "break-all",
    color: "#f8fafc",
    marginTop: 16,
    lineHeight: 1.4,
  },
  fileIcon: {
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
    borderRadius: "50%",
    width: 72,
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#60a5fa",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "transform 0.3s ease",
    "& svg": {
      width: 32,
      height: 32,
    },
    "$card:hover &": {
      transform: "scale(1.1)",
    }
  },
  actionContainer: {
    padding: "0 24px 24px",
    display: "flex",
    gap: 12,
    width: "100%",
    boxSizing: "border-box",
  },
  downloadBtn: {
    flex: 1,
    borderRadius: 12,
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "#fff",
    border: "none",
    padding: "10px",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
      boxShadow: "0 8px 16px rgba(59, 130, 246, 0.4)",
      transform: "translateY(-2px)",
    }
  },
  deleteBtn: {
    borderRadius: 12,
    padding: "10px",
    minWidth: "48px",
    width: "48px",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(239, 68, 68, 0.2)",
      border: "1px solid rgba(239, 68, 68, 0.4)",
      transform: "translateY(-2px)",
    }
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(30, 41, 59, 0.4)",
    borderRadius: 16,
    border: "1px dashed rgba(255, 255, 255, 0.2)",
  }
}));

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [files, setFiles] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const requestOptions = {
      headers: {
        'Token': user.token
      }
    }

    axios.get(`${apiConfig.getFiles}`, requestOptions)
      .then((res) => {
        setFiles(res.data);
      })
  }, [user.token])

  const reload = () => {
    setTimeout(() => {
      const requestOptions = {
        headers: {
          'Token': user.token
        }
      }

      axios.get(`${apiConfig.getFiles}`, requestOptions)
        .then((res) => {
          setFiles(res.data);
        })
    }, 2000)
  };

  const addPdf = () => {
    dispatch(
      openModal({
        component: "AddPDF",
        props: {
          user: user,
          reload: reload
        }
      })
    );
  };

  const downloadPdf = (file) => {
    const requestOptions = {
      headers: {
        'Token': user.token
      },
      responseType: "blob"
    }
    axios.get(`${apiConfig.getFile}/${file}`, requestOptions)
      .then(response => {
        saveAs(response.data, file)
      })
  };

  const deletePdf = (file) => {
    const requestOptions = {
        headers: {
            'Token' : user.token
        },
    }
    axios.delete(`${apiConfig.deleteFile}/${file}`, requestOptions)
      .then(() => reload())
  }

  return (
    <Layout>
      <Box className="fade-in">
        <Box className={classes.headerSection}>
          <Typography variant="h1" className={classes.welcomeText}>
            Welcome, {user.username}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={addPdf}
            size="large"
          >
            + Request New PDF
          </Button>
        </Box>

        <Typography variant="h2" className={classes.sectionTitle}>
          Generated PDF files
        </Typography>

        {files && files.length > 0 ? (
          <Grid container spacing={4}>
            {files.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} className={`slide-up-delay-${(index % 3) + 1}`}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Box className={classes.fileIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Box>
                    <Typography className={classes.fileName}>
                      {file}
                    </Typography>
                  </CardContent>
                  <Box className={classes.actionContainer}>
                    <Button
                      className={classes.downloadBtn}
                      onClick={() => downloadPdf(file)}
                    >
                      Download
                    </Button>
                    <Button
                      className={classes.deleteBtn}
                      onClick={() => deletePdf(file)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box className={classes.emptyState}>
            <Typography variant="h6" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
              No PDFs generated yet
            </Typography>
            <Typography variant="body2" style={{ color: "rgba(255,255,255,0.5)" }}>
              Click the "Request New PDF" button to get started.
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
