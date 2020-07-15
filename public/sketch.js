let scl = 3;
let canvasWidth = 1080;
let canvasHeight = 1350;
let fs1 = 40;
let fs2 = 35;
let fs3 = 30;
let paddingTop = 0.12 * canvasHeight;
let paddingSide = 0.07 * canvasHeight;

let bgColor, fgColor, mainText, signature, time, canvasToImg, canvasToThumb;
let mtv, sv;

let t;
let pc;

let img;
let imgW;
let imgH;


const table = {"00":"0","01":"1","02":"2","03":"3","04":"4","05":"5","06":"6","07":"7","10":"8","11":"9","12":"a","13":"b","14":"c","15":"d","16":"e","17":"f","20":"g","21":"h","22":"i","23":"j","24":"k","25":"l","26":"m","27":"n","30":"o","31":"p","32":"q","33":"r","34":"s","35":"t","36":"u","37":"v","40":"w","41":"x","42":"y","43":"z","44":"A","45":"B","46":"C","47":"D","50":"E","51":"F","52":"G","53":"H","54":"I","55":"J","56":"K","57":"L","60":"M","61":"N","62":"O","63":"P","64":"Q","65":"R","66":"S","67":"T","70":"U","71":"V","72":"W","73":"X","74":"Y","75":"Z","76":"_","77":"-"};

const dto64 = (dec) => {
  return dec.toString(8).padStart(14, "0").replace(/([0-7]{2})/g, ($1) => {
    return table[$1];
  });
};

function setup() {
  
  let canvas = createCanvas(canvasWidth, canvasHeight);
  pc = createGraphics(canvasWidth,canvasHeight);
  canvas.parent('preview');
  // canvas.drop(userImage);
  //colorMode(HSB, 360, 100, 100 ,1);

  bgColor = select('#bgcolor');
  fgColor = select('#fgcolor');
  mainText = select('#maintext');
  signature = select('#sign');
  time = select('#time');
  canvasToImg = select('#result');
  canvasToThumb = select('#thumbnail');

  mainText.input(change);
  signature.input(change);
  bgColor.input(change);
  fgColor.input(change);

  change();
  
}


function change() {
  
  document.documentElement.style.setProperty('--fgcolor', document.querySelector('input[id="fgcolor"]').value);
  document.documentElement.style.setProperty('--bgcolor', document.querySelector('input[id="bgcolor"]').value);

  pc.background(bgColor.value());
  
  // if (img) { 
  //   tint(100);
  //   image(img, 0, canvasHeight-imgH, imgW, imgH);
  //   //blend(0, canvasHeight-imgH, imgW, imgH, 0, canvasHeight-imgH, imgW, imgH, MULTIPLY);
  // }
  
  pc.fill(fgColor.value());
  
  pc.textFont('Monospace', fs1);
  pc.textAlign(LEFT);
  mtv = mainText.value().toString()
    // .replace(/((?:^.{37}))(.+)/gm, '$1\r\n$2')                        // 37 columns max
    .replace(/^\s+/gm,'')                                             // remove starting spaces
    .replace(/\s{2,}/gm,' ')                                          // remove double spaces
    .replace(/(^(?:[^\r\n]*[\r\n]){17}[^\r\n]*)[\r\n].*/gm, '$1')    // 18 rows max
    .replace(/(.{0,683}).*/gm, '$1');                                  // 683 characters max
  pc.text(mtv.trim(), paddingSide, 1.1*paddingTop, canvasWidth - 2 * paddingSide, canvasHeight - 2.75 * paddingTop);
  mainText.value(mtv);

  pc.textFont('Monospace', fs2);
  pc.textAlign(RIGHT);
  sv = signature.value().toString()
    .replace(/^\s+|\s{2,}$|\s*\n.*/gm,'')                            // no extra spaces or new lines
    .replace(/(.{0,24}).*/gm, '$1');                                  // 24 columns max
  pc.text(sv.trim(), paddingSide, canvasHeight - 1.6 * paddingTop, canvasWidth - 2 * paddingSide + 0.6*fs2, fs1);
  signature.value(sv);

  pc.textFont('Monospace', fs3);
  pc.textAlign(RIGHT);
  t = Date.now();
  time.value(t);
  pc.text(dto64(t-1594000000000), paddingSide, canvasHeight - 1.5 * paddingTop + fs2, canvasWidth - 2 * paddingSide + 0.6*fs3, fs3);
  
  // pc.noFill();
  // pc.rect(0, (canvasHeight-canvasWidth)/2, canvasWidth, canvasWidth)
  // pc.rect(paddingSide, paddingTop, canvasWidth - 2 * paddingSide, canvasHeight - 2.75 * paddingTop)
  // pc.rect(paddingSide, paddingTop, canvasWidth - 2 * paddingSide, canvasHeight - 2 * paddingTop)
  // pc.rect(paddingSide, canvasHeight - 1.6 * paddingTop, canvasWidth - 2 * paddingSide, fs2)
  // pc.rect(paddingSide, canvasHeight - 1.5 * paddingTop + fs2, canvasWidth - 2 * paddingSide, fs3)

  image(pc, 0, 0);

}

function canvasDataURL() {

  canvasToImg.value(canvas.toDataURL("image/jpeg"));
  resizeCanvas(canvasWidth/scl, canvasWidth/scl);
  image(pc, 0, 0, canvasWidth/scl, canvasWidth/scl, 0, (canvasHeight-canvasWidth)/2, canvasWidth, canvasWidth);
  canvasToThumb.value(canvas.toDataURL("image/jpeg", 0.6));
  resizeCanvas(canvasWidth, canvasHeight);
  setup();

}

// function userImage(file) {
//   if (file.type === 'image') {
//     img = createImg(file.data).hide();
//     imgW = img.width;
//     imgH = img.height;
//     let tw = canvasWidth*0.4;
//     let th = canvasWidth*0.4;
//     let sw = tw/imgW;
//     let sh = th/imgH;
//     let s = min(sw,sh);
//     imgW*=s;
//     imgH*=s;
//     change();
//   }
// }


