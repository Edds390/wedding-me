# Svelte Wedding website template using Notus Svelte + Firebase

This repository extends on Creative Tim's [Notus Svelte template](https://github.com/creativetimofficial/notus-svelte) and Firebase for a serverless and completely free wedding website to share with your guests.

# Demo

https://wedding-me-ff80b.web.app/

# Screenshots

![](https://github.com/Your_Repository_Name/Your_GIF_Name.gif)

## Features

- Animated landing page
- Account registration with OAuth
- RSVP & Dietary restrictions functionality
- Account-restricted content
- Wishing well (does not support direct payments)
- Live collaborative Google Maps integration

## Set up

See [Notus Svelte](https://github.com/creativetimofficial/notus-svelte) for basic setup instructions.

See [Firebase](https://firebase.google.com/docs/web/setup) for firebase project setup. Firebase will be your User registration/database/deployment solution.

For the database, you will need to set up a Firebase Realtime database. Your database schema will look like:

```
{
  "markers": {
    "userId": {
      "-NNEKJszrJJe46QrevrJ": {
        "description": "Nuts",
        "displayName": "mesh",
        "lat": 36.87495685963535,
        "lng": 74.78404921881642,
        "name": "Pea",
        "timestamp": 1675294494276,
        "userId": "userId"
      },
    }
  },
  "users": {
    "userId": {
      "attendees": {
        "diet-0": "i require meat",
        "diet-1": "",
        "name-0": "mesh",
        "name-1": "mike"
      },
      "displayName": "mesh",
      "email": "mesh@mesh.mesh",
      "hasAccess": true
    },
  }
}
```

- markers: collaborative pins that guests can add to the map
- users: users that have RSVP'ed, as well as their plus-one details. `hasAccess` is an additional attribute that you will need to add manually via firebase so that the given guest can have privileged access to various website functionalty such as access to the maps and additional sensitive information in the landing page.

## Deployment

Use [Firebase](https://firebase.google.com/docs/hosting/quickstart) for deployment.

## Google Maps

To enable collaborative editing for Google Maps, you will need to set up a [Google Maps project](https://developers.google.com/maps/get-started). Once you have obtained your SDK key, you can test it out by subtituting the value in `index.html`.
