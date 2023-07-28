/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"http",
        hostname:"192.168.50.96",
        port:"3000",
        pathname:"/**"
      }
    ]
    // domains:[ "localhost" , "school-ms-backend.onrender.com", "192.168.50.96" ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
