/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nexttoy.s3.ap-northeast-2.amazonaws.com"],
  },
};

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default nextConfig;
