import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '16.170.205.73',
        port: '8089',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '13.60.191.122',
        port: '9898',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);

