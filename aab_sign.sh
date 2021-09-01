#!/bin/sh
read -p "Password: " password
cordova build android --release -- --keystore ../keystore-bundle.jks --storePassword=$password --alias=key0 --password=$password --packageType=bundle
zipalign -v 4 ./platforms/android/app/build/outputs/bundle/release/app-release.aab app-release.aab
