/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    var zeroconf = cordova.plugins.zeroconf;
    zeroconf.registerAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)
    zeroconf.watchAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)


    zeroconf.watch('_http._tcp.', 'local.', function (result) {
        var action = result.action;
        var service = result.service;
        if (action == 'added') {
            console.log('service added', service);
        } else if (action == 'resolved') {
            console.log('service resolved', service);
            /* service : {
            'domain' : 'local.',
            'type' : '_http._tcp.',
            'name': 'Becvert\'s iPad',
            'port' : 80,
            'hostname' : 'ipad-of-becvert.local',
            'ipv4Addresses' : [ '192.168.1.125' ],
            'ipv6Addresses' : [ '2001:0:5ef5:79fb:10cb:1dbf:3f57:feb0' ],
            'txtRecord' : {
                'foo' : 'bar'
            } */
            if (service.name == 'WIFIIR') {
                var ip = 'http://' + service.ipv4Addresses[0];
                var ref = cordova.InAppBrowser.open(ip, '_self', "location=no");
            }
        } else {
            console.log('service removed', service);
        }
    }, function (result) {
        console.log(result);
    });

    //   // publish a zeroconf service of your own
    //   this.zeroconf.register('_http._tcp.', 'local.', 'Becvert\'s iPad', 80, {
    //     'foo': 'bar'
    //   }).then(result => {
    //     console.log('Service registered', result.service);
    //   });



    document.getElementById('deviceready').classList.add('ready');
}
