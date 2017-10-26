var caas_vlans = require('./caas_vlans');

function caas_networkDomain(conn,init) {
    for (i in init) {
        this[i] = init[i];
    }
    this.vlans = new caas_vlans(conn,{'networkDomainId':this.id});
    return this;
  }
    // class methods
  caas_networkDomain.prototype.print = function() {
    console.log(this.snatIpv4Address);
  };

// export the class
module.exports = caas_networkDomain;