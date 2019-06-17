# Tindhair

**Tindhair is a mobile application which allows you to quickly find you a new hairstyle.** It uses a recognizable interface and allows a user to create an account, like hairstyles to save them and upload their own hairstyle for others. I built this app while taking a course in interaction design at KTH, Royal Institute of Technology and set the goal to learn some relatively new techniques of building mobile apps.

Tindhair is build with **React Native** and **Redux**. The project was initialized with [create-react-native-app](https://facebook.github.io/react-native/blog/2017/03/13/introducing-create-react-native-app.html).

![Preview of Tindhair](docs/Preview2.jpeg)

## License

Tindhair is licensed under a custom [Educational Public License](https://github.com/chrismessiah/tindhair-app/blob/master/LICENSE).

## Running locally

### iOS

* Install XCode

### Android

* Install Android Studio, Android SDK, and an AVD
* Add this to your `.bash_profile`
```
export PATH=$PATH:/Users/christianabdelmassih/Library/Android/sdk/platform-tools
export PATH=$PATH:/Users/christianabdelmassih/Library/Android/sdk/tools
export ANDROID_HOME=/Users/christianabdelmassih/Library/Android/sdk
```
* Start the andriod emulator with `emulator -avd {AVD_NAME}`
* Run `npm run android`
