                                        //Inhoud van de kaart toevoegen:
//Achtergrond kaarten:
var
    osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    
    cycle = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    
    transport = L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
    
    stamenTerrain =
    L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',      {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),
    
    stamenToner =
    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png',      {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),
    
    stamenWatercolor =
    L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',      {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),

//Variabelen van de routes:
    
    HoofdrouteZerbolo = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup('<a target="_blank" href="https://github.com/Leemeijer/Webmap-Bart/tree/master">Github Bart</a>'),
    HoofdrouteVervolg = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Hoofdroute E1. Vervolg vanaf Zerbolo"),
    Alternatief = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Alternatieve route van de E1 richting Pavia"),
    LokaleVariant = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Lokale varianten vanuit papieren kaarten ter plekke"),
    VariantVraag = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Vraag: Zijn deze lokale varianten de moeite waard?"),
    Aanbevolen = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Deel van de E1, gelopen door Bosma"),
    Swiss02 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Route 2 vanuit Zwitserland"),
    Swiss07 = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Route 7 vanuit Zwitserland"),
    ViaF = L.geoJson(null, {style:style, onEachFeature:onEachFeature}).bindPopup("Via Francigena");
var geoJson = L.layerGroup([HoofdrouteZerbolo, HoofdrouteVervolg, Alternatief, LokaleVariant, VariantVraag, Aanbevolen, Swiss02, Swiss07, ViaF]);
    
//Variabelen van de Points of Interest:
    Stations = L.geoJson(null, {style: {iconUrl : 'images/station.png'}, onEachFeature:onEachFeature}),
    Bruggen = L.geoJson(null);

//GeoJson van de routes:
    jQuery.getJSON("GeoJson/E1_hoofdroute_grens_Zerbolo.geojson", function (data) { HoofdrouteZerbolo.addData(data)}),
    jQuery.getJSON("GeoJson/E1_hoofdroute_Zerbolo_vervolg.geojson", function (data) { HoofdrouteVervolg.addData(data)}),
    jQuery.getJSON("GeoJson/E1_alternatief_Zerbolo_Pavia_vervolg.geojson", function (data) { Alternatief.addData(data)}),  
    jQuery.getJSON("GeoJson/E1_lokale_varianten.geojson", function (data) { LokaleVariant.addData(data)}),
    jQuery.getJSON("GeoJson/E1_lokale_variant_vraag.geojson", function (data) { VariantVraag.addData(data)}),
    jQuery.getJSON("GeoJson/Bosma_aanbevolen_deels_verkend.geojson", function (data) { Aanbevolen.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route02.geojson", function (data) { Swiss02.addData(data)}),
    jQuery.getJSON("GeoJson/Swiss_route07.geojson", function (data) { Swiss07.addData(data)}),
    jQuery.getJSON("GeoJson/Via Francigena.geojson", function (data) { ViaF.addData(data)});

        
//GeoJson van de Points of Interest:
    jQuery.getJSON("GeoJson/POI_stations_langs_route.geojson", function (data) { Stations.addData(data)}),
    jQuery.getJSON("GeoJson/POI_brug_voor_voetgangers.geojson", function (data) { Bruggen.addData(data)});

//__________________________________________________________________________________________________________________      
                                        //Maken van de kaart:
//Map + layers + attributen
    var map = L.map('map', {layers: [osm, HoofdrouteZerbolo, Aanbevolen], 
            minZoom: 8,
            maxBounds: [[46.050361, 8.1672119140625],
                        [44.991221, 8.1672119140625],
                        [44.991221, 9.698682], 
                        [46.050361, 9.698682] ]
    }).setView([45.654464,  9.164932], 10);
//Opmerking: Zoomcontrol: false zorgt er hier voor dat het (standaard?) in- en uitzoom knopje uit staat. Zoomcontrol is hieronder weer aan gezet. Als je Zoomcontrol weg haalt staat deze er dus wel.

var Esri = L.esri.basemapLayer('Topographic');
//Esri Basemaps zijn onder anderen: Topographic, Imagery, NationalGeographic, Streets, Oceans, Gray, DarkGray, SchadedRelief

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
            "Hoofdroute E1 - Zerbolo"   : HoofdrouteZerbolo,
            "Vervolg Hoofdroute"        : HoofdrouteVervolg,
            "Alternatieve route"        : Alternatief,
            "Lokale Varianten"          : LokaleVariant,
            "Test Varianten"            : VariantVraag,
            "Aanbevolen E1 door Bosma"  : Aanbevolen,
            "Zwitserse Wandelroute 07"  : Swiss07,
            "Zwitserse Wandelroute 02"  : Swiss02,
            "Via Francigena"            : ViaF
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
                                        //Functies maken (stijl en mouseover):
//Functies
    function style(feature) {
        return {
            color   : feature.properties.color,
            opacity : feature.properties.opacity
        };
    };

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 10,
        color: '#e8fc00',
        dashArray: '',
        fillOpacity: 0.85
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    HoofdrouteZerbolo.resetStyle(e.target);
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
   

