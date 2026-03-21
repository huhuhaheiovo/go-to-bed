import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/sleep-calculator', destination: '/tools/sleep-calculator', permanent: true },
      { source: '/en/sleep-calculator', destination: '/tools/sleep-calculator', permanent: true },
      { source: '/zh/sleep-calculator', destination: '/zh/tools/sleep-calculator', permanent: true },
      { source: '/ja/sleep-calculator', destination: '/ja/tools/sleep-calculator', permanent: true }
    ];
  }
};

export default withNextIntl(nextConfig);
