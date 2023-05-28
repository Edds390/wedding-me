<script>
  // core components
  const google = "../assets/img/google.svg";
  import { link } from "svelte-routing";

  import {
    auth,
    googleAuth,
    actionCodeSettings,
  } from "../../services/firebase";
  import {
    signInWithPopup,
    createUserWithEmailAndPassword,
  } from "firebase/auth";

  import { createEventDispatcher } from "svelte";
  import LoginErrorAlert from "components/Alerts/LoginErrorAlert.svelte";

  const d = createEventDispatcher();
  googleAuth.addScope("profile");
  googleAuth.addScope("email");
  let err;
  let loading = false;
  let show_password = false;

  const googleSignIn = () => {
    signInWithPopup(auth, googleAuth)
      .then(() => {
        d("auth");
        d("done");
      })
      .catch((e) => {
        err = `(${e.code}) ${e.message}`;
      });
  };

  const register = () => {
    loading = true;
    const email = document.getElementById("grid-email").value;
    const password = document.getElementById("grid-password").value;
    const confirmPassword = document.getElementById(
      "grid-confirm-password"
    ).value;

    // form validation
    if (!email || !password) {
      err = "Fill out all fields!";
      loading = false;
      return;
    }
    if (password !== confirmPassword) {
      err = "Passwords do not match!";
      loading = false;
      return;
    }
    err = "";

    // creating the user
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        d("done");
        d("auth");
      })
      .catch((e) => {
        err = `(${e.code}) ${e.message}`;
      })
      .finally(() => {
        loading = false;
      });
  };

  auth.onAuthStateChanged((user) => {
    if (user) d("auth");
  });
</script>

<div class="container h-full px-4 mx-auto">
  <div class="flex items-center content-center justify-center h-full">
    <div class="w-full px-4 lg:w-6/12">
      <div
        class="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-50"
      >
        <div class="px-6 py-6 mb-0 rounded-t">
          <h3 class="text-xl font-bold text-blueGray-500">Sign up</h3>
          <p class="text-sm ">
            Create an account to save your RSVP info and access private wedding
            details. Already have an account? <a
              use:link
              href="/auth/login"
              class="font-bold uppercase text-bluePastel-400 hover:underline"
            >
              <b>Log in</b>
            </a>
          </p>
        </div>
        <div class="px-6 pb-6 mb-0 rounded-t">
          <div class="mb-3 text-center">
            <h6 class="text-sm font-bold text-blueGray-500">Sign up with</h6>
          </div>
          <div class="text-center btn-wrapper">
            <button
              class="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs font-normal font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-blueGray-50 text-blueGray-700 focus:outline-none hover:shadow-md"
              type="button"
              on:click={googleSignIn}
            >
              <img alt="..." class="w-5 mr-1" src={google} />
              Google
            </button>
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
          <div class="mb-3 font-bold text-center text-blueGray-400">
            <small>Or sign up with credentials</small>
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
                type={show_password ? "none" : "password"}
                class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                placeholder="Password"
              />
              <button
                class="absolute w-12 h-12 text-xl right-2 fas fa-eye text-blueGray-500"
                type="“button”"
                on:click|preventDefault={() => {
                  show_password = !show_password;
                }}
              />
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                for="grid-confirm-password"
              >
                Confirm Password
              </label>
              <input
                id="grid-confirm-password"
                type={show_password ? "none" : "password"}
                class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                placeholder="Confirm Password"
              />
              <button
                class="absolute w-12 h-12 text-xl right-2 fas fa-eye text-blueGray-500"
                type="“button”"
                on:click|preventDefault={() => (show_password = !show_password)}
              />
            </div>

            {#if err}
              <LoginErrorAlert message={err} />
            {/if}
            <div class="mt-6 text-center">
              <button
                class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-bluePastel-500 active:bg-bluePastel-400 hover:shadow-lg focus:outline-none"
                type="button"
                disabled={loading}
                on:click|preventDefault={register}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
