import { Application } from './Application';

export default class ApplicationFactory {
    static produce({ persistency, api }) {
        return new Application({ persistency, api });
    }
}
