// ==UserScript==
// @name        Drawceptional
// @version     0.1.4dev
// @description Adds various features while drawing on Drawception.
// @author      Paperfold <dreaming.paperfold@gmail.com>
// @namespace   Paperfold
// @license     WTFPL
// @icon        https://github.com/Paperfold/Drawceptional/raw/master/icon.png
// @icon64      https://github.com/Paperfold/Drawceptional/raw/master/icon64.png
// @updateURL   https://raw.github.com/Paperfold/Drawceptional/master/drawceptional.meta.js
// @match       http://drawception.com/play/
// ==/UserScript==

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 


var options = {'Double resolution': [true],
               'No time limit': [true],
               'Check for updates': [true],
               'Advertise': [true],
               'Custom background colour': [true, '#0000FF'],
               'Enter to submit when describing': [true]};
           
function id(id) {
    return document.getElementById(id);
}

if (options['Check for updates'][0]) {
    // GM_notification("There's an update available for Drawceptional! Click here to update now.", 'Update checker', null, function() {GM_openInTab('https://raw.github.com/Paperfold/Drawceptional/master/drawceptional.user.js');})
}

if (options['No time limit'][0]) {
    // Ugly hack, but preserves sandbox security
    location.assign("javascript:$('#timeleft').countdown('pause'); void(0)");
    id('timeleft').style.display = 'none';
}

// Check if we're drawing or describing
if (id('drawingCanvas')) {
    // We're drawing
    
    var drawingCanvas = id('drawingCanvas');
    
    if (options['Double resolution'][0]) {
        id('gameForm').style.width = '700px';
        drawingCanvas.setAttribute('width', '600');
        drawingCanvas.setAttribute('height', '500');
        // context gets bent out of shape if we do this, so we have to reinitialize
        location.assign('javascript:context = canvas.getContext("2d"); context.strokeStyle = defaultColor; context.lineJoin = defaultShape; context.lineWidth = defaultWidth; void(0)');
    }
    
    if (options['Custom background colour'][0]) {
        var colour = options['Custom background colour'][1];
        var rgbColour = 'rgb(255, 0, 0)'; //'rgb(' + colour.slice(1, 3) + ', ' + colour.slice(3, 5) + ', ' + colour.slice(5, 7) + ')';
        location.assign('javascript:context.fillStyle = "' + rgbColour + '"; context.fillRect(0, 0, canvas.width, canvas.height); void(0)');
    }
    
} else {
    // We're describing
    
    if (options(['Enter to submit when describing'][0])) {
        id('title').setAttribute('onkeydown', 'if (event.keyCode == 13) { savePanelText(); }');
    }
    
}