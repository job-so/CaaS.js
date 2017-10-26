const EventEmitter = require('events');
var Rest = require('node-rest-client').Client;
var parseString = require('xml2js').parseString;
//var infrastructure = require('./infrastructure');

var caas_datacenters = require('./caas_datacenters');
var caas_networkDomains = require('./caas_networkDomains');

class caas extends EventEmitter {
  constructor() {
  // always initialize all instance properties
  super();
  this.url = '';
  this.username = '';
  this.password = '';
  this.orgId = '';
  this.datacenters = {};
//  this.infrastructure = new (infrastructure);
  console.log('instantiated');
  }
}

caas.prototype.myaccount = function(callback) {
  console.log('myaccount');
  var options_auth={user:this.username,password:this.password};
  var args = { headers:{"Content-Type": "application/xml"} };
  var rest = new Rest(options_auth);
  rest.get(this.url+"/oec/0.9/myaccount", args, function(data, response) {
    if (response.statusCode != 200) {
      console.log(response.statusMessage);
      this.emit('error')
    } else {
      str = data.toString();
      var i = str.indexOf('orgId>');
      str = str.substring(i+5);
			this.orgId = str.substring(1,str.indexOf('</'));
			console.log('authenticated as '+this.username+ ' / orgId : '+this.orgId);
      
      this.datacenters = caas_datacenters(
        {url:this.url,username:this.username,password:this.password,orgId:this.orgId}, 
        {}
      );
      this.datacenters.then(this.emit('connected'));
		}
		}.bind(this));
};

// export the class
module.exports = caas;