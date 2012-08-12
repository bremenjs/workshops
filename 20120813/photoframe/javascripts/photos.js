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

var Photos = {
    search : function (term, callback) {

        term = term || 'Bremen';

        var request = new XMLHttpRequest()
           , key    = '780d1b4f45e56c89fb8adeb8429bf09b'
           , url    = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&text=' + term + '&api_key=' + key + '&format=json';

        request.addEventListener('load', function (evt) {
            var response = evt.target.response
              , jsonFlickrApi;

            // Securing the eval.
            (function () {
                jsonFlickrApi = function (data) {
                    var photos = []
                      , photosRaw = data.photos.photo
                      , i = 0
                      , max = 0;

                    for (i = 0, max = photosRaw.length; i < max; i++) {
                        var photoRaw = photosRaw[i];

                        photos.push({
                            title:  photoRaw.title
                          , small:  'http://farm'+photoRaw.farm+'.staticflickr.com/'+photoRaw.server+'/'+photoRaw.id+'_'+photoRaw.secret+'.jpg'
                          , medium: 'http://farm'+photoRaw.farm+'.staticflickr.com/'+photoRaw.server+'/'+photoRaw.id+'_'+photoRaw.secret+'_z.jpg'
                          , large:  'http://farm'+photoRaw.farm+'.staticflickr.com/'+photoRaw.server+'/'+photoRaw.id+'_'+photoRaw.secret+'_b.jpg'
                        });
                    }

                    callback(photos);
                };
  
                eval(response);
            }());
        });

        request.open('GET', url, false);
        request.send();
    }
};