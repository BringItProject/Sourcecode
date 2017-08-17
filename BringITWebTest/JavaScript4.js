function initMap() {

    initialLoad();  
}
var map;
function initialLoad() {

    //var originPoint = new google.maps.LatLng(13.423592, 101.000151);
    //var destinationPoint = new google.maps.LatLng(13.168443, 100.931649);

    var originPoint2 = new google.maps.LatLng(13.335172, 100.970869);
    var destinationPoint2 = new google.maps.LatLng(13.280875, 100.936901);

    //var originPoint3 = new google.maps.LatLng(13.394646, 100.987830);
    //var destinationPoint3 = new google.maps.LatLng(13.352231, 100.981860);

    //var originPoint4 = new google.maps.LatLng(13.255509, 100.936951);
    //var destinationPoint4 = new google.maps.LatLng(13.238459, 100.935134);

    //var originPoint5 = new google.maps.LatLng(13.335172, 100.970869);
    //var destinationPoint5 = new google.maps.LatLng(13.240165, 100.934790);

    //var originPoint6 = new google.maps.LatLng(13.280178, 100.936698);
    //var destinationPoint6 = new google.maps.LatLng(13.243715, 100.934276);




    //var markerArray = [];
    //var directionsService = new google.maps.DirectionsService;
    //var stepDisplay = new google.maps.InfoWindow;

    var markerArray2 = [];
    var directionsService2 = new google.maps.DirectionsService;
    var stepDisplay2 = new google.maps.InfoWindow;

    //var markerArray3 = [];
    //var directionsService3 = new google.maps.DirectionsService;
    //var stepDisplay3 = new google.maps.InfoWindow;

    //var markerArray4 = [];
    //var directionsService4 = new google.maps.DirectionsService;
    //var stepDisplay4 = new google.maps.InfoWindow;

    //var markerArray5 = [];
    //var directionsService5 = new google.maps.DirectionsService;
    //var stepDisplay5 = new google.maps.InfoWindow;

    //var markerArray6 = [];
    //var directionsService6 = new google.maps.DirectionsService;
    //var stepDisplay6 = new google.maps.InfoWindow;

        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: { lat: 13.661146, lng: 100.662308 }
    });
    //********************************************************************
    //var directionsDisplay = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#552233",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});
    // Display the route between the initial start and end selections.

    //var waypoint = new google.maps.LatLng(13.366218, 100.991210);

    //calculateAndDisplayRoute(
    //    directionsDisplay, directionsService, markerArray, stepDisplay, originPoint, destinationPoint, waypoint, map, 'route1');

    //********************************************************************
    var directionsDisplay2 = new google.maps.DirectionsRenderer({ map: map });

    var waypoint = originPoint2;
    calculateAndDisplayRoute(
        directionsDisplay2, directionsService2, markerArray2, stepDisplay2, originPoint2, destinationPoint2, waypoint, map, 'route2');
    ////********************************************************************
    //var directionsDisplay3 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#DD71D8",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});


    //calculateAndDisplayRoute(
    //    directionsDisplay3, directionsService3, markerArray3, stepDisplay3, originPoint3, destinationPoint3, waypoint, map, 'route3');
    ////********************************************************************
    //var directionsDisplay4 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#0000ff",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});

    //calculateAndDisplayRoute(
    //    directionsDisplay4, directionsService4, markerArray4, stepDisplay4, originPoint4, destinationPoint4, waypoint, map, 'route4');
    ////********************************************************************
    //var directionsDisplay5 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#ff0000",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});

    //calculateAndDisplayRoute(
    //    directionsDisplay5, directionsService5, markerArray5, stepDisplay5, originPoint5, destinationPoint5, waypoint, map, 'route5');
    ////********************************************************************
    //var directionsDisplay6 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#00ffff",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});

    //calculateAndDisplayRoute(
    //    directionsDisplay6, directionsService6, markerArray6, stepDisplay6, originPoint6, destinationPoint6, waypoint, map, 'route6');
    ////********************************************************************

    // insertBringerJobDetail();


    // Listen to change events from the start and end lists.
    //var onChangeHandler = function() {
    //  calculateAndDisplayRoute(
    //      directionsDisplay, directionsService, markerArray, stepDisplay, map);
    //};
    //document.getElementById('start').addEventListener('change', onChangeHandler);
    //document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsDisplay, directionsService,
    markerArray, stepDisplay, originPoint, destinationPoint, waypoint, map, routeName) {
    // First, remove any existing markers from the map.

    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route({
        origin: originPoint,
        destination: destinationPoint,
        //waypoints: [{
        //    location: waypoint
        //}],
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
            showSteps(response, markerArray, stepDisplay, map, routeName);
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function showSteps(directionResult, markerArray, stepDisplay, map, routeName) {
    var stepPointLat = [];
    var stepPointLng = [];
    var j = 0;

    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];

    document.getElementById(routeName).innerHTML += "<br />";
    for (var i = 0; i < myRoute.steps.length; i++) {

        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        //marker.setMap(map);
        //marker.setPosition(myRoute.steps[i].start_location);
        //attachInstructionText(
        //    stepDisplay, marker, myRoute.steps[i].instructions, map);

        stepPointLat[j] = myRoute.steps[i].start_location.lat();
        stepPointLng[j] = myRoute.steps[i].start_location.lng();
        j++;
        // document.getElementById(routeName).innerHTML += myRoute.steps[i].start_location.lat() + "," + myRoute.steps[i].start_location.lng() + "<br />";
        document.getElementById(routeName).innerHTML += myRoute.steps[i].start_location.lat() + "," + myRoute.steps[i].start_location.lng() + "<br />";

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

var Resultxx;
   function AddBringer(BringerID,StartPoint,StopPoint,JobID)
//function AddBringer(BringerID)
   {
       var originPoint = new google.maps.LatLng(StartPoint);
       var destinationPoint = new google.maps.LatLng(StopPoint);

       var markerArray = [];
       var directionsService = new google.maps.DirectionsService;
       var stepDisplay = new google.maps.InfoWindow;
       var waypoint = originPoint;
       var directionsDisplay = new google.maps.DirectionsRenderer({
           draggable: true, // true false,
           polylineOptions: {
               strokeColor: "#552233",
               strokeWeight: 5
           },
           map: map
       });

      calculateAndDisplayRoute(
       directionsDisplay, directionsService, markerArray, stepDisplay, originPoint, destinationPoint, waypoint, map, 'route1');

    
    var theUrl = 'http://localhost:1337/BringerJob/' + BringerID;
       getJSON(theUrl,
           function (err, data) {
               if (err != null) {
                   alert('Something went wrong: ' + err);
               } else {
                 
                   Resultxx = data;
                   alert('Your query data: ' + Resultxx);
               }
           });
       
}
function FindBringer(BringerID) {

    var theUrl = 'http://localhost:1337/BringerJob/' + BringerID;
    getJSON(theUrl,
        function (err, data) {
            if (err != null) {
                alert('Something went wrong: ' + err);
            } else {

                Resultxx = data;
                alert('Your query data: ' + Resultxx);
                
            }
        });

}

function FindSender(SenderID) {

    var theUrl = 'http://localhost:1337/SenderJob/' + SenderID;
    getJSON(theUrl,
        function (err, data) {
            if (err != null) {
                alert('Something went wrong: ' + err);
            } else {

                Resultxx = data;
                alert('Your query data: ' + Resultxx);
            }
        });

}


var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};  
  