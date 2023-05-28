<script>
  export let marker;
  export let onCancel;
  export let onSubmit;

  let isValid = true;
  let submitted = false;

  const handleSubmit = (e) => {
    submitted = true;
    if (document.getElementById(`grid-name`).value == null) {
      isValid = false;
    } else {
      onSubmit(
        document.getElementById(`grid-name`).value,
        document.getElementById(`grid-desc`).value
      );
    }
  };

  console.log(marker);
</script>

<div class="absolute w-full bottom-44">
  <form
    class="flex justify-center"
    class:submitted
    on:submit|preventDefault={handleSubmit}
  >
    <div
      class="absolute grid w-full grid-cols-2 gap-2 p-2 pt-3 bg-blueGray-100 sm:w-1/2"
    >
      <div class="col-span-2">
        <input
          id="grid-name"
          type="text"
          title=""
          class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="Name"
          required
          minlength="2"
          maxlength="50"
        />
      </div>
      <div class="col-span-2">
        <input
          id="grid-desc"
          type="text"
          class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="Description"
          maxlength="270"
        />
      </div>
      <button
        class="w-full col-span-1 px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear shadow outline-none bg-blueGray-400 active:bg-bluePastel-500 hover:shadow-lg focus:outline-none"
        type="button"
        on:click={onCancel}
      >
        Cancel</button
      >
      <button
        class="w-full col-span-1 px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear shadow outline-none bg-bluePastel-500 active:bg-bluePastel-500 hover:shadow-lg focus:outline-none"
        type="submit"
        formnovalidate
      >
        Save</button
      >
    </div>
  </form>
</div>

<style>
  .submitted input:invalid {
    border: 1px solid #c00;
  }

  .submitted input:focus:invalid {
    outline: 1px solid #c00;
  }
</style>
