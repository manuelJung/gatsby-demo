const {Converter} = require('showdown')

const converter = new Converter({
  tables: true,
  tablesHeaderId: true,
  literalMidWordUnderscores: true,
  extensions: [
    {
      type: 'output',
      regex: new RegExp('--(.+)--', 'g'),
      replace: '<i class="fa fa-$1"></i>'
    }
  ]
})

module.makeHtml = converter.makeHtml