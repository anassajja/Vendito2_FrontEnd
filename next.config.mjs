/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['tailwindui.com', 'images.unsplash.com', 'fonts.googleapis.com', 'localhost'],
        formats: ['image/avif', 'image/webp'],
        loader: 'default',
        path: '/_next/image',
        dangerouslyAllowSVG: true, 
      },
  };
  
  export default nextConfig;