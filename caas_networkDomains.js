var Rest = require('node-rest-client').Client;
var caas_networkDomain = require('./caas_networkDomain');

function networkDomains() {
  return this;
}
  // class methods
networkDomains.prototype.byName = function(name) {
  for (entry in this) {
    if (this[entry].name == name) { return this[entry] }
  }
};

networkDomains.prototype.tst = function() {
  console.log('test');
};


function caas_networkDomains(conn, filters) {
  //console.log('caas_networkDomains '+conn);
  return new Promise( (resolve, reject) => {
    var options_auth={user:conn.username,password:conn.password};
    var args = { headers:{"Content-Type": "application/json"}, parameters: filters  };
    var rest = new Rest(options_auth);
    rest.get(conn.url+"/caas/2.5/"+conn.orgId+"/network/networkDomain", args, 
          function(data, response){
        var result = new networkDomains;
        for (networkDomain in data.networkDomain) {
          result[data.networkDomain[networkDomain].id] = new caas_networkDomain(conn, data.networkDomain[networkDomain]);
        }
        resolve (result);
      });
  });
}

// export the class
module.exports = caas_networkDomains;