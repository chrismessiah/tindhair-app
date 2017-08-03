# tindhair

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

## Note on Ejecting from CRNA

To be able to utilizes **packages that uses native code** or to be able to **build the application for production**, ejecting is a requirement.  
