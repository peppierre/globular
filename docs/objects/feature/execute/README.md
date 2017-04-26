### execute()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Feature](/docs/objects/feature/README.md) | execute()

Executes a feature by passing a model directly to [Feature Core class](/docs/interface/feature-core/README.md) instance wrapped by feature.

**Signature**

    execute(model)

**Parameters**

`model`

*(optional)* Any type of data, which is necessary for feature to do its job.

**Example**

    const sumNumbers = myApplication.getFeature('sum-numbers');
    sumNumbers.execute([23, 97, 11]);

    const capitalizeName = myApplication.getFeature('capitalize-name');
    capitalizeName.execute('peter abraham');
