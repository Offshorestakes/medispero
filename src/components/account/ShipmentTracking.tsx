import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Truck, Package, CheckCircle, Clock, MapPin, Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ShippingAddress {
  full_name?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping_address: ShippingAddress | null;
}

const ShipmentTracking = () => {
  const { user } = useAuth();
  const [activeShipments, setActiveShipments] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveShipments = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .in("status", ["pending", "processing", "shipped"])
          .order("created_at", { ascending: false });

        if (error) throw error;

        const typedData = (data || []).map(order => ({
          ...order,
          shipping_address: order.shipping_address as ShippingAddress | null
        }));

        setActiveShipments(typedData);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveShipments();
  }, [user]);

  const getTrackingSteps = (status: string) => {
    const steps = [
      { label: "Order Placed", icon: Box, completed: true },
      { label: "Processing", icon: Clock, completed: ["processing", "shipped", "delivered"].includes(status) },
      { label: "Shipped", icon: Truck, completed: ["shipped", "delivered"].includes(status) },
      { label: "Delivered", icon: CheckCircle, completed: status === "delivered" },
    ];
    return steps;
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case "pending":
        return 12.5;
      case "processing":
        return 37.5;
      case "shipped":
        return 62.5;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  const getEstimatedDelivery = (createdAt: string, status: string) => {
    const orderDate = new Date(createdAt);
    const estimatedDays = status === "shipped" ? 3 : 7;
    const estimatedDate = new Date(orderDate);
    estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);
    return format(estimatedDate, "MMMM d, yyyy");
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeShipments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No active shipments</h3>
            <p className="text-muted-foreground">
              When you have orders in transit, you can track them here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Active Shipments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeShipments.map((shipment) => {
            const steps = getTrackingSteps(shipment.status);
            const progress = getProgressValue(shipment.status);

            return (
              <div key={shipment.id} className="border rounded-lg p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="font-semibold">
                      Order #{shipment.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {format(new Date(shipment.created_at), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {shipment.status === "shipped" ? "In Transit" : shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Est. delivery: {getEstimatedDelivery(shipment.created_at, shipment.status)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Tracking Steps */}
                <div className="grid grid-cols-4 gap-2">
                  {steps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 transition-colors ${
                          step.completed
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      <p className={`text-xs ${step.completed ? "font-medium" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Shipping Details */}
                {shipment.shipping_address && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Shipping to:</p>
                        <p className="text-sm text-muted-foreground">
                          {shipment.shipping_address.full_name}<br />
                          {shipment.shipping_address.street_address}<br />
                          {shipment.shipping_address.city}, {shipment.shipping_address.state} {shipment.shipping_address.zip_code}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tracking Number (simulated) */}
                {shipment.status === "shipped" && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Tracking Number:</span>{" "}
                      <span className="font-mono text-primary">
                        1Z{shipment.id.slice(0, 6).toUpperCase()}X{Math.random().toString(36).slice(2, 8).toUpperCase()}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentTracking;
