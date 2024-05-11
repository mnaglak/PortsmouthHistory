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
var firepoly1802 = L.geoJSON(fire1802, {
  onEachFeature: function (feature, layer) {
    var out = [];
      if (feature.properties){
        out.push("<img src = '.\\thumbs\\1802firereduced.png'/>");
        out.push("Image courtesy of the Portsmouth Athenaeum and the City of Portsmouth");
        out.push(" ");
        out.push("<i>December 26—Sunday, about four in the morning, the town was alarmed by the cry of fire, which was discovered in the building occupied by the New Hampshire Bank.  Before many of the inhabitants could assemble, the fire burst out through the sides of the house, which was soon enveloped in flames. The fire was communicated to the adjacent buildings with such great rapidity, as to render it impossible to arrest its progress, until a large proportion of the town was laid in ashes. Every building on the parade, except the meetinghouse and Courthouse, was destroyed. The upper end of Daniel Street was consumed as far as the property of Captain Elijah Hall on the north side, and that of Mrs. Hart on the south, whose houses were preserved. To the northward the destruction was far more extensive. The buildings on Market-street and Fore-street, as high as Mrs. Whipple’s, those on Bow-street, as far as the store of Mr. Cutt on Church-hill, those on Cross Street to the top of Dwyer hill, and those on Ladd-street, except one, fell victims to the devouring flames. The amount of property destroyed was estimated at the sum of two hundred thousand dollars.</i>");
        out.push("Adams, N. (1825). <i>Annals of Portsmouth</i>. Peter E. Randall. Portsmouth, NH.");
      }
    layer.bindPopup(out.join("<br />"), {height: "600px", width:"1000px", closeOnClick:true});

  }
});

firepoly1802.setStyle({fillColor: 'orange'});

var firepoly1806 = L.geoJSON(fire1806, {
  onEachFeature: function (feature, layer) {
    var out = [];
      if (feature.properties){
        out.push("<img src = '.\\thumbs\\1806firereduced.jpeg'/>");

        out.push(" ");
        out.push("<i>December 24—A conflagration known as the Chapel Street Fire took place in which Queen’s Chapel (St. John’s Church) and fifteen other buildings were destroyed. The fire started in a store owned by Stephen Little. There were five engines in the town, and the Firewards were assigned to inspect them on the first Monday of each month. Four leading citizens ‘to be a company under the direction of the Firewards to repair to the State House on the Cry for Alarm of Fire, and bring the Hooks, Ropes, and the other apparatus immediately on the Spot and take care of them, and after the fire is extinguished to return them back to the State House again.’ The regulations to prevent fires issued by the Firewards were stringent and had to be strictly obeyed.</i>");
        out.push("Adams, N. (1825). <i>Annals of Portsmouth</i>. Peter E. Randall. Portsmouth, NH.");
      }
    layer.bindPopup(out.join("<br />"), {height: "600px", width:"1000px", closeOnClick:true});

  }
});
firepoly1806.setStyle({fillColor: 'green'});

var firepoly1813 = L.geoJSON(fire1813, {
  onEachFeature: function (feature, layer) {
    var out = [];
      if (feature.properties){
        out.push("<img src = '.\\thumbs\\1813firereduced.png'/>");
        out.push(" ");
        out.push("Image courtesy of the Portsmouth Athenaeum and the City of Portsmouth");
        out.push(" ");
        out.push("Destroyed by fire December 22, 1813");
        out.push("In 1814, in an effort to make Portsmouth less fire-prone, the Brick Act was passed, requiring any new building over 12 feet high in the densely populated downtown area to be built of brick with a slate roof.");
    layer.bindPopup(out.join("<br />"), {height: "600px", width:"1000px", closeOnClick:true});

  }
}});


firepoly1813.setStyle({fillColor: 'red'});

var reconstruction = L.geoJSON(poly1954, {
  onEachFeature: function (feature, layer) {
    var out = [];
    if (feature.properties){
      out.push("<img src = '.\\thumbs\\1953imagereduced.jpg'/>");
      out.push("Image courtesy of the Portsmouth Athenaeum");
      out.push("<b>Urban Renewal</b>");
      out.push("The late 1960s and early 1970s saw the razing of Portsmouth’s Little Italy neighborhood in the Vaughan Street Urban Renewal Project. Only three structures within the indicated area were saved, and it was decades before the modern structures and economic benefits supposedly encouraged by the project were seen. The public outcry and resulting civic engagement resulted in the creation of historic preservation groups and raised awareness of the value intrinsic in the historic structures across Portsmouth.");
      layer.bindPopup(out.join("<br />"), {height: "600px", width:"1000px", closeOnClick:true});

      }
    }});
