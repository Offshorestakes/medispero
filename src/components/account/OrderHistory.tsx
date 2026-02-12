import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Package, ChevronDown, ChevronUp, ExternalLink, Bitcoin, Clock, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shipping_address: {
    full_name?: string;
    fullName?: string;
    street_address?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    zipCode?: string;
  } | null;
  items: OrderItem[];
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode; description: string }> = {
  pending: {
    label: "Pending",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
    icon: <Clock className="h-4 w-4" />,
    description: "Order received, awaiting payment",
  },
  pending_crypto_payment: {
    label: "Awaiting Crypto Payment",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
    icon: <Bitcoin className="h-4 w-4" />,
    description: "Waiting for cryptocurrency payment confirmation on the blockchain",
  },
  partially_paid: {
    label: "Partially Paid",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    icon: <AlertTriangle className="h-4 w-4" />,
    description: "Partial payment received — please send the remaining amount",
  },
  paid: {
    label: "Paid",
    color: "bg-green-500/10 text-green-600 border-green-200",
    icon: <CheckCircle2 className="h-4 w-4" />,
    description: "Payment confirmed — order is being prepared",
  },
  processing: {
    label: "Processing",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    icon: <RefreshCw className="h-4 w-4" />,
    description: "Your order is being prepared for shipment",
  },
  shipped: {
    label: "Shipped",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    icon: <Package className="h-4 w-4" />,
    description: "Your order is on its way",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-500/10 text-green-600 border-green-200",
    icon: <CheckCircle2 className="h-4 w-4" />,
    description: "Order has been delivered",
  },
  payment_failed: {
    label: "Payment Failed",
    color: "bg-red-500/10 text-red-600 border-red-200",
    icon: <XCircle className="h-4 w-4" />,
    description: "Payment was not received or expired",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-500/10 text-red-600 border-red-200",
    icon: <XCircle className="h-4 w-4" />,
    description: "This order has been cancelled",
  },
};

const getStatusInfo = (status: string) => {
  return statusConfig[status] || {
    label: status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' '),
    color: "bg-muted text-muted-foreground",
    icon: <Clock className="h-4 w-4" />,
    description: "",
  };
};

const isCryptoStatus = (status: string) =>
  ['pending_crypto_payment', 'partially_paid', 'payment_failed'].includes(status);

const CryptoPaymentTracker = ({ status }: { status: string }) => {
  const steps = [
    { key: 'pending_crypto_payment', label: 'Awaiting Payment' },
    { key: 'paid', label: 'Payment Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
  ];

  const stepOrder = ['pending_crypto_payment', 'paid', 'processing', 'shipped', 'delivered'];
  const currentIndex = stepOrder.indexOf(status);
  const failed = status === 'payment_failed';

  return (
    <div className="border-t mt-4 pt-4">
      <div className="flex items-center gap-1 mb-2">
        <Bitcoin className="h-4 w-4 text-amber-500" />
        <p className="text-sm font-medium">Crypto Payment Status</p>
      </div>
      {failed ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 text-sm">
          <XCircle className="h-4 w-4 flex-shrink-0" />
          <span>Payment expired or failed. Please place a new order to try again.</span>
        </div>
      ) : status === 'partially_paid' ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 text-yellow-600 text-sm">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>Partial payment received. Please send the remaining amount to complete your order.</span>
        </div>
      ) : (
        <div className="flex items-center gap-0 mt-2">
          {steps.map((step, i) => {
            const active = currentIndex >= stepOrder.indexOf(step.key);
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  <div className={`h-2 flex-1 rounded-l-full ${i === 0 ? '' : active ? 'bg-secondary' : 'bg-border'}`} />
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${active ? 'bg-secondary' : 'bg-border'}`} />
                  <div className={`h-2 flex-1 rounded-r-full ${i === steps.length - 1 ? '' : ''} ${active && currentIndex > stepOrder.indexOf(step.key) ? 'bg-secondary' : 'bg-border'}`} />
                </div>
                <span className={`text-[10px] mt-1 text-center leading-tight ${active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (ordersError) throw ordersError;

        if (ordersData && ordersData.length > 0) {
          const ordersWithItems = await Promise.all(
            ordersData.map(async (order) => {
              const { data: itemsData } = await supabase
                .from("order_items")
                .select("*")
                .eq("order_id", order.id);
              return {
                ...order,
                shipping_address: order.shipping_address as Order["shipping_address"],
                items: itemsData || [],
              };
            })
          );
          setOrders(ordersWithItems);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const toggleOrder = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
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

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">
              When you place an order, it will appear here.
            </p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
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
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.map((order) => {
            const info = getStatusInfo(order.status);
            return (
              <Collapsible
                key={order.id}
                open={expandedOrders.has(order.id)}
                onOpenChange={() => toggleOrder(order.id)}
              >
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div>
                          <p className="font-medium text-sm">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(order.created_at), "MMMM d, yyyy")}
                          </p>
                        </div>
                        <Badge className={`${info.color} flex items-center gap-1`}>
                          {info.icon}
                          {info.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                        {expandedOrders.has(order.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t p-4 bg-muted/30">
                      {/* Status Description */}
                      {info.description && (
                        <p className="text-sm text-muted-foreground mb-4 italic">{info.description}</p>
                      )}

                      {/* Crypto Payment Tracker */}
                      {isCryptoStatus(order.status) && (
                        <CryptoPaymentTracker status={order.status} />
                      )}
                      {order.status === 'paid' && (
                        <CryptoPaymentTracker status={order.status} />
                      )}

                      {/* Order Items */}
                      <div className="space-y-3 mb-4 mt-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              {item.product_image ? (
                                <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.product_name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="border-t pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      {order.shipping_address && (
                        <div className="border-t mt-4 pt-4">
                          <p className="text-sm font-medium mb-1">Shipping Address</p>
                          <p className="text-sm text-muted-foreground">
                            {order.shipping_address.full_name || order.shipping_address.fullName}<br />
                            {order.shipping_address.street_address || order.shipping_address.address}<br />
                            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code || order.shipping_address.zipCode}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="border-t mt-4 pt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View Invoice
                        </Button>
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">Reorder</Button>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;
