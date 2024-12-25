import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; 

// Helper function to verify JWT
async function verifyToken(token: string): Promise<unknown> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Token geçersiz");
  }
}

export async function middleware(request: NextRequest) {
  // Token'i almak (cookie veya Authorization header)
  const token = request.cookies.get("token")?.value;
  console.log("girdi");
  

  // Eğer token yoksa giriş sayfasına yönlendirme
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Token doğrulama
    const decodedToken = await verifyToken(token);
    console.log("Token doğrulandı:", decodedToken);
    return NextResponse.next();
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Middleware'in hangi rotalarda çalışacağını tanımlama
export const config = {
  matcher: ["/account/:path*"], // Korunan rotalar
};
