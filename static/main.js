// console.log('Hello, World!')

// draw dashes
const dial = document.getElementById('dial')

const xmlns = 'http://www.w3.org/2000/svg'
const { PI } = Math

const dashWidth = 4
const dashLength = 4
const dashColor = '#a3a3a3'
const labelDist = 14
const labelSize = 14
const labelColor = '#707070'

for(let hour = 0; hour <= 23; hour += 1) {
    const angle = 2*PI * (hour / 24)
    
    if(hour % 3 === 0) {
        // dash
        const r1 = 100 - dashLength / 2
        const r2 = 100 + dashLength / 2
        const labelR = 100 + labelDist

        const x1 =  r1 * Math.sin(angle)
        const y1 = -r1 * Math.cos(angle)
        const x2 =  r2 * Math.sin(angle)
        const y2 = -r2 * Math.cos(angle)

        const labelX =  labelR * Math.sin(angle)
        const labelY = -labelR * Math.cos(angle)

        const dash = document.createElementNS(xmlns, 'line')
        dash.setAttribute('x1', x1)
        dash.setAttribute('x2', x2)
        dash.setAttribute('y1', y1)
        dash.setAttribute('y2', y2)

        dash.setAttribute('stroke-width', dashWidth)
        dash.setAttribute('stroke', dashColor)
        dash.setAttribute('stroke-linecap', 'round')

        dial.appendChild( dash )

        // label
        // <text x="20" y="35" class="small">Мой</text>
        const label = document.createElementNS(xmlns, 'text')
        label.setAttribute('x', labelX)
        label.setAttribute('y', labelY)

        label.setAttribute('alignment-baseline', 'central')
        label.setAttribute('text-anchor', 'middle')
        label.setAttribute('font-family', 'Montserrat')
        label.setAttribute('font-weight', 'bold')
        label.setAttribute('font-size', labelSize)
        label.setAttribute('fill', labelColor)

        label.innerHTML = hour.toString(10)

        dial.appendChild( label )
    } else {
        // dot
        const x =  100 * Math.sin(angle)
        const y = -100 * Math.cos(angle)

        const dot = document.createElementNS(xmlns, 'circle')
        dot.setAttribute('cx', x)
        dot.setAttribute('cy', y)

        dot.setAttribute('r', dashWidth / 2)
        dot.setAttribute('fill', dashColor)

        dial.appendChild( dot )
    }
}

const arrows = document.getElementById('arrows')

// arrow
const hourArrow = document.createElementNS(xmlns, 'line')
hourArrow.setAttribute('stroke-width', 4)
hourArrow.setAttribute('stroke', labelColor)
hourArrow.setAttribute('stroke-linecap', 'round')
arrows.appendChild(hourArrow)

const minuteArrow = document.createElementNS(xmlns, 'line')
minuteArrow.setAttribute('stroke-width', 3)
minuteArrow.setAttribute('stroke', dashColor)
minuteArrow.setAttribute('stroke-linecap', 'round')
arrows.appendChild(minuteArrow)

const secondsArrow = document.createElementNS(xmlns, 'line')
secondsArrow.setAttribute('stroke-width', 2)
secondsArrow.setAttribute('stroke', 'red')
secondsArrow.setAttribute('stroke-linecap', 'round')
arrows.appendChild(secondsArrow)

// center
{
    const x = 0
    const y = 0

    const dot = document.createElementNS(xmlns, 'circle')
    dot.setAttribute('cx', x)
    dot.setAttribute('cy', y)

    dot.setAttribute('r', 2)
    dot.setAttribute('fill', 'red')

    arrows.appendChild( dot )
}

function updateArrows() {
    const dt = new Date()
    const seconds = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours())

    // hours

    const hours_angle = 2*PI * (seconds / 86400)

    const hours_r1 = -20
    const hours_r2 = 90

    const hours_x1 =  hours_r1 * Math.sin(hours_angle)
    const hours_y1 = -hours_r1 * Math.cos(hours_angle)
    const hours_x2 =  hours_r2 * Math.sin(hours_angle)
    const hours_y2 = -hours_r2 * Math.cos(hours_angle)

    hourArrow.setAttribute('x1', hours_x1)
    hourArrow.setAttribute('x2', hours_x2)
    hourArrow.setAttribute('y1', hours_y1)
    hourArrow.setAttribute('y2', hours_y2)

    // minutes

    const minutes_angle = 2*PI * (seconds % 3600 / 3600)

    const minutes_r1 = -20
    const minutes_r2 = 70

    const minutes_x1 =  minutes_r1 * Math.sin(minutes_angle)
    const minutes_y1 = -minutes_r1 * Math.cos(minutes_angle)
    const minutes_x2 =  minutes_r2 * Math.sin(minutes_angle)
    const minutes_y2 = -minutes_r2 * Math.cos(minutes_angle)

    minuteArrow.setAttribute('x1', minutes_x1)
    minuteArrow.setAttribute('x2', minutes_x2)
    minuteArrow.setAttribute('y1', minutes_y1)
    minuteArrow.setAttribute('y2', minutes_y2)

    // seconds

    const seconds_angle = 2*PI * (seconds % 60 / 60)

    const seconds_r1 = -20
    const seconds_r2 = 50

    const seconds_x1 =  seconds_r1 * Math.sin(seconds_angle)
    const seconds_y1 = -seconds_r1 * Math.cos(seconds_angle)
    const seconds_x2 =  seconds_r2 * Math.sin(seconds_angle)
    const seconds_y2 = -seconds_r2 * Math.cos(seconds_angle)

    secondsArrow.setAttribute('x1', seconds_x1)
    secondsArrow.setAttribute('x2', seconds_x2)
    secondsArrow.setAttribute('y1', seconds_y1)
    secondsArrow.setAttribute('y2', seconds_y2)
}

updateArrows()
setInterval(updateArrows, 1000)

