<script>
  import { createEventDispatcher } from "svelte";
  import { link } from "svelte-routing";
  import LoginErrorAlert from "components/Alerts/LoginErrorAlert.svelte";
  import {
    sendPasswordResetEmail,
    signInWithPopup,
    sendSignInLinkToEmail,
  } from "firebase/auth";

  // core components
  import {
    actionCodeSettings,
    auth,
    googleAuth,
  } from "../../services/firebase";
  const google = "../assets/img/google.svg";

  let err = null;

  const d = createEventDispatcher();
  const googleLogin = () => {
    signInWithPopup(auth, googleAuth)
      .then(() => {
        d("auth");
        d("done");
      })
      .catch((e) => {
        err = `(${e.code}) ${e.message}`;
      });
  };

  function login() {
    const email = document.getElementById("grid-email").value;
    const password = document.getElementById("grid-password").value;

    // basic form validation
    if (!email) {
      err = "Fill out all fields!";
      return;
    }
    err = "";

    // sign in using firebase
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        d("done");
        d("auth");
      })
      .catch((e) => {
        err = `(${e.code}) ${e.message}`;
      });
  }

  const resetPassword = () => {
    const email = document.getElementById("grid-email").value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        err = "Reset link sent to email. Please check your SPAM folder!";
      })
      .catch((error) => {
        err = `${error.code} ${error.message}`;
      });
  };
</script>

<div class="container h-full px-4 mx-auto">
  <div class="flex items-center content-center justify-center h-full">
    <div class="w-full px-4 lg:w-4/12">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 shadow-lg bg-blueGray-50"
      >
        <div class="px-6 py-6 mb-0 rounded-t">
          <div class="mb-3 text-center">
            <h6 class="text-sm font-bold text-blueGray-500">Sign in with</h6>
          </div>
          <div class="text-center btn-wrapper">
            <button
              class="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs font-normal font-bold uppercase transition-all duration-150 ease-linear bg-white shadow outline-none active:bg-blueGray-50 text-blueGray-700 focus:outline-none hover:shadow-md"
              type="button"
              on:click={googleLogin}
            >
              <img alt="..." class="w-5 mr-1" src={google} />
              Google
            </button>
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
          <div class="mb-3 font-bold text-center text-blueGray-400">
            <small>Or sign in with credentials</small>
          </div>
          <form>
            <div class="relative w-full mb-3">
              <label
                class="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                for="grid-email"
              >
                Email
              </label>
              <input
                id="grid-email"
                type="email"
                class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                placeholder="Email"
              />
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                for="grid-password"
              >
                Password
              </label>
              <input
                id="grid-password"
                type="password"
                class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                placeholder="Password"
                autocomplete="current-password"
              />
            </div>

            {#if err}
              <LoginErrorAlert message={err} />
            {/if}

            <div class="mt-6 text-center">
              <button
                class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-bluePastel-500 active:bg-bluePastel-400 hover:shadow-lg focus:outline-none"
                type="button"
                on:click={login}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="relative flex flex-wrap mt-6">
        <div class="w-1/2">
          <a
            href="/forgot"
            on:click={(e) => {
              e.preventDefault();
              resetPassword();
            }}
            class="text-blueGray-500"
          >
            Forgot password?
          </a>
        </div>
        <div
          class="w-1/2 text-right"
          on:click={() => (window.location.href = "/auth/register")}
        >
          <a use:link href="/auth/register" class="text-blueGray-500">
            <p>Create new account</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
