const API_URL = process.env.API_URL || "http://localhost:8000";

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
  output: "standalone",
};
