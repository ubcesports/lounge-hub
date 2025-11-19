const API_URL = process.env.API_URL;
import pkg from "./package.json" assert { type: "json" };
export const { version } = pkg;

export default {
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
