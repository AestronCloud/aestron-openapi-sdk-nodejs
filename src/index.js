const httpClient = require('urllib');
const util = require('./util');

class SmsClient {
    constructor({ appId, certificate }) {
        /**
         * sms client host
         */
        this.host = 'https://sms.bigo.sg/';

        /**
         * http timeOut
         */
        this.timeOut = 3000;

        /**
         * appId
         */
        this.appId = appId;

        /**
         * certificate
         */
        this.certificate = certificate;

        /**
         * api version
         */
        this.version = 2;

        /**
         * last request params
         */
        this.lastRequestParams = {};
    }

    /**
     * @param string timeOut
     */
    setHttpTimeOut(timeOut) {
        this.timeOut = timeOut;
    }

    /**
     * @param string host
     */
    setHttpHost(host) {
        this.host = host;
    }

    setLastRequestParam(params = {}) {
        this.lastRequestParams = params;
    }

    getLastRequestParam() {
        return this.lastRequestParams;
    }

    /**
     * send sms
     * @param object options
     */
    async send(options = {}) {
        if (!options.to || !options.content) {
            throw new Error('to or content cannot be empty');
            return;
        }

        if (!this.appId || !this.certificate) {
            throw new Error('appId or certificate cannot be empty');
            return;
        }

        // if expireTime is invalid,  the default value is 30.
        if (!options.expireTime) {
            options.expireTime = ~~(Date.now() / 1000) + 30;
        }

        //  encrypt token="version:appId:expiredTime:signature"
        const method     = 'SmsService.sendSms';
        const fields     = `${method}&${options.to}&${options.content}`;
        const expireTime = options.expireTime;
        const signature  = util.sha1(fields + this.appId + this.certificate + expireTime);
        const token      = this.version + ":" + this.appId + ":" + expireTime + ":" + signature;
        const json = {
            to: options.to,
            content: options.content,
            from: options.from || '',
            type: options.type || '',
            session: options.session || ''
        };

        this.setLastRequestParam({
            json,
            token
        });

        try {
            const res = await httpClient.request(`${this.host}SmsService/sendSms`, {
                method: 'POST',
                timeout: this.timeOut,
                dataType: 'json',
                contentType: 'json',
                data: json,
                headers: {
                    token,
                }
            });

            return res ? res.data : res;
        } catch (e) {
            throw new Error(e.message || e);
        }
    }
}

module.exports = SmsClient;