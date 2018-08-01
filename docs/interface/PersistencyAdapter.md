## Persistency Adapter interface

[Index](/docs/README.md) | [Interface definitions](/docs/interface/README.md) | Persistency Adapter interface

Persistency Adapter interface provides a way to build-up a persistency-agnostic application. This interface only defines a few set of methods an Adapter instance must implement and [Feature Core](/docs/interface/FeatureCore.md) must use. These methods are:

1. `getItem(key)`
1. `setItem(key, value)`
1. `removeItem()`
1. `clear()`

As you may notice, these set of methods is a subset of [Storage interface](http://www/w3.org/TR/webstorage/#the-storage-interface) API which let e.g. browser's localStorage object to be injected into applications.

**Example**

    const myApplication = globular.initializeApp('calculator', { persistency:localStorage });
    
    class FetchWeatherHere {
        constructor({ persistency }) {
            this.persistency = persistency;
        }
        
        execute(data) {
            const cityCode = this.persistency.getItem('current-location');
            
            // do some stuff here
        }
    }
    
    myApplication.extendWithFeature('fetch-weather-here', FetchWeatherHere);
