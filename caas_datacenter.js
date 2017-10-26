var caas_networkDomains = require('./caas_networkDomains');

function caas_datacenter(conn,init) {
    for (i in init) {
        this[i] = init[i];
    }
    this.networkDomains = new caas_networkDomains(conn,{'datacenterId':this.id});
    return this;
  }
    // class methods
  caas_datacenter.prototype.print = function() {
   // console.log(this.snatIpv4Address);
  };

// export the class
module.exports = caas_datacenter;