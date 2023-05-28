<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";

  // Auth Layout
  import Auth from "./layouts/Auth.svelte";

  // No Layout Pages
  import Index from "./views/Index.svelte";
  import Map from "./views/Map.svelte";
  import WishingWell from "./views/WishingWell.svelte";

  export let url = "";
</script>

<Router {url}>
  <!-- admin layout -->
  <Route path="auth/*auth" component={Auth} />
  <!-- no layout pages -->
  <Route path="/" component={Index} />
  <Route path="map" component={Map} />
  <Route path="wishing-well" component={WishingWell} />
</Router>
