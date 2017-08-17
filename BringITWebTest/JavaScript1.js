var map;
var directionsService;
var bounds = new google.maps.LatLngBounds();
var distanceSum1, distanceSum2, distanceSum3, distanceSum4;

var polyline1 = new google.maps.Polyline({
    path: [],
    strokeColor: "#DD71D8",
    strokeWeight: 1,
    id: 1
});
var polyline2 = new google.maps.Polyline({
    path: [],
    strokeColor: "#0000ff",
    strokeWeight: 1,
    id: 2
});
var polyline3 = new google.maps.Polyline({
    path: [],
    strokeColor: "#ff0000",
    strokeWeight: 8,
    id: 3
});
var polyline4 = new google.maps.Polyline({
    path: [],
    strokeColor: "#00ffff",
    strokeWeight: 1,
    id: 4
});


function loadRoute1(map) {  // เดินทางจาก อมตะนคร ไป แปซิกฟิคศรีราชา โดยผ่านทาง รร ชลอินเดตอร์
    var request = {
        origin: new google.maps.LatLng(13.423592, 101.000151),
        destination: new google.maps.LatLng(13.168443, 100.931649),
        waypoints: [{
            location: new google.maps.LatLng(13.366218, 100.991210)
        }],
        //      location: new google.maps.LatLng(30.240374, -97.891633)
        //    }, {
        //      location: new google.maps.LatLng(30.244220, -97.890442)
        //    }],
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            result.draggable = true;
            var renderer = new google.maps.DirectionsRenderer({
                draggable: false, // true,
                polylineOptions: {
                    strokeColor: "#DD71D8",
                    strokeWeight: 1
                },
                map: map
            });
            var path = result.routes[0].overview_path;
            var legs = result.routes[0].legs;

            for (i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;

                    // Display the route:

                    document.getElementById('route1').innerHTML += "***start***" + nextSegment + "***end***\n";

                    for (k = 0; k < nextSegment.length; k++) {
                        polyline1.getPath().push(nextSegment[k]);
                        bounds.extend(nextSegment[k]);
                    }
                }
            }

            // polyline1.setMap(map);
            if (polyline2.getPath().getLength() > 1) {
                getPolylineIntersection(polyline1, polyline2);
            }

            if (polyline3.getPath().getLength() > 1) {
                getPolylineIntersection(polyline1, polyline3);
            }

            if (polyline4.getPath().getLength() > 1) {
                getPolylineIntersection(polyline1, polyline4);
            }

            renderer.setDirections(result);
        }
    });
}

function loadRoute2(map) {  // ส่งของจาก เซ็นทรัล ไป หนองมล
    var request = {
        origin: new google.maps.LatLng(13.335172, 100.970869),

        //13.661347, 100.662187
        destination: new google.maps.LatLng(13.280875, 100.936901),
        //    waypoints: [{
        //      location: new google.maps.LatLng(30.243312, -97.890877)
        //    }, {
        //      location: new google.maps.LatLng(30.242431, -97.891601)
        //    }, {
        //      location: new google.maps.LatLng(30.243145, -97.893156)
        //    }, {
        //      location: new google.maps.LatLng(30.242357, -97.893811)
        //    }, {
        //      location: new google.maps.LatLng(30.241671, -97.891783)
        //    }],
        travelMode: google.maps.TravelMode.DRIVING
    };


    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            result.draggable = true;
            var renderer = new google.maps.DirectionsRenderer({
                draggable: false, // true,
                polylineOptions: {
                    strokeColor: "#0000ff",
                    strokeWeight: 1
                },
                map: map
            });
            var path = result.routes[0].overview_path;
            var legs = result.routes[0].legs;
            distanceSum2 = parseFloat(result.routes[0].legs[0].distance.text);
            //window.alert("Route " + polyline2.id + " : " + distanceSum2);

            //     window.alert("legs.length : " + legs.length);
            for (i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                //       window.alert("steps.length : " + steps.length);
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    //         window.alert("nextSegment : " + nextSegment);

                    // Display the route:

                    document.getElementById('route2').innerHTML += "***start***" + nextSegment + "***end***\n";

                    for (k = 0; k < nextSegment.length; k++) {
                        polyline2.getPath().push(nextSegment[k]);
                        bounds.extend(nextSegment[k]);
                    }
                }
            }
            // polyline2.setMap(map);
            if (polyline1.getPath().getLength() > 1) {
                getPolylineIntersection(polyline1, polyline2);
            }
            renderer.setDirections(result);
        }
    });
}

