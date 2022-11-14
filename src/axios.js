import axios from 'axios';

let BaseApi = axios.create({
    baseURL: "http://carmaker.org/api"
})

let Api = function (){
    BaseApi.interceptors.request.use(
        (request) => {
            // eslint-disable-next-line no-param-reassign
            request.config = {
                ...(request.config ?? {}), // preserve a given request.config object
                start: Date.now(),
            };

            return request;
        },
    );
    BaseApi.interceptors.response.use(
        (response) => {

            const now = Date.now();
            console.info(`Api Call ${response.config.url} took ${now - response.config.config.start}ms`);
            return response;


        },
        (error) => Promise.reject(error),
    );

    return BaseApi;
}

export default Api;
