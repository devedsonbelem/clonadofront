ionic cordova build android 
cordova platform add android@latest
ionic integrations enable cordova --add ===> gerar resources android e altera o config.xml
ionic cordova run android 
cordova run --list
adb devices -l ===> ver os dispositivos da maquina
ionic cordova build android --prod --release

cordova platform remove android
cordova platform add android@latest
npm i cordova-sms-plugin
ionic cordova run android 

13-06-2021
cordova plugin add cordova-plugin-android-sms-retriever
ionic cordova plugin add cordova-plugin-sms-retriever-manager
npm install @ionic-native/sms-retriever

git init
git branch -M 2021-06-13
git add .
git checkout -b "2021-06-13"
git commit -m "alteracao biblioteca retriver"
git remote add origin https://github.com/LucianaMedeiros/clonadofront.git
git push -u origin 2021-06-13


git remote add origin git@github.com:Tardis-Tecnologia/FuiClonadoFront.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/Tardis-Tecnologia/FuiClonadoFront.git
git branch -M main
git push -u origin main

 ionic cordova plugin add cordova-sms-plugin
npm install --save @ionic-native/sms


