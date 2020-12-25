'use strict';

const lllog = require('lllog')();

const fs = require('fs')
const { promisify } = require('util');
const fsReadFile = promisify(fs.readFile);

const decode = async (entity = 'examples') => {

    lllog.info('Start Decoding file');

    try {

        const AvroLib = require(`./avro/${entity}`);
        const buffer = await fsReadFile(`encoded/${entity}Encoded.avro`);

        const avroLib = new AvroLib();
        const dataEncoded = await avroLib.decodeBuffer(buffer);

        lllog.info('Data:');

        lllog.info(JSON.stringify(dataEncoded));

    } catch(error) {
        lllog.error('Could not Decode File', error.message);
    }

    lllog.info('Finish Decoding file');
};

const [,,entity] = process.argv;

decode(entity);
