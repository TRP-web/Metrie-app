
/** @type {import('next').NextConfig} */
const nextConfig = {
   // webpackDevMiddleware: config => {
   //    config.watchOptions = {
   //       poll: 1000,
   //       aggregateTimeout: 300,
   //    }
   //    return config
   // },
   env: {
      appStatus: 'dev',
      backEndUrl: "https://103-98-215-99.cloud-xip.com"
   },
};

export default nextConfig;
