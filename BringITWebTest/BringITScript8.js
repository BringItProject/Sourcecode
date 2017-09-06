function CreateNewJob(userId, jobId, startPoint, stopPoint, type)
{
    var directionsService = new google.maps.DirectionsService;
    directionsService.route({
        origin: startPoint,
        destination: stopPoint,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === 'OK') {
            AddJOb(userId, startPoint, stopPoint, jobId, type);
            AddJobDetail(type, response, jobId, userId);
            //AddJobDetailElastic(type, response, jobId, userId, startPoint, stopPoint);
        }
         else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    alert("Calculate completed for " + type + " of " + jobId);
}

function callbackTester(callback)
{
    callback();
}
function AddJOb(userId, startPoint, stopPoint, jobId,type) {
    //alert("AddBringerJOb");
    var xhr = new XMLHttpRequest();
    if (type == 'Bringer') {
        var url = "http://localhost:1337/BringerJob";
    }
    else if ((type == 'Sender')) {
        var url = "http://localhost:1337/SenderJob";
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    var Data = (
        {
            "userid": userId,
            "startpoint": startPoint,
            "stoppoint": stopPoint,
            "status": "ACTIVE",
            "Itemcount": 0,
            "jobid": jobId,
            "jobdate": "20170800000000",
            "jobduedate": "20170800000000"
        });
    var data = JSON.stringify(Data);
    xhr.send(data);
}

function AddJobDetail(type, directionResult, jobId,userId) {
    var stepPointLat = [];
    var stepPointLng = [];
    var data = [];
    var senderData = [];
    var j = 0;
    var pointCount = 0;
    var pointTotalCount = 0;
    var totaldist = 0;
    var pointdist = 0;
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
  
        pointdist = 0;
        pointCount = 0;
        data = [];
        var dist = myRoute.steps[i].distance.value / myRoute.steps[i].lat_lngs.length
        for (var j = 0; j < myRoute.steps[i].lat_lngs.length; j++) {
            //if ((totaldist > 500) || (j == myRoute.steps[i].lat_lngs.length))
            if ((pointdist > 500)||(j == myRoute.steps[i].lat_lngs.length-1)||(i==0&&j==0))
            {
                data[pointCount] = {
                    "userid": userId,
                    "jobid": jobId,
                    "legsno": i,
                    "pointseq": pointTotalCount,
                    "distance": pointdist + dist,
                    //"totaldist": totaldist, 
                    "loc": {
                        "type": "Point",
                        "coordinates": [
                            myRoute.steps[i].lat_lngs[j].lng(),
                            myRoute.steps[i].lat_lngs[j].lat()
                        ]
                    }
                };
                pointCount++;
                pointTotalCount++;
                pointdist = 0;
            }
            else 
            {
                pointdist = pointdist + dist;
            }
            totaldist = totaldist + pointdist;
        }
        //console(data.length);
        var xhr = new XMLHttpRequest();
        if (type == 'Bringer') {
            var url = "http://localhost:1337/BringerJobDetail";

        }
        else if ((type == 'Sender')) {
            var url = "http://localhost:1337/SenderJobDetail";
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(data));
    }
}

function AddJobDetailElastic(type, directionResult, jobId, userId,startpoing,stoppoint) {
    var stepPointLat = [];
    var stepPointLng = [];
    var data = [{
        jobid: null,
        userid: null,
        startpoing: null,
        stoppoint:null,
        location: []
    }];
    var senderData = [];
    var j = 0;
    var pointCount = 0;
    var pointTotalCount = 0;
    var totaldist = 0;
    var pointdist = 0;
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {

        pointdist = 0;
        pointCount = 0;
        //data = [];
        var dist = myRoute.steps[i].distance.value / myRoute.steps[i].lat_lngs.length
        for (var j = 0; j < myRoute.steps[i].lat_lngs.length; j++) {
            //if ((totaldist > 500) || (j == myRoute.steps[i].lat_lngs.length))
            if ((pointdist > 500) || (j == myRoute.steps[i].lat_lngs.length - 1) || (i == 0 && j == 0)) {
                //data[pointCount] = {
                //    "userid": userId,
                //    "jobid": jobId,
                //    "legsno": i,
                //    "pointseq": pointTotalCount,
                //    "distance": pointdist + dist,
                //    //"totaldist": totaldist, 
                //    "location" : {
                //        "type": "Point",
                //        "coordinates": [
                //            myRoute.steps[i].lat_lngs[j].lng(),
                //            myRoute.steps[i].lat_lngs[j].lat()
                //        ]
                //    }
                //};

                data[0].location[pointTotalCount] = {
                    "lat": myRoute.steps[i].lat_lngs[j].lat(),
                    "lon": myRoute.steps[i].lat_lngs[j].lng()
                }
                pointCount++;
                pointTotalCount++;
                pointdist = 0;
            }
            else {
                pointdist = pointdist + dist;
            }
            totaldist = totaldist + pointdist;
        }
    }
    data[0].userid = userId;
    data[0].jobid = jobId;
    data[0].startpoing = startpoing;
    data[0].stoppoint = stoppoint;



        //console(data.length);
        var xhr = new XMLHttpRequest();
        if (type == 'Bringer') {
            var url = "http://localhost:1337/BringerJobDetail";

        }
        else if ((type == 'Sender')) {
            var url = "http://localhost:1337/SenderJobDetail";
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(data));
    
}
