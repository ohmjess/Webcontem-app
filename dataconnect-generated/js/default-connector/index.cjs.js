const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: '65160326-SVELTE PREFIX',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

