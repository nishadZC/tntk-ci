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
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
      borderColor: "rgba(59, 130, 246, 0.4)",
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  fileName: {
    fontWeight: 500,
    fontSize: "1.1rem",
    wordBreak: "break-all",
    color: "#fff",
  },
  fileIcon: {
    background: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    display: "inline-flex",
    color: "#60a5fa",
  },
  actionButton: {
    borderRadius: 8,
    textTransform: "none",
    fontWeight: 500,
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
                  <CardActions style={{ padding: '16px', paddingTop: 0, justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      className={classes.actionButton}
                      onClick={() => downloadPdf(file)}
                    >
                      Download
                    </Button>
                    <Button
                      size="small"
                      style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.3)' }}
                      variant="outlined"
                      className={classes.actionButton}
                      onClick={() => deletePdf(file)}
                    >
                      Delete
                    </Button>
                  </CardActions>
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
