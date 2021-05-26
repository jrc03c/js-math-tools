const pause = require("./pause.js")

test("tests the pause function", () => {
  for (let i = 0; i < 5; i++) {
    const startTime = new Date()
    const waitTime = parseInt(Math.random() * 1000)

    setTimeout(() => {
      const elapsedTime = new Date() - startTime
      expect(elapsedTime - waitTime).toBeLessThan(10)
    }, waitTime)
  }
})
