/**
 * All electron-forge config should be set here
 */

module.exports = {
  packagerConfig: {
    arch: ['x64'],
    appBundleId: 'com.github.jamland.samplescope',
    appCopyright: 'MIT License',
    icon: './assets/icons/icon',
    appCategoryType: 'public.app-category.music',
    overwrite: true,
    osxSign: {
      identity: 'Developer ID Application: Andrii Pylypchuk (9R46WLR893)',
      'hardened-runtime': true,
      'gatekeeper-assess': false,
      entitlements: './assets/entitlements.plist',
      'entitlements-inherit': './assets/entitlements.plist',
      'signature-flags': 'library',
    },
    platform: ['darwin'],
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // certificateFile: './cert.pfx',
        // certificatePassword: 'this-is-a-secret'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'jamland',
          name: 'samplescope',
        },
      },
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer/index.tsx',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
  hooks: {
    postPackage: require('./src/hooks/notarize.js'),
  },
};
