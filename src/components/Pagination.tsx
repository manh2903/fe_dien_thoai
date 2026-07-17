"use client";

import Link from "next/link";
import { Box, Pagination as MuiPagination, useMediaQuery, useTheme } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (totalPages <= 1) return null;

  const itemSize = isMobile ? 36 : 40;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", overflowX: "auto", px: 1 }}>
      <MuiPagination
        page={currentPage}
        count={totalPages}
        color="secondary"
        shape="rounded"
        size={isMobile ? "medium" : "large"}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={isMobile ? 1 : 1}
        renderItem={(item) => {
          if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
            return (
              <Box
                sx={{
                  minWidth: itemSize,
                  height: itemSize,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                …
              </Box>
            );
          }

          let page = item.page ?? currentPage;
          if (item.type === "previous") page = Math.max(1, currentPage - 1);
          if (item.type === "next") page = Math.min(totalPages, currentPage + 1);

          const href = page <= 1 ? basePath : `${basePath}?page=${page}`;
          const disabled =
            (item.type === "previous" && currentPage <= 1) ||
            (item.type === "next" && currentPage >= totalPages);

          const label =
            item.type === "previous"
              ? "‹"
              : item.type === "next"
                ? "›"
                : String(item.page);

          if (disabled) {
            return (
              <Box
                sx={{
                  minWidth: itemSize,
                  height: itemSize,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  color: "action.disabled",
                  border: "1px solid",
                  borderColor: "divider",
                  mx: 0.25,
                }}
              >
                {label}
              </Box>
            );
          }

          return (
            <Box
              component={Link}
              href={href}
              sx={{
                minWidth: itemSize,
                height: itemSize,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                textDecoration: "none",
                fontWeight: item.selected ? 700 : 500,
                fontSize: isMobile ? 13 : 14,
                bgcolor: item.selected ? "secondary.main" : "transparent",
                color: item.selected ? "#fff" : "text.primary",
                border: item.selected ? "none" : "1px solid",
                borderColor: "divider",
                mx: 0.25,
                "&:hover": {
                  borderColor: "secondary.main",
                  color: item.selected ? "#fff" : "secondary.main",
                },
              }}
            >
              {label}
            </Box>
          );
        }}
      />
    </Box>
  );
}
