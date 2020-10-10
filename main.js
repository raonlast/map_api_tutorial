var mapOptions = {
	center: new naver.maps.LatLng(37.3595704, 127.105399),
	zoom: 10
};

var map = new naver.maps.Map('map', mapOptions);


var markerList = [];
var infowindowList = [];


for (var i in data) {
	var target = data[i];

	var latlng = new naver.maps.LatLng(target.lat, target.lng);

	marker = new naver.maps.Marker({
		map: map,
		position: latlng,
		icon: {
			content: "<div class='marker'></div>",
			anchor: new naver.maps.Point(12, 12)
		},
	});

	var content = `<div class='infowindow_wrap'>
		<div class='infowindow_title'>${target.title}</div>
		<div class='infowindow_content'>${target.content}</div>
		<div class='infowindow_date'>${target.date}</div>
	</div>`

		var infowindow = new naver.maps.InfoWindow({
			content: content,
			backgroundColor: "#00ff000000",
			borderColor: "#00ff000000",
			anchorSize: new naver.maps.Size(0, 0)
		})


		markerList.push(marker);
		infowindowList.push(infowindow);

}

for (var i = 0, ii = markerList.length; i < ii; i++) {
	naver.maps.Event.addListener(map, "click", ClicMap(i));
	naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));

}


function ClicMap(i) {
	return function() {
		var infowindow = infowindowList[i];
		infowindow.close()
	}
}


function getClickHandler(i) {
	return function() {
		var marker = markerList[i];
		var infowindow = infowindowList[i];
		if (infowindow.getMap()) {
			infowindow.close();
		} else {
			infowindow.open(map, marker);
		}
	}
}




function onErrorGeolocation() {
	var center = map.getCenter();

	infowindow.setContent('<div style="padding:20px;">' + 
		'<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ 
		"latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

	infowindow.open(map, center);
}

$('#current').click(() => {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {

			const lat = position.coords.latitude;
			const lng = position.coords.longitude;
			
			var location = new naver.maps.LatLng(lat, lng);

			map.setCenter(location);
			map.setZoom(14);

			marker = new naver.maps.Marker({
				map: map,
				position: location,
			});
		});
		
	} else {
		
	}
})