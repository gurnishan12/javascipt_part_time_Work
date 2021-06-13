function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: { lat: 20.0124653, lng: 64.44977796 }, // Australia.
    });
    //modifying code
    infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          z = pos.lat
          y = pos.lng
          var total_before = z + ","+ y
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
              
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map,
      panel: document.getElementById("right-panel"),
    });
    directionsRenderer.addListener("directions_changed", () => {
      computeTotalDistance(directionsRenderer.getDirections());
    });
    var z = "30.5273456";
    var y = "75.866098"; 
    var total = z + ","+ y
    
    displayRoute(
      total_before,
      "30.7350626, 76.6934887",
      directionsService,
      directionsRenderer
    );
        });
      };
    });
    
  }
  
  
  function displayRoute(origin, destination, service, display) {
    service.route(
      {
        origin: origin ,
        destination: destination,
        waypoints: [
          { location: "28.5272803, 77.0688996" },
          
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true,
      },
      (result, status) => {
        if (status === "OK" && result) {
          display.setDirections(result);
        } else {
          alert("Could not display directions due to: " + status);
        }
      }
    );
  }
  
  function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
  
    if (!myroute) {
      return;
    }
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
  }