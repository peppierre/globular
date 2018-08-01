### unplugView()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Feature](/docs/objects/feature/README.md) | unplugView()

Removes a new view from list of views. Unplugged view won't be notified when [Feature](/docs/objects/feature/README.md) is [executed](/docs/objects/feature/Execute.md).

**Signature**

    unplugView(view)

**Parameters**

`view`

*(mandatory)* A function which would have been called. For required signature, please check [View function](/docs/interface/View.md).

**Return value**

For chaining purpose, this method returns [Feature](/docs/objects/feature/README.md) itself.

**Example**

    function updateOperation(data) {
        // do stuffs in DOM
    }
    
    function updateResult(data) {
        // do stuffs in DOM
    }
    
    myFeature.unplugView(updateOperation).unplugView(updateResult);
