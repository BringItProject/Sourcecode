function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: { lat: 13.661146, lng: 100.662308 }
    });
}

var map;

function showRoute(originPoint, destinationPoint,userid,jobid,type,routeno,colorline) {

    var markerArray = [];
    var directionsService = new google.maps.DirectionsService;
    var stepDisplay = new google.maps.InfoWindow;
    var waypoint = null;

    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true, // true false,
        polylineOptions: {
            strokeColor: colorline,
            strokeWeight: 5
        },
        map: map
    });
    calculateAndDisplayRoute(
    directionsDisplay, directionsService, markerArray, stepDisplay, originPoint, destinationPoint, waypoint, map, routeno, type, userid, jobid);

    callbackTester(function () { CreateNewJob(userid, jobid, originPoint, destinationPoint, type); });
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
    var directionsDisplay2 = new google.maps.DirectionsRenderer({ map: map });
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
    
    //calculateAndDisplayRoute(
    //    directionsDisplay2, directionsService2, markerArray2, stepDisplay2, originPoint2, destinationPoint2, waypoint, map, 'route2', 'Sender', 'S0001', 'S-JID-0001');
    
    //callbackTester(function () { CreateNewJob("B-001", "B-001-1", "13.746611,100.494223", "12.697573,101.267060", "Bringer");});
    //callbackTester(function () { CreateNewJob("S-001", "S-001-1", "13.368421,101.040837", "13.080834,100.995698", "Sender");});
    //callbackTester(function () { CreateNewJob("S-001", "S-001-2", "13.086562,100.991834", "13.031931,101.005917", "Sender");});
    //callbackTester(function () { CreateNewJob("S-001", "S-001-3", "13.130039,100.988506", "12.697573,101.267060", "Sender");});
    //callbackTester(function () { CreateNewJob("S-001", "S-001-4", "12.710340,101.229449", "12.695597,101.286847", "Sender");});
    //callbackTester(function () { CreateNewJob("B-002", "B-002-1", "13.707041,100.543471", "13.65592,100.6222", "Bringer");});
    //callbackTester(function () { CreateNewJob("B-002", "B-002-2", "13.578319,100.844427", "13.640325,100.680412", "Bringer");});
    //callbackTester(function () { CreateNewJob("S-002", "S-002-1", "13.611885,100.668983", "13.596625,100.745084", "Sender");});
    //callbackTester(function () { CreateNewJob("S-002", "S-002-2", "13.649867,100.679786", "13.629583,100.719913", "Sender");});
    //callbackTester(function () { CreateNewJob("S-002", "S-002-3", "13.670873,100.616542", "13.706279,100.543931", "Sender");});
    //callbackTester(function () { CreateNewJob("S-002", "S-002-4", "13.694726,100.597687", "13.677430,100.604588", "Sender");});
    //callbackTester(function () { CreateNewJob("S-002", "S-002-5", "13.671094,100.620027", "13.668207,100.634855", "Sender");});
    //callbackTester(function () { CreateNewJob("S-002", "S-002-6", "13.669110,100.625235", "13.665659,100.621922", "Sender");});
    //callbackTester(function () { CreateNewJob("B-003", "B-003-1", "18.263412,99.466594", "19.908531,99.043477", "Bringer");});
    //callbackTester(function () { CreateNewJob("B-003", "B-003-2", "19.908531,99.043477", "18.263412,99.466594", "Bringer");});
    //callbackTester(function () { CreateNewJob("S-003", "S-003-1", "19.859142,99.047457", "19.423997,98.974606", "Sender");});
    //callbackTester(function () { CreateNewJob("S-003", "S-003-2", "19.426350,98.976043", "19.436329,98.968118", "Sender");});
    //callbackTester(function () { CreateNewJob("S-003", "S-003-3", "18.912912,98.945685", "18.928151,98.940105", "Sender");});
    //callbackTester(function () { CreateNewJob("S-003", "S-003-4", "18.932063,98.940475", "18.922446,98.942086", "Sender");});
    //callbackTester(function () { CreateNewJob("B-004", "B-004-1", "13.738982,100.511956", "13.744122,100.530566", "Bringer");});
    //callbackTester(function () { CreateNewJob("B-004", "B-004-2", "13.745894,100.500845", "13.743956,100.543057", "Bringer");});
    //callbackTester(function () { CreateNewJob("S-004", "S-004-1", "13.749815,100.515095", "13.748141,100.518513", "Sender");});
    //callbackTester(function () { CreateNewJob("S-004", "S-004-2", "13.748497,100.518228", "13.749497,100.515424", "Sender");});
    //callbackTester(function () { CreateNewJob("S-004", "S-004-3", "13.754281,100.528596", "13.755457,100.523741", "Sender");});
    //callbackTester(function () { CreateNewJob("B-005", "B-005-1", "13.692902,100.545719", "14.103046,99.226377", "Bringer");});
    //callbackTester(function () { CreateNewJob("B-005", "B-005-2", "13.695674,100.542383", "12.477164,99.895049", "Bringer");});
    //callbackTester(function () { CreateNewJob("S-005", "S-005-1", "13.699170,100.542181", "14.017038,99.543162", "Sender");});
    //callbackTester(function () { CreateNewJob("S-005", "S-005-2", "13.699170,100.542181", "13.979690,99.634574", "Sender");});
    //callbackTester(function () { CreateNewJob("S-005", "S-005-3", "13.699170,100.542181", "13.762048,100.253972", "Sender");});
    //callbackTester(function () { CreateNewJob("S-005", "S-005-4", "13.699170,100.542181", "12.966286,99.899201", "Sender");});
    //callbackTester(function () { CreateNewJob("S-005", "S-005-5", "13.699170,100.542181", "13.064633,99.948188", "Sender");});
    //callbackTester(function () { CreateNewJob("S-005", "S-005-6", "13.699170,100.542181", "12.741396,99.944541", "Sender");});

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
    //directionsService.route({
    //    origin: originPoint,
    //    destination: destinationPoint,
    //    travelMode: google.maps.TravelMode.DRIVING
    //}, function (response, status) {
    //    if (status === 'OK') {
    //         if (type == 'Bringer') {
    //             AddBringerJOb(ID, originPoint, destinationPoint, jobID);
    //         }
    //         else if ((type == 'Sender')) {
    //             AddSenderJOb(ID, originPoint, destinationPoint, jobID);

    //         }
    //        directionsDisplay.setDirections(response);

    //    } else {
    //        window.alert('Directions request failed due to ' + status);
    //    }
    //});


    CreateNewJob(ID, jobID, originPoint, destinationPoint, type);

    //alert("Calculate completed for " + type + " of " + jobID);
}

