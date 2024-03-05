# Getting Started with Thumbnail.

Step 1:  Write **npm install** in your terminal.

Step 2: **npm start** and you are done with setup.




**To deploy code to firebase.(npm commands)**

Step 1:  **npm run-script build**

Step 2:  **firebase int**

Step 3:
Before we get started, keep in mind:

  * You are currently outside your home directory
  * You are initializing in an existing Firebase project directory

Are you ready to proceed? (Y/n) 

**Press y**


Step 4:
Are you ready to proceed? Yes
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Database: Configure Firebase Realtime Database and deploy rules
 ( ) Firestore: Deploy rules and create indexes for Firestore
 ( ) Functions: Configure and deploy Cloud Functions
 ( ) Hosting: Configure and deploy Firebase Hosting sites
 ( ) Storage: Deploy Cloud Storage security rules
 ( ) Emulators: Set up local emulators for Firebase features
 ( ) Remote Config: Get, deploy, and rollback configurations for Remote Config

**Select Hosting and Press SpaceBar Button and Enter**


Step 5:
 What do you want to use as your public directory? (public)
Write **Build** (Note: Because thats our public directory)


Step 6:
Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
**Press n**


Step 7:
Set up automatic builds and deploys with GitHub?
**Press n**


Step 8:
? File build/404.html already exists. Overwrite? (y/N)
**Press n**


Step 9:
File build/index.html already exists. Overwrite? (y/N)
**Press n**


Step 10:
Write **firebase deploy --only hosting** in your terminal
And it will deploy the code to firebase.



