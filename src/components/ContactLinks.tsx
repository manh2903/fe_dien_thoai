"use client";

import {
  Box,
  Fab,
  Stack,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import ForumIcon from "@mui/icons-material/Forum";
import InstagramIcon from "@mui/icons-material/Instagram";
import type { ContactLink, ContactIcon } from "@/types/database";
import type { SvgIconComponent } from "@mui/icons-material";

const iconMap: Record<ContactIcon, SvgIconComponent> = {
  zalo: ChatBubbleIcon,
  phone: CallIcon,
  facebook: ShareIcon,
  messenger: ForumIcon,
  tiktok: LinkIcon,
  instagram: InstagramIcon,
  website: LanguageIcon,
  link: LinkIcon,
};

const colorMap: Partial<Record<ContactIcon, string>> = {
  zalo: "#0068FF",
  phone: "#10B981",
  facebook: "#1877F2",
  messenger: "#0084FF",
};

interface ContactLinksProps {
  links: ContactLink[];
  variant?: "footer" | "floating" | "inline";
}

export function ContactLinks({ links, variant = "footer" }: ContactLinksProps) {
  if (links.length === 0) {
    return (
      <Typography variant="body2" sx={{
        color: "text.secondary"
      }}>Chưa có link liên hệ
              </Typography>
    );
  }

  if (variant === "floating") {
    return (
      <Stack
        spacing={2}
        sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 100 }}
      >
        {links.map((link) => {
          const Icon = iconMap[link.icon] ?? LinkIcon;
          const bg = colorMap[link.icon] ?? "#2563EB";
          return (
            <Tooltip key={link.id} title={link.title} placement="left">
              <Fab
                component="a"
                href={link.url}
                target={link.url.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                size="medium"
                sx={{
                  bgcolor: bg,
                  color: "#fff",
                  boxShadow: 3,
                  "&:hover": { bgcolor: bg, transform: "scale(1.1)" },
                }}
              >
                <Icon />
              </Fab>
            </Tooltip>
          );
        })}
      </Stack>
    );
  }

  if (variant === "inline") {
    return (
      <Stack direction="row" spacing={1.5} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        {links.map((link) => {
          const Icon = iconMap[link.icon] ?? LinkIcon;
          return (
            <Button
              key={link.id}
              component="a"
              href={link.url}
              target={link.url.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<Icon />}
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {link.title}
            </Button>
          );
        })}
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {links.map((link) => {
        const Icon = iconMap[link.icon] ?? LinkIcon;
        return (
          <Box
            key={link.id}
            component="a"
            href={link.url}
            target={link.url.startsWith("tel:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "secondary.main" },
            }}
          >
            <Icon sx={{ fontSize: 20 }} />
            <Typography variant="body1">{link.title}</Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
