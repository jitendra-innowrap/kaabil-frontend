module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/endpoint/:path*",
        destination: "https://meuat.kaam.com/App/V3/:path*", // Force HTTPS API
      },
    ];
  },
};
