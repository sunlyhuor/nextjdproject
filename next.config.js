/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:[ "localhost" , "school-ms-backend.onrender.com" ]
    // "localhost" , "https://school-ms-backend.onrender.com/"
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: '192.168.0.112',
    //     port: '3000',
    //     pathname: '/api/v1/**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '3000',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'schoolbackend-oq3b.onrender.com',
    //     port: '',
    //     pathname: '/api/v1/**',
    //   },
    // ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
