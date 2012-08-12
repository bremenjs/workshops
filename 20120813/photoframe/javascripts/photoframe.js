/*!
 * Bremen.js - Workshop #1
 *
 * Photoframe
 *
 * Copyright(c) 2012 Bremen, Germany
 *
 * Authors:
 *
 *     Lukas Magedanz <lukas.magedanz@gmail.com>
 *     André König <andre.koenig@gmail.com>
 *
 * MIT Licensed
 *
 */

"use strict";

var Photoframe = function () {

    // Initialisierung der "privaten" Eigenschaften.
    var $searchform = document.querySelector('#search')  // Element mit der ID 'search' aus dem DOM laden.
      , $searchbox  = document.querySelector('#term')    // Element mit der ID 'term' aus dem DOM laden.
      , that        = this
      , privates    = {};

    // "Private" Methode um den Begriff aus dem Suchfeld zu laden.
    // Wenn durch den Benutzer nichts eingegeben wurde, so wird 'New York' als Suchbegriff verwendet.
    privates.getSearchTerm = function () {
        return $searchbox.value || 'New York';
    };

    // Registrierung des Event-Handlers, der ausgefuehrt wird, wenn das Formular mit dem
    // Suchbegriff abgeschickt wird.
    $searchform.addEventListener('submit', function (e) {
        var searchTerm = privates.getSearchTerm();

        e.preventDefault();

        // Laden aller Fotos zu dem eingegebenen Suchbegriff.
        Photos.search(searchTerm, function (photos) {
            if (photos.length === 0) {
                window.alert('Zu diesem Suchbegriff wurden keine Fotos gefunden.');
            } else {
                that.showSlideshow(searchTerm, photos);
            }
        });
    });
};

// Anzeige der Slideshow zu einem Suchbegriff und den zugehoerigen Bildern.
Photoframe.prototype.showSlideshow = function (searchTerm, photos) {
    var slideshow = new Slideshow(searchTerm, photos);

    slideshow.show();

    slideshow.play();
};