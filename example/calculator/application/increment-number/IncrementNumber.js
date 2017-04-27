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
