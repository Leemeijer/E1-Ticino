//Vaiabelen maken voor je achtergron en GeoJSON
var
    osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 5, maxZoom: 22, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    
    cycle = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    
    transport = L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),

    ZW07 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Route 7 vanuit Zwitserland"),
    ZW02 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Route 2 vanuit Zwitserland"),
    E1vervolg = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Vervolg E1 richting Rome"),
    Veerpont = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Veerpont Zwitserland - Italië"),
    VeerpontO = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Veerpont Overig"),
    Onverkend = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Onverkende E1 route"),
    Zerbolo = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("E1, Zerbolo-Zuiden"),
    ZerPav = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("E1, Zerbolo-Pavia"),
    Zwits = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Zwitserland?"),
    Vraag = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Lokale varianten, vraag 03?"),
    WebE1 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("E1 van internet");

    jQuery.getJSON("GeoJson/Swiss07.geojson", function (data) { ZW07.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss02.geojson", function (data) { ZW02.addData(data)}),
    jQuery.getJSON("GeoJson/E1_web_Pavia_vervolg.geojson", function (data) { E1vervolg.addData(data)}),
    jQuery.getJSON("GeoJson/Veerpont_E1.geojson", function (data) { Veerpont.addData(data)}),
    jQuery.getJSON("GeoJson/Veerpont_Overig.geojson", function (data) { VeerpontO.addData(data)}),
    jQuery.getJSON("GeoJson/Bosma_Onverkend.geojson", function (data) { Onverkend.addData(data)}),
    jQuery.getJSON("GeoJson/Zerbolo-Zuiden.geojson", function (data) { Zerbolo.addData(data)}),
    jQuery.getJSON("GeoJson/Zerbolo-Pavia.geojson", function (data) { ZerPav.addData(data)}),
    jQuery.getJSON("GeoJson/Zwitserland.geojson", function (data) { Zwits.addData(data)}),
        jQuery.getJSON("GeoJson/E1_lokale_variant_03.geojson", function (data) { Vraag.addData(data)}),
    jQuery.getJSON("GeoJson/WebE1.geojson", function (data) { WebE1.addData(data)});

        

//maak je map en geef aan welke lagen er in moeten
    var map = L.map('map', {layers: [osm], zoomControl: false, 
            minZoom: 10,
            maxBounds: [[46.050361, 8.1672119140625],
                        [44.991221, 8.1672119140625],
                        [44.991221, 9.698682], 
                        [46.050361, 9.698682] ]
    }).setView([45.654464,  9.164932], 10);
//Opmerking: Zoomcontrol: false zorgt er hier voor dat het (standaard?) in- en uitzoom knopje uit staat. Zoomcontrol is hieronder weer aan gezet. Als je Zoomcontrol weg haalt staat deze er dus wel.


//Variabelen voor het lagen menu
    var kaarten = {
    "OSM Basic"     : osm,
    "OSM Cycle"     : cycle,
    "OSM Transport" : transport
    };

    var overlays = {
        "07"            : ZW07,
        "02"            : ZW02,
        "E1 Vervolg"    : E1vervolg,
        "VeerpontE1"    : Veerpont,
        "Veerpont"      : VeerpontO,
        "Onverkend"     : Onverkend,
        "E1 - Zerbolo"  : WebE1,
        "Zerbolo-Zuiden": Zerbolo,
        "Zerbolo-Pavia" : ZerPav,
        "Zwitserland"   : Zwits,
        "Vraag"         : Vraag
    };

        //plus en min knoppen
    L.control.zoom().addTo(map);

        //lagen menu
    L.control.layers(kaarten, overlays).addTo(map);

    // functies
    function style(feature) {
        return {
            color   : feature.properties.color,
            opacity : feature.properties.opacity
        };
    }

    function onEachFeature(feature, layer) {layer.on({})};



//eigen icoon
var testIcon = L.icon ({
        iconUrl: 'images/gevaar.png',
        iconSize: [25, 25],
        iconAnchor: [0,0]
        
    });

    L.marker([45.342898, 8.880618], {icon: testIcon}).addTo(map).bindPopup('<b>Gevaarlijke brug</b><br> Brug bij SP494 nabij Vigevano</br> <div> <img style="width:150px" src="images/brug.jpg" /></div>');

//popup marker leaflet
var magenta = L.marker([45.465526, 8.885021]).addTo(map);
    magenta.bindPopup('<b>Magenta</b> <div> <img style="width:80px" src="images/Magenta.png" /></div>');
   