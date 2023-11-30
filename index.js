const sizes = {
	width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  relativeWidth: p => sizes.width * p,
  relativeHeight: p => sizes.height * p
}

console.log(sizes.relativeWidth(1))

const dots = [
	{ x: sizes.relativeWidth(7/8), y: sizes.relativeHeight(1/5), draw: true, velocity: 1 },
  { x: sizes.relativeWidth(7/8), y: sizes.relativeHeight(2/5), draw: true, velocity: 1 },
  { x: sizes.relativeWidth(7/8), y: sizes.relativeHeight(3/5), draw: true, velocity: 1 },
  { x: sizes.relativeWidth(7/8), y: sizes.relativeHeight(4/5), draw: true, velocity: 1 }
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
    }, 1/25)
    
    el.onclick = () => {
    	console.log("E")
      dot.draw = false
    }
    
    if (dot.x <= 0) {
    	new Audio("./ping.mp3").play()
      dot.velocity = 1
    } else if (dot.x >= sizes.width) {
    	new Audio("./ping.mp3").play()
      dot.velocity = 0
    } else {
      dot.x -= dot.velocity === 1 ? -(1/6 * (index * 2)) : 1/6 * (index || 1 * 2)
    }
  })
  
  setTimeout(drawDots, 1/25)
}

drawDots()