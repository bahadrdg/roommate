import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface CustomJWTPayload extends JWTPayload {
  userId?: string;
  email?: string;
}

// Token doğrulama için kapsamlı kontroller
async function verifyToken(token: string): Promise<CustomJWTPayload> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

  try {
    // Token'i doğrula
    const { payload } = await jwtVerify(token, secret);
        
    // Gerekli alanların varlığını kontrol et
    if (!payload.exp || !payload.iat || !payload.userId) {
      throw new Error("Token eksik bilgi içeriyor");
    }

    // Token'in süresinin dolup dolmadığını kontrol et
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTimestamp) {
      throw new Error("Token süresi dolmuş");
    }

    // Token'in çok erken kullanılıp kullanılmadığını kontrol et (NBF - Not Before)
    if (payload.nbf && payload.nbf > currentTimestamp) {
      throw new Error("Token henüz geçerli değil");
    }

    // Token'in yaratılma zamanının mantıklı olup olmadığını kontrol et
    if (payload.iat > currentTimestamp) {
      throw new Error("Token geçersiz yaratılma zamanına sahip");
    }

    // Maximum token yaşını kontrol et (örneğin 7 gün)
    const MAX_TOKEN_AGE = 7 * 24 * 60 * 60; // 7 gün (saniye cinsinden)
    if (currentTimestamp - payload.iat > MAX_TOKEN_AGE) {
      throw new Error("Token maksimum yaşını aşmış");
    }

    return payload as CustomJWTPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Token doğrulama hatası: ${error.message}`);
    }
    throw new Error("Bilinmeyen token hatası");
  }
}

export async function middleware(request: NextRequest) {
  // Token'i al (hem cookie hem de Authorization header'ı kontrol et)
  const cookieToken = request.cookies.get("token")?.value;
  const headerToken = request.headers.get("Authorization")?.replace("Bearer ", "");
  const token = cookieToken || headerToken;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = await verifyToken(token);
    
    // İsteğe bağlı: Kullanıcı bilgilerini headers'a ekle
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId as string);
    
    // Orijinal isteği değiştirilmiş headers ile devam ettir
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    
    // Token hatası durumunda tüm token'ları temizle
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    
    return response;
  }
}

// Middleware'in hangi rotalarda çalışacağını tanımlama
export const config = {
  matcher: [
    "/account/:path*",// API rotaları için de koruma ekle
  ]
};