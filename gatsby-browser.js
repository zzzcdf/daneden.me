require('./static/css/syntax.css')

if ('registerProperty' in CSS) {
  CSS.registerProperty({
    name: '--line-direction',
    syntax: 'tl-br | tr-bl | center',
    initialValue: 'tl-br',
    inherits: true,
  })

  CSS.registerProperty({
    name: '--line-color',
    syntax: '<color>',
    initialValue: 'currentcolor',
    inherits: true,
  })
}

if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('./paintWorklet.js')
}
