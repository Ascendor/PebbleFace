import Poco from "commodetto/Poco";
console.log("Hello, 3dfx.");
const render = new Poco(screen);
const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);
const orange = render.makeColor(231, 95, 47);
const gray = render.makeColor(127, 127, 127);
//const timeFont = new render.Font("Bitham-Black", 30);
//const timeFont = new render.Font("Roboto-Condensed", 21);
const timeFont = new render.Font("Gothic-Bold", 18);
//const timeFont = new render.Font("Gothic-Regular", 18);

function draw(event) {  
  const now = event.date;
  const minutes = String(now.getMinutes()).padStart(2, "0");
  if (minutes == "00") {
    render.begin(36,26, 152+1, 143+1); // Wir aktualisieren nur Zeiger und Ziffern
    const hours = now.getHours();
    console.log(hours);
	  drawHours(hours, render);
  } else {
    render.begin(168-1, 154-1, 15+2, 16+2);  // Wir aktualisieren nur Ziffern
  }  
  render.fillRectangle(white, 168, 154, 15, 12);	    
  /*
  drawTextWithOutline(render, minutes, timeFont, orange, gray,
        170-1,
        160-6);
  */
  render.drawText(minutes, timeFont, orange, 168, 150);
  render.end();  
}

function drawHours(hours, render) {
  hours = hours % 12;
  if (hours == 0) {
    hours = 12;
  }
  const bitmap = new Poco.PebbleBitmap(hours);
  render.fillRectangle(black, 0, 0, render.width, render.height);	
	render.drawBitmap(bitmap, (render.width - bitmap.width) / 2, (render.height - bitmap.height) / 2);
}

function drawTextWithOutline(render, text, font, fillColor, outlineColor, x, y) {
    // 1. Draw the outline by offsetting the text 1 pixel in all 4 cardinal directions
    render.drawText(text, font, outlineColor, x - 1, y);     // Left
    render.drawText(text, font, outlineColor, x + 1, y);     // Right
    render.drawText(text, font, outlineColor, x,     y - 1); // Up
    render.drawText(text, font, outlineColor, x,     y + 1); // Down

    // Optional: Add diagonal offsets for a thicker/smoother outline
    // render.drawText(text, font, outlineColor, x - 1, y - 1);
    // render.drawText(text, font, outlineColor, x + 1, y - 1);
    // render.drawText(text, font, outlineColor, x - 1, y + 1);
    // render.drawText(text, font, outlineColor, x + 1, y + 1);

    // 2. Draw the main text on top in the center
    render.drawText(text, font, fillColor, x, y);
}

//initial background render
render.begin();
drawHours(new Date().getHours(), render);
render.end();

watch.addEventListener("minutechange", draw);

