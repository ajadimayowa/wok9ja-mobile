import 'dotenv/config';

export default {
  expo: {
    name: 'wok9ja',
    slug: 'wok9ja-app',
    scheme: "wok9ja-app", // Add this line to specify the scheme,
    platforms: ["ios", "android"],
    // ... other Expo config
    extra: {
      apiUrl: process.env.API_BASEURL,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    },
  },
};
