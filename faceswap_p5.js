var clickedpicture;
var selectedpicture;
var scalefactor;
var composite;
var change=false;
let faceapi,faceapi2;
let face1=[[]],face2=[[]];
var defaultimage="images/1.jpg";
//test
var w = screen.width;
//let faceapi,faceapi2;


const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
  minConfidence: 0.1,
  withTinyNet: false,
  Mobilenetv1Model: "models",
  TinyFaceDetectorModel:"models",
 FaceLandmarkModel:"models",
  FaceLandmark68TinyNet:"models",
  FaceRecognitionModel: "models",
 };



function setup() {
    start_camera();
    $("select").imagepicker();
    faceapi = ml5.faceApi(detectionOptions, modelReady);
    faceapi2 = ml5.faceApi(detectionOptions, modelReady);
    composite=createCanvas(w, w*0.75);
    composite.id('composite_canvas');
    selectimage(defaultimage);


}


function draw() {
  //background(200);

    if(change==true)
    {
      drawselectedpicture();
      console.log(clickedpicture);
      console.log(selectedpicture);
      face1=faceapi.detect(clickedpicture, gotResults).then(function(detections){
          //drawrectangles(detections);
          return detections;
        });
      face2=faceapi2.detect(selectedpicture, gotResults2).then(function(detections){
        //  drawrectangles(detections);
        return detections;
      });
      change=false;

    replacefaces();
    }



    //drawclickedpicture();

    //test


}

function selectimage(src) {
    selectedpicture = loadImage(src,  function imageloaded(){

      scalefactor=w/selectedpicture.width;
      selectedpicture.resize(selectedpicture.width*scalefactor,selectedpicture.height*scalefactor)
          change=true;
    });

}

function drawclickedpicture()
{
  if (clickedpicture != null)
      image(clickedpicture, 0, 0, 400, 300);
}

function drawselectedpicture()
{
  if (selectedpicture != null) {
    image(selectedpicture, 0, 0)
    fill(255, 0, 0);
  }


}



function modelReady() {
  console.log("ready!");
  console.log(faceapi);

}



function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }

console.log(result);
return result;
}

function gotResults2(err, result) {
  if (err) {
    console.log(err);
    return;
  }

console.log(result);
return result;
}

function drawrectangles(lists)
{
  console.log(lists,'identifier');
  lists.forEach(function (detection)
  {
    console.log(detection, "rectangle");
 const alignedRect = detection.alignedRect;
 const { _x, _y, _width, _height } = alignedRect._box;
 noFill();
 stroke(161, 95, 251);
 strokeWeight(2);
 console.log(_x,_y,_width,_height,"dimensions");
 rect(_x, _y, _width, _height);
});
}

function replacefaces()
{
image(selectedpicture,0,0);
  face1.then(function (detections){

    detections.forEach(function (detection,i=0)
    {
      console.log(detection, "rectangle");
      const alignedRect = detection.alignedRect;
      const { _x, _y, _width, _height } = alignedRect._box;
      fill(255,0,0);
      stroke(161, 95, 251);
      strokeWeight(2);
      console.log(_x,_y,_width,_width,"dimensions");
    //  rect(_x, _y, _width, _height);
      var temp=clickedpicture.get(_x,_y,_width,_width);

      console.log(i,"i")

face2.then(function (detections)
{

  detections.sort(function(a, b) {
      var x = a.alignedRect._box.area; // ignore upper and lowercase
      var y = b.alignedRect._box.area; // ignore upper and lowercase
      if(x > y) {
          return -1;
      }
      if(x < y) {
          return 1;
      }
      // names must be equal
      return 0;
  });



  const alignedRect = detections[i].alignedRect;
  const { _x, _y, _width, _height } = alignedRect._box;
  fill(255,0,0);
  stroke(161, 95, 251);
  strokeWeight(2);
  console.log(_x,_y,_width,_width,"dimensions");
  image(temp,_x, _y, _width, _height);

}


)


  i++;

    });
  });
}
