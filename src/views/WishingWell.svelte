<script>
  // core components
  import IndexNavbar from "components/Navbars/IndexNavbar.svelte";

  let copiedBsb = false;
  let copiedAcct = false;

  $: innerHeight = 0;
  $: heightPadder = `height: ${innerHeight}px;`;

  function copyToClipboard(value) {
    const textField = document.createElement("textarea");
    textField.innerText = value;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }
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
      background-image: url(https://images.unsplash.com/photo-1597634316382-526c164f85a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80);
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
  <div class="container relative">
    <div class="flex flex-wrap items-center">
      <div class="w-full">
        <div class="flex flex-wrap">
          <div class="w-full px-4">
            <div class="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
              <div class="pr-12 m-2">
                <h1 class="text-5xl font-semibold text-white">Wishing Well</h1>
                <p class="mt-6 mb-12 text-lg text-blueGray-200">
                  Your presence at the wedding is the best gift to us ❤️
                  However, if you would still like to gift us a little something
                  to add to our car fund, you can find our bank details below
                </p>
              </div>
            </div>
            <div
              class="relative flex flex-col items-center justify-center w-full min-w-0 p-8 mb-6 break-words bg-white rounded shadow-lg"
            >
              <p class="m-4 text-lg">Tap the below fields to copy</p>
              <div class="grid w-1/2 grid-cols-5 gap-4">
                <div class="col-span-2 font-semibold">BSB #:</div>
                <div
                  on:click={() => {
                    copiedBsb = true;
                    copyToClipboard("123456");
                  }}
                  class="flex-row col-span-3"
                >
                  123-456 &nbsp; &nbsp;
                  {#if copiedBsb}
                    Copied!
                  {/if}
                </div>
                <div class="col-span-2 font-semibold">Account #:</div>
                <div
                  on:click={() => {
                    copiedAcct = true;
                    copyToClipboard("123456");
                  }}
                  class="col-span-3"
                >
                  123456 &nbsp; &nbsp;
                  {#if copiedAcct}
                    Copied!
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
