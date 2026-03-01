import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSEO } from "@/config/seoConfig";

export function useSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSEO(pathname);

    // ── Page Title ──────────────────────────────────────
    document.title = seo.title;

    // ── Meta Description ────────────────────────────────
    setMeta("name", "description", seo.description);

    // ── Canonical ───────────────────────────────────────
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;

    // ── Open Graph ──────────────────────────────────────
    setMeta("property", "og:title", seo.ogTitle);
    setMeta("property", "og:description", seo.ogDescription);
    setMeta("property", "og:url", seo.canonical);
    setMeta("property", "og:image", seo.ogImage);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Medi Spero");

    // ── Twitter Card ─────────────────────────────────────
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.ogTitle);
    setMeta("name", "twitter:description", seo.ogDescription);
    setMeta("name", "twitter:image", seo.ogImage);
  }, [pathname]);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}
