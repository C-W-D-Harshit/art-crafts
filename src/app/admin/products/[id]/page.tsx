"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { productSchema } from "@/schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CrossIcon, PlusIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import toast from "react-hot-toast";
import { createProductAction } from "@/actions/productActions";
import { categories } from "@/data/category";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<productSchema>({
    resolver: zodResolver(productSchema),
  });
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [catOpen, setCatOpen] = React.useState(false);
  const [catValue, setCatValue] = React.useState("");
  const fileInputRef = useRef<any>(null);
  const [images, setImages] = useState<any>([]);
  const [mimg, setMimg] = useState(0);
  const [status, setStatus] = useState<any>("draft");
  const [featured, setFeatured] = useState<any>("");
  const gstRates = [
    { category: "GST 0%", rate: "0" },
    { category: "GST 5%", rate: "5" },
    { category: "GST 12%", rate: "12" },
    { category: "GST 18%", rate: "18" },
    { category: "GST 28%", rate: "28" },
  ];

  // handle add img
  const handleButtonClick = () => {
    // Trigger a click event on the file input using the ref
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // handle remove img
  const handleRemoveImage = (index: number) => {
    setImages((prevImages: any) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  // handeling images
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
          if (reader.result && typeof reader.result === "string") {
            const resultString = reader.result;
            setImages((prevImagesArray: any) => [
              ...prevImagesArray,
              resultString,
            ]);
          }
        };
      }
    }
    // Optionally, you can clear the file input to allow selecting more files
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const gg = async (data: any) => {
    const result: any = await createProductAction(data);
    // Check if sign-in was successful
    if (result.error) {
      // Handle sign-in error (display error message, etc.)
      // console.log(result.error);
      // toast.error(result.error);
      throw new Error(result.error);
    } else {
      // Sign-in was successful, handle redirect or other actions
      router.push("/admin/products");
    }
  };
  const submitHandler = async (formData: productSchema) => {
    if (catValue === "") {
      toast.error("Please select a category!");
      return;
    }
    if (value === "") {
      toast.error("Please select a tax!");
      return;
    }
    const data = {
      ...formData,
      images,
      status,
      featured: featured === "true" ? true : false,
      category: catValue,
      tax: value,
    };

    toast.promise(
      gg(data)
        .then((result: any) => {
          // Handle success

          return result; // Pass the result to the success callback
        })
        .catch((error: any) => {
          // Handle error and get the error message
          console.error(error.message);
          return Promise.reject(error); // Pass the error to the error callback
        }),
      {
        loading: "Creating...",
        error: (error) => {
          // Display the error message using toast.error
          // toast.error(error.message);
          return error.message; // Return the error message
        },
        success: "Created Successfully....",
      }
    );
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex w-full mb-8 justify-end gap-6">
        <Link
          href={"/admin/products"}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-2"
          )}
        >
          <X />
          <p>Cancle</p>
        </Link>
        <Button
          className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-2"
          type="submit"
        >
          <PlusIcon />
          <p>Add Product</p>
        </Button>
      </div>
      <div className="w-full flex gap-8">
        <div className="w-[70%] flex flex-col gap-8">
          <div className="w-full bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
            <h3 className="text-2xl font-semibold mb-4">General Information</h3>
            <div className="grid w-full items-center gap-2 mb-3">
              <Label
                htmlFor="product_name"
                className={cn("text-lg text-slate-700", {
                  "text-red-500": errors.name,
                })}
              >
                {errors.name ? errors.name?.message : "Product Name"}
              </Label>
              <Input
                type="text"
                id="product_name"
                placeholder="Type Product Name Here..."
                className="border-slate-300 bg-slate-50"
                {...register("name")}
              />
            </div>
            <div className="grid w-full items-center gap-2 mb-3">
              <Label
                htmlFor="product_description"
                className={cn("text-lg text-slate-700", {
                  "text-red-500": errors.description,
                })}
              >
                {errors.description
                  ? errors.description?.message
                  : "Product Description"}
              </Label>
              <Textarea
                id="product_description"
                placeholder="Type Product Name Here..."
                className="border-slate-300 bg-slate-50"
                {...register("description")}
              />
            </div>
          </div>
          <div className="w-full bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
            <h3 className="text-2xl font-semibold mb-4">Stock & Pricing</h3>
            <div className="w-full flex items-center gap-4 mb-1">
              <div className="grid w-full items-center gap-2 mb-3">
                <Label
                  htmlFor="product_price"
                  className={cn("text-lg text-slate-700", {
                    "text-red-500": errors.price,
                  })}
                >
                  {errors.price ? errors.price?.message : "Product Price"}
                </Label>
                <Input
                  type="number"
                  id="product_price"
                  placeholder="Type Product Price Here..."
                  className="border-slate-300 bg-slate-50"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
              <div className="grid w-full items-center gap-2 mb-3">
                <Label
                  htmlFor="product_salePrice"
                  className={cn("text-lg text-slate-700", {
                    "text-red-500": errors.salePrice,
                  })}
                >
                  {errors.salePrice ? errors.salePrice?.message : "Sale Price"}
                </Label>
                <Input
                  type="number"
                  id="product_salePrice"
                  placeholder="Type Product Sale Price Here..."
                  className="border-slate-300 bg-slate-50"
                  {...register("salePrice", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-4">
              <div className="grid w-full items-center gap-2 mb-4">
                <Label
                  htmlFor="product_stock"
                  className={cn("text-lg text-slate-700", {
                    "text-red-500": errors.stock,
                  })}
                >
                  {errors.stock ? errors.stock.message : "Product Stock"}
                </Label>
                <Input
                  type="number"
                  id="product_stock"
                  placeholder="Type Product Stock Here..."
                  className="border-slate-300 bg-slate-50"
                  {...register("stock", { valueAsNumber: true })}
                />
              </div>
              <div className="grid w-full items-center gap-2 mb-3">
                <Label htmlFor="product_tax" className="text-lg text-slate-700">
                  Product Tax
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between border-slate-300 bg-slate-50"
                    >
                      {value
                        ? gstRates.find((framework) => framework.rate === value)
                            ?.category
                        : "Select Tax..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search tax..." />
                      <CommandEmpty>No tax found.</CommandEmpty>
                      <CommandGroup>
                        {gstRates.map((framework) => (
                          <CommandItem
                            key={framework.rate}
                            value={framework.rate}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.rate
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-8">
          <div className="w-full bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
            <h3 className="text-2xl font-semibold mb-4">Product Images</h3>
            <div className="w-full p-16 h-80 bg-slate-100 relative rounded-md mb-4">
              {images?.length > 0 ? (
                <Image
                  src={images[mimg]}
                  alt="product"
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <Image
                  src={"/defaults/defaultproduct.png"}
                  alt="img"
                  fill
                  className="object-contain p-4"
                />
              )}
            </div>
            <div className="w-full overflow-x-auto overflow-hidden no-scrollbar flex items-center gap-4">
              {images?.map((image: any, i: number) => {
                if (i === 0) {
                  return (
                    <div
                      className="relative w-24 p-2 h-24 bg-slate-100 rounded-md"
                      key={i}
                      onClick={() => setMimg(i)}
                    >
                      <Image
                        src={image}
                        alt="product"
                        fill
                        className="object-contain p-4"
                        onClick={() => setMimg(i)}
                      />
                      <div
                        className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center right-0 top-1"
                        onClick={() => {
                          if (images.length > 1) {
                            console.log("f");
                            setMimg(0);
                            handleRemoveImage(i);
                          } else {
                            setImages([]);
                          }
                        }}
                      >
                        <X />
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    className="relative w-24 p-2 h-24 bg-slate-100 rounded-md"
                    key={i}
                    onClick={() => setMimg(i)}
                  >
                    <Image
                      src={image}
                      alt="product"
                      fill
                      className="object-contain p-4"
                    />
                    <div
                      className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center right-0 top-1"
                      onClick={() => {
                        setMimg(i - 1);
                        handleRemoveImage(i);
                      }}
                    >
                      <X />
                    </div>
                  </div>
                );
              })}
              <div
                className="w-24 h-24 bg-slate-100 flex items-center justify-center rounded-md"
                onClick={handleButtonClick}
              >
                <PlusIcon size={30} />
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  multiple
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Misc...</h3>
              <Badge>Draft</Badge>
            </div>
            <div className="grid w-full items-center gap-2 mb-3">
              <Label htmlFor="product_tax" className="text-lg text-slate-700">
                Status
              </Label>
              <Select onValueChange={(e) => setStatus(e)}>
                <SelectTrigger className="w-full border-slate-300 bg-slate-50">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <Separator />

                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="publish">Publish</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-2 mb-3">
              <Label htmlFor="product_tax" className="text-lg text-slate-700">
                Featured
              </Label>
              <Select onValueChange={(e) => setFeatured(e)}>
                <SelectTrigger className="w-full border-slate-300 bg-slate-50">
                  <SelectValue placeholder="Select Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Featured</SelectLabel>
                    <Separator />

                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-2 mb-3">
              <Label htmlFor="product_tax" className="text-lg text-slate-700">
                Category
              </Label>
              <Popover open={catOpen} onOpenChange={setCatOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={catOpen}
                    className="w-full justify-between border-slate-300 bg-slate-50"
                  >
                    {catValue
                      ? categories.find(
                          (framework) => framework.label === catValue
                        )?.name
                      : "Select Category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((framework) => (
                        <CommandItem
                          key={framework.label}
                          value={framework.label}
                          onSelect={(currentValue) => {
                            setCatValue(
                              currentValue === catValue ? "" : currentValue
                            );
                            setCatOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
