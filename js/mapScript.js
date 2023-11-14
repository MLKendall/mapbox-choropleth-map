// define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWtlbmRhbGw5MyIsImEiOiJjajh1ZnBza3gweWx0MndwNnhqdm4xNWxqIn0.rMuyyrv9yUHGnE0PiXzGLw';
     
// create map
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mkendall93/cloyhbu2200r301qjf88p6oya' // map style URL from Mapbox Studio
});
 
// wait for map to load before adjusting it
map.on('load', () => {
// make a pointer cursor
map.getCanvas().style.cursor = 'default';
 
// set map bounds to the continental US
map.fitBounds([
[-133.2421875, 16.972741],
[-47.63671875, 52.696361]
]);
 
// define layer names
const layers = [
'0-10',
'10-20',
'20-50',
'50-100',
'100-200',
'200-500',
'500-1000',
'1000+'
];
const colors = [
'#FFEDA0',
'#FED976',
'#FEB24C',
'#FD8D3C',
'#FC4E2A',
'#E31A1C',
'#BD0026',
'#800026'
];
 
// create legend
const legend = document.getElementById('legend');
 
layers.forEach((layer, i) => {
const color = colors[i];
const item = document.createElement('div');
const key = document.createElement('span');
key.className = 'legend-key';
key.style.backgroundColor = color;
 
const value = document.createElement('span');
value.innerHTML = `${layer}`;
item.appendChild(key);
item.appendChild(value);
legend.appendChild(item);
});
 
// change info window on hover
map.on('mousemove', (event) => {
const states = map.queryRenderedFeatures(event.point, {
layers: ['state_population_data']
});
document.getElementById('pd').innerHTML = states.length
? `<h3>${states[0].properties.name}</h3><p><strong><em>${states[0].properties.density}</strong> people per square mile</em></p>`
: `<p>Hover over a state!</p>`;
});
});