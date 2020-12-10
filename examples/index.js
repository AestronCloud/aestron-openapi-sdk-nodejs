const SmsClient = require('../src');
const sms = new SmsClient({
	appId: 'xxxxx', // 申请的appid
	certificate: 'xxxxx' // 申请的证书
});

sms.send({
	to: '8615826666666',
    content: 'Do not go gentle into that good night.',
    from: 'BIGO',
    type: 'OTP',
    session: '168201771',
}).then((res) => {
	console.log(res)
})
