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

    var $gridButton      = document.querySelector('#grid-action')
      , $slideshowButton = document.querySelector('#slideshow-action')
      , $searchbox       = document.querySelector('#search-term')
      , that             = this
      , privates         = {};

    // DOCME
    privates.getSearchTerm = function () {
        return $searchbox.value || 'New York';
    };

    // DOCME
    $gridButton.addEventListener('click', function (e) {
        var searchTerm = privates.getSearchTerm();

        e.preventDefault();

        Photos.search(searchTerm, function (photos) {
            that.showGrid(photos);
        });
    });

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
Photoframe.prototype.showGrid = function (photos) {
    var grid = new Grid(photos);

    grid.show();
};

// DOCME
Photoframe.prototype.showSlideshow = function (photos) {
    var slideshow = new Slideshow(photos);

    slideshow.show();
};