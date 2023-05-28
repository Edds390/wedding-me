export const buildInfoWindowDiv = (
  name,
  description,
  userName,
  timestamp,
  handleDelete
) => {
  const date = new Date(timestamp).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const infoDiv = document.createElement("div");
  const nameP = document.createElement("h2");
  nameP.textContent = name;
  const descP = document.createElement("p");
  descP.textContent = description;
  const detailsP = document.createElement("p");
  detailsP.textContent = `Created by ${userName} on ${date}`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = handleDelete;

  infoDiv.appendChild(nameP);
  infoDiv.appendChild(descP);
  infoDiv.appendChild(detailsP);
  infoDiv.appendChild(deleteButton);

  return infoDiv;
};

export const paintUserMarkers = (map, google, userMarkers, infoWindow) => {
  return userMarkers.reduce((acc, userMarker) => {
    let marker = new google.maps.Marker({
      label: {
        color: "white",
        fontSize: "10px",
        text: userMarker?.displayName[0] + userMarker?.displayName[1],
      },
      position: new google.maps.LatLng(userMarker.lat, userMarker.lng),
      map: map,
      animation: google.maps.Animation.DROP,
    });

    const listenerHandle = google.maps.event.addListener(
      marker,
      "click",
      () => {
        infoWindow?.close();
        infoWindow.open(map, marker);
        infoWindow.setContent(
          buildInfoWindowDiv(
            userMarker.name,
            userMarker.description,
            userMarker.displayName,
            userMarker.timestamp,
            userMarker.handleDelete
          )
        );
      }
    );

    return { ...acc, [userMarker.mid]: { marker, listenerHandle } };
  }, {});
};

export const initializeCustomMarkers = (map, google, infoWindow) => {
  const markers = [
    {
      marker: new google.maps.Marker({
        icon: {
          url: "../assets/img/wedding.svg",
          scaledSize: new google.maps.Size(30, 30),
        },
        position: new google.maps.LatLng(
          35.465664046491725,
          138.81299603342313
        ),
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Wedding venue",
      }),

      content:
        '<div class="info-window-content"><h2>Fuji (Wedding venue)</h2>' +
        "<p><b>Address:</b> Japan, 〒403-0032 Yamanashi, Fujiyoshida, Kamiyoshidahigashi, 9-chome−１−18</p></div>" +
        '<a target="_blank" href="https://goo.gl/maps/4NkogMmsqriVnKgB9?coh=178572&entry=tt"><b>View on Google Maps</b></a>',
    },

    {
      marker: new google.maps.Marker({
        label: { color: "white", fontSize: "10px", text: "JB" },
        position: new google.maps.LatLng(35.48512034809177, 138.77879168598304),
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Stay",
      }),

      content:
        '<div class="info-window-content"><h2>Glamp</h2>' +
        "<p>will be staying here until August 7th</div>" +
        '<a target="_blank" href="https://goo.gl/maps/E9fYfJooadQtvo2AA?coh=178572&entry=tt"><b>View on Google Maps</b></a>',
    },
  ];

  markers.forEach((marker) => {
    google.maps.event.addListener(marker.marker, "click", () => {
      infoWindow?.close();
      infoWindow.setContent(marker.content);
      infoWindow.open(map, marker.marker);
    });
  });
};

export const paintCreateMarkerButton = (map, google, newMarker, setMarker) => {
  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement("div");
  const controlButton = document.createElement("button");

  // Set CSS for the control.
  controlButton.style.backgroundColor = "#fff";
  controlButton.style.border = "2px solid #fff";
  controlButton.style.borderRadius = "3px";
  controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlButton.style.color = "rgb(25,25,25)";
  controlButton.style.cursor = "pointer";
  controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
  controlButton.style.fontSize = "16px";
  controlButton.style.lineHeight = "38px";
  controlButton.style.margin = "8px 0 22px";
  controlButton.style.padding = "0 5px";
  controlButton.style.textAlign = "center";
  controlButton.textContent = "Add your Place";
  controlButton.title = "Click to recenter the map";
  controlButton.type = "button";

  controlButton.addEventListener("click", () => {
    if (newMarker) {
      newMarker.setMap(null);
    }
    setMarker(
      map,
      new google.maps.Marker({
        position: new google.maps.LatLng(
          map.data.map.center.lat(),
          map.data.map.center.lng()
        ),
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true,
      })
    );
  });

  centerControlDiv.appendChild(controlButton);

  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
    centerControlDiv
  );
};
