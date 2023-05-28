<script>
  // core components
  import { ref, get } from "firebase/database";
  import { auth, db } from "../services/firebase";
  import MapExample from "components/Maps/MapExample.svelte";
  import IndexNavbar from "components/Navbars/IndexNavbar.svelte";

  let user;
  let err;
  let loading = true;
  let showNoAccess = true;

  auth.onAuthStateChanged((u) => {
    user = u;
    if (u) {
      //   prepopulate with existing data
      get(ref(db, "users/" + user.uid))
        .then((data) => {
          showNoAccess = false;
          loading = false;
        })
        .catch(() => {
          loading = false;
          err = "Could not retrieving your RSVP info, try refreshing.";
        });
    }
  });

  $: innerHeight = 0;
  $: heightPadder = `height: ${innerHeight}px;`;
</script>

<svelte:window bind:innerHeight />

<IndexNavbar scrollY={1} reframeY={0} />

<div
  class="relative flex items-center content-center justify-center pt-32 bg-blueGray-200"
  style={heightPadder}
>
  <div
    class="absolute top-0 w-full h-full bg-center bg-cover"
    style="height: 75vh;
    background-image: url(https://images.unsplash.com/photo-1576675466684-456bcdeccfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80);
  "
  >
    <span
      id="blackOverlay"
      class="absolute w-full h-full bg-black opacity-75"
    />
  </div>
  <div
    class="absolute left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px"
    style="transform: translateZ(0); bottom: 25%;"
  >
    <svg
      class="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0"
    >
      <polygon
        class="fill-current text-blueGray-200"
        points="2560 0 2560 100 0 100"
      />
    </svg>
  </div>
  <div class="container relative top-260-px">
    <div class="flex flex-wrap items-center">
      <div class="w-full">
        <div class="flex flex-wrap">
          <div class="w-full px-4">
            <div class="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
              <div class="pr-12 m-2">
                <h1 class="text-5xl font-semibold text-white">
                  Sharing the moments.
                </h1>
                <p class="mt-4 mb-4 text-lg text-blueGray-200">
                  It doesn't just end with the wedding - we'll be staying in
                  Fuji for our honeymoon. Here are our plans throughout our trip
                  in Fuji.
                </p>
              </div>
            </div>
            {#if showNoAccess}
              <div class="w-full">
                <div class="flex flex-wrap">
                  <div class="w-full px-4">
                    <div
                      class="relative flex flex-col items-center content-center justify-center w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
                    >
                      <p class="mt-4 mb-4 text-2xl text-black">
                        Please log in to view the map
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            {:else}
              <div
                class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
              >
                <MapExample />
              </div>
            {/if}
            <div class="w-full">
              <div class="flex flex-wrap">
                <div class="w-full px-4">
                  <div
                    class="relative flex flex-col items-center content-center justify-center w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg"
                  >
                    <p class="mt-4 mb-4 text-xl text-black">
                      Fuji Points of Interest
                    </p>

                    <table class="my-5 text-left border-collapse shadow-lg">
                      <thead class="text-left bg-bluePastel-300">
                        <tr>
                          <th class="p-4">Place</th>
                          <th class="p-4">Type</th>
                          <th class="p-4">Location</th>
                          <th class="p-4">Url</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="p-4">Fuji</td>
                          <td class="p-4">Wedding Venue</td>
                          <td class="p-4">Fuji</td>
                          <td class="p-4 text-blue-600 underline"
                            ><a
                              href="https://goo.gl/maps/4NkogMmsqriVnKgB9?coh=178572&entry=tt"
                              >https://goo.gl/maps/4NkogMmsqriVnKgB9?coh=178572&entry=tt</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
