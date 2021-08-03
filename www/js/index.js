document.addEventListener('deviceready', onDeviceReady, false);

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
                //#!#css stop wait animation
                var ref = cordova.InAppBrowser.open(ip, '_self', 'location=no');
            }
        }
    });

    //#!#css start wait animation
    document.getElementById('deviceready').classList.add('ready');
}
