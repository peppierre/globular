### Api class

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Framework](/docs/objects/framework/README.md) | Api class

Provides a class with [API Adapter](/docs/interface/api-adapter/README.md)-compatible interface. If you don't need whole functionality of framework but would like to centralize and standarize your API requests, it would be a good choice to create a new instance of this class and refer it in your custom application.

By default, no request could be handled by Adapter instance, capabilites must be plugged-in via [`pluginCall` method](/docs/interface/api-adapter/README.md).
 
Calling [`request`](/docs/interface/api-adapter/README.md) method of built-in Adapter returns a Promise to use in feature core.

    class FetchLocationWeather {
        constructor({api}) {
            this.api = api;
        }
        
        execute(data) {
            this.api.request('fetch-location-weather', { location: data }).then(() => {
                // do some stuffs when resolved
            }).catch(() => {
                /do some stuff when rejected
            });
        }
    }

*Please note that Globular automatically instantiates this class and passes instance to application while initializing if other API adapter is specified.*

**Example**:

    const apiAdapter = new globular.Api();
