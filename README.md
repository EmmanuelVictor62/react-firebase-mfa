# react-firebase-mfa

## Project Overview

**react-firebase-mfa** is a React-based web application designed to demonstrate the process of integrating Firebase Multi-Factor Authentication (MFA). The project showcases how to set up and implement MFA in a modern web application using Firebase and React.

While the MFA functionality is not fully operational in this current setup (due to Firebase MFA being a billed feature in Google Cloud), this repository contains the complete implementation steps. Once Firebase billing is enabled, the MFA functionality will work seamlessly, sending SMS verification codes as part of the sign-up and sign-in process.

## 🚀 Live Demo

Check out the live demo of the project at [react-firebase-mfa.netlify.app](https://react-firebase-mfa.netlify.app). While the MFA feature is not yet functional, you can explore the user sign-up flow.

## 🛠 Technologies Used

- **React**: A popular JavaScript library for building user interfaces.
- **Next.js**: A React framework that enables server-side rendering and static site generation.
- **TypeScript**: Adds static typing to JavaScript, improving code quality and maintainability.
- **SCSS**: A CSS preprocessor that makes writing styles more efficient and scalable.
- **Firebase**: Cloud-based platform used for authentication and database management.

## ⚙️ Features

- **User Sign-Up**: Users can sign up by providing an email, password, and phone number.
- **MFA Integration**: The application is structured to support Firebase Multi-Factor Authentication (MFA), where a verification code is sent to the user's phone during sign-up.
  - Currently, MFA does not work as Firebase's phone number verification is part of a billed feature, but the setup code is ready for use once billing is enabled.

## 📝 How It Works

The project provides a simple sign-up process, where users provide:

- **Email**
- **Password**
- **Phone Number** (for MFA)

Once the user submits the form, the application attempts to send a phone number verification code. This is where the Firebase MFA integration comes into play. However, because this feature requires Firebase billing to be activated, you will not receive a verification code unless the Firebase account is linked with a billing setup.

## 🏗️ Installation Instructions

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/react-firebase-mfa.git
   cd react-firebase-mfa
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project if you haven't already.
   - Enable **Phone Authentication** and **Multi-Factor Authentication** in the Firebase console.
   - Set up your Firebase project configuration in the `.env` file as follows:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_API_ID=your-api-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Run the app locally:

   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` to see the app in action.

## ⚠️ Limitations

- **MFA is not currently working**: Firebase Multi-Factor Authentication (phone verification) requires a billed Firebase project. This feature is not functional unless you enable billing for your Firebase project.
- **Sign-Up Flow**: Users can still sign up and create an account, but they will not receive a phone verification code.

## 🎯 Purpose of the Project

This project is primarily designed to document the process of implementing Firebase Multi-Factor Authentication (MFA) in a React application. Although the MFA feature is not fully functional due to Firebase’s billing requirements, this repository provides the complete codebase and configuration steps for integrating MFA once the billing is enabled.

By sharing this project, I aim to showcase my understanding and ability to implement Firebase MFA in React apps, along with my expertise in modern JavaScript frameworks and cloud-based authentication.

## 🤝 Contributing

Feel free to fork this repository, contribute by creating pull requests, or suggest improvements. If you run into any issues or have ideas for expanding the project, open an issue and I’ll be happy to discuss it.

---

Thanks for checking out this project! I hope it provides you with a solid understanding of how to integrate Firebase MFA in a React app. Please reach out if you have any questions or would like to discuss any aspects of this implementation further.
