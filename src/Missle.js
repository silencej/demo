/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

import React, { Component } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
//import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";

class App extends Component {
  componentDidMount() {

const importedData = import('./data.json');
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

// times of events
var startTime = new Date(2018, 0, 13, 6).getTime();
var endTime = new Date(2018, 0, 13, 11, 59).getTime();
var launchTime = new Date(2018, 0, 13, 7, 0).getTime();
var alertTime = new Date(2018, 0, 13, 8, 7).getTime();
var cancelTime = new Date(2018, 0, 13, 8, 45).getTime();

var colorSet = new am4core.ColorSet();
var currentTime;

var container = am4core.create("chartdiv", am4core.Container);
container.width = am4core.percent(100);
container.height = am4core.percent(100);

// map chart ////////////////////////////////////////////////////////
var mapChart = container.createChild(am4maps.MapChart);
mapChart.geodata = am4geodata_continentsLow;
mapChart.projection = new am4maps.projections.Miller();
mapChart.deltaLongitude = 145;
mapChart.seriesContainer.draggable = false;

var polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
polygonSeries.exclude = ["Antarctica"];

var mapImageSeries = mapChart.series.push(new am4maps.MapImageSeries());
var pyongyang = mapImageSeries.mapImages.create();
pyongyang.longitude = 125.739708;
pyongyang.latitude = 39.034333;
pyongyang.nonScaling = true;

var pyongyangCircle = pyongyang.createChild(am4core.Circle);
pyongyangCircle.fill = colorSet.getIndex(5);
pyongyangCircle.stroke = pyongyangCircle.fill;
pyongyangCircle.radius = 4;

pyongyangCircle.tooltip = new am4core.Tooltip();
pyongyangCircle.tooltip.filters.clear();
pyongyangCircle.tooltip.background.cornerRadius = 20;
pyongyangCircle.tooltip.label.padding(15, 20, 15, 20);
pyongyangCircle.tooltip.background.strokeOpacity = 0;
pyongyangCircle.tooltipY = -5;


var koreaText = pyongyang.createChild(am4core.Label);
koreaText.text = "朝鲜";
koreaText.fillOpacity = 0.2;
koreaText.fontSize = 20;
koreaText.verticalCenter = "middle";
koreaText.horizontalCenter = "right";
koreaText.paddingRight = 15;

var bomb = mapImageSeries.mapImages.create();
bomb.longitude = 125.739708;
bomb.latitude = 39.034333;
bomb.nonScaling = true;
bomb.opacity = 0;

var bombImage = bomb.createChild(am4core.Image);
bombImage.width = 32;
bombImage.height = 32;
bombImage.href = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/rocket.svg";
bombImage.verticalCenter = "middle";
bombImage.horizontalCenter = "middle";


var honolulu = mapImageSeries.mapImages.create();
honolulu.longitude = -157.887841;
honolulu.latitude = 21.368213;
honolulu.nonScaling = true;


var bulletAlertCircle = honolulu.createChild(am4core.Circle);
bulletAlertCircle.fill = am4core.color();
bulletAlertCircle.stroke = colorSet.getIndex(2);
bulletAlertCircle.strokeOpacity = 1;
bulletAlertCircle.radius = 5;
bulletAlertCircle.strokeWidth = 2;
bulletAlertCircle.visible = false;
var bulletAlertAnimation = bulletAlertCircle.animate([{ property: "radius", to: 50 }, { property: "strokeOpacity", to: 0, from: 1 }], 600).loop().pause();

var honoluluCircle = honolulu.createChild(am4core.Circle);
honoluluCircle.fill = colorSet.getIndex(2);
honoluluCircle.stroke = honoluluCircle.fill;
honoluluCircle.radius = 4;
honoluluCircle.tooltipY = -5;

honoluluCircle.tooltip = new am4core.Tooltip();
honoluluCircle.tooltip.filters.clear();
honoluluCircle.tooltip.background.cornerRadius = 20;
honoluluCircle.tooltip.label.padding(15, 20, 15, 20);
honoluluCircle.tooltip.background.strokeOpacity = 0;


var hawaiiText = honolulu.createChild(am4core.Label);
hawaiiText.text = "夏威夷，美国";
hawaiiText.fillOpacity = 0.1;
hawaiiText.fontSize = 35;
hawaiiText.verticalCenter = "middle";
hawaiiText.paddingLeft = 30;


var bang = mapImageSeries.mapImages.create();
bang.longitude = -177;
bang.latitude = 24;
bang.nonScaling = true;
var bangImage = bang.createChild(am4core.Image);
bangImage.width = 50;
bangImage.height = 50;
bangImage.verticalCenter = "middle";
bangImage.horizontalCenter = "middle";
bangImage.href = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/bang.png";
bang.opacity = 0;

var mapLineSeries = mapChart.series.push(new am4maps.MapLineSeries());
var line = mapLineSeries.mapLines.create();
line.imagesToConnect = [pyongyang, bang];
line.line.strokeOpacity = 0; // it's invisible, we use it for a bomb image to follow it



mapChart.homeGeoPoint = { longitude: -175, latitude: 15 };
mapChart.homeZoomLevel = 2;

// clock chart //////////////////////////////////////////////////////////////////
var clock = mapChart.chartContainer.createChild(am4charts.GaugeChart);
clock.align = "right";
clock.width = 250;
clock.height = 250;
clock.align = "right";
clock.zIndex = 10;

clock.startAngle = -90;
clock.endAngle = 270;

var axis = clock.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 12;
axis.strictMinMax = true;

axis.renderer.line.strokeWidth = 1;
axis.renderer.line.strokeOpacity = 0.2;
axis.renderer.minLabelPosition = 0.05; // hides 0 label
axis.renderer.inside = true;
axis.renderer.labels.template.radius = 23;
axis.renderer.axisFills.template.disabled = true;
axis.renderer.grid.template.disabled = true;
axis.renderer.minGridDistance = 20;
axis.renderer.ticks.template.length = 4;
axis.renderer.ticks.template.strokeOpacity = 0.2;

// clock hands
var hourHand = clock.hands.push(new am4charts.ClockHand());
hourHand.radius = am4core.percent(60);
hourHand.startWidth = 5;
hourHand.endWidth = 5;
hourHand.rotationDirection = "clockWise";
hourHand.pin.radius = 5;
hourHand.zIndex = 0;

var minutesHand = clock.hands.push(new am4charts.ClockHand());
minutesHand.rotationDirection = "clockWise";
minutesHand.startWidth = 2;
minutesHand.endWidth = 2;
minutesHand.radius = am4core.percent(78);
minutesHand.zIndex = 1;


function updateHands(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // set hours
    hourHand.showValue(hours + minutes / 60, 0);
    // set minutes
    minutesHand.showValue(12 * (minutes + seconds / 60) / 60, 0);
}

/// end of clock

var exploded = false;

let honoluluTexts = [
    { time: new Date(2018, 0, 13, 6, 7).getTime(), text: "我想看爱奇艺..." },
    { time: new Date(2018, 0, 13, 6, 30).getTime(), text: "... 哦，一个撸猫视频 ..." },
    { time: new Date(2018, 0, 13, 7, 10).getTime(), text: "... LOL 有趣 ..." },
    { time: new Date(2018, 0, 13, 8, 7).getTime(), text: "啊?!?" },
    { time: new Date(2018, 0, 13, 8, 15).getTime(), text: "天啦!!!" },
    { time: new Date(2018, 0, 13, 8, 49).getTime(), text: "还好!" },
    { time: new Date(2018, 0, 13, 8, 59).getTime(), text: "好吧，我们在哪？" },
    { time: new Date(2018, 0, 13, 9, 20).getTime(), text: "" }
];

let pyongyangTexts = [
    { time: new Date(2018, 0, 13, 6, 5).getTime(), text: "好同志..." },
    { time: new Date(2018, 0, 13, 6, 20).getTime(), text: "啥!?" },
    { time: new Date(2018, 0, 13, 6, 40).getTime(), text: "请按此按钮..." },
    { time: new Date(2018, 0, 13, 7, 0).getTime(), text: "好！" },
    { time: new Date(2018, 0, 13, 7, 30).getTime(), text: "" },
];

// updates all elements
function setTime() {
    var time = new Date(startTime + (endTime - startTime) * slider.start).getTime();;
    var roundedTime = am4core.time.round(new Date(time), "minute").getTime();

    if (roundedTime != currentTime) {
        currentTime = roundedTime;
        var count = lineSeries.dataItems.length;
        if (slider) {
            for (var i = 0; i < count; i++) {
                var dataItem = lineSeries.dataItems.getIndex(i);

                if (i < slider.start * count) {
                    dataItem.show(500, 0, ["valueY"]);
                }
                else {
                    dataItem.hide(500, 0, 0, ["valueY"]);
                }
            }
        }
    }

    // add some drama by zooming the map
    updateHands(new Date(time));

    var bombFlyDuration = cancelTime - launchTime;
    var bombPosition = (time - launchTime) / bombFlyDuration;
    bombPosition = Math.min(1, bombPosition);
    bombPosition = Math.max(0, bombPosition);

    var oPoint = line.positionToPoint(bombPosition);
    var geoPoint = mapChart.seriesPointToGeo(oPoint);
    bomb.latitude = geoPoint.latitude;
    bomb.longitude = geoPoint.longitude;
    bomb.rotation = oPoint.angle + 90;

    if (bombPosition > 0 && bombPosition < 1) {
        bomb.opacity = 1;
    }

    if ((bombPosition >= 1 && !exploded)) {
        bomb.opacity = 0;
        bang.opacity = 1;
        bang.animate({ property: "opacity", to: 0, from: 1 }, 1000);
        exploded = true;
    }

    if (exploded && bombPosition < 1) {
        exploded = false;
        bang.opacity = 0;
        bomb.opacity = 1;
    }

    if (bombPosition <= 0.001) {
        bomb.opacity = 0;
    }

    if (time > alertTime && time < cancelTime) {
        if (!bulletAlertCircle.visible) {
            bulletAlertCircle.visible = true;
            bulletAlertAnimation.resume();
        }
    }
    else {
        bulletAlertCircle.visible = false;
    }

    for (var i = 0; i < honoluluTexts.length; i++) {
        var honoluluText = honoluluTexts[i];
        if (time > honoluluText.time) {
            honoluluCircle.tooltipText = honoluluText.text;
        }
    }

    if (honoluluCircle.tooltipText) {
        honoluluCircle.showTooltip();
    }
    else {
        honoluluCircle.hideTooltip();
    }

    for (var i = 0; i < pyongyangTexts.length; i++) {
        var pyongyangText = pyongyangTexts[i];
        if (time > pyongyangText.time) {
            pyongyangCircle.tooltipText = pyongyangText.text;
        }
    }

    if (pyongyangCircle.tooltipText) {
        pyongyangCircle.showTooltip();
    }
    else {
        pyongyangCircle.hideTooltip();
    }
}


var chart = container.createChild(am4charts.XYChart);
chart.padding(0, 50, 50, 50);
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.tooltip.background.pointerLength = 4;
dateAxis.tooltip.background.fillOpacity = 1;
dateAxis.tooltip.background.fill = am4core.color("#666666");
dateAxis.tooltip.background.stroke = dateAxis.tooltip.background.fill;


chart.height = 300;
chart.valign = "bottom";

var gradientFill = new am4core.LinearGradient();
gradientFill.addColor(am4core.color("#000000"), 0, 0);
gradientFill.addColor(am4core.color("#000000"), 1, 1);
gradientFill.rotation = 90;

chart.background.fill = gradientFill;

//dateAxis.renderer.inside = true;
dateAxis.renderer.ticks.template.disabled = true;
dateAxis.renderer.grid.template.strokeDasharray = "3,3";
dateAxis.renderer.grid.template.strokeOpacity = 0.2;
dateAxis.renderer.line.disabled = true;
dateAxis.tooltip.dateFormatter.dateFormat = "YYYY-MM-dd HH:mm";
dateAxis.renderer.inside = false;
dateAxis.renderer.labels.template.fillOpacity = 0.4;
dateAxis.renderer.minLabelPosition = 0.03;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.ticks.template.disabled = true;
valueAxis.min = -90;
valueAxis.max = 90;
valueAxis.renderer.minGridDistance = 20;
valueAxis.renderer.grid.template.disabled = true;
valueAxis.renderer.line.disabled = true;
valueAxis.tooltip.disabled = true;
valueAxis.strictMinMax = true;
valueAxis.renderer.labels.template.fillOpacity = 0.4;
valueAxis.renderer.inside = true;

var lineSeries = chart.series.push(new am4charts.LineSeries());
lineSeries.dataFields.valueY = "value";
lineSeries.dataFields.dateX = "time";
lineSeries.tooltipText = "{valueY.workingValue}%";
lineSeries.stroke = am4core.color("#3f2698");
lineSeries.tooltip.background.fillOpacity = 0;
lineSeries.tooltip.autoTextColor = false;
lineSeries.tooltip.label.fill = am4core.color("#ffffff");
lineSeries.tooltip.filters.clear();
lineSeries.tooltip.pointerOrientation = "vertical";
lineSeries.tensionX = 0.7;
lineSeries.strokeWidth = 2;

var negativeRange = valueAxis.createSeriesRange(lineSeries);
negativeRange.value = 0;
negativeRange.endValue = - 100;
negativeRange.contents.stroke = am4core.color("#84279a");
negativeRange.contents.fill = negativeRange.contents.stroke;

chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "none";
chart.cursor.xAxis = dateAxis;
chart.cursor.lineX.strokeOpacity = 0;

chart.events.on("inited", () => {
    createSlider();
})

var slider;

var alertStart = dateAxis.axisRanges.create();
alertStart.date = new Date(alertTime);
alertStart.grid.stroke = am4core.color("#ffffff");
alertStart.grid.strokeWidth = 1;
alertStart.grid.strokeOpacity = 0.5;
alertStart.grid.strokeDasharray = undefined;
alertStart.label.text = "市民警告";
alertStart.label.horizontalCenter = "right";
alertStart.label.fillOpacity = 0.7;
alertStart.label.dy = -215;

var alertCanceled = dateAxis.axisRanges.create();
alertCanceled.date = new Date(cancelTime);
alertCanceled.grid.stroke = am4core.color("#ffffff");
alertCanceled.grid.strokeOpacity = 0.5;
alertCanceled.grid.strokeDasharray = undefined;
alertCanceled.label.text = "警告消除";
alertCanceled.label.dy = -215;
alertCanceled.label.fillOpacity = 0.7;
alertCanceled.label.horizontalCenter = "left";

var playButton;


function createSlider() {
    var sliderContainer = container.createChild(am4core.Container);

    sliderContainer.width = am4core.percent(100);
    sliderContainer.valign = "bottom";
    sliderContainer.padding(0, 50, 25, 50);
    sliderContainer.layout = "horizontal";
    sliderContainer.height = 50;


    playButton = sliderContainer.createChild(am4core.PlayButton);
    playButton.valign = "middle";
    playButton.events.on("toggled", function (event) {
        if (event.target.isActive) {
            play();
        }
        else {
            stop();
        }
    })

    slider = sliderContainer.createChild(am4core.Slider);
    slider.valign = "middle";
    slider.margin(0, 0, 0, 0);
    slider.marginLeft = 30;
    slider.height = 15;
    slider.events.on("rangechanged", function () {
        setTime();
    });

    slider.startGrip.events.on("drag", function () {
        stop();
        sliderAnimation.setProgress(slider.start);
    });

    sliderAnimation = slider.animate({ property: "start", to: 1 }, 50000, am4core.ease.linear).pause();
    sliderAnimation.events.on("animationended", function () {
        playButton.isActive = false;
    })
}


var sliderAnimation;

function play() {
    if (slider) {
        if (slider.start >= 1) {
            slider.start = 0;
            sliderAnimation.start();
        }
        sliderAnimation.resume();
        playButton.isActive = true;
    }
}

function stop() {
    sliderAnimation.pause();
    playButton.isActive = false;
}

setTimeout(function () {
    play()
}, 2000);

var label = container.createChild(am4core.Label);
label.text = "夏威夷网站流量 在2018年1月13日 假弹道导弹警告";
label.valign = "bottom";
label.padding(0, 50, 10, 0);
label.align = "right";

chart.data = importedData;

  this.container = container;

  }

  componentWillUnmount() {
    if (this.container) {
      this.container.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default App;
