function initMap() {

    //initialLoad();  
}


function initialLoad() {

    var originPoint = document.getElementsByName('BringerStart')[0].value;
    var destinationPoint = document.getElementsByName('BringerEnd')[0].value;

    var originPoint2 = document.getElementsByName('Sender2Start')[0].value;
    var destinationPoint2 = document.getElementsByName('Sender2End')[0].value;

    var originPoint3 = document.getElementsByName('Sender3Start')[0].value;
    var destinationPoint3 = document.getElementsByName('Sender3End')[0].value;

    var originPoint4 = document.getElementsByName('Sender4Start')[0].value;
    var destinationPoint4 = document.getElementsByName('Sender4End')[0].value;

    var originPoint5 = document.getElementsByName('Sender5Start')[0].value;
    var destinationPoint5 = document.getElementsByName('Sender5End')[0].value;

    var originPoint6 = document.getElementsByName('Sender6Start')[0].value;
    var destinationPoint6 = document.getElementsByName('Sender6End')[0].value;


    var markerArray = [];
    var directionsService = new google.maps.DirectionsService;
    var stepDisplay = new google.maps.InfoWindow;

    var markerArray2 = [];
    var directionsService2 = new google.maps.DirectionsService;
    var stepDisplay2 = new google.maps.InfoWindow;

    var markerArray3 = [];
    var directionsService3 = new google.maps.DirectionsService;
    var stepDisplay3 = new google.maps.InfoWindow;

    var markerArray4 = [];
    var directionsService4 = new google.maps.DirectionsService;
    var stepDisplay4 = new google.maps.InfoWindow;

    var markerArray5 = [];
    var directionsService5 = new google.maps.DirectionsService;
    var stepDisplay5 = new google.maps.InfoWindow;

    var markerArray6 = [];
    var directionsService6 = new google.maps.DirectionsService;
    var stepDisplay6 = new google.maps.InfoWindow;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: { lat: 13.661146, lng: 100.662308 }
    });

    //********************************************************************
    var waypoint = null;


    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true, // true false,
        polylineOptions: {
            strokeColor: "#552233",
            strokeWeight: 5
        },
        map: map
    });
    calculateAndDisplayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, originPoint, destinationPoint, waypoint, map, 'route1', 'Bringer', 'B0001', 'B-JID-0001');


    //var directionsDisplay2 = new google.maps.DirectionsRenderer({ map: map });
    //calculateAndDisplayRoute(
    //    directionsDisplay2, directionsService2, markerArray2, stepDisplay2, originPoint2, destinationPoint2, waypoint, map, 'route2', 'Sender', 'S0001', 'S-JID-0001');


    //var directionsDisplay3 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#DD71D8",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});


    //calculateAndDisplayRoute(
    //    directionsDisplay3, directionsService3, markerArray3, stepDisplay3, originPoint3, destinationPoint3, waypoint, map, 'route3', 'Sender', 'S0002', 'S-JID-0002');
    //var directionsDisplay4 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#0000ff",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});

    //calculateAndDisplayRoute(
    //    directionsDisplay4, directionsService4, markerArray4, stepDisplay4, originPoint4, destinationPoint4, waypoint, map, 'route4', 'Sender', 'S0003', 'S-JID-0003');
    //var directionsDisplay5 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#ff0000",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});

    //calculateAndDisplayRoute(
    //    directionsDisplay5, directionsService5, markerArray5, stepDisplay5, originPoint5, destinationPoint5, waypoint, map, 'route5', 'Sender', 'S0004', 'S-JID-0004');
    //var directionsDisplay6 = new google.maps.DirectionsRenderer({
    //    draggable: true, // true false,
    //    polylineOptions: {
    //        strokeColor: "#00ffff",
    //        strokeWeight: 5
    //    },
    //    map: map
    //});

    //calculateAndDisplayRoute(
    //    directionsDisplay6, directionsService6, markerArray6, stepDisplay6, originPoint6, destinationPoint6, waypoint, map, 'route6', 'Sender', 'S0005', 'S-JID-0005');

    //var onChangeHandler = function () {
    //    calculateAndDisplayRoute(
    //        directionsDisplay, directionsService, markerArray, stepDisplay, map);
    //};
    //document.getElementById('start').addEventListener('change', onChangeHandler);
    //document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsDisplay, directionsService,
    markerArray, stepDisplay, originPoint, destinationPoint, waypoint, map, routeName, type, ID, jobID) {
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
            if (type == 'Bringer') {
                AddBringerCurrentJob(ID, originPoint, destinationPoint, jobID);

            }
            else if ((type == 'Sender')) {
                AddSenderCurrentJob(ID, originPoint, destinationPoint, jobID);

            }
            else {
                alert("Add Bringer/Sender Error.");
            }
            //showSteps(response, markerArray, stepDisplay, map, routeName, type, ID, jobID);
            directionsDisplay.setDirections(response);
        } else {
            // window.alert('Directions request failed due to ' + status);
        }
        });
    alert("Calculate completed for " + type + " of " + jobID);
}

