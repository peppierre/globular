### pluginView()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Feature](/docs/objects/feature/README.md) | pluginView()

Adds a new view to list of views. Each views in this list is going to be notified when [Feature](/docs/objects/feature/README.md) is [executed](/docs/objects/feature/Execute.md).

**Signature**

    pluginView(view)

**Parameters**

`view`

*(mandatory)* A function which is called with result of feature when it is executed. For required signature, please check [View function](/docs/interface/View.md).

**Return value**

For chaining purpose, this method returns [Feature](/docs/objects/feature/README.md) itself.

**Example**

    function updateOperation(data) {
        // do stuffs in DOM
    }
    
    function updateResult(data) {
        // do stuffs in DOM
    }
    
    myFeature.pluginView(updateOperation).pluginView(updateResult);
