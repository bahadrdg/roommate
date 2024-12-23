import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-4 ">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
};

export default Footer;
