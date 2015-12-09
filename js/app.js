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
  var screenEl = document.querySelector("#screen");
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
  });
  screenEl.innerHTML = screen.mozOrientation || screen.orientation;
  screen.addEventListener("mozorientationchange", function () {
    screenEl.innerHTML = screen.mozOrientation;
  });
  screen.addEventListener("orientationchange", function () {
    screenEl.innerHTML = screen.orientation;
  });
  
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
    needleXAccEl.style.left = Math.max(0, 50+25*(Math.min(0, xAcc)/9.81)) + "%";
    needleXAccEl.style.right = Math.max(0, 50-25*(Math.max(0, xAcc)/9.81)) + "%";
    needleYAccEl.style.left = Math.max(0, 50+25*(Math.min(0, yAcc)/9.81)) + "%";
    needleYAccEl.style.right = Math.max(0, 50-25*(Math.max(0, yAcc)/9.81)) + "%";
    needleZAccEl.style.left = Math.max(0, 50+25*(Math.min(0, zAcc)/9.81)) + "%";
    needleZAccEl.style.right = Math.max(0, 50-25*(Math.max(0, zAcc)/9.81)) + "%";
  });
  
  // Proximity
  var xProximityEl = document.querySelector("#xProximity");
  var needleXProximityEl = document.querySelector("#needleXProximity");
  window.addEventListener("deviceproximity", function (event) {
    var xProximity = event.value;
    var minXProximity = Math.min(event.min, event.value);
    var maxXProximity = Math.max(event.max, event.value);
    xProximityEl.innerHTML = Math.round(xProximity) + "cm";
    needleXProximityEl.style.left = -2+100*(xProximity-minXProximity)/(maxXProximity-minXProximity) + "%";
  });
  
  // Ambient light intensity
  var xLightEl = document.querySelector("#xLight");
  var needleXLightEl = document.querySelector("#needleXLight");
  window.addEventListener("devicelight", function (event) {
    var xLight = event.value;
    xLightEl.innerHTML = Math.round(xLight) + "lux";
    needleXLightEl.style.width = 100*(1-Math.exp(-xLight/100)) + "%";
  });
  
  // Battery
  var lBattEl = document.querySelector("#lBatt");
  var cBattEl = document.querySelector("#cBatt");
  var ctBattEl = document.querySelector("#ctBatt");
  var dtBattEl = document.querySelector("#dtBatt");
  var battery = navigator.battery;
  lBattEl.innerHTML = battery.level * 100 + "%";
  cBattEl.innerHTML = battery.charging ? "Yes" : "No";
  ctBattEl.innerHTML = battery.chargingTime + " s";
  dtBattEl.innerHTML = battery.dischargingTime + " s";
  battery.addEventListener('levelchange', function() {
    lBattEl.innerHTML = battery.level * 100 + "%";
  });
  battery.addEventListener('chargingchange', function() {
    cBattEl.innerHTML = battery.charging ? "Yes" : "No";
  });
  battery.addEventListener('chargingtimechange', function() {
    ctBattEl.innerHTML = battery.chargingTime + " s";
  });
  battery.addEventListener('dischargingtimechange', function() {
    dtBattEl.innerHTML = battery.dischargingTime + " s";
  });
  
});