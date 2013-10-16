function init() {

var width = 750, 
	height = 450; 

var svg = d3.select("#map").append("svg") 
	.attr("width", width)
	.attr("height", height); 

var projection = d3.geo.albers() 
	.scale(950)
	.translate([width / 2, height / 2])
	.precision(.1);

var path = d3.geo.path()  
	.projection(projection);  

var graticule = d3.geo.graticule(); 

queue()
	.defer(d3.json, 'data/countries.json')
	.defer(d3.json, 'data/dams.json')
	.defer(d3.json, 'data/rivers.json')
	.defer(d3.json, 'data/lakes_na.json')
	.await(makeMap);

function makeMap(error, land, dams, rivers, lakes_na) {
	// graticule
	svg.append("path")    
		.datum(graticule)
		.attr("class", "graticule")
		.attr("d", path);

	// land & countries
	svg.append("path")
		.datum(topojson.feature(land, land.objects.countries))
		.attr('d', path)
		.attr('class', 'land');

	// rivers
	svg.append("path")
		.datum(topojson.feature(rivers, rivers.objects.rivers_usa))
		.attr('d', path)
		.attr('class', 'rivers');

	// lakes
	svg.append("path")
		.datum(topojson.feature(lakes_na, lakes_na.objects.lakes))
		.attr('d', path)
		.attr('class', 'lakes');

	// dams
	svg.selectAll('.centers') // center points of each dam
		.data(dams.features)
		.enter()
		.append('path')
		.attr('d', path.pointRadius(1))
		.attr('class', 'centers');

	var length = dams.features.length; // length used for getting min and max values
	var volumes = [];
	for (mug=0; mug < length; mug++) {
		var vol = dams.features[mug].properties.VOLUME;
		volumes.push(vol);
	}
	var min = Math.min.apply(Math, volumes),
		max = Math.max.apply(Math, volumes);

	var radius = d3.scale.sqrt() // defines the radius parameters for the prop symbols
		.domain([min, max])
		.range([.5, 40]);

	svg.selectAll('.dams')
		.data(dams.features)
		.enter()
		.append('path')
		.attr('d', path.pointRadius(function(d) { return radius(d.properties.VOLUME); }))
		.attr('class', 'dams')
		.on('mouseover', function(d) {
			var dam = d.properties,
				name = dam.DAM_NAME,
				river = dam.RIVER,
				year = dam.YEAR,
				vol = dam.VOLUME;
			if (name == null) {
				name = 'Unnamed';
			}
			var info = '<h1>' + name + ' Dam<h1><h2>River: ' +  river + '</h2><h3>Built in ' + year + '</h3>';
			$('#info').html(info);
			if (name == 'Hoover') {
				console.log('waka');
				$('#hoover').css({'font-weight': '900', 'text-decoration': 'underline'});
			}
		})
		.on('mouseout', function(d) {
			$('#info').html(''); // removes info HTML
			$('#hoover').css({'font-weight': '400', 'text-decoration': 'none'});
		});
	

	
}

// background raster
// var canvas = d3.select("body").append("canvas")
//     .attr("width", width)
//     .attr("height", height);

// var context = canvas.node().getContext("2d");

// var image = new Image;
// image.onload = onload;
// image.src = "img/grey-world.jpg";

// function onload() {
//   var dx = image.width,
//       dy = image.height;

//   context.drawImage(image, 0, 0, dx, dy);

//   var sourceData = context.getImageData(0, 0, dx, dy).data,
//       target = context.createImageData(width, height),
//       targetData = target.data;

//   for (var y = 0, i = -1; y < height; ++y) {
//     for (var x = 0; x < width; ++x) {
//       var p = projection.invert([x, y]), λ = p[0], φ = p[1];
//       if (λ > 180 || λ < -180 || φ > 90 || φ < -90) { i += 4; continue; }
//       var q = ((90 - φ) / 180 * dy | 0) * dx + ((180 + λ) / 360 * dx | 0) << 2;
//       targetData[++i] = sourceData[q];
//       targetData[++i] = sourceData[++q];
//       targetData[++i] = sourceData[++q];
//       targetData[++i] = 255;
//     }
//   }

//   context.clearRect(0, 0, width, height);
//   context.putImageData(target, 0, 0);
// }

}

window.onLoad = init();