function showSteps(directionResult, markerArray, stepDisplay, map, routeName, type, ID, jobID) {
    var stepPointLat = [];
    var stepPointLng = [];
    var bringerData = [];
    var senderData = [];
    var j = 0;
    var pointCount = 0;
    document.getElementById(routeName).innerHTML += "<br />";

    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {

        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        var dist = myRoute.steps[i].distance.value / myRoute.steps[i].lat_lngs.length

        for (var j = 0; j < myRoute.steps[i].lat_lngs.length; j++) {

            if (type == 'Bringer') {

                bringerData[j] = {
                    "userid": ID,
                    "jobid": jobID,
                    "legsno": i,
                    "pointseq": j,
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

            }
            else if ((type == 'Sender')) {
                senderData[j] = {
                    "userid": ID,
                    "jobid": jobID,
                    "legsno": i,
                    "pointseq": j,
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

            }
        }

        if (type == 'Bringer') {
            AddBringerJobDetail(bringerData);

        }
        else if ((type == 'Sender')) {
            AddSenderJobDetail(senderData);

        }



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
function AddBringerJOb(BringerID, StartPoint, StopPoint, JobID) {
    //alert("AddBringerJOb");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:1337/BringerJob";
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
            "BringerID": BringerID,
            "StartPoint": StartPoint,
            "StopPoint": StopPoint,
            "Status": "ACTIVE",
            "ItemCount": 0,
            "JobID": JobID,
            "JobDate": "20170800000000",
            "JobDueDate": "20170800000000"
        });
    var data = JSON.stringify(bringerData);
    xhr.send(data);
}

function AddBringerJobDetail(bringerData) {
    //alert("Add BringerJob Detail");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:1337/BringerJobDetail";

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

function AddSenderJOb(SenderID, StartPoint, StopPoint, JobID) {
    alert("AddSenderJOb");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:1337/SenderJob";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    //var data = JSON.stringify({ "email": "hey@mail.com", "password": "101010" });
    var data = JSON.stringify({ "SenderID": SenderID, "StartPoint": StartPoint, "StopPoint": StopPoint, "Status": "ACTIVE", "ItemCount": 0, "JobID": JobID, "JobDate": "20170800000000", "JobDueDate": "20170800000000" });
    xhr.send(data);
}


function AddSenderJobDetail(senderData) {
    //alert("Add BringerJob Detail");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:1337/SenderJobDetail";

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

    var theUrl = 'http://localhost:1337/getJobMactching2/' + BringerID;
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
    var url = "http://localhost:1337/SenderJobDetail";
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify({});
    xhr.send(data);

    url = "http://localhost:1337/BringerJobDetail";
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(data);

    url = "http://localhost:1337/BringerJOb";
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(data);

    url = "http://localhost:1337/SenderJOb";
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

    var theUrl = 'http://localhost:1337/SenderJOb/' + SenderID;
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