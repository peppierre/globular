import ApiAdapter from './modules/api/ApiAdapter';
import ApplicationFactory from './modules/application/ApplicationFactory';

const applications = new Map();

class Globular {
    static initializeApp(applicationName, { persistency, api } = {}) {
        const application = ApplicationFactory.produce({ persistency, api });
        applications.set(applicationName, application);
        return application;
    }

    static app(applicationName) {
        return applications.get(applicationName);
    }
}

Globular.Api = ApiAdapter;

export default Globular;
