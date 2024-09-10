#!/bin/sh

#prepare
rm -rf BUILD
rm app-release.aab  
rm app-release.apk

#set plugins and code
cordova create BUILD br.com.jmgk.wifiir WifiIR
cd BUILD
rm -rf ./www
cp -r ../www ./www
cordova platform add android
cordova plugin add cordova-plugin-zeroconf
cordova plugin add cordova-plugin-inappbrowser

#change config.xml
echo "Editing CONFIG.XML..."
mv config.xml config.xml.bak
cp ../__config.xml config.xml

#build APK debug
cordova build android -- --packageType=apk

#build APK
cordova build android --release -- --packageType=apk
read -p "Password: " password
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../android.keystore --storepass $password  ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk android-app-key
zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ../app-release.apk

#build AAB
cordova build android --release -- --keystore ../keystore-bundle.jks --storePassword=$password --alias=key0 --password=$password --packageType=bundle
zipalign -v 4 ./platforms/android/app/build/outputs/bundle/release/app-release.aab ../app-release.aab
