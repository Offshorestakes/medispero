-- Fix profiles table: Restrict all policies to authenticated users only
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Fix saved_addresses table: Restrict all policies to authenticated users only
DROP POLICY IF EXISTS "Users can view their own addresses" ON public.saved_addresses;
CREATE POLICY "Users can view their own addresses" 
ON public.saved_addresses 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own addresses" ON public.saved_addresses;
CREATE POLICY "Users can create their own addresses" 
ON public.saved_addresses 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own addresses" ON public.saved_addresses;
CREATE POLICY "Users can update their own addresses" 
ON public.saved_addresses 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own addresses" ON public.saved_addresses;
CREATE POLICY "Users can delete their own addresses" 
ON public.saved_addresses 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Fix orders table: Restrict all policies to authenticated users only
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Fix order_items table: Restrict all policies to authenticated users only
DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
CREATE POLICY "Users can view their order items" 
ON public.order_items 
FOR SELECT 
TO authenticated
USING (EXISTS ( SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
CREATE POLICY "Users can create order items" 
ON public.order_items 
FOR INSERT 
TO authenticated
WITH CHECK (EXISTS ( SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Fix cart_items table: Restrict all policies to authenticated users only
DROP POLICY IF EXISTS "Users can view their cart items" ON public.cart_items;
CREATE POLICY "Users can view their cart items" 
ON public.cart_items 
FOR SELECT 
TO authenticated
USING (EXISTS ( SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can add items to their cart" ON public.cart_items;
CREATE POLICY "Users can add items to their cart" 
ON public.cart_items 
FOR INSERT 
TO authenticated
WITH CHECK (EXISTS ( SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can update their cart items" ON public.cart_items;
CREATE POLICY "Users can update their cart items" 
ON public.cart_items 
FOR UPDATE 
TO authenticated
USING (EXISTS ( SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can delete their cart items" ON public.cart_items;
CREATE POLICY "Users can delete their cart items" 
ON public.cart_items 
FOR DELETE 
TO authenticated
USING (EXISTS ( SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()));