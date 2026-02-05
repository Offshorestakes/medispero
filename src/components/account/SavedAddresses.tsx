import { useEffect, useState } from "react";
import { MapPin, Plus, Edit2, Trash2, Star, Home, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: string;
  label: string;
  full_name: string;
  street_address: string;
  apartment: string | null;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string | null;
  is_default: boolean;
}

const SavedAddresses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: "Home",
    full_name: "",
    street_address: "",
    apartment: "",
    city: "",
    state: "",
    zip_code: "",
    country: "United States",
    phone: "",
    is_default: false,
  });

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("saved_addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // If setting as default, unset other defaults first
      if (formData.is_default) {
        await supabase
          .from("saved_addresses")
          .update({ is_default: false })
          .eq("user_id", user.id);
      }

      if (editingAddress) {
        const { error } = await supabase
          .from("saved_addresses")
          .update({
            ...formData,
            apartment: formData.apartment || null,
            phone: formData.phone || null,
          })
          .eq("id", editingAddress.id);

        if (error) throw error;
        toast({ title: "Address updated successfully" });
      } else {
        const { error } = await supabase.from("saved_addresses").insert({
          ...formData,
          user_id: user.id,
          apartment: formData.apartment || null,
          phone: formData.phone || null,
        });

        if (error) throw error;
        toast({ title: "Address added successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
      toast({
        title: "Error saving address",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from("saved_addresses")
        .delete()
        .eq("id", addressId);

      if (error) throw error;
      toast({ title: "Address deleted successfully" });
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast({
        title: "Error deleting address",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSetDefault = async (addressId: string) => {
    if (!user) return;

    try {
      // Unset all defaults
      await supabase
        .from("saved_addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);

      // Set new default
      const { error } = await supabase
        .from("saved_addresses")
        .update({ is_default: true })
        .eq("id", addressId);

      if (error) throw error;
      toast({ title: "Default address updated" });
      fetchAddresses();
    } catch (error) {
      console.error("Error setting default:", error);
    }
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      full_name: address.full_name,
      street_address: address.street_address,
      apartment: address.apartment || "",
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      country: address.country,
      phone: address.phone || "",
      is_default: address.is_default,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingAddress(null);
    setFormData({
      label: "Home",
      full_name: "",
      street_address: "",
      apartment: "",
      city: "",
      state: "",
      zip_code: "",
      country: "United States",
      phone: "",
      is_default: false,
    });
  };

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return Home;
      case "work":
      case "office":
        return Building;
      default:
        return MapPin;
    }
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Saved Addresses
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="label">Address Label</Label>
                  <Select
                    value={formData.label}
                    onValueChange={(value) => setFormData({ ...formData, label: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="street_address">Street Address</Label>
                  <Input
                    id="street_address"
                    value={formData.street_address}
                    onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="apartment">Apartment, Suite, etc. (optional)</Label>
                  <Input
                    id="apartment"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zip_code">ZIP Code</Label>
                  <Input
                    id="zip_code"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={formData.is_default}
                    onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                    className="rounded border-input"
                  />
                  <Label htmlFor="is_default" className="cursor-pointer">
                    Set as default address
                  </Label>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAddress ? "Update" : "Save"} Address
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved addresses</h3>
            <p className="text-muted-foreground mb-4">
              Add an address to speed up your checkout process.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => {
              const LabelIcon = getLabelIcon(address.label);
              return (
                <div
                  key={address.id}
                  className={`border rounded-lg p-4 relative ${
                    address.is_default ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  {address.is_default && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Default
                    </Badge>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <LabelIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{address.label}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.full_name}<br />
                        {address.street_address}
                        {address.apartment && `, ${address.apartment}`}<br />
                        {address.city}, {address.state} {address.zip_code}
                      </p>
                      {address.phone && (
                        <p className="text-sm text-muted-foreground mt-1">{address.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(address)}
                      className="flex items-center gap-1"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </Button>
                    {!address.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Address</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this address? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(address.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedAddresses;
