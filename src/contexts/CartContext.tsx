import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "id">) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch or create cart when user logs in
  useEffect(() => {
    if (user) {
      fetchOrCreateCart();
    } else {
      setItems([]);
      setCartId(null);
    }
  }, [user]);

  const fetchOrCreateCart = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Try to get existing cart
      let { data: cart, error } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      // Create cart if doesn't exist
      if (!cart) {
        const { data: newCart, error: createError } = await supabase
          .from("carts")
          .insert({ user_id: user.id })
          .select("id")
          .single();
        
        if (createError) throw createError;
        cart = newCart;
      }

      setCartId(cart.id);

      // Fetch cart items
      const { data: cartItems, error: itemsError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cart.id);

      if (itemsError) throw itemsError;
      setItems(cartItems || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item: Omit<CartItem, "id">) => {
    if (!user || !cartId) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if item already exists
      const existingItem = items.find(i => i.product_id === item.product_id);
      
      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + item.quantity;
        await updateQuantity(item.product_id, newQuantity);
      } else {
        // Insert new item
        const { data, error } = await supabase
          .from("cart_items")
          .insert({
            cart_id: cartId,
            product_id: item.product_id,
            product_name: item.product_name,
            product_image: item.product_image,
            price: item.price,
            quantity: item.quantity,
          })
          .select()
          .single();

        if (error) throw error;
        setItems([...items, data]);
      }

      toast({
        title: "Added to cart",
        description: `${item.product_name} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!cartId) return;

    try {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }

      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("cart_id", cartId)
        .eq("product_id", productId);

      if (error) throw error;
      
      setItems(items.map(item => 
        item.product_id === productId 
          ? { ...item, quantity } 
          : item
      ));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId: string) => {
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId)
        .eq("product_id", productId);

      if (error) throw error;
      setItems(items.filter(item => item.product_id !== productId));
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

      if (error) throw error;
      setItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      isLoading,
      isOpen,
      setIsOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
