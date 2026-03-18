import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, ExternalLink, Plus, ShoppingBag, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const products = [
  { name: "Signature Hoodie", price: "₹1,299", emoji: "👕", sold: 142 },
  { name: "Creator Cap", price: "₹499", emoji: "🧢", sold: 87 },
  { name: "Phone Case", price: "₹299", emoji: "📱", sold: 203 },
];

const courses = [
  {
    name: "Content Creation Masterclass",
    price: "₹2,999",
    enrolled: 847,
    rating: 4.9,
  },
  { name: "Brand Deal Playbook", price: "₹1,499", enrolled: 312, rating: 4.7 },
];

export function FanToFounderPage() {
  const [featuredToggle, setFeaturedToggle] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    desc: "",
  });
  const [addOpen, setAddOpen] = useState(false);

  const handleAddProduct = () => {
    toast.success(
      `Product "${newProduct.name || "New Product"}" added to your store!`,
    );
    setNewProduct({ name: "", price: "", desc: "" });
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Fan-to-Founder OS</h1>
        <p className="text-[oklch(0.55_0.015_240)] mt-1">
          Build Your Creator Empire — monetize your audience your way.
        </p>
      </div>

      <Tabs defaultValue="merch">
        <TabsList className="bg-[oklch(0.12_0.01_240)] border border-[oklch(0.22_0.015_240)]">
          <TabsTrigger
            data-ocid="f2f.merch.tab"
            value="merch"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-black"
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
            Merch Store
          </TabsTrigger>
          <TabsTrigger
            data-ocid="f2f.courses.tab"
            value="courses"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-black"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Courses
          </TabsTrigger>
          <TabsTrigger
            data-ocid="f2f.storefront.tab"
            value="storefront"
            className="data-[state=active]:bg-[oklch(0.75_0.18_65)] data-[state=active]:text-black"
          >
            <Store className="w-3.5 h-3.5 mr-1.5" />
            Digital Storefront
          </TabsTrigger>
        </TabsList>

        {/* Merch */}
        <TabsContent value="merch">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)] flex-1 mr-4">
                <CardContent className="p-4 flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-saffron" />
                  <div>
                    <p className="text-xs text-[oklch(0.5_0.015_240)]">
                      Total Merch Revenue
                    </p>
                    <p className="text-xl font-bold text-[oklch(0.85_0.18_65)]">
                      ₹2,34,000
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button
                    data-ocid="f2f.add_product.button"
                    className="font-semibold text-black"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent
                  data-ocid="f2f.add_product.dialog"
                  className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]"
                >
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Add New Product
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-[oklch(0.65_0.015_240)] text-xs mb-1.5 block">
                        Product Name
                      </Label>
                      <Input
                        data-ocid="f2f.product_name.input"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. Signature T-Shirt"
                        className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
                      />
                    </div>
                    <div>
                      <Label className="text-[oklch(0.65_0.015_240)] text-xs mb-1.5 block">
                        Price
                      </Label>
                      <Input
                        data-ocid="f2f.product_price.input"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct((p) => ({
                            ...p,
                            price: e.target.value,
                          }))
                        }
                        placeholder="₹999"
                        className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
                      />
                    </div>
                    <div>
                      <Label className="text-[oklch(0.65_0.015_240)] text-xs mb-1.5 block">
                        Description
                      </Label>
                      <Textarea
                        data-ocid="f2f.product_desc.textarea"
                        value={newProduct.desc}
                        onChange={(e) =>
                          setNewProduct((p) => ({ ...p, desc: e.target.value }))
                        }
                        placeholder="Describe your product..."
                        className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.1_0.008_240)]"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      data-ocid="f2f.cancel_product.button"
                      onClick={() => setAddOpen(false)}
                      className="text-[oklch(0.55_0.015_240)]"
                    >
                      Cancel
                    </Button>
                    <Button
                      data-ocid="f2f.save_product.button"
                      onClick={handleAddProduct}
                      className="text-black"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                      }}
                    >
                      Save Product
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <Card
                  key={p.name}
                  data-ocid={`f2f.product.item.${i + 1}`}
                  className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)] hover:border-[oklch(0.35_0.015_240)] transition-colors"
                >
                  <CardContent className="p-5 text-center">
                    <div className="text-4xl mb-3">{p.emoji}</div>
                    <h3 className="text-white font-semibold">{p.name}</h3>
                    <p className="text-saffron font-bold text-lg mt-1">
                      {p.price}
                    </p>
                    <p className="text-xs text-[oklch(0.45_0.015_240)] mt-1">
                      {p.sold} sold
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-3 text-xs text-[oklch(0.55_0.015_240)] hover:text-white"
                      onClick={() => toast.info(`Editing ${p.name}`)}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Courses */}
        <TabsContent value="courses">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)] flex-1 mr-4">
                <CardContent className="p-4 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-xs text-[oklch(0.5_0.015_240)]">
                      Total Course Revenue
                    </p>
                    <p className="text-xl font-bold text-purple-400">
                      ₹3,89,000
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Button
                data-ocid="f2f.create_course.button"
                className="font-semibold text-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                }}
                onClick={() => toast.info("Course creator coming soon!")}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Create New Course
              </Button>
            </div>

            {courses.map((c, i) => (
              <Card
                key={c.name}
                data-ocid={`f2f.course.item.${i + 1}`}
                className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]"
              >
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{c.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-saffron font-bold">{c.price}</span>
                      <span className="text-xs text-[oklch(0.5_0.015_240)]">
                        {c.enrolled} enrolled
                      </span>
                      <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-xs">
                        ⭐ {c.rating}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[oklch(0.55_0.015_240)] hover:text-white"
                    onClick={() => toast.info(`Editing ${c.name}`)}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Storefront */}
        <TabsContent value="storefront">
          <div className="space-y-4">
            <Card className="border-[oklch(0.22_0.015_240)] bg-[oklch(0.12_0.01_240)]">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Your Storefront
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="rounded-xl p-5 border"
                  style={{
                    background: "oklch(0.1 0.008 240)",
                    borderColor: "oklch(0.75 0.18 65 / 0.3)",
                  }}
                >
                  <p className="text-xs text-[oklch(0.5_0.015_240)] mb-1">
                    Your store URL
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-saffron font-mono text-sm">
                      vistar.ai/store/yourchannel
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-[oklch(0.5_0.015_240)] hover:text-white"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "vistar.ai/store/yourchannel",
                        );
                        toast.success("URL copied!");
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[oklch(0.18_0.015_240)]">
                  <div>
                    <p className="text-sm text-white font-medium">
                      Featured Products
                    </p>
                    <p className="text-xs text-[oklch(0.45_0.015_240)]">
                      Show top products on your storefront
                    </p>
                  </div>
                  <Switch
                    data-ocid="f2f.featured_products.switch"
                    checked={featuredToggle}
                    onCheckedChange={setFeaturedToggle}
                    className="data-[state=checked]:bg-[oklch(0.75_0.18_65)]"
                  />
                </div>
                <Button
                  data-ocid="f2f.customize_store.button"
                  className="w-full font-semibold text-black"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.68 0.2 58))",
                  }}
                  onClick={() => toast.info("Store customizer coming soon!")}
                >
                  Customize Store
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
