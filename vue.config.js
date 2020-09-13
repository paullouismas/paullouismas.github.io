module.exports = {
  css: {
    // modules: true,
    requireModuleExtension: true
  },

  productionSourceMap: false,
  assetsDir: 'assets',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'paullouismas.github.io'

        return args
      })
  }
}
