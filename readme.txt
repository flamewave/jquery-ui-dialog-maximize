/*!
* jQuery UI Dialog Maximize Extension v1.1
*
* Copyright 2011, Tony Kramer
* Dual licensed under the MIT or GPL Version 2 licenses.
* https://github.com/flamewave/jquery-ui-dialog-maximize/raw/master/GPL-LICENSE.txt
* https://github.com/flamewave/jquery-ui-dialog-maximize/raw/master/MIT-LICENSE.txt
*
* For documentation and for the latest version, see:
* https://github.com/flamewave/jquery-ui-dialog-maximize
*/

This is an extension for the jQuery UI Dialog widget that adds the ability to maximize and restore the dialog.

****************
* Dependencies *
****************
jQuery (1.4.2 and up)
jQuery UI (1.8.5 and up - core, widget, dialog)

*******
* Use *
*******
JavaScript:
-----------
$('#dialog').dialog({ maximize: true });

HTML:
-----
<div id="dialog">My Dialog Content</div>

*****************
* Documentation *
*****************

---------------------------------------------
Available Options (and their default values):
---------------------------------------------

maximize: false
    Indicates if the dialog should support being maximized.

openMaximized: false
    Indicates if the dialog should be opened maximized.

maximizeFx: { easing: null, duration: 'normal', complete: null }
    Animation options for when the dialog is maximized.
        - effect   - Name of jQuery animation.
        - duration - Animation duration/speed.
        - callback - A function to call once the animation is complete.

restoreFx: { easing: null, duration: 'normal', complete: null }
    Animation options for when the dialog is restored.
        - effect   - Name of jQuery animation.
        - duration - Animation duration/speed.
        - callback - A function to call once the animation is complete.

------
Events
------
maximized
    Raised when the dialog is maximized.

restored
    Raised when the dialog is restored.

-------
Methods
-------
dialog('maximize')
    Maximizes the dialog. Chainable.

dialog('restore')
    Restores the dialog to it's original size if it is currently maximized. Chainable.

dialog('isMaximized')
    Gets a value indicating if the dialog is currently maximized.

-------------
Globalization
-------------
There is a globalization object defined that can be used to set default globalization options so that they do not
need to be specified for every instance of the dialog widget. They are as follows:

$.ui.dialog.maximizeExtension.globalization

    textMaximize: 'Maximize',
        Tooltip of the maximize button.

    textRestore: 'Restore'
        Tooltip of the restore button.