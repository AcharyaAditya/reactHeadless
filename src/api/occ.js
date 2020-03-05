import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
    baseURL: 'https://shop-test2.motorolasolutions.com',
    headers: {
        Authorization: `Bearer ${Cookies.get('oauth_token_secret-storefront-msi')}`
    }
})