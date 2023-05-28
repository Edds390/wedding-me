<script>
  import { animate } from "motion";

  // core components
  import { ref, get } from "firebase/database";
  import { auth, db } from "../services/firebase";
  import IndexNavbar from "components/Navbars/IndexNavbar.svelte";
  import Footer from "components/Footers/Footer.svelte";

  const floralDivider = "../assets/img/floral_divider.svg";
  const updatesPhoto = "../assets/img/updates.png";
  const topFlowers = "../assets/img/flowers_top.png";

  let scrollY;
  let innerHeight;
  let user;
  let hasAccess;

  animate(
    ".invite",
    { rotate: 90 },
    {
      duration: 0.5,
      easing: "ease-in-out",
      repeat: 3,
      direction: "alternate",
    }
  );
  animate(".three", { x: -100 }, { duration: 0.2 });
  animate(".box", { transform: "rotate(45deg)" }, { duration: 0.5 });

  export const fadeIn = (node, params) => {
    if (!params) return;

    animate(
      node,
      {
        opacity: [0, 0.8, 1],
      },
      { duration: 2, delay: params.delay ?? 0 }
    );
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
  });
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section class="relative h-screen header lex max-h-680-px">
  <div
    class="container relative flex flex-wrap justify-center mx-auto text-center top-24"
  >
    <div class="w-full px-4 md:w-6/12 font-cormorant">
      <img
        src={topFlowers}
        class="inline w-10/12"
        alt="..."
        use:fadeIn={{ delay: 2.5 }}
      />

      <div class="invite">
        <p
          class="mt-4 text-lg leading-relaxed font-cormorant"
          use:fadeIn={{ delay: 0 }}
        >
          YOU ARE INVITED
        </p>
        <p
          class="text-2xl tracking-widest three font-cormorant"
          use:fadeIn={{ delay: 0.5 }}
        >
          TO CELEBRATE THE MARRIAGE OF
        </p>
        <h2
          class="mt-4 mb-3 text-6xl font-pinyon text-blueGray-600"
          use:fadeIn={{ delay: 1 }}
        >
          Jess & Bob
        </h2>

        <div
          class="flex flex-row items-end justify-center"
          use:fadeIn={{ delay: 1.5 }}
        >
          <div class="p-2 border-t border-b border-blueGray-500">FRIDAY</div>
          <div>
            <div>AUGUST</div>
            <div class="ml-3 mr-3 text-4xl">05</div>
          </div>
          <div class="p-2 border-t border-b border-blueGray-500">AT 5PM</div>
        </div>

        <div class="m-4 text-4xl" use:fadeIn={{ delay: 2 }}>2045</div>
        <div class="tracking-wider" use:fadeIn={{ delay: 2 }}>FUJI</div>
        <p
          class="mt-4 text-lg leading-relaxed text-blueGray-500"
          use:fadeIn={{ delay: 2 }}
        >
          JAPAN
        </p>
        <img
          alt="..."
          class="w-24 m-auto mt-2 text-center opacity-30 text-blueGray-500"
          src={floralDivider}
          use:fadeIn={{ delay: 2 }}
        />
      </div>
    </div>
  </div>
</section>

<IndexNavbar {scrollY} reframeY={innerHeight} />
<div
  class={`${
    scrollY > innerHeight ? "relative min-h-80-px max-h-80-px" : "fixed"
  }`}
  style="height: 60px"
/>

<section class="relative pb-40 mt-48 md:mt-40 bg-blueGray-100">
  <div
    class="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20"
    style="transform: translateZ(0);"
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
        class="fill-current text-blueGray-100"
        points="2560 0 2560 100 0 100"
      />
    </svg>
  </div>
  <div class="container pb-20 mx-auto">
    <div class="flex flex-wrap items-center">
      <div
        class="w-10/12 px-12 ml-auto mr-auto -mt-32 md:w-6/12 lg:w-4/12 md:px-4"
      >
        <div
          class="relative flex flex-col w-full min-w-0 mb-6 break-all bg-white shadow-lg bg-bluePastel-500"
        >
          <div>
            <img alt="..." class="w-full align-middle" src={updatesPhoto} />
          </div>
          <blockquote class="relative p-8 mb-4">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 583 95"
              class="absolute left-0 block w-full h-95-px -top-94-px"
            >
              <polygon
                points="-30,95 583,95 583,65"
                class="fill-current text-bluePastel-500"
              />
            </svg>
            <h4 class="text-2xl font-bold text-white">Timeline:</h4>
            <div class="w-full mt-3 mb-3" />
            <ul class="text-white">
              <li><b>* 29 Jul 2042:</b> Engaged!</li>
              <hr class="w-full mt-3 mb-3 border-b-1 border-blueGray-300" />
              <li>
                <b>* 7 Feb 2045:</b> Further details added to website. Logged in
                but still can't see the details? Contact us!
              </li>

              <hr class="w-full mt-3 mb-3 border-b-1 border-blueGray-300" />
              <li><b>* 15 Mar 2045:</b> RSVP period closes</li>
              <hr class="w-full mt-3 mb-3 border-b-1 border-blueGray-300" />
              <li><b>* 05 August 2045:</b> Wedding!</li>
              <hr class="w-full mt-3 mb-3 border-b-1 border-blueGray-300" />
            </ul>
          </blockquote>
        </div>
      </div>
      <div class="w-full px-4 my-10 md:w-6/12">
        <h2 class="my-6 text-3xl font-semibold">
          Welcome to our wedding website!
        </h2>
        <p>
          We’ve created this website as a helpful resource for our upcoming
          wedding.
        </p>
        <p>
          Here, you’ll find our schedule of events, travel information and some
          FAQs about the day. Please make sure you're <a
            class="font-bold"
            href="/login">LOGGED IN</a
          > to see the full details of the wedding.
        </p>
        <p>
          Final RSVPs close on 15th of March so please register your attendance
          using the link below if you haven't already.
        </p>
        <p>
          Finally, thank you for all of your love and support so far. We are so
          excited to share our special day with our favourite group of people.
        </p>
        <hr class="w-full mt-3 mb-3 border-b-1 border-blueGray-300" />
        <p><i>Jess & Bob</i></p>
      </div>
    </div>
  </div>
</section>

<section class="relative pt-32 pb-16 bg-blueGray-200">
  <div
    class="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20"
    style="transform: translateZ(0);"
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

  <div class="container mx-auto">
    <div
      class="relative z-10 flex flex-wrap justify-center px-12 py-16 -mt-64 bg-white shadow-xl"
    >
      <div class="w-full text-center lg:w-8/12">
        <h3 class="text-3xl font-cormorant">RSVP</h3>
        <p
          class="mt-4 mb-4 text-lg leading-relaxed font-cormorant text-blueGray-500"
        >
          You have been invited to celebrate Jess and Bob's Fuji destination
          wedding. Please register your attendance.
        </p>
        <div class="flex flex-col mt-10 sm:block">
          <a
            href="/auth/rsvp"
            class="px-6 py-4 mb-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear shadow outline-none get-started focus:outline-none bg-bluePastel-500 active:bg-bluePastel-500 hover:shadow-lg"
          >
            Get started
          </a>
        </div>
        <div class="mt-16 text-center" />
      </div>
    </div>
  </div>
</section>

{#if hasAccess}
  <section class="relative block pb-20 bg-blueGray-200">
    <div class="container pt-24 pb-32 mx-auto lg:pb-64">
      <div class="flex flex-wrap justify-center text-center">
        <div class="w-full px-4 mt-6 lg:w-6/12">
          <h2 class="text-4xl font-semibold">Wedding Itinerary</h2>
          <p class="mt-4 mb-4 text-lg leading-relaxed">
            Here's what to expect during our wedding day. <br />We can't wait to
            celebrate with you all!
          </p>
          <p class="mt-4 mb-4 text-lg leading-relaxed">
            Date: Friday 7th August
          </p>
          <p class="mt-4 mb-4 text-lg leading-relaxed">
            Location: Fuji (see <a class="font-bold" href="/map">Maps</a>)
          </p>
        </div>
      </div>
      <div class="flex flex-wrap justify-center mt-12">
        <div class="w-full px-4 text-center lg:w-3/12">
          <div
            class="inline-flex items-center justify-center w-12 h-12 p-3 mt-6 bg-white rounded-full shadow-lg text-blueGray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M432 240c53 0 96-43 96-96s-43-96-96-96c-35.5 0-66.6 19.3-83.2 48H296.2C316 40.1 369.3 0 432 0c79.5 0 144 64.5 144 144s-64.5 144-144 144c-27.7 0-53.5-7.8-75.5-21.3l35.4-35.4c12.2 5.6 25.8 8.7 40.1 8.7zM1.8 142.8C5.5 133.8 14.3 128 24 128H392c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-177 177V464h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H208 120c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V345.9L7 169c-6.9-6.9-8.9-17.2-5.2-26.2z"
              />
            </svg>
          </div>
          <h6 class="mt-5 text-xl font-semibold">4:15pm Welcome drinks</h6>
        </div>
        <div class="w-full px-4 text-center lg:w-3/12">
          <div
            class="inline-flex items-center justify-center w-12 h-12 p-3 mt-6 bg-white rounded-full shadow-lg text-blueGray-800"
          >
            <!-- <i class="text-xl fa-regular fa-rings-wedding" /> -->
            <img src="../assets/img/wedding.svg" alt="rings" />
          </div>
          <h5 class="mt-5 text-xl font-semibold">5:00pm Ceremony</h5>
        </div>
        <div class="w-full px-4 text-center lg:w-3/12">
          <div
            class="inline-flex items-center justify-center w-12 h-12 p-3 mt-6 bg-white rounded-full shadow-lg text-blueGray-800"
          >
            <img src="../assets/img/wedding-cake.svg" alt="cake" />
            <!-- <i class="text-xl fas fa-lightbulb" /> -->
          </div>
          <h5 class="mt-5 text-xl font-semibold">7:00pm ~ 11:00pm Reception</h5>
        </div>
      </div>
    </div>
  </section>

  <section class="relative block bg-white">
    <div
      class="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20"
      style="transform: translateZ(0);"
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
          class="text-white fill-current"
          points="2560 0 2560 100 0 100"
        />
      </svg>
    </div>

    <div class="container px-4 pt-24 mx-auto">
      <div class="grid gap-28 grid-container">
        <div>
          <h2 class="my-2 text-2xl">Location</h2>
          <p class="my-2">Address: Fuji, Japan</p>
          <p class="my-2">Located in the Kawaguchiko region</p>
          <p class="my-2 font-bold">
            <a href="https://www.google.com/">Click here for further details.</a
            >
          </p>
        </div>
        <div>
          <h2 class="my-2 text-2xl">Accommodation</h2>
          <p class="my-2">
            If you prefer having a quiet time in a resort or enjoy beautiful
            mountains, Fuji is a great option.
          </p>
          <p class="my-2">
            Fuji is perfect if you love exploring, as it's very close to
            everything and it has a wide variety of restaurants & activities.
          </p>
        </div>
        <div>
          <h2 class="my-2 text-2xl">Weather</h2>
          <p class="my-2">
            Our wedding will be hosted during the first month of Fuji's dry
            season but you can still expect warm, humid weather with some
            rainfall.
          </p>
        </div>
        <div>
          <h2 class="my-2 text-2xl">Transport</h2>
          <p class="my-2">
            Hiring a car and driver or rideshare services such as Gojeck and
            Grab are the best way to get around Fuji.
          </p>
          <p class="my-2">
            Since the wedding will be in Uluwatu, at the southern tip of Fuji,
            we suggest arranging transport for the wedding day in advance. Your
            hotel or villa will usually be able to assist but please let us know
            if you have any questions.
          </p>
        </div>
        <div>
          <h2 class="my-2 text-2xl">Dress Code</h2>
          <p class="my-2">
            Smart casual. Please keep in mind that Fuji is humid even during the
            evenings.
          </p>
        </div>
        <div>
          <h2 class="my-2 text-2xl">Gifts</h2>
          <p class="my-2">
            Your presence on our special day is the greatest present we could
            ask for. We appreciate the effort involved in joining us for our
            wedding in Fuji.
          </p>
          <p class="my-2">
            However, for those who have asked us, a contribution to our online
            wishing well is more than enough.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="relative pb-40 mt-48 md:mt-40 bg-blueGray-100">
    <div
      class="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20"
      style="transform: translateZ(0);"
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
          class="fill-current text-blueGray-100"
          points="2560 0 2560 100 0 100"
        />
      </svg>
    </div>

    <div class="container px-4 pt-24 pb-24 mx-auto">
      <h1 class="text-6xl mb-14"><i>Faq</i></h1>

      <div class="gap-6 faq-container">
        <p class="text-3xl">Are there any COVID-19 Travel Restrictions?</p>
        <div class="pl-8 border-l-2 border-black">
          <p>
            As we are all aware travel requirements are constantly changing, so
            it is important to understand the current guidelines for entry into
            Fuji. For all entry requirements, please refer to the below
            websites.
          </p>
          <li class="break-all">
            <a
              href="https://Fuji.japan.embassy.gov.au/blli/goingtoFuji.html"
              class="font-semibold"
              >https://Fuji.japan.embassy.gov.au/blli/goingtoFuji.html</a
            >
          </li>
          <li class="break-all">
            <a
              href="https://Fuji.com/Fuji/corona-virus-Fuji-japan/"
              class="font-semibold"
              >https://Fuji.com/Fuji/corona-virus-Fuji-japan/</a
            >
          </li>
          <li class="break-all">
            <a
              href="https://Fuji.com/Fuji/Fuji-visa-japan-entry-regulations/Fuji-visa-for-south-korea-passport/"
              class="font-semibold"
              >https://Fuji.com/Fuji/Fuji-visa-japan-entry-regulations/Fuji-visa-for-south-korea-passport/</a
            >
          </li>
          <li class="break-all">
            <a
              href="https://www.mfa.gov.sg/countries-regions/i/japan/travel-page"
              class="font-semibold"
              >https://www.mfa.gov.sg/countries-regions/i/japan/travel-page</a
            >
          </li>
        </div>
        <p class="text-3xl">
          What do I need to enter and travel around Fuji / japan?
        </p>
        <div class="pl-8 border-l-2 border-black">
          <li>A passport with a minimum of 6 months validity</li>
          <li>
            Tokyo E-Visa - or cash or credit cards in case you are getting the
            Visa on Arrival
          </li>
          <li>
            Confirmed and paid booking for a certified hotel to spend the first
            3 nights (4 days) in Fuji
          </li>
          <li>
            A return flight booking to Tokyo or onward flight booking to another
            country within 30 days.
          </li>
          <li>
            For travellers aged 18 or over, proof of a minimum of 2 COVID-19
            vaccine doses.
          </li>
          <li>
            Tokyo if you are arriving in Fuji which can be completed 3 days
            before arrival.
          </li>
          <li>
            You'll need to download the Tokyo app upon arrival. We suggest
            downloading this beforehand
          </li>
          <li>
            We strongly recommend purchasing medical insurance as the costs of
            medical evacuations can be extremely high.
          </li>
        </div>
      </div>
    </div>
  </section>
{/if}
<Footer />

<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }

  .faq-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
