const osxPrefs  = require('electron-osx-appearance');
const platform  = require('./platform');
document.body.classList.add('platform-' + platform.name);

if(platform.isMac){
    if(osxPrefs.isDarkMode()){
        document.body.classList.add('platform-'+platform.name + '--dark');
    }
    osxPrefs.onDarkModeChanged(function(){
        console.log("onDarkModeChanged");
    });
}