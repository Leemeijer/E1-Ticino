                                        //Inhoud van de kaart toevoegen:
//Achtergrond kaarten:
var
    osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | made by Bart Leemeijer & Bosma Grafiek'}),
   
    transport = L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    
    stamenTerrain =
    L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',      {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),
    
    stamenToner =
    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png',      {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),
    
    stamenWatercolor =
    L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',      {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),

//Variabelen van de routes:
    
    Hoofdroute = L.geoJson(null, {style:style, onEachFeature:onEachFeature}),
    LokaleVariant = L.geoJson(null, {style:style, onEachFeature:onEachFeature}),
    Swiss02 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}),
    Swiss07 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}),
    ViaF = L.geoJson(null, {style:style, onEachFeature:onEachFeature}),
    Aanbevolen = L.geoJson(null, {style:style});

//Variabelen van de Points of Interest:
    Stations = L.geoJson(null, {
                pointToLayer: function(feature, latlng){
                    return L.marker(latlng, {
                        icon: trainIcon
                        })
                    }
            });
            
    Bruggen = L.geoJson(null, {
                style: function(feature) {
                    return {
                        color: '#000000', 
                        fillColor: '#ffff00'
                        };
                    },
                    pointToLayer: function(feature, latlng) {
                        return new L.CircleMarker(latlng, {
                            radius: 5, 
                            fillOpacity: 0.85
                            });
                        }
                });

    FerryFunicular = L.geoJson(null, {
                style: function(feature) {
                    return {
                        color: '#000000', 
                        fillColor: '#ffffff'
                        };
                    },
                    pointToLayer: function(feature, latlng) {
                        return new L.CircleMarker(latlng, {
                            radius: 5, 
                            fillOpacity: 0.85
                            });
                        }
                });
//__________________________________________________________________________________________________________________      
                                        //Esri basemap toevoegen:

var Esri = L.esri.basemapLayer('Topographic');
//Esri Basemaps zijn onder anderen: Topographic, Imagery, NationalGeographic, Streets, Oceans, Gray, DarkGray, SchadedRelief

//__________________________________________________________________________________________________________________      
                                        //GeoJsons oproepen:
