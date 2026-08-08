import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "V-RAE — Rethinking Video Latent Spaces for Generation",
  description: "V-RAE builds semantically structured video latents on frozen visual representations for reconstruction, generation, and predictive modeling.",
  icons: { icon: "/favicon-v2.svg", shortcut: "/favicon-v2.svg" },
  openGraph: {
    title: "V-RAE — Rethinking Video Latent Spaces for Generation",
    description: "Semantic, temporally coherent video latents that are easier to generate.",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 910, alt: "V-RAE — Rethinking Video Latent Spaces for Generation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "V-RAE — Rethinking Video Latent Spaces for Generation",
    description: "Semantic, temporally coherent video latents that are easier to generate.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
