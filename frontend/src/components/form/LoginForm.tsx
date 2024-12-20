"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().nonempty({ message: "Bu Alan Boş Geçilemez" }),
  password: z.string().nonempty({ message: "Bu Alan Boş Geçilemez" }),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
<<<<<<< HEAD
      email: "",
      password: "",
    },
  });
  // OnSuccess kısmında token'i saklama
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      console.log();
      
      toast({
        title: "Başarılı!",
        description: "Giriş Yapıldı",
      });
      router.push("/");
    },
    onError: (error: unknown) => {
      toast({
        title: "Hata!",
        description: `Giriş Yapılamadı! = ${error}`,
      });
      console.log(error);
      
=======
      name_3061965256: "", // E-Posta alanı varsayılan boş string
      name_4755107811: "", // Şifre alanı varsayılan boş string
>>>>>>> 67916c8ba1180d727909c3c4f1bb491b0d580bb6
    },
  });

  // Form Submit
  const onSubmit = (values: FormData) => {
    mutation.mutate(values);
  };

  const { toast } = useToast();
  const router = useRouter();

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     console.log(values);
  //     toast(
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(values, null, 2)}</code>
  //       </pre>
  //     );
  //   } catch (error) {
  //     console.error("Form submission error", error);
  //     toast.error("Failed to submit the form. Please try again.");
  //   }
  // }

  return (
    <div>
      <div className="border-2 border-dotted mx-24 p-10 max-lg:m-4">
        <Form {...form}>
          <div>
            <h1 className="py-2">Tekrar Hoş Geldi̇ni̇z</h1>
            <h1 className="font-bold text-2xl mb-7">
              Room Mate{"'"}e Giriş Yap
            </h1>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
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
                  <FormLabel></FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Şifre" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Giriş Yap</Button>
          </form>
        </Form>
      </div>
      <div className="text-start ml-24 max-lg:mr-5 py-5">
        Hesabın Yok mu?{" "}
        <a href="/register">
          <span className="text-blue-500 hover:border-b-2 border-blue-500">
            Kayıt Ol
          </span>
        </a>
      </div>
    </div>
  );
}
