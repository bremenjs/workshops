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

    var $searchform = document.querySelector('#search')
      , $searchbox  = document.querySelector('#term')
      , that        = this
      , privates    = {};

    // DOCME
    privates.getSearchTerm = function () {
        return $searchbox.value || 'New York';
    };

    // DOCME
    $searchform.addEventListener('submit', function (e) {
        var searchTerm = privates.getSearchTerm();

        e.preventDefault();

        Photos.search(searchTerm, function (photos) {
            if (photos.length === 0) {
                window.alert('Zu diesem Suchbegriff wurden keine Fotos gefunden.');
            } else {
                that.showSlideshow(searchTerm, photos);
            }
        });
    });
};

// DOCME
Photoframe.prototype.showSlideshow = function (searchTerm, photos) {
    var slideshow = new Slideshow(searchTerm, photos);

    slideshow.show();
    slideshow.play();
};