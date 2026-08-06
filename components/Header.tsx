"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Visual", href: "/visual" },
  { label: "About", href: "/about" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "text.primary",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            VNNNV
          </Typography>
          <Box component="nav" sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  sx={{
                    color: isActive ? "text.primary" : "text.secondary",
                    fontWeight: isActive ? 600 : 400,
                    borderBottom: isActive
                      ? "2px solid currentColor"
                      : "2px solid transparent",
                    borderRadius: 0,
                    px: { xs: 1, sm: 1.5 },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
