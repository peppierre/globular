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
