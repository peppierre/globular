# Globular

Feature-based, view-agnostic Javascript framework

## A short story

Imagine that you have just finished your web application. A brand new stuff based on a popular MV* framework which proves maintainability since there are many developers out there in the jungle who could work with it.

But time is changing and a new framework is raised. A better one, a modern one and decision is quite obvious: you must port you application to this new framework. And this is the point when you face the fact that framework you used dominates your application, no chance to simply change the view itself and leaving business logic untouched. You must rewrite the whole application almost from scratch, only a small set of code could be re-used.

## Globular comes into picture

But what you want to do is to simply change the view to use something else. If your application's core logic could be re-usable, you may save tons of work.

And this is what Globular provides you.

## How to make it

1. Create a new application
1. Write feature's core as a class in ECMAScript 2015 or older version of ECMAScript
1. Implement views to use model comes from feature
1. Wire them together by plugging views into feature

## Example

    /* Create new application */
    const calculator = globular.initializeApp('calculator', { persistency: localStorage });
    
    /* Feature core definitions */
    class IncrementNumber {
        constructor ({persistency}) {
            this.persistency = persistency;
        }
        execute() {
            let value = Number(this.persistency.getItem('calculator-value')) || 0;
            value += 1;
            this.persistency.setItem('calculator-value', value);
            return { value, operation:'increment' };
        }
    }

    class DecrementNumber {
        constructor ({persistency}) {
            this.persistency = persistency;
        }
        execute() {
            let value = Number(this.persistency.getItem('calculator-value')) || 0;
            value -= 1;
            this.persistency.setItem('calculator-value', value);
            return { value, operation:'decrement' };
        }
    }

    class ResetNumber {
        constructor ({persistency}) {
            this.persistency = persistency;
        }
        execute() {
            let value = 0;
            this.persistency.setItem('calculator-value', 0);
            return { value, operation:'reset' };
        }
    }

    /* Extending application with features */
    calculator.extendWithFeature('increment-number', IncrementNumber);
    calculator.extendWithFeature('decrement-number', DecrementNumber);
    calculator.extendWithFeature('reset-number', ResetNumber);

    /* Initializing view */
    const resultIndicator = document.querySelector('#result');
    const operationIndicator = document.querySelector('#operation')
    document.querySelector('#reset').onclick = () => {
        calculator.executeFeature('reset-number');
    };
    document.querySelector('#increment').onclick = () => {
        calculator.executeFeature('increment-number');
    };
    document.querySelector('#decrement').onclick = () => {
        calculator.executeFeature('decrement-number');
    };
    function updateResult(viewmodel) {
        resultIndicator.innerText = viewmodel.value;
    }
    function updateOperation(viewmodel) {
        operationIndicator.innerText = viewmodel.operation;
    }

    /* Plug-in views into features */
    calculator.getFeature('increment-number').pluginView(updateResult).pluginView(updateOperation);
    calculator.getFeature('decrement-number').pluginView(updateResult).pluginView(updateOperation);
    calculator.getFeature('multiply-number').pluginView(updateResult).pluginView(updateOperation);
    calculator.getFeature('reset-number').pluginView(updateResult).pluginView(updateOperation);
