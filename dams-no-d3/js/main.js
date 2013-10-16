function init() {

/****************************************************************

These are d3's initial values required for a basic map

****************************************************************/

// svg dimensions
var width = 750, 
	height = 450; 

// appending svg
var svg = d3.select("#map").append("svg") 
	.attr("width", width)
	.attr("height", height); 

// projection parameters for the map including projection
var projection = d3.geo.albers() 
	.scale(950)
	.translate([width / 2, height / 2])
	.precision(.1);

// defining the path used later
var path = d3.geo.path()  
	.projection(projection);  

// inserting a graticule
var graticule = d3.geo.graticule(); 

/****************************************************************

This is the async library queue.js that loads in multiple files

****************************************************************/

// queue()
// 	.defer(d3.json, 'data/countries.json')
// 	.defer(d3.json, 'data/dams.json')
// 	.defer(d3.json, 'data/rivers.json')
// 	.defer(d3.json, 'data/lakes_na.json')
// 	.await(makeMap);


/****************************************************************

Main function that uses data and creates SVG objects accordingly

****************************************************************/
// function makeMap(error, land, dams, rivers, lakes_na) {
	
// graticule
	// svg.append("path")    
	// 	.datum(graticule)
	// 	.attr("class", "graticule")
	// 	.attr("d", path);

// land & countries
	// svg.append("path")
	// 	.datum(topojson.feature(land, land.objects.countries))
	// 	.attr('d', path)
	// 	.attr('class', 'land');

// rivers
	// svg.append("path")
	// 	.datum(topojson.feature(rivers, rivers.objects.rivers_usa))
	// 	.attr('d', path)
	// 	.attr('class', 'rivers');

// lakes
	// svg.append("path")
	// 	.datum(topojson.feature(lakes_na, lakes_na.objects.lakes))
	// 	.attr('d', path)
	// 	.attr('class', 'lakes');

// dam center points
	// svg.selectAll('.centers') // center points of each dam
	// 	.data(dams.features)
	// 	.enter()
	// 	.append('path')
	// 	.attr('d', path.pointRadius(1))
	// 	.attr('class', 'centers');

// dam prop symbol calculations
	// var length = dams.features.length; // length used for getting min and max values
	// var volumes = [];
	// for (mug=0; mug < length; mug++) {
	// 	var vol = dams.features[mug].properties.VOLUME;
	// 	volumes.push(vol);
	// }
	// var min = Math.min.apply(Math, volumes),
	// 	max = Math.max.apply(Math, volumes);

	// var radius = d3.scale.sqrt() // defines the radius parameters for the prop symbols
	// 	.domain([min, max])
	// 	.range([.5, 40]);

// dams
	// svg.selectAll('.dams')
	// 	.data(dams.features)
	// 	.enter()
	// 	.append('path')
	// 	.attr('d', path.pointRadius(function(d) { return radius(d.properties.VOLUME); }))
	// 	.attr('class', 'dams')
	// 	.on('mouseover', function(d) { // gather information from geojson
	// 		var dam = d.properties,
	// 			name = dam.DAM_NAME,
	// 			river = dam.RIVER,
	// 			year = dam.YEAR,
	// 			vol = dam.VOLUME;
	// 		if (name == null) {
	// 			name = 'Unnamed';
	// 		}
	// 		var info = '<h1>' + name + ' Dam<h1><h2>River: ' +  river + '</h2><h3>Built in ' + year + '</h3>';
	// 		$('#info').html(info);
	// 		if (name == 'Hoover') {
	// 			console.log('waka');
	// 			$('#hoover').css({'font-weight': '900', 'text-decoration': 'underline'});
	// 		}
	// 	})
	// 	.on('mouseout', function(d) { // rest
	// 		$('#info').html(''); // removes info HTML
	// 		$('#hoover').css({'font-weight': '400', 'text-decoration': 'none'});
	// 	});
}

}

window.onLoad = init();