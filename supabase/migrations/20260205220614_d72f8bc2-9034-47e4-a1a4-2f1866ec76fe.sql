-- Add explicit UPDATE/DELETE deny policies for orders table
-- Orders should be immutable after creation (except by admins in the future)
CREATE POLICY "Users cannot update orders directly"
ON public.orders FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "Users cannot delete orders"
ON public.orders FOR DELETE
TO authenticated
USING (false);

-- Add explicit UPDATE/DELETE deny policies for order_items table
-- Order items should also be immutable after creation
CREATE POLICY "Users cannot update order items"
ON public.order_items FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "Users cannot delete order items"
ON public.order_items FOR DELETE
TO authenticated
USING (false);