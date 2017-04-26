## Installation and usage

[Index](/docs/README.md) | Installation and usage

To install, type following command in terminal:

    npm install globular --save

After package is installed, you can refer to it in your application as follows:

    class DoImportantThingCore {
        execute(data) {
           // TODO: implement functionality
        }
    }
    
    const myApplication = globular.initializeApp('my-app');
    myApplication.extendWithFeature('do-important-thing', DoImportantThingCore);
    myApplication.executeFeature('do-important-thing', { 'prop1':'value1', 'prop2':2 });
    
If you need nothing more but an API adapter to use in your exsisting application, just make it happen as follows:

    const myApi = new globular.Api();
    
    myApi.pluginCall('get-current-location', () => ({
        type: 'xhr',
        config: {
            url: '/api/get-location',
            method: 'get'
        }
    }));
    
    ...
    
    let currentLocation = myApi.request('get-current-location').then((data) => data);
