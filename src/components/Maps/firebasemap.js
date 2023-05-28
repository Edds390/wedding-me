
function initFirebase(heatmap, userMarkers) {

    
  
    // Listen for userMarkers and add them to the heatmap.
    userMarkers.on('child_added',
      function(snapshot) {
        // Get that click from firebase.
        var newPosition = snapshot.val();
        var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
        var elapsedMs = Date.now() - newPosition.timestamp;
  
        // Add the point to the heatmap.
        heatmap.getData().push(point);
        }
    );
  
    // Remove old data from the heatmap when a point is removed from firebase.
    userMarkers.on('child_removed', function(snapshot, prevChildKey) {
      var heatmapData = heatmap.getData();
      var i = 0;
      while (snapshot.val().lat != heatmapData.getAt(i).lat()
        || snapshot.val().lng != heatmapData.getAt(i).lng()) {
        i++;
      }
      heatmapData.removeAt(i);
    });
}