function loadRoute3(map) {  // ส่งของจาก รร ชลบุรีสุขบท ถึง โรงพยาบาลชลบุรี
    var request = {
        origin: new google.maps.LatLng(13.394646, 100.987830),
        destination: new google.maps.LatLng(13.352231, 100.981860),
        //    waypoints: [{
        //      location: new google.maps.LatLng(30.241532, -97.894202)
        //    }, {
        //      location: new google.maps.LatLng(30.240374, -97.891633)
        //    }, {
        //      location: new google.maps.LatLng(30.244220, -97.890442)
        //    }],
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            result.draggable = true;
            var renderer = new google.maps.DirectionsRenderer({
                draggable: false, // true,
                polylineOptions: {
                    strokeColor: "#FFFFFF",
                    strokeWeight: 1
                },
                map: map
            });
            var path = result.routes[0].overview_path;
            var legs = result.routes[0].legs;
            distanceSum3 = parseFloat(result.routes[0].legs[0].distance.text);
            //     window.alert("Route " + polyline3.id + " : " + distanceSum3);

            for (i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    document.getElementById('route3').innerHTML += "***start***" + nextSegment + "***end***\n";
                    for (k = 0; k < nextSegment.length; k++) {
                        polyline3.getPath().push(nextSegment[k]);
                        bounds.extend(nextSegment[k]);
                    }
                }
            }
            //polyline1.setMap(map);
            if (polyline1.getPath().getLength() > 1) {
                getPolylineIntersection(polyline1, polyline3);
            }
            renderer.setDirections(result);
        }
    });
}

function loadRoute4(map) {  // ส่งของจาก วัดตาลล้อม ถึง ม ปัญญารีสอร์ท
    var request = {
        origin: new google.maps.LatLng(13.255509, 100.936951),
        destination: new google.maps.LatLng(13.238459, 100.935134),
        //    waypoints: [{
        //      location: new google.maps.LatLng(30.241532, -97.894202)
        //    }, {
        //      location: new google.maps.LatLng(30.240374, -97.891633)
        //    }, {
        //      location: new google.maps.LatLng(30.244220, -97.890442)
        //    }],
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            result.draggable = true;
            var renderer = new google.maps.DirectionsRenderer({
                draggable: false, // true,
                polylineOptions: {
                    strokeColor: "#552233",
                    strokeWeight: 1
                },
                map: map
            });
            var path = result.routes[0].overview_path;
            var legs = result.routes[0].legs;
            distanceSum4 = parseFloat(result.routes[0].legs[0].distance.text);
            //      window.alert("Route " + polyline4.id + " : " + distanceSum4);

            for (i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    document.getElementById('route4').innerHTML += "***start***" + nextSegment + "***end***\n";
                    for (k = 0; k < nextSegment.length; k++) {
                        polyline4.getPath().push(nextSegment[k]);
                        bounds.extend(nextSegment[k]);
                    }
                }
            }
            //polyline1.setMap(map);
            if (polyline1.getPath().getLength() > 1) {
                getPolylineIntersection(polyline1, polyline4);
            }
            renderer.setDirections(result);
        }
    });
}


