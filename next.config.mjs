/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nexttoy.s3.ap-northeast-2.amazonaws.com", "upload.acmicpc.net"],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

export default nextConfig;
