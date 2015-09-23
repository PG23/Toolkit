window.addEventListener("DOMContentLoaded", function() {
  "use strict";
  
  // Geolocation
  var timeEl = document.querySelector("#time");
  var altitudeEl = document.querySelector("#altitude");
  var latitudeEl = document.querySelector("#latitude");
  var longitudeEl = document.querySelector("#longitude");
  var speedEl = document.querySelector("#speed");
  var headingEl = document.querySelector("#heading");
  navigator.geolocation.watchPosition(function (position) {
    timeEl.innerHTML = Date(position.timestamp);
    altitudeEl.innerHTML = Math.round(position.coords.altitude) + "m ± " + Math.round(position.coords.altitudeAccuracy) + "m";
    latitudeEl.innerHTML = Math.round(1000000*position.coords.latitude)/1000000 + "° ± " + Math.round(position.coords.accuracy) + "m";
    longitudeEl.innerHTML = Math.round(1000000*position.coords.longitude)/1000000 + "° ± " + Math.round(position.coords.accuracy) + "m";
    speedEl.innerHTML = Math.round(10*position.coords.speed)/10 + "m/s";
    headingEl.innerHTML = Math.round(10*position.coords.heading)/10 + "°";
  })
  
  // Orientation
  var alphaEl = document.querySelector("#alpha");
  var betaEl = document.querySelector("#beta");
  var gammaEl = document.querySelector("#gamma");
  var needleAlphaEl = document.querySelector("#needleAlpha");
  var needleBetaEl = document.querySelector("#needleBeta");
  var needleGammaEl = document.querySelector("#needleGamma");
  window.addEventListener("deviceorientation", function (event) {
    var alpha = Math.round(10*(360-event.alpha))/10;
    var beta = Math.round(10*event.beta)/10;
    var gamma = Math.round(10*event.gamma)/10;
    alphaEl.innerHTML = alpha + "°";
    betaEl.innerHTML = beta + "°";
    gammaEl.innerHTML = gamma + "°";
    needleAlphaEl.style.transform = "rotate(" + (-alpha) + "deg)";
    needleBetaEl.style.top = (48+50*(Math.sin(Math.PI*(-beta)/360))) + "%";
    needleGammaEl.style.left = (48+50*(Math.sin(Math.PI*(-gamma)/360))) + "%";
  })
  
  // Acceleration
  var xAccEl = document.querySelector("#xAcc");
  var yAccEl = document.querySelector("#yAcc");
  var zAccEl = document.querySelector("#zAcc");
  var needleXAccEl = document.querySelector("#needleXAcc");
  var needleYAccEl = document.querySelector("#needleYAcc");
  var needleZAccEl = document.querySelector("#needleZAcc");
  window.addEventListener("devicemotion", function (event) {
    var xAcc = event.accelerationIncludingGravity.x;
    var yAcc = event.accelerationIncludingGravity.y;
    var zAcc = event.accelerationIncludingGravity.z;
    xAccEl.innerHTML = Math.round(10*xAcc)/10 + "m/s²";
    yAccEl.innerHTML = Math.round(10*yAcc)/10 + "m/s²";
    zAccEl.innerHTML = Math.round(10*zAcc)/10 + "m/s²";
    needleXAccEl.style.left = Math.min(0, 50+50*MathMath.max(-2, xAcc/9.81));
    needleXAccEl.style.width = 
  })
  
  // Proximity
  var proximityEl = document.querySelector("#proximity");
  window.addEventListener("deviceproximity", function (event) {
    proximityEl.innerHTML = Math.round(event.value) + "cm";
  })
  
  // Ambient light intensity
  var lightEl = document.querySelector("#light");
  window.addEventListener("devicelight", function (event) {
    lightEl.innerHTML = Math.round(event.value) + "lux";
  })
    
});