var Rest = require('node-rest-client').Client;
var caas_server = require('./caas_server');

function servers() {
  return this;
}

// class methods
servers.prototype.byName = function(name) {
  for (networkDomain in this) {
    if (this[networkDomain].name == name) { return this[networkDomain] }
  }
};

servers.prototype.deploy = function(data) {
};

function caas_servers(conn, filters) {
  //console.log('caas_servers '+conn);
  return new Promise( (resolve, reject) => {
    var options_auth={user:conn.username,password:conn.password};
    var args = { headers:{"Content-Type": "application/json"}, parameters: filters };
    var rest = new Rest(options_auth);
    rest.get(conn.url+"/caas/2.5/"+conn.orgId+"/server/server", args, 
          function(data, response){
        var result = new servers;
        for (server in data.server) {
          result[data.server[server].id] = new caas_server(conn, data.server[server]);
        }
        resolve (result);
      });
  });
}

// export the class
module.exports = caas_servers;