module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices',
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/platform-socket.io',
    'ts-morph',
    '@apollo/subgraph',
    '@apollo/subgraph/package.json',
    '@apollo/subgraph/dist/directives',
  ];

  return {
    ...options,
    externals: [],
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    resolve: {
      ...options.resolve,
      extensionAlias: {
        '.js': ['.js', '.ts'],
        '.mjs': ['.mjs', '.mts'],
      },
    },
  };
};
