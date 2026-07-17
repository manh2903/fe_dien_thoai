"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    price: Palette["primary"];
    successTag: Palette["primary"];
  }
  interface PaletteOptions {
    price?: PaletteOptions["primary"];
    successTag?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#0F172A",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2563EB",
      dark: "#0051d5",
      contrastText: "#ffffff",
    },
    error: {
      main: "#DC2626",
    },
    success: {
      main: "#10B981",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1b1b1d",
      secondary: "#45474c",
    },
    divider: "rgba(197, 198, 205, 0.4)",
    price: {
      main: "#DC2626",
      contrastText: "#ffffff",
    },
    successTag: {
      main: "#10B981",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), Inter, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
    overline: {
      fontWeight: 600,
      letterSpacing: "0.05em",
      fontSize: "0.75rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 24,
          paddingBlock: 12,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#0F172A",
            "&:hover": {
              backgroundColor: "#2563EB",
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: "1px solid rgba(197, 198, 205, 0.3)",
          boxShadow: "none",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "0.625rem",
          letterSpacing: "0.02em",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(251, 248, 250, 0.85)",
          color: "#0F172A",
          boxShadow: "0 1px 0 rgba(197, 198, 205, 0.4)",
          backdropFilter: "blur(12px)",
        },
      },
    },
  },
});
