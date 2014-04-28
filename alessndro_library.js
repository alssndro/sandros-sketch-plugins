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
  },
  alert: function(title, message) {
    var app = [NSApplication sharedApplication]
    [app displayDialog: message withTitle: title]
  }
};

alessndro.size = {
  resizeHeightTo: function(item, new_size) {
    var current_height = [[item frame] height]

    // Have to do it this way since there is no method to set the height directly
    [[item frame] subtractHeight: current_height - 1]
    [[item frame] addHeight: new_size - 1]
  },
  resizeToBaselineGrid: function(item) {
    var item_height = [[item frame] height]
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()
    var new_height_coefficient = alessndro.common.calculateCoefficient(item_height)
    var new_height = baseline_interval * new_height_coefficient
    alessndro.size.resizeHeightTo(item, new_height)
  }
};

alessndro.text = {
  // Set a text layer's line spacing so that it aligns to the current baseline
  // grid
  setLineSpacingToBaselineGrid: function(text_layer) {
    var baseline_interval = alessndro.common.getArtboardBaselineInterval()
    if ([text_layer fontSize] > baseline_interval) {
      [text_layer setLineSpacing: (Math.ceil([text_layer fontSize] / baseline_interval) * baseline_interval)]
    } else {
      [text_layer setLineSpacing: baseline_interval]
    }
  }
};

alessndro.alignment = {
  moveToXPosition: function(item, new_x_pos) {
    var current_x_pos = [[item frame] x]
    [[item frame] subtractX: current_x_pos - 1]
    [[item frame] addX: new_x_pos - 1]
  },
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
};

// Scales from http://modularscale.com/
alessndro.type = {
  scales: {
    "15:16 – Minor Second": 1.067,
    "8:9 – Major Second": 1.125,
    "5:6 – Minor Third": 1.2,
    "4:5 – Major Third": 1.25,
    "3:4 – Perfect Fourth": 1.333,
    "1:√2 – Aug. Fourth / Dim. Fifth": 1.414,
    "2:3 – Perfect Fifth": 1.5,
    "5:8 – Minor Sixth": 1.6,
    "1:1.618 – Golden Section": 1.618,
    "3:5 – Major Sixth": 1.667,
    "9:16 – Minor Seventh": 1.778,
    "8:15 – Major Seventh": 1.875,
    "1:2 – Octave": 2,
    "2:5 – Major Tenth": 2.5,
    "3:8 – Major Eleventh": 2.667,
    "1:3 – Major Twelfth": 3,
    "1:4 – Double Octave": 4,
  },
  drawTypographicScale: function(base_text_layer, ratio, step) {
    // Keep track of all text layers as we build the scale
    var text_layers = [base_text_layer]

    for (var i=0; i < step; i++) {
      // The previous text layer in the overall scale
      var previous_text_layer = text_layers[text_layers.length - 1]

      // API does not support direct creation of text layers, so have
      // to use duplication
      var new_text_layer = [previous_text_layer duplicate]

      var previous_font_size = [previous_text_layer fontSize]
      [new_text_layer setFontSize: previous_font_size * ratio]

      // Position the new text layer nicely
      var previous_text_height = [previous_text_layer lineSpacing]
      var new_text_y_pos = [[previous_text_layer frame] y] + previous_text_height
      alessndro.alignment.moveToYPosition(new_text_layer, new_text_y_pos)

      text_layers.push(new_text_layer)
    }

    // Prints the scale (for debugging)
    // for(var i = 0; i < text_layers.length; i++) {
    //   var current_text_layer = text_layers[i]
    //   log(i + ": " + [current_text_layer fontSize])
    // }
  }
};