reconstruction.setStyle({fillColor: 'teal'});
var allsites =  L.geoJSON(sites, {
  pointToLayer: function (feature, latlng) {
    var markerStyle = {
        fillColor: getColor(feature.properties.StartDate),
        color: "#FFF",
        fillOpacity: 1,
        opacity: 0.5,
        weight: 1,
        radius: 10
    };
    return L.circleMarker(latlng, markerStyle);},
		onEachFeature: function (feature, layer) {
			var out = [];
				if (feature.properties){
          out.push("<img src='" + imageloc+feature.properties.OBJECTID + ".jpg'/>");
          out.push("<b>Credit: </b>" +feature.properties.Credit);
          out.push("<b style='font-size: 17px !important;'>" + feature.properties.Name + "</b>" );
          out.push("<i style='font-size:12px !important;'>" +feature.properties.Blurb +"</i>");
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

var ocean =  L.geoJSON(ocean550, {
  onEachFeature: function (feature, layer) {
    var out = [];
      if (feature.properties){
        out.push("<img src = '.\\thumbs\\seal.jpg'/>");
        out.push("Seal of the City of Portsmouth");
        out.push("This layer, from the City of Portsmouth's Coastal Resilience Initiative, shows what Portsmouth may look like in the year 2100 with the worst-case-scenario of a storm surge combined with rising ocean levels: eighteen feet. For more information on their research, <a href='https://www.cityofportsmouth.com/planportsmouth/cri'>visit their site.</a>");
      }
    layer.bindPopup(out.join("<br />"), {height: "600px", width:"1000px", closeOnClick:true});

  }
});

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
  //mapLayers.addTo(map)

  var eraSlider = document.getElementById('slider');
  noUiSlider.create(eraSlider, {
      start: [1779],
      snap: true,
      range: {
          'min': [1779],
          '12%': [1813],
          '24%': [1850],
          '36%': [1876],
          '48%': [1925],
          '60%': [1953],
          '74%': [1980],
		  '87%': [2023],
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
  function getColor(era) {
      return  era == "1779" ? '#183159' :
          era == "1813"  ? '#ADD8E6' :
          era == "1850"  ? '#472d2e' :
          era == "1876"  ? '#D2B48C' :
          era == "1925"  ? '#8c2a1d' :
          era == "1953"  ? '#d7402a' :
          era == "1980"  ? '#a0a442' :
		  era == "2023"  ? '#FFA500' :
                          '#646629';
  }

function oceanCheck(filter) {
  if (filter==2100) {
    map.addLayer(ocean);
  }
}

function mapCheck(filter) {
  if (filter==1779) {
    map.addLayer(portsmouth1779);
  }
  else if (filter==1813) {
    map.addLayer(portsmouth1813);
    map.addLayer(firepoly1802);
    map.addLayer(firepoly1806);
    map.addLayer(firepoly1813);
  }
  else if (filter==1850) {
    map.addLayer(portsmouth1850);
  }
  else if (filter==1876) {
    map.addLayer(portsmouth1876);
  }
  else if (filter==1925) {
    map.addLayer(portsmouth1925);
  }
  else if (filter==1953) {
    map.addLayer(portsmouth1953);
    map.addLayer(reconstruction);
  }
  else if (filter==1980) {
    map.addLayer(portsmouth1980)
  }
  else {
  }
}

  eraSlider.noUiSlider.on('change', function (values, handle) {
      eraFilter = values[handle];
      console.log(eraFilter);
      map.removeLayer(allsites);
      map.removeLayer(ocean);
      map.removeLayer(portsmouth1779);
      map.removeLayer(portsmouth1813);
      map.removeLayer(portsmouth1850);
      map.removeLayer(portsmouth1876);
      map.removeLayer(portsmouth1925);
      map.removeLayer(portsmouth1953);
      map.removeLayer(portsmouth1980);
      map.removeLayer(firepoly1802);
      map.removeLayer(firepoly1806);
      map.removeLayer(firepoly1813);
      map.removeLayer(reconstruction);

      oceanCheck(eraFilter);
      mapCheck(eraFilter)

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
        pointToLayer: function (feature, latlng) {
          var markerStyle = {
              fillColor: getColor(feature.properties.StartDate),
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
          return (eraFilter>=feature.properties.StartDate && eraFilter<=feature.properties.EndDate);
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

            const legend = L.control.Legend({
                    position: "bottomright",
                    collapsed: false,
                    symbolWidth: 24,
                    opacity: 1,
                    column: 2,
                    legends: [{
                        label: "1779",
                        type: "circle",
                        fillColor: "#183159"
                    },{
                        label: "1813",
                        type: "circle",
                        fillColor: "#ADD8E6"
                    },  {
                        label: "1850",
                        type: "circle",
                        fillColor: "#472d2e"
                    }, {
                        label: "1876",
                        type: "circle",
                        fillColor: "#D2B48C"
                    }, {
                        label: "1925",
                        type: "circle",
                        fillColor: "#8c2a1d"
                    }, {
                        label: "1953",
                        type: "circle",
                        fillColor: "#d7402a"
                    }, {
                        label: "1980",
                        type: "circle",
                        fillColor: "#a0a442"
                    },
						{
                        label: "2023",
                        type: "circle",
                        fillColor: "#FFA500"
                    }]
                })
                .addTo(map);
