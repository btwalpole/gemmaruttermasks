module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/checkoutSessions',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}