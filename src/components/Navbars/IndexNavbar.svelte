<script>
  import { ref, get } from "firebase/database";
  import { signOut } from "firebase/auth";
  import { auth, db } from "../../services/firebase";

  let navbarOpen = false;
  let user;

  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }

  export let scrollY;
  export let reframeY;

  const logOut = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/auth/login";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  auth.onAuthStateChanged((u) => {
    user = u;
    if (u) {
      //   prepopulate with existing data
      get(ref(db, "users/" + user.uid))
        .then((data) => {
          if (data?.val()?.hasAccess) {
            hasAccess = true;
          }
        })
        .catch(() => {
          err = "error validating login.";
        });
    }
    console.log(user);
  });
</script>

<nav
  class={`z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white transition duration-1000 ease-in-out ${
    scrollY > reframeY ? "top-0 fixed shadow" : "relative"
  }`}
>
  <div
    class="container flex flex-wrap items-center justify-between px-4 mx-auto"
  >
    <div
      class="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start"
    >
      <button
        class="block px-3 py-1 text-xl leading-none bg-transparent outline-none cursor-pointer lg:hidden focus:outline-none"
        type="button"
        on:click={setNavbarOpen}
      >
        <i class="fas fa-bars" />
      </button>
    </div>
    <div
      class="lg:flex flex-grow items-center {navbarOpen ? 'block' : 'hidden'}"
      id="example-navbar-warning"
    >
      <ul class="flex flex-col list-none lg:flex-row lg:ml-auto">
        <li class="flex items-center">
          <a
            class="flex items-center px-3 py-2 text-xs font-bold uppercase hover:text-blueGray-500 text-blueGray-700"
            href="mailto:me.wedding.Fuji@gmail.com"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#94a4b8"
              ><path
                d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"
              /></svg
            >
            <span class="inline-block ml-2 lg:hidden">Email</span>
          </a>
          <a
            class="flex items-center px-3 py-2 text-xs font-bold uppercase hover:text-blueGray-500 text-blueGray-700"
            href="/"
          >
            Home
          </a>
          <a
            class="flex items-center px-3 py-2 text-xs font-bold uppercase hover:text-blueGray-500 text-blueGray-700"
            href="/map"
          >
            Map
          </a>
          <a
            class="flex items-center px-3 py-2 text-xs font-bold uppercase hover:text-blueGray-500 text-blueGray-700"
            href="/wishing-well"
          >
            Wishing Well
          </a>
          {#if user}
            <button
              class="flex items-center px-3 py-2 text-xs font-bold uppercase hover:text-blueGray-500 text-blueGray-700"
              type="button"
              on:click={logOut}
            >
              Sign out
            </button>
          {:else}
            <a
              class="flex items-center px-3 py-2 text-xs font-bold uppercase hover:text-blueGray-500 text-blueGray-700"
              href="/auth/login"
            >
              Login
            </a>
          {/if}
        </li>

        <li class="flex items-center">
          <button
            class="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear shadow outline-none bg-bluePastel-500 active:bg-blueGray-300 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0"
            type="button"
            on:click={() => (window.location.href = "/auth/rsvp")}
          >
            RSVP
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
