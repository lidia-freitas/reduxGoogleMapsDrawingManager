import {urlBuilder} from './url-builder';

let googleApi;

function loadAutoCompleteAPI(params) {
    let script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = urlBuilder({
        base: 'https://maps.googleapis.com/maps/api/js',
        libraries: params.libraries || [],
        callback: 'googleMapsAutoCompleteAPILoad',
        apiKey: params.apiKey,
        client: params.client,
        language: params.language
    });

    document.querySelector('head').appendChild(script);
}

/**
 * googleMapsApiLoader
 *
 * @param  {object} params
 * @param  {object} params.libraries
 *
 * @return {Promise}
 */
export const googleMapsApiLoader = (params) => {
    if (googleApi) {
        return Promise.resolve(googleApi);
    }

    let windowRef = window ? window : {};

    let deferred = function(resolve, reject) {
        loadAutoCompleteAPI(params);

        windowRef.googleMapsAutoCompleteAPILoad = function() {
            googleApi = windowRef.google;
            resolve(googleApi);
        };

        setTimeout(function() {
            if (!windowRef.google) {
                reject(new Error('Loading took too long'));
            }
        }, 5000);
    };

    return new Promise(deferred);
};

//export {googleMapsApiLoader};

