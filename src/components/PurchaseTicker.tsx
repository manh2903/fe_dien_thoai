"use client";

import { useEffect, useMemo, useRef } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { PurchaseNotificationDisplay } from "@/lib/purchase-notifications";

const SCROLL_SPEED = 0.8;

function NotificationItem({ item }: { item: PurchaseNotificationDisplay }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        flexShrink: 0,
        px: 2,
        py: 0.75,
        mx: 1,
        borderRadius: 999,
        bgcolor: "rgba(16, 185, 129, 0.08)",
        border: "1px solid rgba(16, 185, 129, 0.2)",
        whiteSpace: "nowrap",
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 16, color: "success.main" }} />
      <Typography component="span" sx={{ fontSize: { xs: 12, sm: 13 }, color: "text.primary" }}>
        <Box component="span" sx={{ fontWeight: 700 }}>
          Cảm ơn {item.name}!
        </Box>
        {" · SĐT: "}
        <Box component="span" sx={{ color: "secondary.main", fontWeight: 600 }}>
          {item.maskedPhone}
        </Box>
        {" · Vừa mua "}
        <Box component="span" sx={{ fontWeight: 600 }}>{item.product}</Box>
        {" · "}
        <Box component="span" sx={{ color: "text.secondary" }}>
          {item.timeLabel}
        </Box>
      </Typography>
    </Box>
  );
}

export function PurchaseTicker({
  notifications,
}: {
  notifications: PurchaseNotificationDisplay[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const displayItems = useMemo(
    () => [...notifications, ...notifications],
    [notifications]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    let frameId = 0;

    const tick = () => {
      if (!pausedRef.current && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          el.scrollLeft += SCROLL_SPEED;
          const halfWidth = el.scrollWidth / 2;
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [displayItems]);

  return (
    <Box
      sx={{
        bgcolor: "#F0FDF4",
        borderBottom: 1,
        borderColor: "rgba(16, 185, 129, 0.15)",
        overflow: "hidden",
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          overflowY: "hidden",
          py: 1,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {displayItems.map((item, index) => (
          <NotificationItem key={`${item.id}-${index}`} item={item} />
        ))}
      </Box>
    </Box>
  );
}
