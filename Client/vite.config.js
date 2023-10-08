export default defineConfig({
  plugins: [
      vue(),
      laravel({
          input: ['resources/js/app.js'],
          refresh: true,
      }),
      i18n(),
  ],

  resolve: {
      alias: {
          vue: 'vue/dist/vue.esm-bundler.js',
          ziggy: path.resolve('vendor/tightenco/ziggy/dist/vue.es.js'),

      },
  },
  build: {
      rollupOptions: {
          output:{
              manualChunks(id) {
                  if (id.includes('node_modules')) {
                      return id.toString().split('node_modules/')[1].split('/')[0].toString();
                  }
              }
          }
      }
  }
});