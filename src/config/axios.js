import axios from 'axios';
import { stringify } from 'querystring';

const data = {
    code: '4%2F0AbUR2VOCOm-aQbVjmb_RESibY67AcOAM5InwcWyzANB-RnUGwnQDfwA0CUCfbGKxjiON4Q',
    client_id: '107703544663-pbrreugeqk0fhaqplq8ohub13pfg8sju.apps.googleusercontent.com',
    client_secret: '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',
    redirect_uri: 'http://localhost:4000/api/users/googleCallback',
    grant_type: 'authorization_code'
};

axios.post('https://oauth2.googleapis.com/token', stringify(data))
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });