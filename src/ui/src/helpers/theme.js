import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#60a5fa",
      main: "#3b82f6",
      dark: "#2563eb",
      contrastText: "#fff",
    },
    secondary: {
      light: "#a78bfa",
      main: "#8b5cf6",
      dark: "#7c3aed",
      contrastText: "#fff",
    },
    background: {
      default: "#0f172a",
      paper: "rgba(30, 41, 59, 0.7)",
    },
    common: {
      black: "#000",
      white: "#fff",
      bg: "#0f172a", // Dark background
      inputbg: "rgba(255, 255, 255, 0.05)",
      inputHover: "rgba(255, 255, 255, 0.1)",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Outfit", "Inter", sans-serif',
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1440 },
  },
  overrides: {
    MuiButton: {
      root: {
        height: 48,
        borderRadius: 12,
        transition: "all 0.3s ease",
        "& $label": {
          fontSize: 15,
          fontWeight: 600,
          textTransform: "none",
          letterSpacing: "0.5px",
        },
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
        },
      },
      sizeLarge: {
        height: 54,
        fontSize: 16,
      },
      containedPrimary: {
        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        boxShadow: "0 4px 14px 0 rgba(139, 92, 246, 0.39)",
      },
      containedSecondary: {
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "none",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.2)",
        }
      },
      outlined: {
        padding: "7px 30px",
        borderRadius: 12,
        borderColor: "rgba(255, 255, 255, 0.3)",
        "& $label": {
          color: "#fff",
        },
      },
    },
    MuiTextField: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 12,
          transition: "all 0.3s ease",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
          "&.Mui-focused": {
            border: "1px solid #3b82f6",
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.2)",
          }
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255, 255, 255, 0.7)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        }
      }
    },
    MuiPaper: {
      root: {
        backdropFilter: "blur(16px)",
        backgroundColor: "rgba(30, 41, 59, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 16,
      }
    }
  },
});
