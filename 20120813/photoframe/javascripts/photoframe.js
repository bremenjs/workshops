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

    var $slideshowButton = document.querySelector('#slideshow-action')
      , $searchbox       = document.querySelector('#search-term')
      , that             = this
      , privates         = {};

    // DOCME
    privates.getSearchTerm = function () {
        return $searchbox.value || 'New York';
    };

    // DOCME
    $slideshowButton.addEventListener('click', function (e) {
        var searchTerm = privates.getSearchTerm();

        e.preventDefault();

        Photos.search(searchTerm, function (photos) {
            that.showSlideshow(photos);
        });
    });
};

// DOCME
Photoframe.prototype.showSlideshow = function (photos) {
    var slideshow = new Slideshow(photos);

    slideshow.show();
};