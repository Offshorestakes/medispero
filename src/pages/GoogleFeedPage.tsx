import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { toast } from "sonner";

const SITE_URL = "https://medispero.com";

const escapeXml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const getGoogleCategory = (category: string): string => {
  const map: Record<string, string> = {
    "pharma-capsules": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "adhd-focus": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "anti-anxiety": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "mood-support": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "cbd-oils": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "cbd-isolate-powder": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "cbd-isolate-crystals": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "cbd-isolate-pure-spectrum": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "cbd-vape": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "cbd-capsules": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "sleep-wellness": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
    "cbd-skincare": "Health &gt; Personal Care &gt; Cosmetics &gt; Skin Care",
    "bundles": "Health &gt; Health Care &gt; Medicine &amp; Drugs",
  };
  return map[category] || "Health &gt; Health Care &gt; Medicine &amp; Drugs";
};

const generateGoogleFeedXml = (): string => {
  const items = products
    .map((product) => {
      const imageUrl = product.images[0].startsWith("http")
        ? escapeXml(product.images[0])
        : `${SITE_URL}${escapeXml(product.images[0])}`;

      const additionalImages = product.images
        .slice(1, 10)
        .map((img) => {
          const url = img.startsWith("http") ? img : `${SITE_URL}${img}`;
          return `      <g:additional_image_link>${escapeXml(url)}</g:additional_image_link>`;
        })
        .join("\n");

      const productLink = `${SITE_URL}/product/${escapeXml(product.slug)}`;
      const availability = product.inStock ? "in_stock" : "out_of_stock";
      const categoryLabel = product.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.shortDescription || product.description.slice(0, 5000))}</g:description>
      <g:link>${productLink}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
${additionalImages}
      <g:availability>${availability}</g:availability>
      <g:price>${product.originalPrice ? product.originalPrice.toFixed(2) : product.price.toFixed(2)} USD</g:price>${product.originalPrice ? `\n      <g:sale_price>${product.price.toFixed(2)} USD</g:sale_price>` : ""}
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:condition>new</g:condition>
      <g:gtin>${escapeXml(product.gtin)}</g:gtin>
      <g:google_product_category>${getGoogleCategory(product.category)}</g:google_product_category>
      <g:product_type>Hemp &amp; CBD &gt; ${escapeXml(categoryLabel)}</g:product_type>
      <g:item_group_id>${escapeXml(product.category)}</g:item_group_id>
      <g:identifier_exists>true</g:identifier_exists>
      <g:shipping>
        <g:country>US</g:country>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:custom_label_0>${escapeXml(categoryLabel)}</g:custom_label_0>
      <g:custom_label_1>${product.thirdPartyTested ? "Lab Tested" : ""}</g:custom_label_1>
      <g:custom_label_2>${product.organic ? "Organic" : ""}</g:custom_label_2>
      <g:custom_label_3>${product.madeInUSA ? "Made in USA" : ""}</g:custom_label_3>
      <g:custom_label_4>${product.originalPrice ? "On Sale" : "Regular Price"}</g:custom_label_4>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Medi Spero - Premium CBD &amp; Hemp Wellness Products</title>
    <link>${SITE_URL}</link>
    <description>Premium pharmaceutical-grade CBD and hemp wellness products by Medi Spero</description>
${items}
  </channel>
</rss>`;
};

const escapeCsvField = (field: string): string => {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
};

const generateGoogleFeedCsv = (): string => {
  const headers = [
    "id", "title", "description", "link", "image_link", "additional_image_link",
    "availability", "price", "sale_price", "brand", "condition", "gtin",
    "google_product_category", "product_type", "item_group_id",
    "identifier_exists", "shipping", "custom_label_0", "custom_label_1",
    "custom_label_2", "custom_label_3", "custom_label_4",
  ];

  const rows = products.map((product) => {
    const imageUrl = product.images[0].startsWith("http")
      ? product.images[0]
      : `${SITE_URL}${product.images[0]}`;
    const additionalImages = product.images
      .slice(1, 10)
      .map((img) => (img.startsWith("http") ? img : `${SITE_URL}${img}`))
      .join(",");
    const productLink = `${SITE_URL}/product/${product.slug}`;
    const categoryLabel = product.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    return [
      product.id,
      product.name,
      product.shortDescription || product.description.slice(0, 5000),
      productLink,
      imageUrl,
      additionalImages,
      product.inStock ? "in_stock" : "out_of_stock",
      product.originalPrice ? `${product.originalPrice.toFixed(2)} USD` : `${product.price.toFixed(2)} USD`,
      product.originalPrice ? `${product.price.toFixed(2)} USD` : "",
      product.brand,
      "new",
      product.gtin,
      "Health > Health Care > Medicine & Drugs",
      `Hemp & CBD > ${categoryLabel}`,
      product.category,
      "true",
      "US::0.00 USD",
      categoryLabel,
      product.thirdPartyTested ? "Lab Tested" : "",
      product.organic ? "Organic" : "",
      product.madeInUSA ? "Made in USA" : "",
      product.originalPrice ? "On Sale" : "Regular Price",
    ].map((f) => escapeCsvField(String(f)));
  });

  return [headers.join("\t"), ...rows.map((r) => r.join("\t"))].join("\n");
};

const GoogleFeedPage = () => {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const handleDownloadXml = () => {
    const xml = generateGoogleFeedXml();
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medispero-google-merchant-feed-${new Date().toISOString().split("T")[0]}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedFormat("xml");
    toast.success(`Google Merchant XML feed downloaded with ${products.length} products!`);
  };

  const handleDownloadTsv = () => {
    const tsv = generateGoogleFeedCsv();
    const blob = new Blob([tsv], { type: "text/tab-separated-values;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medispero-google-merchant-feed-${new Date().toISOString().split("T")[0]}.tsv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedFormat("tsv");
    toast.success(`Google Merchant TSV feed downloaded with ${products.length} products!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Google Merchant Center Feed | Medi Spero Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-1 section-padding">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Google Merchant Center Feed
            </h1>
            <p className="text-muted-foreground">
              Download your complete product catalog for Google Shopping ads.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Products", value: products.length },
              { label: "In Stock", value: products.filter((p) => p.inStock).length },
              { label: "On Sale", value: products.filter((p) => p.originalPrice).length },
              { label: "Categories", value: new Set(products.map((p) => p.category)).size },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Download Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* XML Feed */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="mb-4">
                {downloadedFormat === "xml" ? (
                  <CheckCircle className="h-12 w-12 text-secondary mx-auto" />
                ) : (
                  <ShoppingBag className="h-12 w-12 text-primary mx-auto" />
                )}
              </div>
              <h2 className="text-lg font-semibold mb-2">XML Feed (Recommended)</h2>
              <p className="text-sm text-muted-foreground mb-6">
                RSS 2.0 format — best for Google Merchant Center scheduled fetches
              </p>
              <Button size="lg" className="btn-primary gap-2 w-full" onClick={handleDownloadXml}>
                <Download className="h-5 w-5" />
                Download XML
              </Button>
            </div>

            {/* TSV Feed */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="mb-4">
                {downloadedFormat === "tsv" ? (
                  <CheckCircle className="h-12 w-12 text-secondary mx-auto" />
                ) : (
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto" />
                )}
              </div>
              <h2 className="text-lg font-semibold mb-2">TSV Feed</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Tab-separated format — for manual upload to Merchant Center
              </p>
              <Button size="lg" variant="outline" className="gap-2 w-full" onClick={handleDownloadTsv}>
                <Download className="h-5 w-5" />
                Download TSV
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-4">How to Submit to Google Merchant Center</h3>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                <span>Go to <a href="https://merchants.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Merchant Center</a> and sign in</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                <span>Navigate to <strong>Products</strong> → <strong>Feeds</strong> → <strong>+ Primary feed</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                <span>Select <strong>United States</strong> as target country and <strong>English</strong> as language</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                <span>Choose <strong>"Upload a file"</strong> and select the downloaded XML or TSV file</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</span>
                <span>Google will process and validate your feed within <strong>24-72 hours</strong></span>
              </li>
            </ol>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Feed fields:</strong> id, title, description, link, image_link, additional_image_link, availability, price, sale_price, brand, condition, gtin, google_product_category, product_type, item_group_id, shipping, custom_label_0–4
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GoogleFeedPage;
