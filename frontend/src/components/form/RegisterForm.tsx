/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


// Form doğrulama şeması
const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .min(2, { message: "İsim En Az 2 Karakter Olabilir." })
    .max(30, { message: "İsim En Fazla 30 Karakter Olabilir." }),
  lastname: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .min(2, { message: "Soy İsim En Az 2 Karakter Olabilir." })
    .max(30, { message: "Soy İsim En Fazla 30 Karakter Olabilir." }),
  email: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .email({ message: "Geçerli E-posta giriniz." }),
  password: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .min(6, { message: "Şifre en az 6 karakter olmalıdır." })
    .max(26, { message: "Şifre en fazla 26 karakter olabilir." }),
  phone: z.string().nonempty({ message: "Bu Alan zorunludur." }),
});

// FormData türü
type FormData = z.infer<typeof formSchema>;

export default function MyForm() {
  // React Hook Form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  // TanStack Query - Mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Başarılı!",
        description: "Kayıt Başarıyla Gerçekleşti! Giriş Yapabilirsiniz!",
      });
      router.push("/login"); // Login sayfasına yönlendiriliyor
    },
    onError: (error: unknown) => {
      toast({
        title: "Hata!",
        description: `Kayıt Gerçekleştrilemedi! =  ${error}`,
      });
    },
  });

  // Form Submit
  const onSubmit = (values: FormData) => {
    mutation.mutate(values);
  };
  const { toast } = useToast();
  const router = useRouter()

  return (
    <div>
      <div className="border-2 border-dotted mx-24 p-10 max-lg:m-4">
        <Form {...form}>
          <h1 className="my-2">Yolculuğunuza Başlayın</h1>
          <h1 className="text-2xl font-bold my-2 mb-5">
            Room Mate{"'"}e Kayıt Ol
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-3xl mx-auto "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="İsim" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Soy İsim" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-Posta" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Şifre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="Telefon Numarası"
                      {...field}
                      defaultCountry="TR"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
               Kayıt Ol
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-end mr-24 max-lg:mr-5 py-5">
        Hesabın Var mı?{" "}
        <a href="/login">
          <span className="text-blue-500 hover:border-b-2 border-blue-500">
            Giriş Yap
          </span>
        </a>
      </div>
    </div>
  );
}
