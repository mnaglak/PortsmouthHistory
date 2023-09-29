var mapOptions = {
  center: [43.073168,-70.761930], //set center
  zoom: 15 , //set initial zoom
  maxZoom : 19,  //set max zoom
  minZoom : 6,
  maxBounds: [ [-90, -180] , [90,180] ],
  tap: false,
  fullscreenControl:true
  }

var map = L.map('map', mapOptions);
L.control.pan().addTo(map);


var  Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(map);

var portsmouth1779 = L.tileLayer('./georeferencedMaps/1779/1779/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 13, maxZoom: 19}).addTo(map);
var portsmouth1813 = L.tileLayer('./georeferencedMaps/1813/1813/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 13, maxZoom: 19});
var portsmouth1850 = L.tileLayer('./georeferencedMaps/1850/1850/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 13, maxZoom: 19});
var portsmouth1876 = L.tileLayer('./georeferencedMaps/1876/1876/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 13, maxZoom: 18});
var portsmouth1925 = L.tileLayer('./georeferencedMaps/1925/1925/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 13, maxZoom: 18});
var portsmouth1953 = L.tileLayer('./georeferencedMaps/1953/1953/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 13, maxZoom: 18});
var portsmouth1980 = L.tileLayer('./georeferencedMaps/1980/1980/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 13, maxZoom: 18});



imageloc="./thumbs/";

var allsites =  L.geoJSON(sites, {
		//this will eventually be removed when fully integrated into the sidebar with no popup boxes on the map, only swapstyle will be left
		onEachFeature: function (feature, layer) {
			var out = [];
				if (feature.properties){
          out.push("<img src='" + imageloc+feature.properties.OBJECTID + ".jpg'/>");
          out.push("<b>Credit: </b>" +feature.properties.Credit);
          out.push("<b style='font-size: 17px !important;'>" + feature.properties.Name + "</b>" );
          out.push("<i style='font-size:12px !important;'>" +feature.properties.Blurb +"</i>");


					/*for(key in f.properties){
						out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
					}*/
				}
			layer.bindPopup(out.join("<br />"), {height: "600px", width:"1000px", closeOnClick:true});

		},
    filter:
    function(feature, layer) {
      return (feature.properties.StartDate==1779 );
    }
	});
allsites.addTo(map);

map.on('popupopen', function(e) {
    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
});

var ocean =  L.geoJSON(ocean550);
var depth = L.geoJSON(depth550);
//List of desired baseMap layers
//Right now it just includes our modern underlay
	var baseLayers = {
		"Modern Imagery" : Esri_WorldImagery
		};


//Maps put in the overlayMaps variable are check boxes, meaning any variety of them can be turned on at a time
//Right now it includes all the other maps we have imported, as well as our Points of Focus icon group
//Note the order the maps are listed here is the order they will appear in the checkbox. The first part of each row is the label to accompany it
	var overlayMaps = {
			"<a target='_blank' href=''>1779</a>": portsmouth1779,
			"<a target='_blank' href=''>1813</a>" : portsmouth1813,
			"<a target='_blank' href=''>1850</a>" : portsmouth1850,
			"<a target='_blank' href=''>1876</a>" : portsmouth1876,
			"<a target='_blank' href=''>1925</a>" : portsmouth1925,
			"<a target='_blank' href=''>1953</a>" : portsmouth1953,
			"<a target='_blank' href=''>1980</a>" : portsmouth1980
      //"Ocean": ocean,
      //"Depth": depth
			};

//Then this created the actual control box
	var mapLayers = L.control.layers(baseLayers, overlayMaps);
  mapLayers.addTo(map)

  var eraSlider = document.getElementById('slider');
  noUiSlider.create(eraSlider, {
      start: [1779],
      snap: true,
      range: {
          'min': [1779],
          '14%': [1813],
          '28%': [1850],
          '42%': [1876],
          '57%': [1925],
          '71%': [1953],
          '85%': [1980],
          'max': [2100]
      },
    //  tooltips:[
    //    wNumb({decimals: 0})],

      pips: {
        mode: 'steps',
        density: 7.5,
        format: wNumb({decimals:0})
      }



  });
function oceanCheck(filter) {
  if (filter==2100) {
    map.addLayer(ocean);
  }
}
  eraSlider.noUiSlider.on('change', function (values, handle) {
      eraFilter = values[handle];
      console.log(eraFilter);
      map.removeLayer(allsites);
      map.removeLayer(ocean);
      oceanCheck(eraFilter);
      allsites = new L.geoJson(sites,{
        onEachFeature: function (feature, layer) {
    			var out = [];

          if (feature.properties){
            out.push("<img src='" + imageloc+feature.properties.OBJECTID + ".jpg'/>");
            out.push("<b>Credit: </b>" +feature.properties.Credit);
            out.push("<b style='font-size: 16px !important;'>" + feature.properties.Name + "</b>" );
            out.push("<i style='font-size:12px !important;'>" +feature.properties.Blurb +"</i>");



            /*for(key in f.properties){
              out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
            }*/
          }
        layer.bindPopup(out.join("<br />"), {height: "600px", width:"1000px", closeOnClick:true});
    		},
        filter:
        function(feature, layer) {
          return (eraFilter>=feature.properties.StartDate );
        }
    }).addTo(map);
  });

  var popup = L.popup({className: "custom-popup"})
      .setLatLng([43.073168,-70.761930])
      .setContent("<img style=' height:325px' src=.\\thumbs\\splashscreenreduced.jpg>")
      .openOn(map);

  var helloPopup = L.popup({className: "custom-popup"}).setContent("<img style=' height:325px' src=.\\thumbs\\splashscreenreduced.jpg>");

      L.easyButton("<img style='height:25px' src=.\\thumbs\\info.jpg>", function(btn, map){
          helloPopup.setLatLng([43.073168,-70.761930]).openOn(map);
      }).addTo(map);

  //disable panning while sliding
        slider.addEventListener('mouseover', function () {
                map.dragging.disable();
            });

            // Re-enable dragging when user's cursor leaves the element
        slider.addEventListener('mouseout', function () {
              map.dragging.enable();
            });
/*
var surveyArea = L.geoJSON(zoneAreas, {style: {color:"red", stroke:1, fillOpacity:0}}).addTo(map);

function popUp(f,l) {
  var out = [];
  //adds spaces in between entries
  if (f.properties) {
    out.push('<b>Name: </b>' + f.properties.NAME2);
    out.push('<b>Site Number: </b>' + f.properties.Site_Numbe);
    out.push('<b>Era: </b>' + f.properties.era);
    l.bindPopup(out.join("<br />"));
  }
};

function getColor(era) {
    return  era == "Early Mesolithic" ? '#000000' :
        era == "Late Neolithic"  ? '#880808' :
        era == "Eneolithic" ? '#BF40BF' :
        era == "Early Bronze Age"  ? '#969696' :
        era == "Middle Bronze Age"  ? '#081d58' :
        era == "Late Bronze Age"  ? '#006837' :
        era == "Iron Age"  ? '#fed976' :
                        '#252525';
}

function lineStyle(feature) {
  return{color:'#00008b'}
};

var river = L.geoJSON(braidedRiver, {
  style: {color:'#ADD8E6'},
}).addTo(map);

/*var swamp = L.geoJSON(swampMarsh, {
  style: {color: "#000000", fillColor: "blue", weight: 1},
}).addTo(map);
//var backgroundLake = L.geoJSON(modernLake, {style: {fillColor:"#015E57", fillOpacity:1, opacity:0}}).addTo(map);

  var allsites =  L.geoJSON(sites, {
      onEachFeature:popUp,
      pointToLayer: function (feature, latlng) {
        var markerStyle = {
            fillColor: getColor(feature.properties.era),
            color: "#FFF",
            fillOpacity: 1,
            opacity: 0.5,
            weight: 1,
            radius: 10
        };
        return L.circleMarker(latlng, markerStyle);
    },
    filter:
    function(feature, layer) {
      return (feature.properties.era == 'Eneolithic');
    }
  }).addTo(map);

  var swamp = L.geoJSON(modernLake, {style: {fillColor:"#5b975b", weight:1, color:"#5b975b", fillOpacity:1}}).addTo(map);
  var marsh = L.geoJSON(modernLake, {
    style: {fillColor: "#987654", weight:1, color:"#987654", fillOpacity:1}, //blue
  });
  /* var patternShape = new L.PatternPath({
        d: "M10,10C21.805555555555557,10.416666666666666,40.97222222222223,19.916666666666664,66.66666666666667,12C92.36111111111111,4.083333333333334,105.55555555555557,-30.291666666666668,133.33333333333334,-28C161.11111111111111,-25.708333333333332,172.22222222222223,20.916666666666668,200,23C227.77777777777777,25.083333333333332,238.8888888888889,-19.25,266.6666666666667,-18C294.44444444444446,-16.75,305.5555555555556,25.666666666666668,333.33333333333337,29C361.11111111111114,32.333333333333336,372.22222222222223,-6.583333333333333,400,-2C427.77777777777777,2.583333333333333,438.8888888888889,53.5,466.6666666666667,51C494.44444444444446,48.5,505.5555555555556,-11.916666666666666,533.3333333333334,-14C561.1111111111111,-16.083333333333332,572.2222222222222,40.583333333333336,600,41C627.7777777777778,41.416666666666664,638.8888888888889,-10.333333333333334,666.6666666666667,-12C694.4444444444446,-13.666666666666666,707.6388888888889,28.416666666666668,733.3333333333334,33C759.0277777777778,37.583333333333336,778.1944444444445,14.791666666666668,790,10",
        fill: true,
        stroke: "black"
    });

var marshPattern = new L.Pattern({width:50, height:40, patternTransform: "1,0,0,1,0,-171.98981285095215"});
    marshPattern.addShape(patternShape);
    marshPattern.addTo(map);

    var swampPatternShape = new L.PatternPath({
          d: 'M10 0 L7 20 L25 20 Z',
          fill: true,
          color: '#4CBB17'
      });

      var swampPattern = new L.Pattern({width:20, height:10, angle:180});
          swampPattern.addShape(swampPatternShape);
          swampPattern.addTo(map);

          var swamp = L.geoJSON(modernLake, {
            style: {fillPattern: swampPattern ,  color: "#000000", weight: 1, fillOpacity:1}, //blue
          }).addTo(map);


  var marsh = L.geoJSON(modernLake, {
    style: {fillPattern: marshPattern ,  color: "#000000", weight: 1, fillOpacity:1}, //blue
  });

  const legend = L.control.Legend({
  				position: "bottomright",
  				collapsed: false,
  				symbolWidth: 24,
  				opacity: 1,
  				column: 2,
  				legends: [{
              label: "Early Mesolithic",
              type: "circle",
              fillColor: "#000000"
          },{
  						label: "Late Neolithic",
  						type: "circle",
              fillColor: "#880808"
  				},  {
              label: "Eneolithic",
              type: "circle",
              fillColor: "#BF40BF"
          }, {
  						label: "Early Bronze Age",
  						type: "circle",
  						fillColor: "#969696"
  				}, {
  						label: "Middle Bronze Age",
  						type: "circle",
  						fillColor: "#081d58"
  				}, {
  						label: "Late Bronze Age",
  						type: "circle",
  						fillColor: "#006837"
  				}, {
  						label: "Iron Age",
  						type: "circle",
  						fillColor: "#fed976"
  				}, {
              label: "Marsh",
              type: "rectangle",
              fillColor: "#987654"
          }, {
            label: "Swamp",
            type: "rectangle",
            fillColor: "#5b975b"

          }, {
            label: "Survey Area",
            type: "rectangle",
            color:"red"

          }]
  		})
  		.addTo(map);

      var eraSlider = document.getElementById('slider');
      noUiSlider.create(eraSlider, {
          start: [3],
      		step:1,
          range: {
              'min': [0],
              'max': [7]
          },
          tooltips:true,
          format: {
            to: function(value) {
            // Math.round and -1, so 1.00 => 0, 2.00 => 2, etc.
            return ["Paleolithic","Early Mesolithic","Late Neolithic","Eneolithic","Early Bronze Age","Middle Bronze Age","Late Bronze Age","Iron Age"][Math.round(value)];
          },
          from: Number
          }
      });
      var eraValues = [
      	document.getElementById('era-hidden')
      ];
      eraSlider.noUiSlider.on('change', function (values, handle) {
          eraFilter = values[handle];
          console.log(eraFilter);
          waterFeature(eraFilter);
          map.removeLayer(allsites);

          allsites = new L.geoJson(sites,{
            onEachFeature:popUp,
            pointToLayer: function (feature, latlng) {
              var markerStyle = {
                  fillColor: getColor(feature.properties.era),
                  color: "#FFF",
                  fillOpacity: 1,
                  opacity: 0.5,
                  weight: 1,
                  radius: 10
              };
              return L.circleMarker(latlng, markerStyle);
            },
            filter:
            function(feature, layer) {
      				return (feature.properties.era == eraFilter);
      			}
        }).addTo(map);
      });

function waterFeature(era) {
  map.removeLayer(river);
  map.removeLayer(swamp);
  map.removeLayer(marsh);
  //map.removeLayer(backgroundLake);
  if(era == "Paleolithic") {
    river.addTo(map);

  }
  else if (era == "Early Mesolithic") {
    river.addTo(map);
    //backgroundLake.addTo(map);
    marsh.addTo(map);
  }
  else if (era == "Late Neolithic") {
    river.addTo(map);
    //backgroundLake.addTo(map);
    marsh.addTo(map);
  }
  else {
    river.addTo(map);
    //backgroundLake.addTo(map);
    swamp.addTo(map);
  }

}

function turnOnAllSites(){
  map.removeLayer(allsites);
  allsites = new L.geoJson(sites,{
    onEachFeature:popUp,
    pointToLayer: function (feature, latlng) {
      var markerStyle = {
          fillColor: getColor(feature.properties.era),
          color: "#FFF",
          fillOpacity: 1,
          opacity: 0.5,
          weight: 1,
          radius: 10
      };
      return L.circleMarker(latlng, markerStyle);
    }
  }).addTo(map);
}

//disable panning while sliding
      slider.addEventListener('mouseover', function () {
              map.dragging.disable();
          });

          // Re-enable dragging when user's cursor leaves the element
      slider.addEventListener('mouseout', function () {
            map.dragging.enable();
          });
*/
