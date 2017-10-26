var Rest = require('node-rest-client').Client;
var caas_vlan = require('./caas_vlan');

function vlans() {
  return this;
}
  // class methods
vlans.prototype.byName = function(name) {
  for (entry in this) {
    if (this[entry].name == name) { return this[entry] }
  }
};

  
vlans.prototype.tst = function() {
  console.log('test');
};


function caas_vlans(conn, filters) {
  //console.log('caas_vlans '+conn);
  return new Promise( (resolve, reject) => {
    var options_auth={user:conn.username,password:conn.password};
    var args = { headers:{"Content-Type": "application/json"}, parameters: filters };
    var rest = new Rest(options_auth);
    rest.get(conn.url+"/caas/2.5/"+conn.orgId+"/network/vlan", args, 
          function(data, response){
        var result = new vlans;
        for (vlan in data.vlan) 
          result[data.vlan[vlan].id] = new caas_vlan (conn, data.vlan[vlan]);
        resolve (result);
      });
  });
}

// export the class
module.exports = caas_vlans;