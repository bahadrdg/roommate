import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // JWT'yi decode etmek için

// JWT Token payload için bir arayüz tanımlama
interface JwtPayload {
  userId: string;
}

// İlanlar için bir arayüz tanımlama
interface Advertisement {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
}

// Kullanıcı ID'sini çerezlerden çeken yardımcı fonksiyon
const getUserIdFromToken = (): string => {
  const cookies: Record<string, string> = document.cookie
    .split('; ')
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

  const token = cookies.token; // Token adı, backend'in gönderdiği çerez adı ile eşleşmelidir
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const decoded = jwtDecode<JwtPayload>(token);
  return decoded.userId; // Backend'in JWT payload'unda kullanıcı ID'sini hangi key ile gönderdiğini kontrol edin
};



// İlanları getiren API isteği
const fetchUserAdvertisements = async (userId: string): Promise<Advertisement[]> => {
  const response = await axios.get(`http://localhost:5000/api/advertisement/user/${userId}`);
  return response.data;
};


const UserAdvertisementsPage: React.FC = () => {
  let userId: string;
  
  

  try {
    userId = getUserIdFromToken(); // Kullanıcı ID'sini çerezlerden al
  } catch (error) {
    return (
      <div className="mt-[100px] text-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  // TanStack Query ile veriyi çek
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: advertisements, isLoading, isError, error } = useQuery<Advertisement[], Error>(
    {
      queryKey: ['userAdvertisements', userId],
      queryFn: () => fetchUserAdvertisements(userId)
    }
  );

  if (isLoading) {
    return <div className="mt-[110px] text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mt-[110px] text-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mt-[100px]">
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-5">My Advertisements</h1>
        {!advertisements || advertisements.length === 0 ? (
          <p>No advertisements found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advertisements.map((ad) => (
              <div key={ad._id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{ad.title}</h2>
                <p>{ad.description}</p>
                <p className="text-sm text-gray-500">Price: {ad.price}</p>
                <p className="text-sm text-gray-500">Location: {ad.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAdvertisementsPage;
