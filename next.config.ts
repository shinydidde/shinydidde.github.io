module.exports = {
  output: 'export',
  images: {
    // turn off optimization so Next.js will just emit plain <img> tags
    unoptimized: true,
    // whitelist any remote hosts you load from
    domains: ['firebasestorage.googleapis.com'],
  },
};
