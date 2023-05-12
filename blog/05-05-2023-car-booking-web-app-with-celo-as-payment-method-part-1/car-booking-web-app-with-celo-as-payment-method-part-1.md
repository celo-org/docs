---
title: Create a Car booking web app with the celo payment method part 1
description: This article is the first part of the tutorial series that teahes how to add celo payment method to a full stack car booking web app.
authors:
  - name: Kinyichukwu Oselukuwe
url: https://github.com/kinyichukwu
tags: [celosage, celo, react]
hide_table_of_contents: true
slug: /tutorials/car-booking-web-app-with-celo-as-payment-method-part-1
---

![header](../../src/data-tutorials/showcase/intermediate/car-booking-web-app-with-celo-as-payment-method-part-1.png)

## Introduction​

Online services need easy and reliable payment methods in the digital era. Blockchain technology offers a solution with its fast and low-cost transactions. Celo is a blockchain-based platform gaining popularity for its payment features.

How can we develop a car booking web app that accepts Celo as a payment method?

This article will guide you through the key components of such an app, including the following:

- User interface design: How to create a simple and intuitive booking process for customers.

- Front-end and back-end development: Handling user authentication, booking management, and payment processing.

- Celo payment API integration: How to enable secure and speedy payment transactions with Celo.

By the end of this tutorial article series, you will have an understanding of how to add a celo payment method to a car booking web app like Uber Complete, the development of a full stack car booking application. After completing part two of this article, you will have added the celo payment method to your application, and you’ll understand how the process goes.

