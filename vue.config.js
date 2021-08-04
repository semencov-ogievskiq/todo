module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  },
  devServer: {
    watchOptions: {
      poll: true,
    },
  },
}
