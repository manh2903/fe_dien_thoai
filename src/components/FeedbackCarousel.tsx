"use client";

import { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import type { Feedback } from "@/lib/feedbacks";

interface FeedbackCarouselProps {
  feedbacks: Feedback[];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const avatarColors = [
  "#2563EB",
  "#0F172A",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
  "#06B6D4",
];

const SCROLL_SPEED = 0.6;

export function FeedbackCarousel({ feedbacks }: FeedbackCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || feedbacks.length === 0) return;

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    let frameId = 0;

    const tick = () => {
      if (!pausedRef.current && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) {
          frameId = requestAnimationFrame(tick);
          return;
        }

        el.scrollLeft += SCROLL_SPEED;

        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [feedbacks]);

  if (feedbacks.length === 0) return null;

  const displayFeedbacks = [...feedbacks, ...feedbacks];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 8 },
        bgcolor: "#F8FAFC",
        borderTop: 1,
        borderBottom: 1,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="overline"
            color="secondary"
            sx={{ display: "block", mb: 1 }}
          >
            Đánh giá
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Khách hàng nói gì về PhoneShop
          </Typography>
          <Typography
            sx={{ color: "text.secondary", mt: 1, fontSize: { xs: 14, md: 16 } }}
          >
            {feedbacks.length} đánh giá được chọn ngẫu nhiên từ hàng nghìn phản hồi
          </Typography>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {displayFeedbacks.map((fb, index) => (
            <Card
              key={`${fb.id}-${index}`}
              sx={{
                minWidth: { xs: 280, sm: 320, md: 360 },
                maxWidth: { xs: 280, sm: 320, md: 360 },
                flexShrink: 0,
                position: "relative",
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                <FormatQuoteIcon
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontSize: 40,
                    color: "rgba(37, 99, 235, 0.08)",
                    transform: "rotate(180deg)",
                  }}
                />

                <Rating
                  value={fb.rating}
                  readOnly
                  size="small"
                  sx={{ mb: 2, color: "#F59E0B" }}
                />

                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    fontSize: { xs: 14, md: 15 },
                    minHeight: { xs: 72, md: 80 },
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {fb.content}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mt: 3, alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: avatarColors[index % avatarColors.length],
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(fb.name)}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }} noWrap>
                      {fb.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block" }}
                      noWrap
                    >
                      {fb.city} · {fb.product}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
