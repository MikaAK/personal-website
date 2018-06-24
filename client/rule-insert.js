const fs = require('fs')
const {tap, compose, toPairs, values: objValues, flip, concat, join, filter, isEmpty} = require('ramda')

const commonCliConfig = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js'
const rules = {
  pug: `\n{ test: /\\.pug$/, exclude: /node_modules/, loader: 'apply-loader!pug-loader?self' }`
  // svgInline: `\n{ test: /\\.svg/, exclude: /node_modules/, loader: 'svg-inline-loader' }`,
  // graphqlLoader: `\n{ test: /\\.graphql$/, exclude: /node_modules/, loader: 'graphql-tag/loader', enforce: 'pre' }`
}

const appendString = flip(concat)
const convertRulesToString = compose(appendString(','), join(','), objValues)

fs.readFile(commonCliConfig, (err, data) => {
  if (err)
    throw err

  // Replace file-loader regex for svgs to not include svg
  const configText = data.toString() // .replace(/eot\|svg\|cur/g, 'eot|cur')

  const unusedRules = filter((rule) => configText.indexOf(rule) === -1, rules)

  if (isEmpty(unusedRules))
    return


  const ruleNames = toPairs(unusedRules)
    .map(([ruleName]) => ruleName)
    .join(', ')

  console.log(`-- Inserting ${ruleNames} webpack rule -- `)

  const position = configText.indexOf('rules: [') + 8
  const output = [configText.slice(0, position), convertRulesToString(rules), configText.slice(position)].join('')

  const file = fs.openSync(commonCliConfig, 'r+')

  fs.writeFile(file, output, () => {})
  fs.close(file, () => {})
})
