"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const specs = [product.storage, product.ram, product.color].filter(Boolean);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea
        component={Link}
        href={`/products/${product.id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            position: "relative",
            aspectRatio: "1",
            bgcolor: "#f5f3f4",
            p: 3,
            overflow: "hidden",
          }}
        >
          <Chip
            label={product.condition === "new" ? "MỚI" : "CŨ"}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 1,
              bgcolor: product.condition === "new" ? "success.main" : "warning.main",
              color: "#fff",
              fontWeight: 700,
              fontSize: 10,
            }}
          />
          {product.image_url ? (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "transform 0.5s ease",
                ".MuiCard-root:hover &": { transform: "scale(1.1)" },
              }}
            >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "contain" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              Không có ảnh
            </Box>
          )}
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
            "&:last-child": { pb: 3 },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              mb: 0.5,
              lineHeight: 1
            }}>
            {product.brand}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1.5,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Typography>

          {specs.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                mb: 3
              }}>
              {specs.map((spec) => (
                <Chip
                  key={spec}
                  label={spec}
                  size="small"
                  sx={{
                    bgcolor: "#eae7e9",
                    color: "text.secondary",
                    borderRadius: 1,
                    height: 22,
                    textTransform: "uppercase",
                  }}
                />
              ))}
            </Stack>
          )}

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "auto"
            }}>
            <Typography
              sx={{
                color: "price.main",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "-0.01em",
              }}
            >
              {formatPrice(product.price)}
            </Typography>
            <IconButton
              component="span"
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                borderRadius: 2,
                "&:hover": { bgcolor: "secondary.main" },
              }}
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
