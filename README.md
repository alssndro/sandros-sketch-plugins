# Sketch Plugins

A random assortment of Sketch plugins.

I have heavily commented these plugins so that others can learn (and also to refresh
my memory on how to write JSTalk in x weeks/months/years time!)

If you have any suggestions for plugin ideas then feel free to open an issue.

Warning: **Always** save often when using any plugins. I have noticed that assigning a plugin to a
keyboard shortcut and spamming it is a great way to make Sketch crash. So be careful when using a plugin
that you expect to use multiple times over a very short period of time (i.e. four times a second)

- [Installation](#Installation)
- [Compatibility](#Compatibility)
- [Plugin Previews](#Plugin Previews)

## Installation

To install all plugins, [download](https://github.com/alessndro/sketch-plugins/zipball/master) them all first, unzip the archive, and place the folder contents in the root of your Sketch Plugins directory ``~/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Application Support/sketch/Plugins``

To install only a selection of plugins, you will first need to download and place the library file [alessndro_library.js](alessndro_library.js) in the root of your Sketch Plugins directory. This is very important as all plugins rely on its functionality.

Then, download your selected plugins and double-click the file, or alternatively, drag and drop the file onto the Sketch app icon. This will automatically copy the plugin to your Sketch Plugins folder.

Further instructions can be found on the official [Sketch Plugin help page](http://bohemiancoding.com/sketch/support/developer/01-introduction/01.html).

## Compatibility

All plugins are developed and tested in Sketch 3, however, the official Sketch Plugin documentation
states that [the API is backwards compatible with Sketch 2.](http://bohemiancoding.com/sketch/support/developer/03-reference/00.html)

## How do I use a plugin as a keyboard shortcut?

First install the plugin. Then in OS X navigate to Settings > Keyboard > Shortcuts. In the left hand menu select "App Shortcuts", select "All Applications" in the right hand menu and click the plus icon.

A new menu will appear allowing you to select Sketch as the Application, enter the name of the plugin under Menu Title, and finally the shortcut you'd like to use.

## Plugin Previews

### Alignment

All of these plugins revolve around sizing/aligning elements to a Baseline Grid.

You will need to have at least 2 vertical guides on your Artboard in order for the
plugin to calculate the intervals of your Baseline Grid.

The easiest way to establish a baseline grid is to use the ``Draw Baseline Grid Guides`` plugin.

The plugins are quite clever in that they will align/resize elements to the closest
grid line.

### Draw Baseline Grid Guides

After entering the desired interval, the plugin will automatically draw vertical guides on the current
Artboard, up to the height of the Artboard.

![Draw Baseline Grid Guides](plugin previews/draw baseline grid guides.gif)

### Clear All Guides

Clears all guides on the current Artboard.

![Clear All Guides](plugin previews/clear all guides.gif)

### Resize and Align to Baseline Grid

Resizes and aligns currently selected elements to fit the Baseline Grid of the current Artboard.

![Resize and Align to Baseline Grid](plugin previews/resize and align.gif)

Works on multiple elements too:

![Resize and Align mutliple to Baseline Grid](plugin previews/resize and align mutliple.gif)

### Resize to Baseline Grid

Resizes currently selected elements to fit the Baseline Grid of the current Artboard.

![Resize to Baseline Grid](plugin previews/resize.gif)

For text layers it sets the line height to fit the Baseline grid instead.

**This does not align the the text to the Baseline Grid (the gif is a bit deceptive). This is
because there is no way to calculate the x-height of the text. After running the plugin you
will have to move the text layer to fit on the baseline manually.**

![Set Text to Baseline Grid](plugin previews/set text to baseline grid.gif)

Also works for text larger than the interval of the Baseline Grid:

![Set Text to Baseline Grid](plugin previews/set large text to baseline grid.gif)

### Align Top to Baseline Grid

Aligns the bottom of the currently selected elements to the Baseline Grid of the current Artboard.

![Align Top to Baseline Grid](plugin previews/align top to grid.gif)

### Align Bottom to Baseline Grid

Aligns the bottom of the currently selected elements to the Baseline Grid of the current Artboard.

![Align Bottom to Baseline Grid](plugin previews/align bottom to grid.gif)

### Align Top to Next Baseline Grid

Aligns the top of the currently selected elements to the next Baseline Grid Line of the current Artboard.

(plugin used multiple times in preview gif)

![Align Top to Next Baseline Grid Line](plugin previews/align top to next grid line.gif)

### Align Top to Previous Baseline Grid

Aligns the top of the currently selected elements to the previous Baseline Grid Line of the current Artboard.

(plugin used multiple times in preview gif)

![Align Top to Previous Baseline Grid Line](plugin previews/align top to previous grid line.gif)

### Align Bottom to Next Baseline Grid

Aligns the bottom of the currently selected elements to the next Baseline Grid Line of the current Artboard.

(plugin used multiple times in preview gif)

![Align Bottom to Next Baseline Grid Line](plugin previews/align bottom to next grid line.gif)

### Align Bottom to Previous Baseline Grid

Aligns the bottom of the currently selected elements to the previous Baseline Grid Line of the current Artboard.

(plugin used multiple times in preview gif)

![Align Bottom to Previous Baseline Grid Line](plugin previews/align bottom to previous grid line.gif)
