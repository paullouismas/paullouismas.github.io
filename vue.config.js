module.exports = {
  css: {
    // modules: true,
    requireModuleExtension: true
  },
  configureWebpack: {
    entry: {
      // main: './src/main.ts'
    },
    optimization: {
      mergeDuplicateChunks: true
    }
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

    /* config.entry('main').clear()
    config.entry('main').add('./') */
  }
}
