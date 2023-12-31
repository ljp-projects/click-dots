const sizes = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  relativeWidth: p => sizes.width * p,
  relativeHeight: p => sizes.height * p
}

let points = 0

console.log(sizes.relativeWidth(1))

let dots = [
  { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(1 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
  { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(3 / 10), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
  { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(2 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
  { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(1 / 2), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
  { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(3 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
  { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(7 / 10), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
  { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(4 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') }
]

const drawDots = async () => {
  dots.forEach((dot, index) => {
    if (!dot.draw) return
    const el = document.createElement('div')
    el.setAttribute('class', 'dot')
    el.style.top = `${dot.y}px`
    el.style.left = `${dot.x}px`

    document.body.appendChild(el)

    setTimeout(() => {
      el.remove()
    }, 1 / 25)

    el.onclick = () => {
      console.log("E")
      dot.audio.play().catch(() => alert("HE NEED SOME MILK"))
      dot.draw = false
    }

    if (dot.x <= 0) {
      dot.velocity = 0
      dot.x = 1
    } else if (dot.x >= sizes.width - 25) {
      dot.velocity = 1
      dot.x = sizes.width - 26
    } else {
      if (dot.velocity === 1) dot.x -= 1 / 6 * ((index || 0.5) * 2)
      else if (dot.velocity === 0) dot.x -= -(1 / 6 * ((index || 0.5) * 2))
      else alert("Fatal Error")
    }
  })

  setTimeout(() => {
    if (!dots.some(dot => dot.draw)) {
      dots = [
        { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(1 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
        { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(3 / 10), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
        { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(2 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
        { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(1 / 2), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
        { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(3 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
        { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(7 / 10), draw: true, velocity: 1, audio: new Audio('./ping.mp3') },
        { x: sizes.relativeWidth(7 / 8), y: sizes.relativeHeight(4 / 5), draw: true, velocity: 1, audio: new Audio('./ping.mp3') }
      ]

      points++
      document.getElementById('points').textContent = points
    }

    drawDots()
  }, 1 / 25)
}

document.addEventListener('click', drawDots)