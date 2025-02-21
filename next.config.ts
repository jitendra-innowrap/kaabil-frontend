module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/endpoint/:path*",
        destination: "https://meuat.kaam.com/App/V3/:path*", // Force HTTPS API
      },
    ];
  },
  productionBrowserSourceMaps: false,
  images: {
    domains: ['kaam-uat-files.s3.ap-south-1.amazonaws.com'],
  },
};
