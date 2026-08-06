"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type PageShellProps = {
  title: string;
  description: string;
};

export default function PageShell({ title, description }: PageShellProps) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ maxWidth: 720 }}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: "2.25rem", md: "3rem" } }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
          {description}
        </Typography>
      </Box>
    </Container>
  );
}
