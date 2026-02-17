import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, Copy, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { toast } from "sonner";

const SITE_URL = "https://medispero.com";

const escapeCsvField = (field: string): string => {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
};

const getCategoryForGoogle = (category: string): string => {
  const map: Record<string, string> = {
    "pharma-capsules": "Health > Health Care > Medicine & Drugs",
    "adhd-focus": "Health > Health Care > Medicine & Drugs",
    "anti-anxiety": "Health > Health Care > Medicine & Drugs",
    "mood-support": "Health > Health Care > Medicine & Drugs",
    "cbd-oils": "Health > Health Care > Medicine & Drugs",
    "cbd-isolate-powder": "Health > Health Care > Medicine & Drugs",
    "cbd-isolate-crystals": "Health > Health Care > Medicine & Drugs",
    "cbd-isolate-pure-spectrum": "Health > Health Care > Medicine & Drugs",
    "cbd-vape": "Health > Health Care > Medicine & Drugs",
    "cbd-capsules": "Health > Health Care > Medicine & Drugs",
    "sleep-wellness": "Health > Health Care > Medicine & Drugs",
    "cbd-skincare": "Health > Personal Care > Cosmetics > Skin Care",
    "bundles": "Health > Health Care > Medicine & Drugs",
  };
  return map[category] || "Health > Health Care > Medicine & Drugs";
};

const generatePinterestCsv = (): string => {
  const headers = [
    "id",
    "title",
    "description",
    "link",
    "image_link",
    "price",
    "availability",
    "brand",
    "condition",
    "google_product_category",
    "product_type",
    "item_group_id",
    "sale_price",
    "gtin",
    "custom_label_0",
    "custom_label_1",
    "custom_label_2",
    "custom_label_3",
    "custom_label_4",
  ];

  const rows = products.map((product) => {
    // Resolve image URL - product.images[0] is a Vite-resolved path
    const imageUrl = product.images[0].startsWith("http")
      ? product.images[0]
      : `${SITE_URL}${product.images[0]}`;

    const productLink = `${SITE_URL}/product/${product.slug}`;
    const availability = product.inStock ? "in stock" : "out of stock";
    const price = `${product.price.toFixed(2)} USD`;
    const salePrice = product.originalPrice
      ? `${product.price.toFixed(2)} USD`
      : "";
    const originalPriceStr = product.originalPrice
      ? `${product.originalPrice.toFixed(2)} USD`
      : price;

    // Use category as item_group_id for variant grouping
    const itemGroupId = product.category;

    // Custom labels for filtering in Pinterest
    const customLabel0 = product.category.replace(/-/g, " "); // category
    const customLabel1 = product.thirdPartyTested ? "Lab Tested" : "";
    const customLabel2 = product.organic ? "Organic" : "";
    const customLabel3 = product.madeInUSA ? "Made in USA" : "";
    const customLabel4 = product.originalPrice ? "On Sale" : "";

    return [
      product.id,
      product.name,
      product.shortDescription || product.description.slice(0, 500),
      productLink,
      imageUrl,
      product.originalPrice ? `${product.originalPrice.toFixed(2)} USD` : price,
      availability,
      product.brand,
      "new",
      getCategoryForGoogle(product.category),
      `Hemp & CBD > ${product.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`,
      itemGroupId,
      salePrice,
      product.gtin,
      customLabel0,
      customLabel1,
      customLabel2,
      customLabel3,
      customLabel4,
    ].map((field) => escapeCsvField(String(field)));
  });

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};

const PinterestFeedPage = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const csv = generatePinterestCsv();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medispero-pinterest-catalog-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    toast.success(`Pinterest catalog downloaded with ${products.length} products!`);
  };

  const handleCopyCount = () => {
    navigator.clipboard.writeText(String(products.length));
    toast.success("Product count copied!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pinterest Product Feed | Medi Spero Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-1 section-padding">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Pinterest Product Catalog
            </h1>
            <p className="text-muted-foreground">
              Download your complete product catalog as a CSV file for Pinterest.
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

          {/* Download Card */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center mb-8">
            <div className="mb-6">
              {downloaded ? (
                <CheckCircle className="h-16 w-16 text-secondary mx-auto" />
              ) : (
                <Download className="h-16 w-16 text-primary mx-auto" />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {downloaded ? "Catalog Downloaded!" : "Ready to Export"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {downloaded
                ? "Upload this CSV file to Pinterest Business > Catalogs > Data Sources"
                : `${products.length} products ready for Pinterest catalog submission`}
            </p>
            <Button size="lg" className="btn-primary gap-2" onClick={handleDownload}>
              <Download className="h-5 w-5" />
              {downloaded ? "Download Again" : "Download Pinterest CSV"}
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-4">How to Submit to Pinterest</h3>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                <span>Go to <a href="https://business.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Pinterest Business</a> and sign in</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                <span>Navigate to <strong>Catalogs</strong> → <strong>Data Sources</strong> → <strong>Add Data Source</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                <span>Choose <strong>"Upload file"</strong> and select the downloaded CSV</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                <span>Map the fields (they should auto-map) and click <strong>Submit</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</span>
                <span>Pinterest will validate your catalog within <strong>24-48 hours</strong></span>
              </li>
            </ol>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>CSV Fields included:</strong> id, title, description, link, image_link, price, availability, brand, condition, google_product_category, product_type, item_group_id, sale_price, gtin, custom_label_0–4
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PinterestFeedPage;
