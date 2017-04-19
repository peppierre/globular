class MultiplyNumber {
    constructor ({persistency}) {
        this.persistency = persistency;
    }
    execute(multiplicator) {
        let value = Number(this.persistency.getItem('calculator-value')) || 0;
        value *= multiplicator;
        this.persistency.setItem('calculator-value', value);
        return { value, operation:'multiply' };
    }
}
