## Feature Core class

[Index](/docs/README.md) | [Interface definitions](/docs/interface/README.md) | Feature Core class

Feature Core class implements application's business logic.

### Criteria against

1. Feature Core must have `execute` methods implemented
1. in case of asynchronous functionality, `execute` method of Feature Core must return with a Promise
1. if execution of Feature Core requires persistency and/or API, constructor must be declared as follows: `constructor({ persistency, api })`

**Example**

    class CreateOrder {
        constructor({ persistency, api }) {
            this.persistency = persistency;
            this.api = api;
        }
        
        execute(data) {
            const apiKey = this.persistency.getItem('api-key');
            return this.api.request('create-order', { apiKey, orderName: data.name })
                .then(result => result);
        }
    }
