<script>
  import { fly } from "svelte/transition";
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";

  // pages for this layout
  import Login from "views/auth/Login.svelte";
  import Register from "views/auth/Register.svelte";
  import Rsvp from "../views/Rsvp.svelte";
  import Success from "../views/Success.svelte";

  const preload = (src) => {
    return new Promise(function (resolve) {
      let img = new Image();
      img.onload = resolve;
      img.src = src;
    });
  };

  const bgFlowers = "../assets/img/pampas.png";
</script>

<div>
  <AuthNavbar />
  <main>
    <section class="relative w-full h-full min-h-screen pt-40">
      <div
        class="absolute top-0 w-full h-full bg-no-repeat bg-blueGray-100 bg-full"
      />
      {#await preload(bgFlowers) then _}
        <img
          alt="..."
          class="fixed top-0"
          style="width: 420px; height: 740px; left: -120px;"
          in:fly
          src={bgFlowers}
        />
      {/await}

      {#await preload(bgFlowers) then _}
        <img
          alt="..."
          class="fixed top-0"
          style="width: 420px; height: 740px; right: -120px; transform: scaleX(-1);"
          in:fly
          src={bgFlowers}
        />
      {/await}
      <Router url="auth">
        <Route path="login">
          <Login on:auth={() => (window.location.href = "/")} />
        </Route>
        <Route path="register">
          <Register on:auth={() => (window.location.href = "/auth/rsvp")} />
        </Route>
        <Route path="rsvp" component={Rsvp} />
        <Route path="success" component={Success} />
      </Router>
    </section>
  </main>
</div>
