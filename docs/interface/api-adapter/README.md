## API Adapter interface

[Index](/docs/README.md) | [Interface definitions](/docs/interface/README.md) | API Adapter interface

API Adapter interface is a common way to make API plugginable to applications. When initializing an application, you could define which adapter you prefer to use.

### Criteria against

1. Adapter must have `pluginCall`, `unplugCall` and `request` methods implemented.

**Example**

    class MyApiAdapter {
        pluginCall() {}
        
        unplugCall() {}
        
        request(data) {
            return JSON.stringify(data);
        }
    }

*Note that [globular.Api](/docs/objects/framework/api/README.md) implements this interface. Please check section for specialties.*
