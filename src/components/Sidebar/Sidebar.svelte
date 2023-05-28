<script>
  import { link } from "svelte-routing";

  // core components
  import NotificationDropdown from "components/Dropdowns/NotificationDropdown.svelte";
  import UserDropdown from "components/Dropdowns/UserDropdown.svelte";

  let collapseShow = "hidden";

  function toggleCollapseShow(classes) {
    collapseShow = classes;
  }

  export let location;
</script>

<nav
  class="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64"
>
  <div
    class="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap"
  >
    <!-- Toggler -->
    <button
      class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
      type="button"
      on:click={() => toggleCollapseShow("bg-white m-2 py-3 px-6")}
    >
      <i class="fas fa-bars" />
    </button>
    <!-- Brand -->
    <a
      use:link
      class="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
      href="/"
    >
      Notus Svelte
    </a>
    <!-- User -->
    <ul class="flex flex-wrap items-center list-none md:hidden">
      <li class="relative inline-block">
        <NotificationDropdown />
      </li>
      <li class="relative inline-block">
        <UserDropdown />
      </li>
    </ul>
    <!-- Collapse -->
    <div
      class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
    >
      <!-- Collapse header -->
      <div
        class="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-blueGray-200"
      >
        <div class="flex flex-wrap">
          <div class="w-6/12">
            <a
              use:link
              class="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
              href="/"
            >
              Notus Svelte
            </a>
          </div>
          <div class="flex justify-end w-6/12">
            <button
              type="button"
              class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
              on:click={() => toggleCollapseShow("hidden")}
            >
              <i class="fas fa-times" />
            </button>
          </div>
        </div>
      </div>
      <!-- Form -->
      <form class="mt-6 mb-4 md:hidden">
        <div class="pt-0 mb-3">
          <input
            type="text"
            placeholder="Search"
            class="w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border border-0 border-solid rounded shadow-none outline-none border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 focus:outline-none"
          />
        </div>
      </form>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      <!-- Heading -->
      <h6
        class="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500"
      >
        Admin Layout Pages
      </h6>
      <!-- Navigation -->

      <ul class="flex flex-col list-none md:flex-col md:min-w-full">
        <li class="items-center">
          <a
            use:link
            href="/admin/dashboard"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf(
              '/admin/dashboard'
            ) !== -1
              ? 'text-red-500 hover:text-red-600'
              : 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i
              class="fas fa-tv mr-2 text-sm {location.href.indexOf(
                '/admin/dashboard'
              ) !== -1
                ? 'opacity-75'
                : 'text-blueGray-300'}"
            />
            Dashboard
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/settings"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf(
              '/admin/settings'
            ) !== -1
              ? 'text-red-500 hover:text-red-600'
              : 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i
              class="fas fa-tools mr-2 text-sm {location.href.indexOf(
                '/admin/settings'
              ) !== -1
                ? 'opacity-75'
                : 'text-blueGray-300'}"
            />
            Settings
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/tables"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf(
              '/admin/tables'
            ) !== -1
              ? 'text-red-500 hover:text-red-600'
              : 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i
              class="fas fa-table mr-2 text-sm {location.href.indexOf(
                '/admin/tables'
              ) !== -1
                ? 'opacity-75'
                : 'text-blueGray-300'}"
            />
            Tables
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/maps"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf(
              '/admin/maps'
            ) !== -1
              ? 'text-red-500 hover:text-red-600'
              : 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i
              class="fas fa-map-marked mr-2 text-sm {location.href.indexOf(
                '/admin/maps'
              ) !== -1
                ? 'opacity-75'
                : 'text-blueGray-300'}"
            />
            Maps
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      <!-- Heading -->
      <h6
        class="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500"
      >
        Auth Layout Pages
      </h6>
      <!-- Navigation -->

      <ul class="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
        <li class="items-center">
          <a
            use:link
            class="block py-3 text-xs font-bold uppercase text-blueGray-700 hover:text-blueGray-500"
            href="/auth/login"
          >
            <i class="mr-2 text-sm fas fa-fingerprint text-blueGray-300" />
            Login
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            class="block py-3 text-xs font-bold uppercase text-blueGray-700 hover:text-blueGray-500"
            href="/auth/register"
          >
            <i class="mr-2 text-sm fas fa-clipboard-list text-blueGray-300" />
            Register
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      <!-- Heading -->
      <h6
        class="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500"
      >
        No Layout Pages
      </h6>
      <!-- Navigation -->

      <ul class="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
        <li class="items-center">
          <a
            use:link
            class="block py-3 text-xs font-bold uppercase text-blueGray-700 hover:text-blueGray-500"
            href="/landing"
          >
            <i class="mr-2 text-sm fas fa-newspaper text-blueGray-300" />
            Landing Page
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            class="block py-3 text-xs font-bold uppercase text-blueGray-700 hover:text-blueGray-500"
            href="/profile"
          >
            <i class="mr-2 text-sm fas fa-user-circle text-blueGray-300" />
            Profile Page
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      <!-- Heading -->
      <h6
        class="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500"
      >
        Documentation
      </h6>
      <!-- Navigation -->
      <ul class="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/svelte/colors/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fas fa-paint-brush text-blueGray-300" />
            Styles
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fab fa-css3-alt text-blueGray-300" />
            CSS Components
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fab fa-angular text-blueGray-300" />
            Angular
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fab fa-js-square text-blueGray-300" />
            Javascript
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fab fa-react text-blueGray-300" />
            NextJS
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fab fa-react text-blueGray-300" />
            React
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fas fa-link text-blueGray-300" />
            Svelte
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus"
            target="_blank"
            class="block mb-4 text-sm font-semibold no-underline text-blueGray-700 hover:text-blueGray-500"
          >
            <i class="mr-2 text-base fab fa-vuejs text-blueGray-300" />
            VueJS
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
