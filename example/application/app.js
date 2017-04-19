globular.initializeApp('calculator', { persistency: localStorage });
const calculator = globular.app('calculator');

calculator.extendWithFeature('increment-number', IncrementNumber);
calculator.extendWithFeature('decrement-number', DecrementNumber);
calculator.extendWithFeature('multiply-number', MultiplyNumber);
calculator.extendWithFeature('reset-number', ResetNumber);
