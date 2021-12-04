# project-t08-servedup
## Project Name: Served Up!
### A small app that help users to find the best dining hall in UCSB!
#### Names:
Quansen Wang - Callter  
Ryan Vu - ryanlavu  
Kaede Hamada - kaemaple9  
Roy Wang - qianyouwang  

#### Tech Stack:
1. We are using the React Native as our platform
2. We are using Firebase as our database

#### Plan for the project:
The purpose of the product is to provide information regarding the UCSB dining halls, including their daily menus, opening times, and reviews for users to determine their preferences over specific dining hall or meals. There are other apps that provide information about menus, but we want to provide users a platform to submit their opinions and rateing about the dishes and the dining commons.

#### User Roles:
1. Users who seek for information and post comments
    Users can view the content that other user submit
    Users can upload their content for approval.
    Users can rate a certain dishes.
2. Admins who can review contents posted in the app.
    Admins can do all the things that users can.
    Admins can also approve or deny users' requests.

### Installation
#### Prerequisites
1. Node 12 LTS
2. Run the following code in command line to install expo-cli:  
    npm install -g expo-cli
3. An app named "Expo Go" on mobile devices

#### Dependencies
##### Navigation between different pages and icons
1. @react-navigation/native: create navigation container
2. @react-navigation/bottom-tabs: create bottom tabs on top of different screens
3. @expo/vector-icons: add icons to each tab
##### Google user login
1. expo-google-app-auth: connect with Google OAuth service, is used to limit only those with ucsb accounts to submit reviews as well as allowing school accounts to sign into the app
##### Firebase database related and display reviews
1. react-native-gifted-chat: display data received from DB in chat form
2. @react-native-async-storage/async-storage: sync the storage
3. firebase: connect to the cloud firebase database
##### Display list of menu contents and loading screen
1. p-limit: Limit the api calls

#### Installation steps
1. Download the files in the main branch
2. Make sure you have all the Prequisites
3. Go to the folder named "Project"
4. run 'npm install' command to install all the dependencies
5. run 'npm install expo-google-app-auth' to install the library for google oauth
6. run 'expo start' to start the expo server
7. Use the mobile device to scan the QR code in the terminal

#### Functionlity
1. Log in with UCSB google account
2. View menus for all four dining halls (The content of the menus will change to different meals according to the time of viewing)
3. Submit comments on dining halls
4. View community reviews through chat interface

#### Known Issues
1. The User Profile page is not being updated upon logged in.
2. The log out button in LoginScreen.js is currently not working.

### Deployment
#### Download APK file for offline testing.
1. Use link: https://drive.google.com/file/d/1hZ7mLMwd9_uvXqoOU-eeD4j_CCNFAm70/view?usp=sharing
2. Install the .apk file in an apk environment

#### Test the package online
1. Open link: https://appetize.io/app/n5m0bc0b5dumkv1zbe6btdg62g
2. Test the application in the opened windown
