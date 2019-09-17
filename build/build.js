const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.prod')
const spinner = ora('building...\n').start()
webpack(webpackConfig, function (err, stats) {
    if (err) {
        spinner.fail("Compile failed...")
        console.log(err)
        return
    }
    spinner.succeed('End of compilation. \n')

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
    console.log(chalk.cyan('  Compiled successfully！\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
})