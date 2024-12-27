"use client";
import { useState } from "react";
// import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import {
//   cn
// } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocationSelector from "@/components/ui/location-input";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Başlık en az 3 karakter olamlı." })
    .max(150, { message: "Başlık en fazla 150 karakter olmalı." })
    .nonempty({ message: "Başlık boş olamaz." }),
  description: z
    .string()
    .min(5, { message: "İçerik en az 5 karakter olmalı." })
    .max(500, { message: "İçerik en fazla 500 karakter olmalı." })
    .nonempty({ message: "İçerik boş olamaz." }),
  price: z.string().nonempty({ message: "Fiyat boş olamaz." }),
  location: z.tuple([
    z.string(),
    z.string({ message: "Dizi en az 2 öğe içermelidir" }).optional(),
  ]),
  images: z.string(),
  roomDetails: z.object({
    roomType: z.string().nonempty({ message: "Oda tipi boş olamaz." }),
    size: z
      .string()
      .max(5000)
      .nonempty({ message: "Oda büyüklüğü boş olamaz." }),
    furnished: z.boolean(),
  }),
  preferences: z.object({
    gender: z.string().nonempty({ message: "Cinsiyet boş olamaz." }),
    smoking: z.boolean(),
    petsAllowed: z.boolean(),
  }),
  availability: z.boolean(),
});

const dropZoneConfig = {
  accept: { "image/*": [] },
  maxFiles: 5,
};

export default function MyForm() {
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "0",
      location: [""],
      images: "",
      roomDetails: {
        roomType: "",
        size: "",
        furnished: false,
      },
      preferences: {
        gender: "",
        smoking: false,
        petsAllowed: false,
      },
      availability: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      const response = await axios.post(
        "http://localhost:5000/api/advertisement/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "İlan başarıyla oluşturuldu.",
        description: "İlanınız başarıyla oluşturuldu ve yayına alındı.",
        duration: 5000,
      });

      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Hata!",
        description: `İlan oluşturulurken bir hata oluştu. ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutation.mutate(values);
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata!",
        description: "İlan oluşturulurken bir hata oluştu!",
        variant: "destructive",
        duration: 5000,
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 w-full px-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İlan Başlığı</FormLabel>
              <FormControl>
                <Input placeholder="İlan Başlığı" type="text" {...field} />
              </FormControl>
              <FormDescription>İlan Başlığı</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Input placeholder="Açıklama" type="text" {...field} />
              </FormControl>
              <FormDescription>Açıklama</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fiyat</FormLabel>
              <FormControl>
                <Input placeholder="Fiyat" type="number" {...field} />
              </FormControl>
              <FormDescription>Fiyat</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konum</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || "");
                    form.setValue(field.name, [
                      country?.name || "",
                      stateName || "",
                    ]);
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || "");
                    form.setValue(field.name, [
                      countryName || "",
                      state?.name || "",
                    ]);
                  }}
                />
              </FormControl>
              <FormDescription>Konum</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resim Yükle</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(value) => setFiles(value || [])}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomDetails.roomType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oda Tipi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Single">Bekar</SelectItem>
                  <SelectItem value="Double">Çift</SelectItem>
                  <SelectItem value="Shared">Paylaşımlı</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomDetails.size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oda Büyüklüğü</FormLabel>
              <FormControl>
                <Input placeholder="Oda Büyüklüğü" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferences.gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cinsiyet</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Cinsiyet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Famale">Kadın</SelectItem>
                  <SelectItem value="Male">Erkek</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomDetails.furnished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                {/* <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                /> */}
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Eşyalı mı?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferences.smoking"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                {/* <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                /> */}
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Sigara İçilebilir mi?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferences.petsAllowed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                {/* <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                /> */}
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Evcil Hayvan Girebilir mi?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                {/* <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                /> */}
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Kullanılabilir mi?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Kaydet</Button>
      </form>
    </Form>
  );
}
