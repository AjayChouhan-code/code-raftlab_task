# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


 1. start JSON server
To install JSON Server, you can either install it globally or locally.

To install globally:
npm install -g json-server

To install locally
npm install json-server --save-dev


To start the JSON Server, use the following command:
json-server --watch db.json --host 0.0.0.0 --port 3000


2. -Change the BASE_URL in the API Service
Before running the app or creating a build, you need to set the BASE_URL to your local machine's IP address in the apiService file.

For example, if your IP address is 192.168.0.247, update the BASE_URL as follows:
BASE_URL = "http://192.168.0.247:3000";
Note: You must replace 192.168.0.247 with your actual local IP address. This allows the Expo app to connect to your JSON Server running locally.


3.  Create a Release Build with Expo
To interact with Expo servers and build your app, you need to install the EAS CLI:

npm install -g eas-cli

After installing the EAS CLI, log in to your Expo account using the following command:

eas login

To configure the project with Expo, you need to set up the eas.json file:

eas build:configure

This command sets up your project for EAS and generates the eas.json file, which contains the build configurations.

4. To create a production build for iOS:

eas build --platform ios --profile production

5. To create a production build for Android:

eas build --platform android --profile production

Once the build process is complete, your app will be available on the Expo server





