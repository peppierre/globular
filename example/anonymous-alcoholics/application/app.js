const myApp = globular.initializeApp('anonymous-alcoholics', { persistency: localStorage })

myApp.apiAdapter.pluginCall('get-greeting', function (data) {
    return {
        type: "xhr",
        config: {
            url: "http://localhost/globular/server/welcome-" + (Number(data) - 1) + ".json",
            method: "get"
        }
    };
});

myApp.extendWithFeature('welcome-new-member', WelcomeNewMember);
