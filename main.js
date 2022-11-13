status = "";
find = "";
objects = [];

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video  = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
   find =  document.getElementById("input").value;
   console.log(find);
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = "true";
} 
 
function draw()
{
    image(video , 0 , 0 , 380 , 380);
    if(status != "")
    {
        objectDetector.detect(video , gotResult);
        for (i = 0; i < objects.length; i++ )
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width  , objects[i].height);

            if(objects[i].label  == find)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("found").innerHTML = find + " found";
                synt = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(find + "found");
                synt.speak(utterthis);
            }
            else
            {
                document.getElementById("found").innerHTML = find + " not found";
            }
        }
    }
}

function gotResult(error , results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}