#!/bin/sh

#prepare
rm -rf build
rm app-release.aab  
rm app-release.apk

#set plugins and code
cordova create build br.com.jmgk.wifiir WifiIR
cd build
rm -rf ./www
cp -r ../www ./www
cordova platform add android
cordova plugin add cordova-plugin-zeroconf
cordova plugin add cordova-plugin-inappbrowser

#change config.xml
cp config.xml config.xml.bak
sed -i 's@version="1.0.0"@version="1.1.6"@' config.xml
sed -i 's@<description>Sample Apache Cordova App</description>@<description>Android controller for ESP8266-based IR controller over WIFI</description\>@' config.xml
sed -i '/Apache Cordova Team/d' config.xml
sed -i '/<\/author>/d' config.xml
sed -i 's@<author.*>@<author email="contato\@jmgk.com.br" href="http://jmgk.com.br">JMGK Team</author>@' config.xml
sed -i 's@</widget>@    <icon density="mdpi" height="57" platform="android" src="www/icon.png" width="57" />\n</widget>@' config.xml

#build APK
cordova build android --release -- --packageType=apk
read -p "Password: " password
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../android.keystore --storepass $password  ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk android-app-key
zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ../app-release.apk

#build AAB
cordova build android --release -- --keystore ../keystore-bundle.jks --storePassword=$password --alias=key0 --password=$password --packageType=bundle
zipalign -v 4 ./platforms/android/app/build/outputs/bundle/release/app-release.aab ../app-release.aab
