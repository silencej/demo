import React, { Component } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);

// svg path for target icon
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

const lines = [{
            latitudes: [51.5002, 50.4422],
            longitudes: [-0.1262, 30.5367]
        }, {
            latitudes: [51.5002, 46.9480],
            longitudes: [-0.1262, 7.4481]
        }, {
            latitudes: [51.5002, 59.3328],
            longitudes: [-0.1262, 18.0645]
        }, {
            latitudes: [51.5002, 40.4167],
            longitudes: [-0.1262, -3.7033]
        }, {
            latitudes: [51.5002, 46.0514],
            longitudes: [-0.1262, 14.5060]
        }, {
            latitudes: [51.5002, 48.2116],
            longitudes: [-0.1262, 17.1547]
        }, {
            latitudes: [51.5002, 44.8048],
            longitudes: [-0.1262, 20.4781]
        }, {
            latitudes: [51.5002, 55.7558],
            longitudes: [-0.1262, 37.6176]
        }, {
            latitudes: [51.5002, 38.7072],
            longitudes: [-0.1262, -9.1355]
        }, {
            latitudes: [51.5002, 64.1353],
            longitudes: [-0.1262, -21.8952]
        }, {
            latitudes: [51.5002, 40.4300],
            longitudes: [-0.1262, -74.0000]
        }];

class App extends Component {
  componentDidMount() {

// var chart = AmCharts.makeChart("chartdiv", {
  const chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.geodata = am4geodata_worldLow;
  // chart.theme = "light";
  // chart.creditsPosition = "top-right";

  let lineSeries = chart.series.push(new am4maps.MapLineSeries());
  lineSeries.data = [{
    "multiGeoLine": lines
  }];


//     dataProvider: {
//         map: "worldLow",
//         zoomLevel: 3.5,
//         zoomLongitude: -20.1341,
//         zoomLatitude: 49.1712,
// 
//         images: [{
//             id: "london",
//             svgPath: targetSVG,
//             title: "London",
//             latitude: 51.5002,
//             longitude: -0.1262,
//             scale: 1
//         }, {
//             svgPath: targetSVG,
//             title: "Athens",
//             latitude: 37.9792,
//             longitude: 23.7166,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Reykjavik",
//             latitude: 64.1353,
//             longitude: -21.8952,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Lisbon",
//             latitude: 38.7072,
//             longitude: -9.1355,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Moscow",
//             latitude: 55.7558,
//             longitude: 37.6176,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Belgrade",
//             latitude: 44.8048,
//             longitude: 20.4781,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Bratislava",
//             latitude: 48.2116,
//             longitude: 17.1547,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Ljubljana",
//             latitude: 46.0514,
//             longitude: 14.5060,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Madrid",
//             latitude: 40.4167,
//             longitude: -3.7033,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Stockholm",
//             latitude: 59.3328,
//             longitude: 18.0645,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Bern",
//             latitude: 46.9480,
//             longitude: 7.4481,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "Kiev",
//             latitude: 50.4422,
//             longitude: 30.5367,
//             scale: 0.5
//         }, {
//             svgPath: targetSVG,
//             title: "New York",
//             latitude: 40.43,
//             longitude: -74,
//             scale: 0.5
//         }]
//     },
//      
//     areasSettings: {
//       unlistedAreasColor: "#FFCC00"
//     },
//      
//     imagesSettings: {
//         color: "#CC0000",
//         rollOverColor: "#CC0000",
//         selectedColor: "#000000"
//     },
// 
//     linesSettings: {
//         arc: -0.7, // this makes lines curved. Use value from -1 to 1
//         arrow: "middle",
//         color: "#CC0000",
//         alpha: 0.4,
//         arrowAlpha: 1,
//         arrowSize: 4
//     },
// 
//     backgroundZoomsToTop: true,
//     linesAboveImages: true
// });


//     let chart = am4core.create("chartdiv", am4charts.XYChart);
// 
//     chart.paddingRight = 20;
// 
//     let data = [];
//     let visits = 10;
//     for (let i = 1; i < 366; i++) {
//       visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//       data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
//     }
// 
//     chart.data = data;
// 
//     let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//     dateAxis.renderer.grid.template.location = 0;
// 
//     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//     valueAxis.tooltip.disabled = true;
//     valueAxis.renderer.minWidth = 35;
// 
//     let series = chart.series.push(new am4charts.LineSeries());
//     series.dataFields.dateX = "date";
//     series.dataFields.valueY = "value";
// 
//     series.tooltipText = "{valueY.value}";
//     chart.cursor = new am4charts.XYCursor();
// 
//     let scrollbarX = new am4charts.XYChartScrollbar();
//     scrollbarX.series.push(series);
//     chart.scrollbarX = scrollbarX;
// 
     this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default App;

