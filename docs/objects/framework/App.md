### app()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Framework](/docs/objects/framework/README.md) | app()

Returns a previously initialized application, if available.

**Signature**

    app(applicationName)

**Parameters**

`applicationName`

*(mandatory)* String to identify required application.

**Return value**

An application object or -if no application is available with given ID- `undefined`. For further information, please check [Application](/docs/objects/framework/README.md) section.

**Example**

    const myApplication = globular.app('weather-app')
    
