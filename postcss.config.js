module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ["last 2 versions"],
            cascade: false
          }),
        require('cssnano')({
            preset: 'default',
        }),
        require("postcss-inline-svg")({
            removeFill: true,
            path: "./src/images/icons"
        })
    ]
}