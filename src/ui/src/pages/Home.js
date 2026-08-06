import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { apiConfig } from "../helpers/api";
import Layout from "../layouts/index";
import { openModal } from "../redux/actions/modal";
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [files, setFiles] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [deletingFile, setDeletingFile] = useState(null);

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
    setDownloadingFile(file);
    const requestOptions = {
      headers: {
        'Token': user.token
      },
      responseType: "blob"
    }
    axios.get(`${apiConfig.getFile}/${file}`, requestOptions)
      .then(response => {
        saveAs(response.data, file);
        toast.success(`Successfully downloaded ${file}`);
      })
      .catch((error) => {
        toast.error(`Failed to download ${file}`);
      })
      .finally(() => {
        setDownloadingFile(null);
      })
  };

  const deletePdf = (file) => {
    setDeletingFile(file);
    const requestOptions = {
        headers: {
            'Token' : user.token
        },
    }
    axios.delete(`${apiConfig.deleteFile}/${file}`, requestOptions)
      .then(() => {
        toast.success(`Deleted ${file}`);
        reload();
      })
      .catch((err) => {
        toast.error(`Failed to delete ${file}`);
      })
      .finally(() => {
        setDeletingFile(null);
      })
  }

  return (
    <Layout>
      <div style={{ color: "#f8fafc", padding: "20px 0" }}>
        <h1 style={{ fontFamily: '"Inter", "Roboto", sans-serif', fontWeight: 800, fontSize: "2.5rem", marginBottom: "10px", letterSpacing: "-0.5px" }}>
          Welcome, {user.username}!
        </h1>
        
        <div style={{ 
          background: "rgba(255, 255, 255, 0.03)", 
          backdropFilter: "blur(16px)", 
          padding: "40px", 
          borderRadius: "24px", 
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          marginTop: "40px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ margin: 0, fontFamily: '"Inter", "Roboto", sans-serif', fontWeight: 700, fontSize: "1.75rem" }}>Generated PDF Files</h2>
            <Button
              color="primary"
              variant="contained"
              onClick={addPdf}
              style={{
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                padding: "10px 24px",
                boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
            >
              Request new PDF
            </Button>
          </div>

          {files && files.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {files.map((file, index) => (
                <div key={index} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, 0.25)",
                  padding: "16px 24px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  flexWrap: "wrap",
                  gap: "15px"
                }}>
                  <span style={{ fontSize: "1.1rem", fontFamily: '"Inter", "Roboto", sans-serif', fontWeight: 500 }}>{file}</span>
                  <div>
                    <Button
                      style={{ 
                        marginLeft: 15, 
                        borderRadius: 10, 
                        background: "rgba(255,255,255,0.1)", 
                        color: "#fff",
                        textTransform: "none",
                        padding: "6px 16px"
                      }}
                      onClick={() => downloadPdf(file)}
                      disabled={downloadingFile === file}
                    >
                      {downloadingFile === file ? <CircularProgress size={20} style={{ color: "#fff" }} /> : "Download"}
                    </Button>
                    <Button
                      style={{ 
                        marginLeft: 15, 
                        borderRadius: 10, 
                        background: "rgba(239, 68, 68, 0.15)", 
                        color: "#ef4444",
                        textTransform: "none",
                        padding: "6px 16px"
                      }}
                      onClick={() => deletePdf(file)}
                      disabled={deletingFile === file}
                    >
                      {deletingFile === file ? <CircularProgress size={20} style={{ color: "#ef4444" }} /> : "Delete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.4)" }}>
              <h3 style={{ margin: 0, fontWeight: 400, fontFamily: '"Inter", "Roboto", sans-serif' }}>No PDF files generated yet.</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
