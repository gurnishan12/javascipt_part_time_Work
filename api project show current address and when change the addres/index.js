// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat:26.1101477, lng: 77.2629466 },
    zoom: 6,
  });

  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        //  const myLatLng = pos;
        //   alert(myLatLng);
        //   infoWindow.setPosition(pos);
        //   infoWindow.setContent("Location found.");
        //   infoWindow.open(map);
        //   map.setCenter(pos);
        // var map1 = new google.maps.Map(document.getElementById('map_canvas'), {
        //     zoom: 12,
        //     center: new google.maps.LatLng(28.47399, 77.026489),
        //     mapTypeId: google.maps.MapTypeId.ROADMAP
        // });
        // creates a draggable marker to the given coords
        var vMarker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            draggable: true
        });
        // adds a listener to the marker
        // gets the coords when drag event ends
        // then updates the input with the new coords
        google.maps.event.addListener(vMarker, 'dragend', function (evt) {
            // $("#txtLat").val(evt.latLng.lat().toFixed(6));
            // $("#txtLng").val(evt.latLng.lng().toFixed(6));
            map.panTo(evt.latLng);
        });
        // centers the map on markers coords
        map.setCenter(vMarker.position);
        // adds the marker on the map
        vMarker.setMap(map);

            //converting the latt and long to the address here 
            var latlng = new google.maps.LatLng(pos.lat, pos.lng);
            // This is making the Geocode request
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
                if (status !== google.maps.GeocoderStatus.OK) {
                    alert(status);
                }
                // This is checking to see if the Geoeode Status is OK before proceeding
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results);
                    var address = (results[0].formatted_address);
                    alert(address);
                    var nameArr = address.split(',');   
                    //alert(nameArr[nameArr.length - 1]); 
                    document.getElementById('current').value = address;
                }
            });
            google.maps.event.addListener(vMarker, 'dragend', function (evt) {
              
                var latlng2= new google.maps.LatLng(evt.latLng.lat().toFixed(3),evt.latLng.lng().toFixed(3));
                // This is making the Geocode request
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng2 },  (results2, status2) =>{
                    if (status2 !== google.maps.GeocoderStatus.OK) {
                        alert(status2);
                    }
                    // This is checking to see if the Geoeode Status is OK before proceeding
                    if (status2 == google.maps.GeocoderStatus.OK) {
                        
                        var address2 = (results2[0].formatted_address);
                        // alert(address2);
                        document.getElementById('current').value = address2;
                        //getting the fragable adress value here
////////////////////////////////////////////////////////////
                    }
                });
            });
            
            google.maps.event.addListener(vMarker, 'dragstart', function (evt) {
                document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
            });
           
            
            
        
        },
       
        
        
      );
    
  });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
// function initMap() {
// var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 1,
//     center: new google.maps.LatLng(35.137879, -82.836914),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
// });

// var myMarker = new google.maps.Marker({
//     position: new google.maps.LatLng(47.651968, 9.478485),
//     draggable: true
// });

// google.maps.event.addListener(myMarker, 'dragend', function (evt) {
//     document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
// });

// google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
//     document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
// });

// map.setCenter(myMarker.position);
// myMarker.setMap(map);
// }