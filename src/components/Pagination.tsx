"use client";

import Link from "next/link";
import { Box, Pagination as MuiPagination } from "@mui/material";

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
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <MuiPagination
        page={currentPage}
        count={totalPages}
        color="secondary"
        shape="rounded"
        size="large"
        renderItem={(item) => {
          if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
            return (
              <Box
                sx={{
                  minWidth: 40,
                  height: 40,
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
                  minWidth: 40,
                  height: 40,
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
                minWidth: 40,
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                textDecoration: "none",
                fontWeight: item.selected ? 700 : 500,
                fontSize: 14,
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
