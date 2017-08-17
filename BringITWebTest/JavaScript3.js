
function initMap() {

    //console.error("error message");
    var directionsService = new google.maps.DirectionsService;

    // Create a map and center it on Manhattan.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 13.661146, lng: 100.662308 }
    });
    var originPoint = new google.maps.LatLng(13.423592, 101.000151);
    var destinationPoint = new google.maps.LatLng(13.168443, 100.931649);

    var originPoint2 = new google.maps.LatLng(13.335172, 100.970869);
    var destinationPoint2 = new google.maps.LatLng(13.280875, 100.936901);

    //var routes = [{ origin: originPoint, destination: destinationPoint }, { origin: originPoint2, destination: destinationPoint2 }];
    var routes = [{ origin: new google.maps.LatLng(13.423592, 101.000151), destination: new google.maps.LatLng(13.168443, 100.931649) }];

    var rendererOptions = {
        preserveViewport: true,         
        suppressMarkers:true
        //routeIndex:i
    };

    var directionsService = new google.maps.DirectionsService();
    
    routes.forEach(function(route){
        var request = {
            origin: route.origin,
            destination: route.destination,
            travelMode: google.maps.TravelMode.DRIVING
        };

        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        directionsDisplay.setMap(map);

        directionsService.route(request, function(result, status) {
            //console.log(result);

            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    });
}