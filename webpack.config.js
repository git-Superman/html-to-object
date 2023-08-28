const path = require('path');


module.exports = {
    target: 'node',
    mode: 'production',
    entry: './src/build.js',
    output: {
        filename: 'html-to-object.js',
        path: path.resolve(__dirname, 'src/dist'),
    }
}