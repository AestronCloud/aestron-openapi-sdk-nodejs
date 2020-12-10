const crypto = require('crypto');

module.exports = {
	sha1(val = '') {
		const hash = crypto.createHash('sha1'); 
		hash.update(val);
		return hash.digest('hex');
	}
}