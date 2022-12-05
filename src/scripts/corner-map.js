<script type="text/javascript" src="https://stamen-maps.a.ssl.fastly.net/js/tile.stamen.js?v1.3.0"></script>

// replace "toner" here with "terrain" or "watercolor"
var layer = new L.StamenTileLayer("toner");
var map = new L.Map("element_id", {
    center: new L.LatLng(37.7, -122.4),
    zoom: 12
});
map.addLayer(layer);