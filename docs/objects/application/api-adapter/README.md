### apiAdapter

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Application](/docs/objects/application/README.md) | apiAdapter

Publishes API Adapter Application uses.

If no custom API Adapter is passed to application, framework provided one is instantiated and passed to it.

**Example**

    myApplication.apiAdapter.pluginCall('fetch-bookings', {
        type: 'xhr',
        config: {
            url: '/bookings'
        }
    });
