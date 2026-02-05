-- Fix profiles table: Add explicit authentication requirement
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Fix carts table: Add explicit authentication requirement  
DROP POLICY IF EXISTS "Users can view their own cart" ON public.carts;
CREATE POLICY "Users can view their own cart" 
ON public.carts 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Also update INSERT/UPDATE/DELETE policies to use TO authenticated for consistency
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

DROP POLICY IF EXISTS "Users can create their own cart" ON public.carts;
CREATE POLICY "Users can create their own cart" 
ON public.carts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own cart" ON public.carts;
CREATE POLICY "Users can update their own cart" 
ON public.carts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own cart" ON public.carts;
CREATE POLICY "Users can delete their own cart" 
ON public.carts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);