var dropzone;
var pages = 0;
var images = [];
var title;
var zineName;
var big = 3300;
var submit;

function setup() {
  big = 600;
  title = createInput('Zine');
  submit = createButton('Submit');
  createCanvas(big, big / 11 * 8.5);
  background(255);
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);
  submit.mousePressed(collate);
  //console.log(title.value());
  //title.input(gatherTitle);
}

function collate() {
  if (images.length % 2 !== 0) {
    append(images, false);
  }
  console.log("Collating");
  var newArray = [];
  for (var i = 0; i < ((images.length - 1) / 2); i++) {
    append(newArray, images[i]);
    append(newArray, images[images.length - 1 - i]);
  }
  images = newArray;
  //console.log(images);
  process();
}

function highlight() {
  dropzone.style('background-color', '#ccc');
}

function unhighlight() {
  dropzone.style('background-color', '#fff');
}

function gotFile(file) {
  append(images, createImg(file.data));
  //(images[images.length - 1]).hide();
}

function process() {
  line(width / 2, 0, width / 2, height);
  var pWidth = (width / 2) - (big / 22);
  var pHeight = height - (big / 22);
  for (var i = 0; i < images.length; i++) {
    pages++;
    imageMode(CENTER);
    if ((images[i]) !== false) {
      if (((images[i]).width / (images[i]).height) <= ((width / 2) / height)) {
        image(images[i], (1 + (((pages - 1) % 2) * 2)) * width / 4, height / 2, pHeight / (images[i]).height * (images[i]).width, pHeight);
        //image(img,(1+((pages-1)*2))*width/4,height/2,(height/img.height*img.width)/width*pWidth*2,pHeight);
        print("height");
      } else {
        image(images[i], (1 + (((pages - 1) % 2) * 2)) * width / 4, height / 2, pWidth, pWidth / (images[i]).width * (images[i]).height);
        //image(img,(1+((pages-1)*2))*width/4,height/2,pWidth,(width/img.width*img.height)/height/2*pHeight);
        print("width");
      }
    }
    if (pages % 2 === 0) {
      saveCanvas(title.value() + " page " + str(pages / 2) + ".png", "png");
      background(255);
      line(width / 2, 0, width / 2, height);
      //console.log(title.value);
    }
  }
}

function draw() {

}