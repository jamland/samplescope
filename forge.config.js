module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      platforms: ['darwin'],
      config: {
        repository: {
          owner: 'me',
          name: 'Samplescope',
        },
        prerelease: true,
      },
    },
  ],
};
