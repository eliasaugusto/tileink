import _ from 'lodash';
import { Server } from 'hapi';
import mongoose from 'mongoose';
import tilelive from 'tilelive';
import mapnik from 'tilelive-mapnik';
import createQueue from './core/createQueue';
import features from './features';
import settings from './settings';

const server = new Server();
const routes = _.flatten(_.map(features, feature => feature.routes));
const tasks = _.flatten(_.map(features, feature => feature.tasks));

//
// Database Connection

mongoose.connect(settings.mongodb);

//
// Mapnik Protocols

mapnik.registerProtocols(tilelive);

//
// Connections

server.connection({
  port: settings.port
});

//
// Binds

server.bind({
  queue: createQueue(tasks)
});

//
// Routes

_.forEach(routes, route => server.route(route));

//
// Startup

server.start((error) => {
  console.log(`Server running at: ${server.info.uri}`);
});
