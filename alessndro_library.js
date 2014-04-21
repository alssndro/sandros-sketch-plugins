var alessndro = alessndro || {};

alessndro.common = {
  sayHello: function(name) {
    log("Goodbye " + name)
  },
  processAllLayers: function(layers, callback) {
    for (var i = 0; i < [layers length]; i++) {
      var layer = layers[i]

      if ([layer isMemberOfClass:[MSLayerGroup class]]) {
        callback(layer)
        // Also unlock all the child layers/groups
        alessndro.common.processAllLayers([layer layers], callback)
      }
      else {
        // Must be a singular layer, so unlock
        callback(layer)
      }
    }
  }
};
