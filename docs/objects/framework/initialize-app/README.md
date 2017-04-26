### initializeApp()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Framework](/docs/objects/framework/README.md) | initializeApp()

Initializes a new Globular application.

**Signature**

    initializeApp(applicationName *[, { persistency, api }]*)

**Parameters**

`applicationName`

*(mandatory)* String to identify application under Globular namespace.

`{ persistency, api}`

*(optional)* A configuration object to define persistency and/or API adapters for application. If omitted, only framework instantiated API Adapter will be available in application, by default. If application requires persistency, it **must be** passed to application via configuration object.

For further details about requirements against adapters, see [Persistency Adapter](/docs/interface/persistency-adapter/README.md) and [API Adapter](/docs/interface/api-adapter/README.md) sections below.

**Return value**

An application object. See details in [Application](/docs/objects/application/README.md) section.

**Example**

    const myApplication = globular.initializeApp('weather-app', { persistency:localStorage })

