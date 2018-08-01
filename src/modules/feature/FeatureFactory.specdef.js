export function SyncPureCore() {
    this.execute = (data) => {
        this.result = data;
        return this.result;
    };
    this.fakeProperty = 42;
}

/* eslint-disable class-methods-use-this */
export class InvalidCore {
    unExecute() {}
}
/* eslint-enable class-methods-use-this */
