var Rest = require('node-rest-client').Client;
var caas_servers = require('./caas_servers');

caas_vlan.prototype.deployServer = function(data) {
  console.log('deploy server : ');
  var options_auth={user:this.conn.username,password:this.conn.password};
  data['networkInfo'] = {};
  data['networkInfo']['networkDomainId'] = this.networkDomain.id;
  data['networkInfo']['primaryNic'] = {};
  data['networkInfo']['primaryNic']['vlanId'] = this.id;
  var args = { 
    headers:{"Content-Type": "application/json"},
    data,
  };
  console.log(JSON.stringify(args));
  var rest = new Rest(options_auth);
  rest.post(this.conn.url+"/caas/2.5/"+this.conn.orgId+"/server/deployServer", args, 
        function(data, response){
          console.log(data);
    });
}

caas_vlan.prototype.refresh = function () {
  this.servers = new caas_servers(this.conn,{'vlanId':this.id});
}

function caas_vlan(conn,init) {
  Object.defineProperty(this, "conn", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: conn
  });

    for (i in init) {
        this[i] = init[i];
    }

    this.refresh();
    return this;
  }
    // class methods
  caas_vlan.prototype.print = function() {
    //console.log(this.snatIpv4Address);
  };

// export the class
module.exports = caas_vlan;