export const requiredMethods = ['foo', 'boo'];

/* eslint-disable class-methods-use-this */
export class MinimumApiInstance {
    foo() { }

    boo() { }
}
/* eslint-enable class-methods-use-this */

export class MinimumApiClass {
    static foo() { }

    static boo() { }
}

/* eslint-disable class-methods-use-this */
export class MinimumApiMixed {
    static foo() { }

    boo() { }
}
/* eslint-enable class-methods-use-this */
