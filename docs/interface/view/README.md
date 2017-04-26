## View function

[Index](/docs/README.md) | [Interface definitions](/docs/interface/README.md) | View function

View function is a callback added to [Feature](/docs/objects/feature/README.md). When feature executes, generated view-model is passed to each plugged-in view to handle.

*Please note that there is no restriction about what will be passed to this function after feature executed. View-model would be a simple string or an object, relevant feature must determine what kind of view-model is generated.*

**Example**

    data => {
        document.querySelector('#indicator').innerText = data.label;
    }
