var joi = require('joi');

var schema = {
    'host': joi.string().hostname(),
    'port': joi.string().regex(/\d/),
    'username': joi.string().min(1),
    'password': joi.string().min(1)
};

module.exports = function(config){
    for(var key in config) {
        if(config.hasOwnProperty(key)){
            joi.validate(config[key], schema, function(err, value){
                if(err){
                    console.log('\nUnable to verify config entry \'' + key + '\'!\n\n' + v.error.stack);
                    process.exit(1);
                }
                config[key] = value;
            });
        }
    }
    return config.sort(true, true);
};