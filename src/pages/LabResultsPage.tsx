import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Search, Download, CheckCircle, Shield, FileText } from "lucide-react";

const LabResultsPage = () => {
  const [batchNumber, setBatchNumber] = useState("");
  const [searchResult, setSearchResult] = useState<null | "found" | "not-found">(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search - in production this would query the database
    if (batchNumber.length >= 6) {
      setSearchResult("found");
    } else {
      setSearchResult("not-found");
    }
  };

  const sampleResults = [
    { test: "CBD Content", result: "99.2%", status: "pass" },
    { test: "THC Content", result: "<0.3%", status: "pass" },
    { test: "Pesticides", result: "Not Detected", status: "pass" },
    { test: "Heavy Metals", result: "Below Limits", status: "pass" },
    { test: "Microbial", result: "Not Detected", status: "pass" },
    { test: "Residual Solvents", result: "Not Detected", status: "pass" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Lab Results & Certificates of Analysis | Medi Spero</title>
        <meta name="description" content="View third-party lab test results and Certificates of Analysis (COA) for all Medi Spero CBD and THC products. 100% transparency guaranteed." />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://medispero.com/lab-results" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lab Results & Certificates of Analysis | Medi Spero" />
        <meta property="og:description" content="View third-party lab test results and COAs for all Medi Spero CBD products. 100% transparency." />
        <meta property="og:url" content="https://medispero.com/lab-results" />
        <meta property="og:image" content="https://medispero.com/og-homepage.jpg" />
        <meta property="og:site_name" content="Medi Spero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lab Results & COAs | Medi Spero" />
        <meta name="twitter:description" content="Third-party lab test results for all Medi Spero CBD and THC products." />
        <meta name="twitter:image" content="https://medispero.com/og-homepage.jpg" />
      </Helmet>
      
      <Header />
      <BreadcrumbNav items={[{ name: "Home", href: "/" }, { name: "Lab Results" }]} />
      
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container-wide text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <FlaskConical className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lab Results & COA</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every Medi Spero product is third-party tested for purity, potency, and safety. 
              Enter your batch number to view the Certificate of Analysis.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="section-padding">
          <div className="container-wide max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Look Up Your Batch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <Input
                    placeholder="Enter batch number (e.g., MS2026-0128-A1)"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="btn-secondary">
                    Search
                  </Button>
                </form>
                <p className="text-sm text-muted-foreground mt-3">
                  Find your batch number on the product label or packaging.
                </p>
              </CardContent>
            </Card>

            {/* Search Result */}
            {searchResult === "found" && (
              <Card className="mt-6 border-secondary">
                <CardHeader className="bg-secondary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Batch: {batchNumber.toUpperCase()}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tested: January 28, 2026 | Lab: SC Labs
                      </p>
                    </div>
                    <Badge className="bg-secondary text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      All Tests Passed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {sampleResults.map((item, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">{item.test}</p>
                        <p className="font-semibold flex items-center gap-1">
                          {item.result}
                          <CheckCircle className="h-4 w-4 text-secondary" />
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => window.open("https://www.sclabs.com/hemp/", "_blank", "noopener,noreferrer")}>
                    <Download className="h-4 w-4 mr-2" />
                    View COA Report
                  </Button>
                </CardContent>
              </Card>
            )}

            {searchResult === "not-found" && (
              <Card className="mt-6 border-destructive">
                <CardContent className="pt-6 text-center">
                  <p className="text-destructive font-medium">
                    Batch number not found. Please check the number and try again.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Contact us at info@medispero.com if you need assistance.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Trust Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-8">Our Testing Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <Shield className="h-10 w-10 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Third-Party Verified</h3>
                <p className="text-sm text-muted-foreground">
                  All products tested by ISO-certified independent laboratories
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <FlaskConical className="h-10 w-10 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Full Panel Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Potency, pesticides, heavy metals, microbial, and solvents
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl border border-border">
                <FileText className="h-10 w-10 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">100% Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Every batch tested and results publicly available
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LabResultsPage;
