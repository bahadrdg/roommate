import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"; // Eğer JWT doğrulama gerekiyorsa

// JWT doğrulama için bir yardımcı fonksiyon
function verifyToken(token: string): unknown {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    return decoded;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Token geçersiz");
  }
}

export function middleware(request: NextRequest) {
  // Token'i almak (cookie veya Authorization header)
  const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1];

  // Eğer token yoksa giriş sayfasına yönlendirme
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Token doğrulama
    const decodedToken = verifyToken(token);
    console.log("Token doğrulandı:", decodedToken);
    return NextResponse.next();
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Middleware'in hangi rotalarda çalışacağını tanımlama
export const config = {
  matcher: ["/protected-route/:path*"], // Korunan rotalar
};
