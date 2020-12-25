'use strict';

const ProtoBufLib = require('./base');

const FILENAME = 'perfomance';

module.exports = class PerfomanceProtoBufLib extends ProtoBufLib {

	get filename() {
		return FILENAME;
	}

	get schema() {
		return {
			name: 'perfomanceFile',
			type: 'array',
			items: {
				name: 'items',
				type: 'record',
				fields: [
					{ name: 'name', type: 'string' },
					{ name: 'isDev', type: 'boolean' },
					{ name: 'age', type: 'int' }
				]
			}
		}
	}
};
