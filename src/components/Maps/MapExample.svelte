<script>
  import { onMount } from "svelte";
  import {
    buildInfoWindowDiv,
    initializeCustomMarkers,
    paintCreateMarkerButton,
    paintUserMarkers,
  } from "./helpers";
  import { auth, db } from "../../services/firebase";
  import { ref, get, push, remove, onValue } from "firebase/database";

  import NewMarkerForm from "./NewMarkerForm.svelte";

  const MARKERS_LIMIT = 10;

  let map;
  let newMarker;
  let shouldShowSubmitForm;
  let infoWindow;
  let user;
  let err;
  let numUserMarkers;
  let userMarkerReferences;

  let google = window.google;
  infoWindow = new google.maps.InfoWindow();

  auth.onAuthStateChanged((u) => {
    user = u;
  });

  const setMarker = (map, marker) => {
    if (numUserMarkers > MARKERS_LIMIT) {
      newMarker?.setMap(null);
      newMarker = null;
      return;
    }
    shouldShowSubmitForm = true;
    newMarker?.setMap(null);
    newMarker = marker;

    infoWindow?.close();
  };

  const handleSubmit = (name, description) => {
    const timestamp = Date.now();
    shouldShowSubmitForm = false;

    const data = {
      userId: user.uid,
      lat: newMarker.position.lat(),
      lng: newMarker.position.lng(),
      displayName: user.displayName,
      name,
      description,
      timestamp,
    };

    push(ref(db, "markers/" + user.uid), data)
      .then((response) => {
        return response;
      })
      .then((resp) => {
        infoWindow?.close();
        infoWindow?.setContent(
          buildInfoWindowDiv(
            name,
            description,
            user.displayName,
            timestamp,
            () => {
              newMarker?.setMap(null);
              newMarker = null;
              infoWindow?.close();
              remove(ref(db, `markers/${user.uid}/${resp.key}`)).catch((e) => {
                console.log(e);
              });
            }
          )
        );
        infoWindow.open(map, newMarker);
      })
      .catch((error) => {
        console.log(error);
        err = "Could not add marker.";
      });
  };

  var markersRef = ref(db, "markers");

  // Listen for clicks and add them to the heatmap.
  onValue(markersRef, function (snapshot) {
    // Get that click from firebase.
    var userToMarkers = snapshot.val();
    if (userToMarkers) {
      numUserMarkers = Object.keys(userToMarkers?.[user.uid] ?? {}).length;
      // clear user markers if already exists
      userMarkerReferences &&
        Object.keys(userMarkerReferences).forEach((mid) => {
          debugger;
          let userMarkerRef = userMarkerReferences[mid];
          userMarkerRef.marker.setMap(null);
          userMarkerRef.marker = null;
          google.maps.event.removeListener(userMarkerRef.listenerHandle);
        });
      const usersMarkers = Object.keys(userToMarkers).reduce(
        (accumulator, currentValue) => {
          let userMarkers = Object.keys(userToMarkers[currentValue]).map(
            (mid) => {
              let currentMarker = userToMarkers[currentValue][mid];
              return {
                ...currentMarker,
                mid,
                handleDelete:
                  user.uid === currentMarker.userId
                    ? () => {
                        remove(ref(db, `markers/${user.uid}/${mid}`))
                          .then((response) => {
                            debugger;
                            return console.log(response);
                          })
                          .catch((e) => console.log(e));
                      }
                    : null,
              };
            }
          );
          return [...accumulator, ...userMarkers];
        },
        []
      );

      userMarkerReferences = paintUserMarkers(
        map,
        google,
        usersMarkers,
        infoWindow
      );
    }
  });

  // Remove old data from the heatmap when a point is removed from firebase.
  // markers.onValue("child_removed", function (snapshot, prevChildKey) {
  //   debugger;
  // });

  // init google maps
  onMount(async () => {
    map = document.getElementById("map-canvas");
    let lat = map.getAttribute("data-lat");
    let lng = map.getAttribute("data-lng");

    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      mapTypeControl: true,
      zoom: 12,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "##78A2CC" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    // Reference to the userMarkers in Firebase.
    const userMarkers = [];

    get(ref(db, "userMarkers")).then((data) => {
      userMarkers = data?.val() ?? [];
    });

    map.addListener("click", function (e) {
      newMarker &&
        setMarker(
          map,
          new google.maps.Marker({
            position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
            map: map,
            animation: google.maps.Animation.DROP,
            draggable: true,
          })
        );
    });

    // MARKERS
    initializeCustomMarkers(map, google, infoWindow);
    paintUserMarkers(map, google, userMarkers);
    paintCreateMarkerButton(map, google, newMarker, setMarker);
  });
</script>

<div>
  <div
    id="map-canvas"
    class="relative w-full rounded h-600-px"
    data-lat="35.465664046491725"
    data-lng="138.81299603342313"
  />
  {#if numUserMarkers > MARKERS_LIMIT}
    <div class="absolute w-full bottom-44">
      <div
        class="absolute grid w-full grid-cols-2 gap-2 p-2 pt-3 bg-blueGray-100 sm:w-1/2"
      >
        <p>Please delete some markers first before adding more.</p>
      </div>
    </div>
  {/if}
  {#if shouldShowSubmitForm}
    <NewMarkerForm
      marker={newMarker}
      onCancel={() => {
        newMarker?.setMap(null);
        newMarker = null;
      }}
      onSubmit={handleSubmit}
    />
  {/if}
</div>
