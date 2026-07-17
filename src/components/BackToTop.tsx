"use client";

import { useEffect, useState } from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SHOW_AFTER = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Zoom in={visible}>
      <Tooltip title="Lên đầu trang" placement="left">
        <Fab
          onClick={scrollToTop}
          aria-label="Lên đầu trang"
          size="medium"
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 32 },
            right: { xs: 76, md: 104 },
            zIndex: 110,
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            bgcolor: "primary.main",
            color: "#fff",
            boxShadow: 4,
            "&:hover": {
              bgcolor: "secondary.main",
              transform: "scale(1.08)",
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
