module.exports = {
  plugins: [
      require('autoprefixer')({
        browsers: [
          'last 2 versions',
          // desktop
          'Chrome > 20',
          'Firefox > 20',
          'Opera > 20',
          'Safari > 3',
          'ie > 8',

          // mobile
          'iOS > 4',
          'Android > 4',
          'ChromeAndroid > 20',
          'OperaMobile > 20'
        ]
      })
  ]
}