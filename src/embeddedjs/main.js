import Poco from "commodetto/Poco";
console.log("Hello, 3dfx.");
const render = new Poco(screen);
const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);
const orange = render.makeColor(231, 95, 47);
//const timeFont = new render.Font("Bitham-Black", 30);
//const timeFont = new render.Font("Roboto-Condensed", 21);
const timeFont = new render.Font("Gothic-Bold", 18);

function draw(event) {  
  const now = event.date;
  const minutes = String(now.getMinutes()).padStart(2, "0");
  render.begin();
  if (minutes == "00") {
    const hours = now.getHours();
	  drawHours(hours, render);
  }
  render.fillRectangle(white, 168, 158, 15, 12);	    
  render.drawText(minutes, timeFont, orange,
        170-2,
        160-6);
  render.end();
}

function drawHours(hours, render) {
  const bitmap = new Poco.PebbleBitmap(hours);
  render.fillRectangle(black, 0, 0, render.width, render.height);	
	render.drawBitmap(bitmap, (render.width - bitmap.width) / 2, (render.height - bitmap.height) / 2);
}

//initial background render
render.begin();
drawHours(new Date().getHours(), render);
render.end();

watch.addEventListener("minutechange", draw);

