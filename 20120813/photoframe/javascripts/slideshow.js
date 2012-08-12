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
      , duration = 2000  // Anzeigedauer bis zum Bildwechsel
      , that     = this
      , $root    = null
      , $photo   = null;

    // "Private" Methode, die das UI der Slideshow erstellt (Erstellung
    // von DOM-Elementen, Zuweisung der IDs und Klassen, etc.).
    privates.createUI = function () {
        var $close    = document.createElement('a')
          , $headline = document.createElement('h1')
          , $text;

        $root = document.createElement('div');
        $root.setAttribute('id', 'slideshow');

        $text = document.createTextNode('Slideshow aller Fotos mit dem Suchbegriff "' + searchTerm + '"');
        $headline.appendChild($text);

        $close.setAttribute('href', '#');
        $close.setAttribute('class', 'close');
        $text = document.createTextNode('Beenden');
        $close.appendChild($text);

        $photo = document.createElement('img');

        $root.appendChild($headline);
        $root.appendChild($close);
        $root.appendChild($photo);

        document.querySelectorAll('body')[0].appendChild($root);

        // Event-Handler, der ausgefuehrt wird, wenn der Benutzer auf den Button
        // zur Beendigung der Slideshow klickt.
        $close.addEventListener('click', function (e) {
            e.preventDefault(); // Standard-Verhalten des Browsers unterbinden. Der Browser wuerde sonst dem Link folgen.

            that.destroy();
        });
    };

    // "Private" Methode zur Ermittlung des Index des gerade sichtbaren Fotos.
    // Liefert "-1" zurueck, wenn bisher noch kein Fotos sichtbar ist.
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

    // "Private" Methode zur Ermittlung des naechsten Fotos, welches
    // angezeigt werden sollte.
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

    // "Oeffentliche" Methode. Anzeigen der Slideshow. Erstellt das UI.
    this.show = function () {
        privates.createUI();

        $root.style.display = 'block';
    };

    // "Oeffentliche" Methode. Ausblenden der Slideshow.
    // Entfernt das UI und beendet die Aktualisierung der Bilder.
    this.destroy = function () {

        // Um ein Element aus dem DOM loeschen zu koennen, muss erst
        // einmal das Eltern-Element ermittelt werden. Ein Loeschen ist
        // nur ueber diesen Weg moeglich.
        var parent = $root.parentNode;
        parent.removeChild($root);

        window.clearInterval(switcher);
    };    

    // "Oeffentliche" Methode.
    // Startet das Intervall zur Aktualisierung der Bilder.
    this.play = function () {
        var that = this;

        switcher = window.setInterval(function () {
            var photo = privates.getNextPhoto();

            $photo.setAttribute('src', photo.large);
        }, duration);
    };
};