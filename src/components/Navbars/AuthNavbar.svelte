<script>
  import { link } from "svelte-routing";
  import { getAuth, signOut } from "firebase/auth";

  let user;

  // core components
  let navbarOpen = false;

  const auth = getAuth();

  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/auth/login";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  auth.onAuthStateChanged((fbuser) => {
    if (fbuser) user = fbuser;
  });
</script>

<nav
  class="absolute top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-3 navbar-expand-lg"
>
  <div class="container flex items-center justify-between px-4 mx-auto">
    <div
      class="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start"
    >
      <a
        use:link
        class="inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase text-blueGray-500 whitespace-nowrap"
        href="/"
      >
        Back to Home
      </a>
    </div>
    {#if user}
      <ul class="flex flex-col list-none lg:flex-row lg:ml-auto">
        <li class="flex items-center">
          <a
            class="px-4 py-2 mb-3 ml-3 text-xs font-bold uppercase transition-all duration-150 ease-linear outline-none text-blueGray-700 active:bg-blueGray-50 hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0 whitespace-nowrap"
            href="/map"
          >
            Map
          </a>
        </li>

        <li class="flex items-center">
          <a
            class="px-4 py-2 mb-3 ml-3 text-xs font-bold uppercase transition-all duration-150 ease-linear outline-none text-blueGray-700 active:bg-blueGray-50 hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0 whitespace-nowrap"
            href="/wishing-well"
          >
            Wishing Well
          </a>
        </li>
        <li class="flex items-center">
          <button
            class="px-4 py-2 mb-3 ml-3 text-xs font-bold uppercase transition-all duration-150 ease-linear bg-white shadow outline-none text-blueGray-700 active:bg-blueGray-50 hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0 whitespace-nowrap"
            type="button"
            on:click={logOut}
          >
            Sign out
          </button>
        </li>
      </ul>
    {/if}
  </div>
</nav>
