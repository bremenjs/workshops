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

var Slideshow = function (searchTerm, photoItems) {
    var photos   = photoItems
      , privates = {}
      , switcher = null  // ID des setInterval
      , duration = 1000  // Anzeigedauer bis zum Bildwechsel
      , that     = this
      , $root    = null
      , $photo   = null;

    // DOCME
    privates.createUI = function () {
        var $close    = document.createElement('a')
          , $headline = document.createElement('h1')
          , $text;

        $root = document.createElement('div')

        $text = document.createTextNode('Slideshow aller Begriffe mit ' + searchTerm);
        $headline.appendChild($text);

        $close.setAttribute('href', '#');
        $text = document.createTextNode('Beenden');
        $close.appendChild($text);

        $photo = document.createElement('img');

        $root.appendChild($headline);
        $root.appendChild($close);
        $root.appendChild($photo);

        document.querySelectorAll('body')[0].appendChild($root);

        $close.addEventListener('click', function (e) {
            e.preventDefault();

            that.destroy();
        });
    };

    // DOCME
    privates.getCurrentPhotoIndex = function () {
        var i = 0
          , available = false;

        search: for (i; i < photos.length; i++) {
            var photo = photos[i];

            if (photo.selected) {
                available = true;
                break search;
            }
        }

        return (!available) ? -1 : i;
    };

    // DOCME
    privates.getNextPhoto = function () {
        var currentPhotoIndex = privates.getCurrentPhotoIndex()
          , photo = photos[currentPhotoIndex]
          , isLast = (currentPhotoIndex === (photos.length - 1));

        // Bisher kein Foto ausgewaehlt oder das letzte Foto?
        // Dann ist das nächste Foto das erste Foto
        if (!photo) {
            photo = photos[0];

        } else if (isLast) {
            delete photo.selected;

            photo = photos[0];

        } else {
            delete photo.selected; // Loeschen von Eigenschaften.

            photo = photos[currentPhotoIndex + 1];
        }

        photo.selected = true; // Dynamische Objekt-Erweiterung

        return photo;
    };

    // DOCME
    this.show = function () {
        privates.createUI();

        $root.style.display = 'block';
    };

    // DOCME
    this.destroy = function () {
        var parent = $root.parentNode;
        parent.removeChild($root);

        window.clearInterval(switcher);
    };    

    // DOCME
    this.play = function () {
        var that = this;

        switcher = window.setInterval(function () {
            var photo = privates.getNextPhoto();

            $photo.setAttribute('src', photo.large);
        }, duration);
    };
};