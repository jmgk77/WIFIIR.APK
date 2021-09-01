#!/bin/sh
cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk android-app-key
zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk app-release.apk
