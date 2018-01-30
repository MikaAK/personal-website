const fs = require('fs')

const commonCliConfig = 'node_modules/@angular/cli/models/webpack-configs/common.js'
const pugRule = `\n{ test: /\.pug$/, loader: "apply-loader!pug-loader?self" },`

fs.readFile(commonCliConfig, (err, data) => {
  if (err) { throw err }

  const configText = data.toString()

  if (configText.indexOf(pugRule) > -1) {
    return
  }

  console.log('-- Inserting .pug webpack rule -- ')

  const position = configText.indexOf('rules: [') + 8
  const output = [configText.slice(0, position), pugRule, configText.slice(position)].join('')

  const file = fs.openSync(commonCliConfig, 'r+')

  fs.writeFile(file, output, () => {})
  fs.close(file, () => {})
})
