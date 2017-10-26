var Rest = require('node-rest-client').Client;
var caas_datacenter = require('./caas_datacenter');

function datacenters() {
  return this;
}
  // class methods
datacenters.prototype.byName = function(name) {
  for (entry in this) {
    if (this[entry].name == name) { return this[entry] }
  }
};

datacenters.prototype.tst = function() {
  console.log('test');
};


function caas_datacenters(conn, filters) {
  console.log('caas_datacenters '+conn);
  return new Promise( (resolve, reject) => {
    var options_auth={user:conn.username,password:conn.password};
    var args = { headers:{"Content-Type": "application/json"}, parameters: filters  };
    var rest = new Rest(options_auth);
    rest.get(conn.url+"/caas/2.5/"+conn.orgId+"/infrastructure/datacenter", args, function(data, response){
      if (response.statusCode == 200) {
       var result = new datacenters;
       for (dc in data.datacenter) {
         result[data.datacenter[dc].id] = new caas_datacenter(conn, data.datacenter[dc]);
       }
       resolve (result);
      } else {
        reject(response)
      }
    });
  });
}

// export the class
module.exports = caas_datacenters;