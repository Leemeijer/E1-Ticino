//Vaiabelen maken voor je achtergron en GeoJSON
var
    osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 5, maxZoom: 22, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
        
    ZW07 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Route 7 vanuit Zwitserland"),
    ZW02 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Route 2 vanuit Zwitserland"),
    E1vervolg = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Vervolg E1 richting Rome"),
    Veerpont = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Veerpont Zwitserland - Italië"),
    VeerpontO = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Veerpont Overig"),
    Onverkend = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Onverkende E1 route"),
    Zerbolo = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("E1, Zerbolo-Zuiden"),
    ZerPav = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("E1, Zerbolo-Pavia"),
    Zwits = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Zwitserland?"),
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
      "OpenStreetMap"  : osm};

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
        "Zwitserland"   : Zwits
    };


