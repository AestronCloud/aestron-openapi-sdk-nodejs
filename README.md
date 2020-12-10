## aestron-openapi-sdk-nodejs
Use Aestron openapi sdk client in your Nodejs project

## Install
```
npm install --save @aestron/sms-openapi-sdk
```

## Demo
```
const SmsClient = require('@aestron/sms-openapi-sdk');
const sms = new SmsClient({
	appId: 'xxx', // 申请的appid
	certificate: 'xxx' // 申请的证书
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
```