var Rest = require('node-rest-client').Client;

function caas_server(conn,init) {

  Object.defineProperty(this, "conn", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: conn
  });

  for (i in init) {
        this[i] = init[i];
    }
    return this;
  }

    // class methods
  caas_server.prototype.start = function() {
    console.log('starting server : '+this.name);
    var options_auth={user:this.conn.username,password:this.conn.password};
    var args = { 
      headers:{"Content-Type": "application/json"},
      data: { id: this.id },
    };
    var rest = new Rest(options_auth);
    rest.post(this.conn.url+"/caas/2.5/"+this.conn.orgId+"/server/startServer", args, 
          function(data, response){
            console.log(data);
      });
  };

  caas_server.prototype.powerOff = function() {
    console.log('stopping server : ' + this.name + '('+this.id+')');
    var options_auth={user:this.conn.username,password:this.conn.password};
    var args = { 
      headers:{"Content-Type": "application/json"},
      data: { id: this.id },
    };
    var rest = new Rest(options_auth);
    rest.post(this.conn.url+"/caas/2.5/"+this.conn.orgId+"/server/powerOffServer", args, 
          function(data, response){
            console.log(data);
      });
  };

  caas_server.prototype.delete = function() {
    console.log('deleting server : ' + this.name + '('+this.id+')');
    var options_auth={user:this.conn.username,password:this.conn.password};
    var args = { 
      headers:{"Content-Type": "application/json"},
      data: { id: this.id },
    };
    var rest = new Rest(options_auth);
    rest.post(this.conn.url+"/caas/2.5/"+this.conn.orgId+"/server/deleteServer", args, 
          function(data, response){
            console.log(data);
      });
  };

// export the class
module.exports = caas_server;