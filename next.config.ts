module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/endpoint/:path*",
        destination: "https://meuat.kaam.com/App/V3/:path*", // Force HTTPS API
      },
      {
        source: "/api/endpointtwo/:path*",
        destination: "http://13.200.132.142:5000:path*", // Force HTTPS API
      },
    ];
  },
  productionBrowserSourceMaps: false,
  images: {
    domains: ['kaam-uat-files.s3.ap-south-1.amazonaws.com'],
  },
};
