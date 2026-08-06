"use client";

import Box from "@mui/material/Box";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pickRandom } from "@/lib/headerImages";

const textSx = {
  color: "#fff",
  fontFamily: "var(--font-lato), Helvetica, Arial, sans-serif",
  fontSize: { xs: "0.55rem", sm: "0.7rem", md: "0.875rem" },
  letterSpacing: "0.18em",
  lineHeight: 1.7,
  m: 0,
} as const;

const linkSx = {
  ...textSx,
  textDecoration: "none",
  display: "block",
  "&:hover": { opacity: 0.85 },
} as const;

type FooterProps = {
  images: readonly string[];
};

export default function Footer({ images }: FooterProps) {
  const pathname = usePathname();
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) {
      return;
    }
    setBackgroundSrc(pickRandom(images));
  }, [images, isHome]);

  if (isHome) {
    return null;
  }

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        width: "100%",
        height: 200,
        overflow: "hidden",
        bgcolor: "#000",
        mt: "auto",
        flexShrink: 0,
      }}
    >
      {backgroundSrc ? (
        <Image
          src={backgroundSrc}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : null}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.1)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4, md: 6 },
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          <Box component="p" sx={textSx}>
            Noe Lamas
          </Box>
          <Box component="p" sx={textSx}>
            Photo, Video
          </Box>
          <Box component="p" sx={textSx}>
            Creative Direction
          </Box>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            width: "min(28vw, 180px)",
            lineHeight: 0,
          }}
        >
          <Box
            component="img"
            src="/images/logo/vnnnv.svg"
            alt="vnnnv"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "right",
          }}
        >
          <Box
            component="a"
            href="tel:+34656918429"
            sx={{ ...linkSx, textTransform: "none" }}
          >
            +34 656 918 429
          </Box>
          <Box
            component="a"
            href="mailto:noelamasalonso@gmail.com"
            sx={{ ...linkSx, textTransform: "none" }}
          >
            noelamasalonso@gmail.com
          </Box>
          <Box component="p" sx={{ ...textSx, textTransform: "none" }}>
            08019 BCN - SPAIN
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
