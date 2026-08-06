import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { userActions } from "../../redux/actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/img/new_bg.png";

const useStyles = makeStyles((theme) => ({
    container: {
        background: `url(${bg}) no-repeat center center`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
    },
    title: {
        fontSize: 40,
        fontWeight: 800,
        marginBottom: 10,
        fontFamily: '"Inter", "Roboto", sans-serif',
        letterSpacing: "-0.5px",
        color: "#fff",
    },
    caption: {
        color: "#cbd5e1",
        fontSize: 16,
        marginBottom: 40,
        fontFamily: '"Inter", "Roboto", sans-serif',
    },
    form: {
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        color: "white",
        width: "100%",
        maxWidth: 440,
        borderRadius: 24,
        padding: "60px 50px",
        display: "flex",
        flexDirection: "column",
    },
    textFieldRoot: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderRadius: 12,
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
        },
        "&.Mui-focused": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #ef4444",
        },
        "& input": {
            color: "#fff",
            fontFamily: '"Inter", "Roboto", sans-serif',
        }
    },
    notchedOutline: {
        border: "none",
    },
    label: {
        color: "rgba(255, 255, 255, 0.6)",
        fontFamily: '"Inter", "Roboto", sans-serif',
        "&.Mui-focused": {
            color: "#fff",
        }
    },
    focused: {},
    error: {
        color: "#ef4444",
    },
    errorMessage: {
        fontSize: 14,
        fontWeight: 500,
        color: "#ef4444",
        marginTop: 15,
        textAlign: "center",
    },
    btn: {
        marginTop: 30,
        padding: "14px 0",
        borderRadius: 12,
        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 16,
        textTransform: "none",
        boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px 0 rgba(99, 102, 241, 0.5)",
        },
        "&.Mui-disabled": {
            background: "rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.3)",
            boxShadow: "none",
        }
    },
    signupLink: {
        marginTop: 20,
        textAlign: "center",
        color: "#94a3b8",
        fontSize: 15,
        fontFamily: '"Inter", "Roboto", sans-serif',
        "& a": {
            color: "#a855f7",
            textDecoration: "none",
            fontWeight: 600,
            marginLeft: 5,
            transition: "color 0.2s ease",
            "&:hover": {
                color: "#c084fc",
                textDecoration: "underline",
            }
        }
    }
}));

function Login() {
    const [values, setValues] = useState({
        password: "",
        username: "",
    });
    const [isValidData, setIsValidData] = useState(true);
    const dispatch = useDispatch();
    const loginError = useSelector((state) => state.auth.error);
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
            dispatch(userActions.login(username, password));
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
            <form className={styles.form} onSubmit={onSubmit} noValidate>
                <h1 className={styles.title}>Welcome back!</h1>
                <p className={styles.caption}>
                    Please enter your username and password.
                </p>
                <Box>
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
                        InputProps={{
                            classes: {
                                root: styles.textFieldRoot,
                                focused: styles.focused,
                                notchedOutline: styles.notchedOutline,
                                error: styles.error,
                            },
                        }}
                        InputLabelProps={{
                            classes: { root: styles.label },
                        }}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                        value={values.password}
                        onChange={hangleChange}
                        onFocus={onFocus}
                        error={!isValidData}
                        InputProps={{
                            classes: {
                                root: styles.textFieldRoot,
                                focused: styles.focused,
                                notchedOutline: styles.notchedOutline,
                                error: styles.error,
                            },
                        }}
                        InputLabelProps={{
                            classes: { root: styles.label },
                        }}
                    />

                    {!isValidData ? (
                        <div className={styles.errorMessage}>
                            {loginError}
                        </div>
                    ) : null}
                </Box>
                <div className={styles.signupLink}>
                    Don't have an account? <NavLink to={'/register'}>Sign up</NavLink>
                </div>
                <Button
                    type="submit"
                    color={values.username && values.password ? "primary" : "secondary"}
                    size="large"
                    variant="contained"
                    className={styles.btn}
                >
                    Sign In
                </Button>
            </form>
        </Box>
    );
}

export default Login;
