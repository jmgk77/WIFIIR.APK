document.addEventListener('deviceready', onDeviceReady, false);

function loading_on() {
    document.getElementById('load').style.display = 'block';
    document.getElementById('app').style.display = 'none';
}

function loading_off() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

function onDeviceReady() {
    //
    var zeroconf = cordova.plugins.zeroconf;
    zeroconf.registerAddressFamily = 'ipv4';
    zeroconf.watchAddressFamily = 'ipv4';

    zeroconf.watch('_http._tcp.', 'local.', function (result) {
        if (result.action == 'resolved') {
            if (result.service.name.toUpperCase().lastIndexOf('WIFIIR', 0) === 0) {
                var ip = 'http://' + result.service.ipv4Addresses[0];
                //#!#create <a href> in html
                //css stop wait animation
                loading_off();
                var ref = cordova.InAppBrowser.open(ip, '_self', 'location=no,zoom=no,toolbar=no');
            }
        }
    });

    //css start wait animation
    loading_on();
}
