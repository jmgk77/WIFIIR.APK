//main
//console.log("MAIN");
var zeroconf;
var once;
//set event handlers
document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function onResume() {
    //console.log("ONRESUME");
    //watch new mdns
    set_watch();
}

function onPause() {
    //console.log("ONPAUSE");
    // Handle the pause event
    zeroconf.unwatch('_http._tcp.', 'local.');
}

function onDeviceReady() {
    //console.log("ONDEVICEREADY");
    //create zeroconf object
    zeroconf = cordova.plugins.zeroconf;
    //css start wait animation
    loading_on();
    //set zeroconf for speed
    zeroconf.registerAddressFamily = 'ipv4';
    zeroconf.watchAddressFamily = 'ipv4';
    //watch new mdns
    set_watch();
}

//set mdns watch
function set_watch() {
    zeroconf.watch('_http._tcp.', 'local.', function (result) {
        if (result.action == 'resolved') {
            //console.log("FOUND!");
            if (result.service.name.toUpperCase().lastIndexOf('WIFIIR', 0) === 0) {
                var ip = 'http://' + result.service.ipv4Addresses[0];
                //console.log(ip);

                //create button
                var button = document.createElement('button');
                button.innerHTML = 'Open ' + result.service.name;
                button.onclick = function () {
                    cordova.InAppBrowser.open(ip, '_self', 'location=no,zoom=no,toolbar=no');
                    return false;
                };
                document.getElementById('app').appendChild(button);

                //open inbrowserapp on first found only
                if (!once) {
                    //css stop wait animation
                    loading_off();
                    once = cordova.InAppBrowser.open(ip, '_self', 'location=no,zoom=no,toolbar=no');
                }
            }
        }
    });
}

function loading_on() {
    document.getElementById('load').style.display = 'block';
    document.getElementById('app').style.display = 'none';
}

function loading_off() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}
