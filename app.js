/*global require, console*/
'use strict';

var pcap = require('pcap'),
	express = require('express'),
	app = express(),
	pcap_session = pcap.createSession('enp0s3', 'arp'),
	dashBtnMAC = '08:00:27:29:7f:0f',
	buttonTimer,
	buttonStatus = false;

console.log('listening on ' + pcap_session.device_name);

pcap_session.on('packet', function(raw_packet){
	var packet = pcap.decode.packet(raw_packet);
	if(packet.payload.payload.sender_ha.addr.join(':') === dashBtnMAC){
		//we found the button
		console.log('boop!');
		buttonStatus = true;
		buttonTimer = setTimeout(function (){
			buttonStatus = false;
},10000);
	}
});

app.use(express.static('public'));

app.get('/status', function(req, res){
	res.send(buttonStatus);
});

var server = app.listen(3030, function () {
	var host = server.address().address,
		port = server.address().port;
	console.log('Server app listening at http://%s:%s', host, port);
});
