module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/endpoint/:path*",
        destination: "https://meuat.kaam.com/App/V3/:path*", // Force HTTPS API
      },
      {
        source: "/api/listingendpoint/:path*",
        destination: "https://feed.meuat.kaam.com:path*", // Force HTTPS API
      },
    ];
  },
  productionBrowserSourceMaps: false,
  images: {
    domains: ['kaam-uat-files.s3.ap-south-1.amazonaws.com', 'kaabil-prod-static-files.s3.ap-south-1.amazonaws.com'],
  },
};
