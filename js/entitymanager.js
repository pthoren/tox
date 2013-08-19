var tox = tox || {};

tox.EntityManager = function() {
  this.entities = new Array();
  this.drawDebug = true;
};

tox.EntityManager.prototype.update = function() {
  for(var i = 0; i < this.entities.length; i++) {
    this.entities[i].update();
    for(var j = 0; j < this.entities.length; j++) {
      if(i===j) {
        continue;
      }
      // Inter-entity collision code may go here.
    }
  }
  for(var i = 0; i < this.entities.length; i++) {
    if(this.entities[i].die === true) {
      delete(this.entities[i])
    }
  }
  this.entities = this.entities.filter(function(){return true});
};


tox.EntityManager.prototype.draw = function(context) {
  for(var i = 0; i < this.entities.length; i++) {
    this.entities[i].draw(context);
  }
  /*if(this.drawDebug) {
    for(var i = 0; i < this.entities.length; i++) {
      this.entities[i].drawDebug(context);
    }
  }*/
};

tox.EntityManager.prototype.add = function(entity) {
  this.entities.push(entity);
};


tox.EntityManager.prototype.clear = function(context) {
  this.entities = new Array();
}