function showSteps(directionResult, markerArray, stepDisplay, map, routeName, type, ID, jobID) {
    var stepPointLat = [];
    var stepPointLng = [];
    var bringerData;
    var senderData;
    var j = 0;
    var pointCount = 0;

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
        var dist = myRoute.steps[i].distance.value / myRoute.steps[i].lat_lngs.length
        
        for (var j = 0; j < myRoute.steps[i].lat_lngs.length; j++) {

            if (type == 'Bringer') {

                    bringerData= {
                        "BringerID": ID,
                        "JobID": jobID,
                        "legsNo": i,
                        "pontSeq": j,
                        "distance": dist,
                        "loc": {
                            "type": "Point",
                            "coordinates": [
                                myRoute.steps[i].lat_lngs[j].lng(),
                                myRoute.steps[i].lat_lngs[j].lat()
                            ]
                        }
                    };
                    pointCount++;
                    AddBringerJobDetail(bringerData);
             }
            else if ((type == 'Sender')) {
                senderData = {
                    "SenderID": ID,
                    "JobID": jobID,
                    "legsNo": i,
                    "pontSeq": j,
                    "distance": dist,
                    "loc": {
                        "type": "Point",
                        "coordinates": [
                            myRoute.steps[i].lat_lngs[j].lng(),
                            myRoute.steps[i].lat_lngs[j].lat()
                        ]
                    }
                };
                pointCount++;
                AddSenderJobDetail(senderData);
            }
        }

        //if (type == 'Bringer') {
        //    AddBringerJobDetail(bringerData);
         
        //}
        //else if ((type == 'Sender')) {
        //    AddSenderJobDetail(senderData);
         
        //}
        
        

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
function AddBringerCurrentJob(BringerID, StartPoint, StopPoint, JobID) {
    //alert("AddBringerCurrentJob");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/BringerJob";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    var bringerData = (
        {
            "BringerID":    BringerID,
            "StartPoint":   StartPoint,
            "StopPoint":    StopPoint,
            "Status":       "ACTIVE",
            "ItemCount":    0,
            "JobID":        JobID,
            "JobDate":      "20170800000000",
            "JobDueDate":   "20170800000000"
        });
    var data = JSON.stringify(bringerData);
    xhr.send(data);
}

function AddBringerJobDetail(bringerData) {
    //alert("Add BringerJob Detail");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/BringerJobDetail";
       
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify(bringerData);
    xhr.send(data);
}

function AddSenderCurrentJob(SenderID, StartPoint, StopPoint, JobID) {
    alert("AddSenderCurrentJob");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/SenderJob";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    //var data = JSON.stringify({ "email": "hey@mail.com", "password": "101010" });
    var data = JSON.stringify({ "SenderID": SenderID, "StartPoint": StartPoint, "StopPointStoptLng": StopPoint, "Status": "ACTIVE", "ItemCount": 0, "JobID": JobID, "JobDate": "20170800000000", "JobDueDate": "20170800000000" });
    xhr.send(data);
}


function AddSenderJobDetail(senderData) {
    //alert("Add BringerJob Detail");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/SenderJobDetail/";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify(senderData);
    xhr.send(data);
}
function FindBringer(BringerID) {

    var theUrl = 'http://localhost:8080/BringerCurrentJob/' + BringerID;
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

function DeletedAllData() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/SenderJobDetail/";
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify({});
    xhr.send(data);

    url = "http://localhost:8080/BringerJobDetail/";
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(data);

    url = "http://localhost:8080/BringerCurrentJOb/";
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(data);

    url = "http://localhost:8080/SenderCurrentJOb/";
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(data);
}
function FindSender(SenderID) {

    var theUrl = 'http://localhost:8080/SenderCurrentJob/' + SenderID;
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


function findGeoNear() {
  
}