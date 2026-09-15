import Poco from "commodetto/Poco";

const render = new Poco(screen);

// Colors
const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);
const orange = render.makeColor(231, 95, 47);

//Fonts
const timeFont = new render.Font("Gothic-Bold", 18);

//Images
const hand = new Poco.PebbleDrawCommandImage(1);
const background = new Poco.PebbleBitmap(2);

//Values
const hourRotations = [
    138.1,  // 1
    122.0,  // 2
    101.2,  // 3
     81.4,  // 4
     62.4,  // 5
     43.9,  // 6
     25.7,  // 7
      8.3,  // 8
    -12.9,  // 9
    -33.3,  // 10
    -59.5,  // 11
    -86.3   // 12
];


const hourScales = [
    1.628,  // 1
    1.390,  // 2
    1.346,  // 3
    1.311,  // 4
    1.364,  // 5
    1.426,  // 6
    1.346,  // 7
    1.091,  // 8
    0.924,  // 9
    0.827,  // 10
    0.880,  // 11
    1.030   // 12
];

/**
* returns scale and rotation values for rendering the watchface's hand
* based on hourRotations and hourScales
*/
function getClockValues(event) {
    const now = event.date;

    const hourIndex = (now.getHours() + 11) % 12;
    const nextIndex = (hourIndex + 1) % 12;

    const fraction = now.getMinutes() / 60;

    // Rotation
    let currentRotation = hourRotations[hourIndex];
    let nextRotation = hourRotations[nextIndex];

    // 12 -> 1
    if (hourIndex === 11) {
        nextRotation -= 360;
    }

    const rotation =
        currentRotation +
        (nextRotation - currentRotation) * fraction;

    // Skalierung
    const currentScale = hourScales[hourIndex];
    const nextScale = hourScales[nextIndex];

    const scale =
        currentScale +
        (nextScale - currentScale) * fraction;

    return {
        rotation,
        scale
    };
}


/**
* main method, drawing background, hand and minutes
*/
function draw(event) {
    const now = event.date;
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const clock = getClockValues(event);

    const rotationRadians =
        clock.rotation * Math.PI / 180;

    const scale = clock.scale;

    const scaled = hand.clone().scale(scale);

    const rotated = scaled.rotate(
        rotationRadians,
        80 * scale,
        80 * scale
    );

    render.begin();

    //Background
    render.drawBitmap(
        background,
        (render.width - background.width) / 2,
        (render.height - background.height) / 2
    );
  
    // Hand
    render.drawDCI(
        rotated,
        118 - 80 * scale,
        101 - 80 * scale
    );

    // Center of hand
    render.drawCircle(
        white,
        118,
        101,
        7 * scale
    );

    render.drawCircle(
        black,
        118,
        101,
        5 * scale
    );
    
    //Minutes    
    render.drawText(minutes, timeFont, orange, 168, 150);
  
    render.end();
}

// Cycle per minute
watch.addEventListener("minutechange", draw);