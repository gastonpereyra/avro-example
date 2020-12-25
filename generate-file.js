'use strict';

const lllog = require('lllog')();

const fs = require('fs')
const { promisify } = require('util');
const fsWriteFile = promisify(fs.writeFile);

const generate = async (entity = 'examples', size) => {

    lllog.info('Start Encoding file for', entity);

    try{

        const AvroLib = require(`./avro/${entity}`);

        const dataset = size ? require(`./generator/${entity}`)(Number(size)) : require(`./dataset/${entity}`);

        const avroLib = new AvroLib();

        console.time('Avro Perfomance');
        const dataEncoded = await avroLib.generateBuffer(dataset);
        console.timeEnd('Avro Perfomance');

        if(!dataEncoded)
            lllog.error('Could not Generate File, cannot verify data');

        else {
            await Promise.all([
                fsWriteFile(`encoded/${entity}Encoded.avro`, dataEncoded),
                size && fsWriteFile(`dataset/${entity}.json`, JSON.stringify(dataset))
            ]);
        }

    } catch(error) {
        lllog.error('Could not Generate File', error.message);
    }

    lllog.info('Finish Encoding file');
};

const [,,entity, size] = process.argv;

generate(entity, size);
