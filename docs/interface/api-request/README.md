## API Request function

[Index](/docs/README.md) | [Interface definitions](/docs/interface/README.md) | API Request function

API request function is for providing a API call configuration for built-in [API Adapter class](/docs/objects/framework/api) instance based on input parameter. When a feature calls API, API Adapter queries relevant call configuration and run request against API based on configuration.

### Criteria against

Function must return an object with following high-level properties defined:

`type`

String value to define how to handle request. Currently only `'xhr'` type is supported.

`config`

Configuration object, required properties depends on request type specified by `type` property. In case of `type: 'xhr'`, following properties are used:

* `config.method`: HTTP method to use
* `config.url`: requested URL
* `config.headers`: key-value pairs of HTTP headers
* `config.body`: HTTP body

**Example**

    (data) => ({
        type: 'xhr',
        config: {
            url: '/api/book-table',
            method: 'post',
            headers: { 'Allow-Origin': '*' },
            body: JSON.stringify(data),
        }
    })
