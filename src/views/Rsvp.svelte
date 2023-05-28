<script>
  import { ref, set, get } from "firebase/database";

  import LoginErrorAlert from "../components/Alerts/LoginErrorAlert.svelte";
  import { auth, db } from "../services/firebase";

  let err;
  let loading = true;
  let numAttendees = 1;
  let formMap = {};

  const onDelete = (iDelete) => {
    formMap = {};
    Array.from(Array(numAttendees)).forEach((_, i) => {
      const j = i > iDelete ? 1 : 0;
      if (i !== iDelete) {
        formMap[`name-${i - j}`] = document.getElementById(`name-${i}`).value;
        formMap[`diet-${i - j}`] = document.getElementById(`diet-${i}`).value;
      }
    });
    numAttendees -= 1;
    debugger;
  };

  let user;

  auth.onAuthStateChanged((u) => {
    user = u;
    if (u) {
      //   prepopulate with existing data
      get(ref(db, "users/" + user.uid))
        .then((data) => {
          if (data?.val()?.attendees) {
            let respAttendees = data?.val()?.attendees;
            formMap = respAttendees;
            numAttendees = Math.max(Object.keys(respAttendees).length / 2, 1);
          }
          loading = false;
        })
        .catch(() => {
          err = "Could not retrieving your RSVP info, try refreshing.";
        });
    }
  });

  $: {
    // user === null is explicitly called instead of !user because we need firebase to decide what the user is, and not us, so we dont initialise user up there.
    if (user === null) {
      window.location.href = "/auth/register";
    }
  }

  const validateForm = (submitMap) => {
    for (let [k, v] of Object.entries(submitMap)) {
      if (k.startsWith("name-") && !v) {
        return false;
      }
    }
    return true;
  };

  const onSubmit = () => {
    const submitMap = {};
    Array.from(Array(numAttendees)).forEach((_, i) => {
      submitMap[`name-${i}`] = document.getElementById(`name-${i}`).value;
      submitMap[`diet-${i}`] = document.getElementById(`diet-${i}`).value;
    });

    if (!validateForm(submitMap)) {
      err = "Name fields not filled!";
      return;
    }
    if (!user) {
      err = "Not logged in!";
      return;
    }
    set(ref(db, "users/" + user.uid), {
      displayName: user.displayName,
      email: user.email,
      attendees: submitMap,
    })
      .then(() => {
        window.location.href = "/auth/success";
      })
      .catch((error) => {
        debugger;
        err = "Could not RSVP; please make sure you've filled out all names.";
      });
  };
</script>

{#if user}
  <div class="container h-full px-4 mx-auto">
    <div class="flex items-center content-center justify-center h-full">
      <div class="w-full px-4 lg:w-10/12">
        <div
          class="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-50"
        >
          <div class="px-6 py-6 mb-0 rounded-t">
            <form>
              {#each Array(numAttendees) as _, i}
                <div class="flex flex-col sm:flex-row">
                  <div class="relative w-full mb-3 mr-3 sm:w-1/2">
                    <label
                      class="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      for="grid-name"
                    >
                      Name
                    </label>
                    <input
                      id={`name-${i}`}
                      type="email"
                      class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Name"
                      value={formMap[`name-${i}`] ?? ""}
                      disabled={loading}
                    />
                  </div>

                  <div class="relative w-full mb-3 sm:w-1/2">
                    <label
                      class="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      for="grid-email"
                    >
                      Dietary restrictions
                    </label>
                    <input
                      id={`diet-${i}`}
                      type="email"
                      class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Dietary restrictions/allergies"
                      value={formMap[`diet-${i}`] ?? ""}
                      disabled={loading}
                    />
                  </div>
                  {#if numAttendees > 1}
                    <button
                      class="relative w-5 h-5 m-2 font-normal top-5"
                      type="button"
                      on:click={() => onDelete(i)}
                    >
                      <div
                        class="h-0.5 w-4 border-blueGray-400 border-b-2 relative top-1"
                      /></button
                    >
                  {/if}
                </div>
              {/each}

              {#if err}
                <LoginErrorAlert message={err} />
              {/if}

              <div class="mt-6 text-center">
                <button
                  class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear shadow outline-none bg-bluePastel-300 active:bg-bluePastel-500 hover:shadow-lg focus:outline-none"
                  type="button"
                  disabled={loading}
                  on:click|preventDefault={() => {
                    if (numAttendees < 10) {
                      numAttendees += 1;
                    } else {
                      err =
                        "Please contact us if you're inviting more than 10 people";
                    }
                  }}
                >
                  Add another attendee
                </button>
                <button
                  class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear shadow outline-none bg-bluePastel-500 active:bg-bluePastel-500 hover:shadow-lg focus:outline-none"
                  type="button"
                  disabled={loading}
                  on:click={() => onSubmit()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
