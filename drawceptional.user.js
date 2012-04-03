// ==UserScript==
// @name        Drawceptional
// @version     0.1.3.3
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


options = {'Double resolution': true,
           'No time limit': true};

var drawing_canvas = document.getElementById('drawingCanvas');

if (options['No time limit']) {
    // Ugly hack, but preserves sandbox security
    location.assign("javascript:$('#timeleft').countdown('pause'); void(0)");
    document.getElementById('timeleft').style.display = 'none';
}

// Check if we're drawing or describing
if (document.getElementById('drawingCanvas')) {
    // We're drawing
    if (options['Double resolution']) {
        document.getElementById('gameForm').style.width = '700px';
        drawing_canvas.width = 600;
        drawing_canvas.height = 500;
    }
}
else {
    // We're describing
}