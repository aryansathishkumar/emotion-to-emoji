Webcam.set
({
    height:350,
    width:300,
    img_format:"jpeg",
    jpeg_quality:90
});
var camera = document.getElementById("camera-display");
Webcam.attach("camera-display");

var prediction_1 = "";
var prediction_2 = "";

console.log("ml5 is loaded", ml5.version)

function snapit()
{
    Webcam.snap(function (data_uri)
    {
        document.getElementById("img-captured").innerHTML='<img id="snapped-img" src="'+data_uri+'">';
    });
}

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Z5GESa2R4/model.json", ml5loaded);

function ml5loaded()
{
    console.log("ml5 is loaded");
}

function predict()
{
    var img = document.getElementById("snapped-img");
    classifier.classify(img ,emoji);
}

function emoji(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_1").innerHTML = prediction_1;
        document.getElementById("result_2").innerHTML = prediction_2;
        speak();
        if(prediction_1 == "angry")
        {
            document.getElementById("emoji_1").innerHTML = "&#128545;"
        }
        if(prediction_2 == "angry")
        {
            document.getElementById("emoji_2").innerHTML = "&#128545;"
        }
        if(prediction_1 == "happy")
        {
            document.getElementById("emoji_1").innerHTML = "&#128522;"
        }
        if(prediction_2 == "happy")
        {
            document.getElementById("emoji_2").innerHTML = "&#128522;"
        }
        if(prediction_1 == "sad")
        {
            document.getElementById("emoji_1").innerHTML = "&#128532;"
        }
        if(prediction_2 == "sad")
        {
            document.getElementById("emoji_2").innerHTML = "&#128532;"
        }
        if(prediction_1 == "crying")
        {
            document.getElementById("emoji_1").innerHTML = "&#128546;"
        }
        if(prediction_2 == "crying")
        {
            document.getElementById("emoji_2").innerHTML = "&#128546;"
        }
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    var voices = window.speechSynthesis.getVoices()
    var spoken_data_1 = "The first prediction is" + prediction_1;
    var spoken_data_2 = "The second prediction is" + prediction_2;
    var speak = new SpeechSynthesisUtterance(spoken_data_1 + spoken_data_2);
    speak.voice = voices[16]
    synth.speak(speak);
}