# jQuery Amplified UI Dialog Maximize Extension
*For jQuery UI Dialog*  
*Version 1.1*

*Copyright 2012, Tony Kramer*  
*Dual licensed under the MIT or GPL Version 2 licenses.*  
[GPL License](https://github.com/flamewave/jquery-ui-dialog-maximize/raw/master/GPL-LICENSE.txt)  
[MIT License](https://github.com/flamewave/jquery-ui-dialog-maximize/raw/master/MIT-LICENSE.txt)

For documentation and for the latest version, see:  
https://github.com/flamewave/jquery-ui-dialog-maximize

## Description

This is an extension for the jQuery UI Dialog widget that adds the ability to maximize and restore the dialog.

## Dependencies
* jQuery (1.4.2 and up)
* jQuery-ui (1.8.5 and up - core, widget, dialog)

## Use
```javascript
$("#dialog").dialog({ maximize: true });
```

```html
<div id="dialog">My Dialog Content</div>
```

## API Documentation

### Available Options
*(and their default values)*  
The following options are added to the existing options of the dialog widget:

* **maximize:** `false`  
    Indicates if the dialog should support being maximized.

* **openMaximized:** `false`  
    Indicates if the dialog should be opened maximized.

* **maximizeFx:** `{ easing: null, duration: "normal", complete: null }`  
    Animation options for when the dialog is maximized.
    * effect - Name of jQuery animation.
    * duration - Animation duration/speed.
    * callback - A function to call once the animation is complete.

* **restoreFx:** `{ easing: null, duration: 'normal', complete: null }`  
    Animation options for when the dialog is restored.
    * effect - Name of jQuery animation.
    * duration - Animation duration/speed.
    * callback - A function to call once the animation is complete.

### Events
The following events are added to the existing events of the dialog widget:

* **maximized**  
    Raised when the dialog is maximized.

* **restored**  
    Raised when the dialog is restored.

### Methods
The following methods are added to the existing methods of the dialog widget:

* **maximize()**  
    Maximizes the dialog. Chainable.

* **restore()**  
    Restores the dialog to it's original size if it is currently maximized. Chainable.

* **isMaximized()**  
    Gets a value indicating if the dialog is currently maximized.

### Globalization
There is a globalization object defined that can be used to set default globalization options so that they do not need to be specified for every instance of the dialog widget. They are as follows:

```javascript
$.ui.dialog.maximizeExtension.globalization = {
    // Tooltip of the maximize button.
    textMaximize: "Maximize",

    // Tooltip of the restore button.
    textRestore: "Restore"
}
```