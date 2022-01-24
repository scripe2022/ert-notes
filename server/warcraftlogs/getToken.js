import request from 'request'
import config from '~/config/config.js'

var options = {
    url: 'https://www.warcraftlogs.com/oauth/token',
    method: 'POST',
    form: {
        'grant_type': 'client_credentials'
    },
    auth: {
        'user': config.wcl.id,
        'pass': config.wcl.secret,
    }
};

const getToken = async() => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error && response.statusCode==200) {
                const json = JSON.parse(body);
                resolve(json.access_token);
            }
            else {
                reject(error);
            }
        });
    });
}

export { getToken };