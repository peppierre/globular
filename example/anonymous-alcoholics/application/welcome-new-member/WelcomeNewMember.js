class WelcomeNewMember {
    constructor ({persistency, api}) {
        this.persistency = persistency;
		this.api = api;
    }

    execute(data) {
		let introduced = Number(this.persistency.getItem('member-' + data)) || 0;
        this.persistency.setItem('member-' + data, introduced + 1);
		return this.api.request('get-greeting', data)
			.then(function (result) {
				result = JSON.parse(result);
				return {
					sayHi: result.greeting,
					whoAmI: result.me,
					cleanSince: result.abstinenceTerm
				};
			}
		);
	}
}
