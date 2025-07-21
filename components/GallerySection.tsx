"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchGallery } from "@/lib/redux/slices/gallerySlice";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function GallerySection() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.gallery);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const categories = [
    "all",
    "event",
    "classroom",
    "achievement",
    "facility",
    "other",
  ];
  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.category === activeTab);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "event":
        return "bg-blue-100 text-blue-800";
      case "classroom":
        return "bg-green-100 text-green-800";
      case "achievement":
        return "bg-orange-100 text-orange-800";
      case "facility":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our campus, events, and memorable moments at UCDC
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
              >
                {category === "all" ? "All" : category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <Dialog key={item._id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                        <div className="relative aspect-square">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge
                            className={`absolute top-2 left-2 ${getCategoryColor(
                              item.category
                            )}`}
                          >
                            {item.category.charAt(0).toUpperCase() +
                              item.category.slice(1)}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-sm mb-1 truncate">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="relative aspect-video w-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">
                            {item.title}
                          </h3>
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category.charAt(0).toUpperCase() +
                              item.category.slice(1)}
                          </Badge>
                        </div>
                        {item.description && (
                          <p className="text-gray-600">{item.description}</p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
