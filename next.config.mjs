/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nexttoy.s3.ap-northeast-2.amazonaws.com", "upload.acmicpc.net"],
  },
};

// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

export default nextConfig;
