// Namespaced library of functions common across multiple plugins
var alessndro = alessndro || {};

alessndro.common = {
  processAllLayers: function(layers, callback) {
    for (var i = 0; i < [layers length]; i++) {
      var layer = layers[i]

      if ([layer isMemberOfClass:[MSLayerGroup class]]) {
        callback(layer)
        // Also process child layers/groups
        alessndro.common.processAllLayers([layer layers], callback)
      }
      else {
        callback(layer)
      }
    }
  },
  getArtboardBaselineInterval: function() {
    var artboard_ruler = [[[doc currentPage] currentArtboard] verticalRulerData]
    var baseline = [artboard_ruler guideAtIndex: 1] - [artboard_ruler guideAtIndex: 0]

    return [artboard_ruler guideAtIndex: 1]
  },
  // Calculates and returns the closest possible coefficient of the value
  // passed into the function (with regards to the current baseline grid)
  // e.g if current baseline grid's intervals are 20px, and
  // you pass 24, this function will return 1. If you pass 35,
  // it will return 2
  calculateCoefficient: function(value) {
    var coefficient
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()
    if (value % baseline_interval === 0) {
      coefficient = value / baseline_interval
    }
    else {
      if (value % baseline_interval > (baseline_interval / 2)) {
        coefficient = Math.ceil(value / baseline_interval)
      }
      else {
        coefficient = Math.floor(value / baseline_interval)
      }
    }
    return coefficient === 0 ? 1 : coefficient
  }
};

alessndro.size = {
  resizeHeightTo: function(item, new_size) {
    var current_height = [[item frame] height]

    // Have to do it this way since there is no method to set the height directly
    [[item frame] subtractHeight: current_height - 1]
    [[item frame] addHeight: new_size - 1]
  }
}

alessndro.alignment = {
  moveToYPosition: function(item, new_y_pos) {
    var current_y_pos = [[item frame] y]
    [[item frame] subtractY: current_y_pos - 1]
    [[item frame] addY: new_y_pos - 1]
  },
  positionTopOnBaseline: function(item) {
    var item_y_pos = [[item frame] y]
    var new_y_pos_coefficient = alessndro.common.calculateCoefficient(item_y_pos)
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()
    alessndro.alignment.moveToYPosition(item, baseline_interval * new_y_pos_coefficient)
  },
  positionBottomOnBaseline: function(item) {
    var item_height = [[item frame] height]
    var item_y1_pos = [[item frame] y]
    var item_y2_pos = item_y1_pos + item_height

    var new_y_pos_coefficient = alessndro.common.calculateCoefficient(item_y2_pos)
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()
    var new_y_pos = (new_y_pos_coefficient * baseline_interval) - item_height

    alessndro.alignment.moveToYPosition(item, new_y_pos)
  },
  positionTopOnNextBaseline: function(item) {
    var item_y_pos = [[item frame] y]
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()

    // Revert to the simpler method of calculating the coefficient since we don't
    // care which baseline the item is closer to as we always want to move it to the previous one
    var new_y_pos_coefficient = coefficient = Math.floor(item_y_pos / baseline_interval)
    var new_y_pos = (baseline_interval * new_y_pos_coefficient) + baseline_interval
    alessndro.alignment.moveToYPosition(item, new_y_pos)
  },
  positionBottomOnNextBaseline: function(item) {
    var item_height = [[item frame] height]
    var item_y1_pos = [[item frame] y]
    var item_y2_pos = item_y1_pos + item_height
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()
    
    // Revert to the simpler method of calculating the coefficient since we don't
    // care which baseline the item is closer to as we always want to move it to the previous one
    var new_y_pos_coefficient = coefficient = Math.floor(item_y2_pos / baseline_interval)
    var new_y_pos = ((new_y_pos_coefficient * baseline_interval) - item_height) + baseline_interval
    alessndro.alignment.moveToYPosition(item, new_y_pos)
  },
  positionTopOnPreviousBaseline: function(item) {
    var item_y_pos = [[item frame] y]
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()

    // Revert to the simpler method of calculating the coefficient since we don't
    // care which baseline the item is closer to as we always want to move it to the previous one
    var new_y_pos_coefficient = coefficient = Math.ceil(item_y_pos / baseline_interval)
    var new_y_pos = (baseline_interval * new_y_pos_coefficient) - baseline_interval
    alessndro.alignment.moveToYPosition(item, new_y_pos)
  },
  positionBottomOnPreviousBaseline: function(item) {
    var item_height = [[item frame] height]
    var item_y1_pos = [[item frame] y]
    var item_y2_pos = item_y1_pos + item_height
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()
    
    // Revert to the simpler method of calculating the coefficient since we don't
    // care which baseline the item is closer to as we always want to move it to the previous one
    var new_y_pos_coefficient = coefficient = Math.floor(item_y2_pos / baseline_interval)
    var new_y_pos = ((new_y_pos_coefficient * baseline_interval) - item_height) - baseline_interval
    alessndro.alignment.moveToYPosition(item, new_y_pos)
  }
}