//Routes:
    jQuery.getJSON("GeoJson/E1_hoofdroute_italie.json", function (data) { Hoofdroute.addData(data)}),
    jQuery.getJSON("GeoJson/E1_lokale_varianten.json", function (data) { LokaleVariant.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route02.geojson", function (data) { Swiss02.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route07.geojson", function (data) { Swiss07.addData(data)}),
    jQuery.getJSON("GeoJson/Via Francigena.geojson", function (data) { ViaF.addData(data)}),
    jQuery.getJSON("GeoJson/Bosma_aanbevolen.geojson", function (data) { Aanbevolen.addData(data)});

//Points of Interest:
    jQuery.getJSON("GeoJson/POI_stations_langs_route.geojson", function (data) { Stations.addData(data)}),
    jQuery.getJSON("GeoJson/POI_brug_voor_voetgangers.geojson", function (data) { Bruggen.addData(data)}),
    jQuery.getJSON("GeoJson/POI_pont_en_trein.geojson", function (data) { FerryFunicular.addData(data)});

//__________________________________________________________________________________________________________________      
                                        //Maken van de kaart:
//Map + layers + eigenschappen 
    var map = L.map('map', {layers: [osm, Hoofdroute], 
            minZoom: 9,
            maxBounds: [[46.160594, 8.1672119140625],   //NW punt
                        [44.991221, 8.1672119140625],   //ZW punt
                        [44.991221, 9.698682],          //ZO punt
                        [46.160594, 9.698682] ]         //NO punt
    }).setView([45.654464,  9.164932], 10);

//Met de regel hieronder voeg je de locatie button toe
L.control.locate({position: 'bottomright'}).addTo(map);

//__________________________________________________________________________________________________________________  
                                        //Markers
    var pont = new L.LayerGroup();
    L.marker([45.9846512, 8.94589019]).addTo(pont).bindPopup('<div> <img style="width:80px" src="images/funicolare.jpg"/> </div>'),
    L.marker([45.9040536, 8.90070097]).addTo(pont).bindPopup('<b>Veerpont</b><div> <img style="width:150px" src="images/veerboot.jpg"/> </div>');

    var impressies = new L.LayerGroup();
    L.marker([45.465526, 8.885021]).addTo(impressies).bindPopup('<b>Magenta</b> <div> <img style="width:80px" src="images/Magenta.png" /></div>');

    var horeca = new L.LayerGroup();
    L.marker([45.206231, 9.015038]).addTo(horeca);
    
    var vragen = new L.LayerGroup();
    L.marker([45.342898, 8.880618]).addTo(vragen).bindPopup('<b>Gevaarlijke brug</b><br> Brug bij SP494 nabij Vigevano</br> <div> <img style="width:150px" src="images/brug.jpg" /></div>');

//__________________________________________________________________________________________________________________  
                                        //Popups: 
//Vernoem je variabele en zet er '.bindPopup' achter om de popup te maken. Alles tussen de haakjes () is wat je te zien krijgt.

//Routelijnen:
Hoofdroute.bindPopup('<b>German Site for E1:</b> <a target="_blank" href="https://e1.hiking-europe.eu/">Hiking Europe</a> <br> <b>All hiking trails in Europe:</b> <a target="_blank" href="http://waymarkedtrails.org/">Waymarked Trails</a>')
LokaleVariant.bindPopup('<a target="_blank" href="http://web.archive.org/web/20160405141619/http://www.enrosadira.it/e1/">Local E1 Alternatives</a>')
ViaF.bindPopup('<b>Site:</b> <br> <a target="_blank" href="http://www.dewegvandefranken.nl/">Via Francigena</a>')
Aanbevolen.bindPopup('Recommended bij BosmaGrafiek.nl for a part of the pilgrimage from the St. Gottthard pass to Roma')
Swiss02.bindPopup('<b>Site:</b> <a target="_blank" href="http://www.wanderland.ch/en/routes/route-02.html">Trans Swiss Trail</a> <br> <b>App:</b> Search for <i>Switzerland Mobility</i>')
Swiss07.bindPopup('<b>Site:</b> <a target="_blank" href="http://www.wanderland.ch/en/routes/route-07.html">Via Gottardo</a> <br> <b>App:</b> Search for <i>Switzerland Mobility</i>');

FerryFunicular.bindPopup('<b>Veerpont</b><div> <img style="width:150px" src="images/veerboot.jpg"/> </div>');

//__________________________________________________________________________________________________________________  
                                        //Lagen menu toevoegen:  
//Variabelen voor het lagen menu
//Achtergrond kaarten:
    var kaarten = [
                    {
                    groupName:  "Basemaps",
                    expanded: false,
                    layers: {
            "OSM Basic"         : osm,
            "OSM Transport"     : transport,
            "Stamen Terrain"    : stamenTerrain,
            "Stamen Toner"      : stamenToner,
            "Stamen Watercolor" : stamenWatercolor,
            "Esri Topographic"  : Esri
            }
        }];

//Routes en Punten:
    var data = [
                    {
                    groupName: "Hiking Trails",
                    expanded: true,
                    layers: {
            "E1 Hiking Trail"           : Hoofdroute,
            "E1 Local Alternatives"     : LokaleVariant,
            "Swiss 2: Trans Swiss Trail": Swiss02,
            "Swiss 7: Via Gottardo"     : Swiss07,
            "Via Francigena"            : ViaF,
            "Recommended"               : Aanbevolen
            }
        },
        
        
                    {
                    groupName: "Traffic Info",
                    expanded: true,
                    layers: {
            "Pedestrian Bridges"        : Bruggen,
            "Train Stations"            : Stations,
            "Ferry and funicular"       : FerryFunicular
            }
        },
    
                    {
                    groupName: "Tourist Info",
                    expanded: true,
                    layers: {
            "Scenery"                   : impressies,
            "Eat & sleep"               : horeca
            
            }
        },
        
                    {
                    groupName: "Survey",
                    expanded: false,
                    layers: {
            "Questions"                 : vragen
            
            }
        }
    
    
    ];


//Lagen menu
    var control= L.Control.styledLayerControl(kaarten, data).addTo(map);

//opmerking: Alles wat je in deze Layer Control wilt hebben moet je boven deze functie plaatsen anders gaat het mis.



//__________________________________________________________________________________________________________________ 
                                        //Titel 

var titel = L.control({position: 'topleft'});

titel.onAdd = function (map) {
    var div = L.DomUtil.create('div');
    div.innerHTML = '<div> <img style="width:90%; height:100%" src="images/E1_ticino_title_up01_rgb[301].png"/> </div>';
   return div;
};
titel.addTo(map);

//__________________________________________________________________________________________________________________ 
                                        //Legenda

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<div> <img style="width:46%; height:50%"src="images/Legenda.png" /> </div>';
   return div;
};
legend.addTo(map);

//__________________________________________________________________________________________________________________ 
                                        //Schaalbalk

// haal de '//' weg voor .addTo(map) in de schaalbalk weer aan te zetten.
var scale = L.control.scale({position: 'bottomright'})//.addTo(map); 

// Get the label.
var metres = scale._getRoundNum(map.containerPointToLatLng([0, map.getSize().y / 2 ]).distanceTo( map.containerPointToLatLng([scale.options.maxWidth,map.getSize().y / 2 ])))
  label = metres < 1000 ? metres + ' m' : (metres / 1000) + ' km';

  console.log(label);

//__________________________________________________________________________________________________________________  
                                        //Functies:

//Functies
    function style(feature) {
        return {
            color       : feature.properties.color,
            opacity     : feature.properties.opacity,
            weight      : feature.properties.weight,
            dashArray   : feature.properties.dashArray,
            lineCap     : feature.properties.lineCap
        };
    };
//Met bovenstaande functie geef je aan welke eigenschappen (properties) je uit de GeoJson bestanden haalt. Zorg dus dat in deze bestanden de gegevens kloppen.
    
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 10,
        color: '#58a2d8',
        opacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    Aanbevolen.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    })
}

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

//__________________________________________________________________________________________________________________ 
                                        //Icoontjes maken en definiëren
//Treinstations
var trainIcon = L.icon({
        iconUrl: 'images/Train.png',
        iconSize: [25,25],
        iconAnchor: [12,12] 
});
 
//Gevaarlijke brug
var gevaar = L.icon ({
        iconUrl: 'images/gevaar.png',
        iconSize: [25, 25],
        iconAnchor: [12,12]
     });
