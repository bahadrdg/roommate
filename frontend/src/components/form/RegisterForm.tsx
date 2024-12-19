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

const formSchema =  z.object({
  name_8798472954: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .min(2, { message: "İsim En Az 2 Karakter Olabilir." })
    .max(30, { message: "İsim En Fazla 30 Karakter Olabilir." }),
  name_4608428208: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .min(2, { message: "Soy İsim En Az 2 Karakter Olabilir." })
    .max(30, { message: "Soy İsim En Fazla 30 Karakter Olabilir." }),
  name_3914205888: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .email(),
  name_9628956699: z
    .string()
    .nonempty({ message: "Bu Alan zorunludur." })
    .min(6, { message: "Şifre en az 6 karakter olmalıdır." })
    .max(26, { message: "Şifre en fazla 23 karakter olabilir." }),
  name_4770151517: z.string().nonempty({ message: "Bu Alan zorunludur." }),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

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
              name="name_8798472954"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="İsim" type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name_4608428208"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Soy İsim" type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name_3914205888"
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
              name="name_9628956699"
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
              name="name_4770151517"
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

            <Button type="submit">Kayıt Ol</Button>
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
