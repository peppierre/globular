### executeFeature()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Application](/docs/objects/application/README.md) | executeFeature()

Executes a feature of application. This method is a syntax sugar around [execute](/docs/objects/feature/Execute.md) method of [Feature](/docs/objects/feature/README.md) object.

If no feature is available with given name, no execution occur.

**Signature**

    executeFeature(featureName, model)

**Parameters**

`featureName`

*(mandatory)* String ID of feature required.

`model`

*(optional)* Any type of data, which is necessary for feature to do its job.

**Example**

    const sumNumbers = myApplication.executeFeature('sum-numbers', [23, 97, 11]);
