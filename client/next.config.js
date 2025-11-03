const API_URL = process.env.API_URL;
const { version } = require('./package.json');

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
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
};
