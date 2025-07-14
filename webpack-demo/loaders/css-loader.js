module.exports = function (sourceCode) {
  var result = `
    var style= document.createElement("style")
    style.innerHTML=\`${sourceCode}\`
    document.head.appendChild(style)
    module.exports=\`${sourceCode}\`
  `
  return result

}