alessndro.colour = {
  createColourFromHex: function(hex_string, alpha_value) {
    return [MSColor colorWithHex: "#" + hex_string alpha: alpha_value] 
  },
  // Draws a palette on the artboard.
  // Pass in a base_layer which is used for sizing each colour element, and
  // and array of MSColor objects that will make up the palette
  drawColourPalette: function(base_layer, colours_array) {

    var first_colour = colours_array[0]
    var palette_layers = [base_layer]

    var first_fill = [[[base_layer style] fills] firstObject]
    [first_fill setColor: first_colour]

    for(var i = 1; i < colours_array.length; i++) {
      var previous_layer = palette_layers[palette_layers.length -1]
      var new_colour_layer = [previous_layer duplicate]

      var new_colour = colours_array[i]
      [[[[new_colour_layer style] fills] firstObject] setColor: new_colour]

      var current_x_pos = [[new_colour_layer frame] x]
      var new_x_position = current_x_pos + [[new_colour_layer frame] width]
      alessndro.alignment.moveToXPosition(new_colour_layer, new_x_position)

      palette_layers.push(new_colour_layer)
    }
  },
  // Creates and returns array of MSColor objects. Each subsequent colour has the 
  // same hue/brightness/alpha, but the saturation is reduced by the amount passed
  // to the function
  createMonochromePalette: function(base_colour, reduction) {
    var mono_palette = [base_colour]

    var colour_in_hsb = [base_colour HSBColor]

    // Monochrome palette, so these values stay the same
    var colour_in_hsb_hue = [colour_in_hsb hueComponent]
    var colour_in_hsb_brightnesss = [colour_in_hsb brightnessComponent]
    var colour_in_hsb_alpha = [colour_in_hsb alphaComponent]

    for(var i = 0; i < 8; i++) {
      var previous_colour = mono_palette[mono_palette.length -1]
      var previous_colour_sat = [[previous_colour HSBColor] saturationComponent]

      var lighter_sat = previous_colour_sat * reduction

      var new_colour = [MSColor colorWithHue:colour_in_hsb_hue saturation:lighter_sat brightness:colour_in_hsb_brightnesss alpha: colour_in_hsb_alpha]
      var new_colour_hex = [new_colour hexValue]
      mono_palette.push(new_colour)
    }
    return mono_palette
  },
  createMonochromePalette2: function(base_colour) {
    var mono_palette = [base_colour]

    var colour_in_hsb = [base_colour HSBColor]

    // Monochrome palette, so these values stay the same
    var colour_in_hsb_hue = [colour_in_hsb hueComponent]
    var colour_in_hsb_brightnesss = [colour_in_hsb brightnessComponent]
    var colour_in_hsb_alpha = [colour_in_hsb alphaComponent]

    var saturation_values = [100,100,100,70,70]
    var brightness_values = [100,80,50,100,50]

    for(var i = 0; i < saturation_values.length; i++) {
      var new_sat = saturation_values[i] /100
      var new_brightness = brightness_values[i] /100
      log(new_sat + " " + new_brightness)
      var new_colour = [MSColor colorWithHue: colour_in_hsb_hue saturation:new_sat brightness: new_brightness alpha: colour_in_hsb_alpha]
      log(new_colour)
      mono_palette.push(new_colour)
    }
    return mono_palette
  }
};

alessndro.network = {
  makeRequest: function(url, method_name) {
    var request_url = [NSURL URLWithString: url];

    var request = NSMutableURLRequest.requestWithURL_cachePolicy_timeoutInterval(request_url, NSURLRequestReloadIgnoringLocalCacheData, 60);
    request.setHTTPMethod_(method_name);

    var response = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
    response_text = [[NSString alloc] initWithData:response encoding:NSUTF8StringEncoding];
    return response_text;
  }
};

alessndro.colourlovers = {
  // Creates and returns an array of MSColor objects based on a API JSON response
  // of hex values
  createPaletteFromJSON: function(json_response) {

    var parsed_response = JSON.parse(json_response)
    var no_of_palettes = parsed_response.length
    var random_palette_index = Math.floor(Math.random() * no_of_palettes)
    var random_palette = parsed_response[random_palette_index]

    var colours = []
    var palette_colour_list = random_palette["colors"]

    for(var i = 0; i < palette_colour_list.length; i++) {
      var colour = alessndro.colour.createColourFromHex(palette_colour_list[i], 1.0)
      colours.push(colour)
    }

    return colours
  }
};
