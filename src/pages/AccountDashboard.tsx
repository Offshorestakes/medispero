import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MapPin, User, Truck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import OrderHistory from "@/components/account/OrderHistory";
import ShipmentTracking from "@/components/account/ShipmentTracking";
import SavedAddresses from "@/components/account/SavedAddresses";
import ProfileSettings from "@/components/account/ProfileSettings";

const AccountDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>My Account | Medi Spero</title>
        <meta name="description" content="Manage your Medi Spero account, view order history, track shipments, and manage saved addresses." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/30">
        <div className="container-wide py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">My Account</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.email?.split("@")[0]}
            </p>
          </div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0">
              <TabsTrigger
                value="orders"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-4 rounded-lg border border-border bg-card"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Order History</span>
                <span className="sm:hidden">Orders</span>
              </TabsTrigger>
              <TabsTrigger
                value="tracking"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-4 rounded-lg border border-border bg-card"
              >
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Track Shipments</span>
                <span className="sm:hidden">Tracking</span>
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-4 rounded-lg border border-border bg-card"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Saved Addresses</span>
                <span className="sm:hidden">Addresses</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-4 rounded-lg border border-border bg-card"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile Settings</span>
                <span className="sm:hidden">Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              <OrderHistory />
            </TabsContent>

            <TabsContent value="tracking" className="mt-6">
              <ShipmentTracking />
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <SavedAddresses />
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AccountDashboard;