[Here](https://decentralized-rides-booking-application.vercel.app/) is a completed and deployed version of the application you’ll be building in this part of this tutorial series.

And [here](https://github.com/kinyichukwu/Decentralized--Rides-booking-application) is a link to the code on complete GitHub.

## Prerequisites​

This tutorial will guide you on how to build your car booking Dapp. After which, you’ll be adding the payment method in part two. You will need solid and prior knowledge of the following:

- Javascript: JavaScript is a versatile, high-level programming language that is primarily used to add interactivity, functionality, and dynamic behavior to websites. It is supported by all major web browsers. And is the language you’ll be using in this tutorial
- React: You should also have experience with creating and editing React applications.
- Blockchain concepts like Celo: A good understanding of basic blockchain technologies like celo and their useful tool for development will suffice to take you through this tutorial.

## Requirements​

To complete this article

- Node.js and npm installed on your machine: node
- Firebase: You should have an existing account on Firebase, as you’ll be using Firebase to manage your backend.

### Let’s Begin

To get started, you will need to clone the starter file from Github.

In your terminal:

```bash
 git clone https://github.com/kinyichukwu/Decentralized--Rides-booking-application.git
```

Once cloning is done, install all the project dependencies

```bash
npm install
```

Here is a screenshot of what our application will look like once we are done:

![image](https://user-images.githubusercontent.com/81447346/236364501-092a0b0b-b63a-481a-8cdd-b5a832eeaae9.png)

## Creating a Firebase Account

Here is a quick walkthrough to help you create your Firebase account.

[Firebase](https://firebase.google.com/) is a powerful platform that provides a range of tools for developing robust web and mobile applications. One of the essential features of Firebase is the authentication system that allows users to sign in using various methods such as email and password as well as Google, Facebook, and phone number.

We will leverage Firebase authentication and storage to sign in, store details of drivers, and firestore to store order data. Using Firebase for the backend of our web app, we will need to create an account.

If perhaps you don’t have a Firebase account mentioned as part of the requirements, Here is a quick walkthrough to help you [create your Firebase account](https://www.bing.com/videos/search?q=how+to+create+an+account+on+firebase&qpvt=how+to+create+an+account+on+firebase&view=detail&mid=3EC6E595C075511838C33EC6E595C075511838C3&&FORM=VRDGAR).

![image](https://user-images.githubusercontent.com/81447346/236364615-02dd3c19-0435-4aca-874d-53ccc794f4ce.png)

Log in to your newly created account and click on Add Project and give a name for your project (Defi Ride).

### Firebase Authentication and Data Storage

You will have to set up Firebase Authentication in your project. Once you have created a Firebase project and enabled authentication, you can select "Phone" as a sign-in method in the Firebase console.

Firebase Storage and Database can be enabled by navigating to the console and selecting the appropriate services from the menu.

### Firebase Config

To get your Firebase config, you will need to follow these steps:
Go to the Firebase Console and select your project. Click on the gear icon located next to the `Project Overview` in the left navigation bar.
Click on the `Project Settings` option. Scroll down to the `Your apps` section and find the web app you want to get the config for
Click on the `</>` icon to add Firebase to your web app.
Copy the code under the "firebaseConfig" variable.

```js
const firebaseConfig = {
  apiKey: "AIzaSyDfKIaFmKtT1fG5odMLOcCuwCHLFVB6jJY",
  authDomain: "defi-ride.firebaseapp.com",
  projectId: "defi-ride",
  storageBucket: "defi-ride.appspot.com",
  messagingSenderId: "443537364281",
  appId: "1:443537364281:web:5a39fc2bd1760c0d6ac4e8",
  measurementId: "G-ELF4XNFMVK"
};

```

### Creating An .env File

In your root directory, create a .env file, this is where we will be storing our API keys.

```js
REACT_APP_API_KEY= AIzaSyDfKIaFmKtT1fG5odMLOcCuwCHLFVB6jJY
REACT_APP_AUTH_DOMAIN= defi-ride.firebaseapp.com
REACT_APP_PROJECT_ID= defi-ride
REACT_APP_STORAGE_BUCKET= defi-ride.appspot.com

REACT_APP_MESSAGING_SENDER_ID= 443537364281
REACT_APP_APP_ID= 1:443537364281:web:5a39fc2bd1760c0d6ac4e8 REACT_APP_MEASUREMENT_ID= G-ELF4XNFMVK
REACT_APP_GOOGLEMAPS_API_KEY=

```

### Google Map API Key

To get a Google Maps API key with all APIs enabled, you can follow these steps:

1. Go to the Google Cloud Console.
2. Select an existing project or create a new one to add an API key to.
3. Navigate to the APIs & Services > Credentials page.
4. On the Credentials page, click Create credentials > API key and follow the prompts.
5. Click close and confirm your key has been created.

![image](https://user-images.githubusercontent.com/81447346/236364784-1ce6bc26-b8c7-42a0-a1eb-1ffe6a89faa9.png)

After creating it include the API key in your .env file.

### Testing Our Application

Run the code:

```bash
npm start
```

In your terminal to start the application. Click on the input tag on the home page and select your location. It will show you the distance, duration, and a view of the map in the background.

Now click on the `book now` button, and you will be routed to the sign-in/sign-up page. After signing up, you will see your sign-up data in Firebase. You need to use a valid number while signing in because you will need a cloud OTP, which you will receive on your phone when you are signed in.

![image](https://user-images.githubusercontent.com/81447346/236365460-4fe38bee-0397-4b2b-bc3b-21ed23e1d918.png)

After signing in, you will be routed to the home screen to book orders. Clicking on the book now will route you to the book rides page since you are signed in.

![image](https://user-images.githubusercontent.com/81447346/236365565-78f1a59a-4c06-4530-be51-c901eea14f5d.png)

### Booking Process

Enter your pick-up and drop-off location on the book rides page. Then, you can proceed to the next page and choose a driver. Once you confirm your order, you and the driver will receive a notification.

## Conclusion​

Congratulations, you have completed your car booking web app. Using React for the front end, Firebase for the back end, and Google Map API. We have also implemented booking rides, choosing drivers, phone number verification, and paying with Celo tokens. In the next article, we will add more functionalities to the app, such as adding Celo as a payment method and Celo SDK for blockchain integration.

## Next Steps​

To test your skills, you can create more features and use React to build them on the front end, like a chat app feature, A profile picture, etc. Stay tuned for the second part of the tutorial.

## About the Author​

Oselukwue Kinyichukwu is a Fullstack developer with a passion for learning, building, and teaching. You can follow me on [Twitter](https://twitter.com/KOselukwue), You can check out my profile on [LinkedIn](https://www.linkedin.com/in/kinyichukwu-oselukwue-69a49622b/), and see what I’m building on [Github](https://github.com/kinyichukwu).