function getPolylineIntersection(polylineSource, polylineDes) {
    var commonPts = [];


    for (var i = 0; i < polylineSource.getPath().getLength() ; i++) {
        for (var j = 0; j < polylineDes.getPath().getLength() ; j++) {
            if (polylineSource.getPath().getAt(i).equals(polylineDes.getPath().getAt(j))) {

                commonPts.push({
                    lat: polylineSource.getPath().getAt(i).lat(),
                    lng: polylineSource.getPath().getAt(i).lng(),
                    route1idx: i
                });
            }
        }
    }
    var path = [];
    var prevIdx = commonPts[0].route1idx;

    for (var i = 0; i < commonPts.length; i++) {
        if (commonPts[i].route1idx <= prevIdx + 1) {
            path.push(commonPts[i]);
            prevIdx = commonPts[i].route1idx;
        } else {
            var polyline = new google.maps.Polyline({
                map: map,
                path: path,
                strokeWeight: 8,
                strokeColor: "#551122"
            });
            path = [];
            prevIdx = commonPts[i].route1idx;
        }
    }
    var polyline = new google.maps.Polyline({
        map: map,
        path: path,
        strokeWeight: 8,
        strokeColor: "#551122"
    });

    var request = {
        origin: new google.maps.LatLng(commonPts[0].lat, commonPts[0].lng),
        destination: new google.maps.LatLng(commonPts[commonPts.length - 1].lat, commonPts[commonPts.length - 1].lng),
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var path = result.routes[0].overview_path;
            var legs = result.routes[0].legs;
            var distanceOverlap = parseFloat(result.routes[0].legs[0].distance.text);
            var distance;

            if (polylineDes.id == 2) {
                distance = distanceSum2;
            }
            else if (polylineDes.id == 3) {
                distance = distanceSum3;
            }
            else if (polylineDes.id == 4) {
                distance = distanceSum4;
            }
            else {
                distance = distanceSum1;
            }

            var distanceDiff = distance - distanceOverlap;
            //      window.alert("Route from [" + polylineSource.id + "]  and  [" + polylineDes.id  + "]  / //Overlap :  " + distanceOverlap + " Diff : " + distanceDiff);      
        }
    });
}



function loadMap() {
        var markerArray = [];
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
        var stepDisplay = new google.maps.InfoWindow;
        var originPoint = new google.maps.LatLng(13.423592, 101.000151);
        var destinationPoint = new google.maps.LatLng(13.168443, 100.931649);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: 13.661146, lng: 100.662308 }
        });
        var originPoint2 = new google.maps.LatLng(13.335172, 100.970869);
        var destinationPoint2 = new google.maps.LatLng(13.280875, 100.936901);

        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, originPoint,destinationPoint, map);

        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, originPoint2, destinationPoint2, map);


        // Listen to change events from the start and end lists.
        //var onChangeHandler = function() {
        //  calculateAndDisplayRoute(
        //      directionsDisplay, directionsService, markerArray, stepDisplay, map);
        //};
        //document.getElementById('start').addEventListener('change', onChangeHandler);
        //document.getElementById('end').addEventListener('change', onChangeHandler);
    }

    function calculateAndDisplayRoute(directionsDisplay, directionsService,
        markerArray, stepDisplay, originPoint, destinationPoint, map) {
        // First, remove any existing markers from the map.

        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
            origin: originPoint,
            destination: destinationPoint,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === 'OK') {
               // document.getElementById('warnings-panel').innerHTML = '<b>' + response.routes[0].warnings + "<br />" ;
                directionsDisplay.setDirections(response);
                showSteps(response, markerArray, stepDisplay, map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    function showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            attachInstructionText(
                stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
    }

    function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function () {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });
    }
function add(num1,num2){
    return num1 + num2;
}

function initialize() {

    var mapOptions = {
        zoom: 16,
        draggable: true,
        center: {
            lat: 13.661146,
            lng: 100.662308
        }
    };

    //map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //directionsService = new google.maps.DirectionsService();

    loadMap(map);
    //loadRoute1(map);
    //loadRoute2(map);
    //loadRoute3(map);
    //loadRoute4(map);

}
