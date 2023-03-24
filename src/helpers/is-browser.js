const isBrowser = new Function(
  `
    try {
      return this === window
    } catch(e) {}

    try {
      return !!importScripts
    } catch(e){}

    return false
  `
)

module.exports = isBrowser
