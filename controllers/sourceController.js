// name Adrress drug

const Source = require("./../model/sourceModel");
const factory = require("./handlerFactory");

exports.getOneSource = factory.getOne(Source);

exports.getAllSources = factory.getAll(Source)

exports.createSource = factory.createOne(Source)

exports.searchSources = factory.search(Source)

exports.updateSource = factory.updateOne(Source);


exports.sourceStats = factory.stats(Source);

exports.deleteSource = factory.deleteOne(Source);
