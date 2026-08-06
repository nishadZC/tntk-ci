import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { userActions } from "../../redux/actions/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    container: {
        background: "#0f172a",
        backgroundImage: "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0.2) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,0.2) 0, transparent 50%)",
        backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    },
    brandSection: {
        flex: 1,
        color: "white",
        padding: "0 5%",
        display: "none",
        "@media (min-width: 900px)": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: "10%",
        }
    },
    brandTitle: {
        fontSize: "4.5rem",
        fontWeight: 800,
        marginBottom: "1rem",
        letterSpacing: "-1px",
        background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        animation: "slideUp 0.8s ease-out forwards",
    },
    brandSubtitle: {
        fontSize: "1.25rem",
        fontWeight: 400,
        opacity: 0.8,
        maxWidth: 500,
        lineHeight: 1.6,
        animation: "slideUp 0.8s ease-out 0.2s forwards",
        opacity: 0,
    },
    formContainer: {
        width: "100%",
        maxWidth: 480,
        animation: "fadeIn 1s ease-out 0.4s forwards",
        opacity: 0,
    },
    form: {
        padding: "50px 40px",
        display: "flex",
        flexDirection: "column",
        background: "rgba(30, 41, 59, 0.4)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: 24,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    },
    title: {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: 10,
        color: "#fff",
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.6)",
        marginBottom: 40,
        fontSize: "1rem",
    },
    errorMessage: {
        fontSize: 13,
        fontWeight: 500,
        color: "#f87171",
        marginTop: 15,
        textAlign: "center",
        backgroundColor: "rgba(248, 113, 113, 0.1)",
        padding: "10px",
        borderRadius: "8px",
    },
    btn: {
        marginTop: 30,
        height: 52,
    },
    link: {
        color: "#60a5fa",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.2s",
        "&:hover": {
            color: "#93c5fd",
        }
    },
    signUpRow: {
        marginTop: 25,
        textAlign: "center",
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "0.9rem",
    }
}));

function Register() {
    const [values, setValues] = useState({
        password: "",
        username: "",
    });
    const [isValidData, setIsValidData] = useState(true);
    const dispatch = useDispatch();
    const loginError = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);
    const isPasswordValid = values.password.length > 5;
    const styles = useStyles();

    useEffect(() => {
        if (loginError) {
            setIsValidData(false);
        }
    }, [loginError]);


    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = values;

        if (isPasswordValid) {
            dispatch(userActions.register(username, password));
            return;
        }
        setIsValidData(false);
    };

    const hangleChange = (e) => {
        const { value, name } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const onFocus = () => {
        setIsValidData(true);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.brandSection}>
                <Typography variant="h1" className={styles.brandTitle}>
                    Apex CI/CD
                </Typography>
                <Typography className={styles.brandSubtitle}>
                    Join us and streamline your DevOps pipeline. Build, test, and deploy with confidence and unparalleled speed.
                </Typography>
            </Box>
            
            <Box className={styles.formContainer}>
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                    <Typography variant="h2" className={styles.title}>Create Account</Typography>
                    <Typography className={styles.subtitle}>
                        Sign up to get started with Apex.
                    </Typography>
                    
                    <Box display="flex" flexDirection="column" gap={2.5}>
                        <TextField
                            label="Username"
                            name="username"
                            fullWidth
                            variant="outlined"
                            style={{ marginBottom: 20 }}
                            value={values.username}
                            onChange={hangleChange}
                            onFocus={onFocus}
                            error={!isValidData}
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={values.password}
                            onChange={hangleChange}
                            onFocus={onFocus}
                            error={!isValidData}
                        />

                        {!isValidData && (
                            <div className={styles.errorMessage}>
                                {loginError || "Registration failed"}
                            </div>
                        )}
                    </Box>
                    
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={styles.btn}
                        fullWidth
                        disabled={!values.username || !values.password}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </Button>
                    
                    <div className={styles.signUpRow}>
                        Already have an account? <NavLink to="/login" className={styles.link}>Sign In</NavLink>
                    </div>
                </form>
            </Box>
        </Box>
    );
}

export default Register;
