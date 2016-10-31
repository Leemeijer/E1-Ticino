                                        //Inhoud van de kaart toevoegen:
//Achtergrond kaarten:
var
    osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Bosma Grafiek'}),
    
    cycle = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    
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
    Stations = L.geoJson(null),
    Bruggen = L.geoJson(null);

//GeoJson van de routes:
    jQuery.getJSON("GeoJson/E1_hoofdroute_italie.geojson", function (data) { Hoofdroute.addData(data)}),
    jQuery.getJSON("GeoJson/E1_lokale_varianten.geojson", function (data) { LokaleVariant.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route02.geojson", function (data) { Swiss02.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route07.geojson", function (data) { Swiss07.addData(data)}),
    jQuery.getJSON("GeoJson/Via Francigena.geojson", function (data) { ViaF.addData(data)}),
    jQuery.getJSON("GeoJson/Bosma_aanbevolen.geojson", function (data) { Aanbevolen.addData(data)});

        
//GeoJson van de Points of Interest:
    jQuery.getJSON("GeoJson/POI_stations_langs_route.geojson", function (data) { Stations.addData(data)}),
    jQuery.getJSON("GeoJson/POI_brug_voor_voetgangers.geojson", function (data) { Bruggen.addData(data)});

//__________________________________________________________________________________________________________________      
                                        //Maken van de kaart:
//Map + layers + attributen
    var map = L.map('map', {layers: [osm, Hoofdroute], 
            minZoom: 9,
            maxBounds: [[46.050361, 8.1672119140625],
                        [44.991221, 8.1672119140625],
                        [44.991221, 9.698682], 
                        [46.050361, 9.698682] ]
    }).setView([45.654464,  9.164932], 10);
//Opmerking: Zoomcontrol: false zorgt er hier voor dat het (standaard?) in- en uitzoom knopje uit staat. Zoomcontrol is hieronder weer aan gezet. Als je Zoomcontrol weg haalt staat deze er dus wel.

var Esri = L.esri.basemapLayer('Topographic');
//Esri Basemaps zijn onder anderen: Topographic, Imagery, NationalGeographic, Streets, Oceans, Gray, DarkGray, SchadedRelief

//__________________________________________________________________________________________________________________  
                                        //Popups voor de lijnen: 
//Vernoem je variabele en zet er '.bindPopup' achter om de popup te maken. Alles tussen de haakjes () is wat je te zien krijgt.

ViaF.bindPopup('<a target="_blank" href="http://www.dewegvandefranken.nl/">Via Francigena</a>');

//__________________________________________________________________________________________________________________  
                                        //Lagen menu toevoegen:  
//Variabelen voor het lagen menu
//Achtergrond kaarten:
    var kaarten = [
                    {
                    groupName:  "Achtergrondkaart",
                    expanded: false,
                    layers: {
            "OSM Basic"         : osm,
            "OSM Cycle"         : cycle,
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
                    groupName: "Routes",
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
                    groupName: "Punten",
                    expanded: true,
                    layers: {
            "Bruggen"                   : Bruggen,
            "Stations"                  : Stations
            }
        }];


//Lagen menu
    var control= L.Control.styledLayerControl(kaarten, data).addTo(map);

//__________________________________________________________________________________________________________________ 
                                        //Legenda (werkt nog niet)

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<b>Titel</b>';
   return div;
};
legend.addTo(map);

//__________________________________________________________________________________________________________________  
                                        //Functies maken (stijl en mouseover):

//Functies
    function style(feature) {
        return {
            color   : feature.properties.color,
            opacity : feature.properties.opacity,
            weight: feature.properties.weight,
            dashArray: feature.properties.dashArray,
            lineCap: feature.properties.lineCap
        };
    };

    
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
    });
}

//__________________________________________________________________________________________________________________ 
                                        //Icoontjes maken en definiëren
//Titel:
var titelIcon = L.icon ({
        iconUrl: 'images/E1_ticino_title_up01_rgb[301].png',
        iconSize: [500, 109],
        iconAnchor: [0,0]
     });

    L.marker([45.977305, 8.138672], {icon: titelIcon}).addTo(map);

//Gevaarlijke brug
var gevaar = L.icon ({
        iconUrl: 'images/gevaar.png',
        iconSize: [25, 25],
        iconAnchor: [0,0]
     });

    L.marker([45.342898, 8.880618], {icon: gevaar}).addTo(map).bindPopup('<b>Gevaarlijke brug</b><br> Brug bij SP494 nabij Vigevano</br> <div> <img style="width:150px" src="images/brug.jpg" /></div>');

//Simpele marker met popup (Magenta)
var magenta = L.marker([45.465526, 8.885021]).addTo(map);
    magenta.bindPopup('<b>Magenta</b> <div> <img style="width:80px" src="images/Magenta.png" /></div>');
   

