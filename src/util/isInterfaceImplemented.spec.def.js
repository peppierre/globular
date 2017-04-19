export const requiredMethods = ['foo', 'boo'];

export class NonFooableApi {
    boo(key, data) {
        this.store[key] = data;
    }
}

export class NonBooableApi {
    foo(key) {
        return this.store[key];
    }
}

export class MinimumApi {
    foo(key) {
        return this.store[key];
    }

    boo(key, data) {
        this.store[key] = data;
    }
}

