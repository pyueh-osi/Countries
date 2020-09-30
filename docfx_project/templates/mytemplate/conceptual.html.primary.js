// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.

var common = require('./common.js');
var extension = require('./conceptual.extension.js')

exports.transform = function (model) {
  if (extension && extension.preTransform) {
    model = extension.preTransform(model);
  }

  model._disableToc = model._disableToc || !model._tocPath || (model._navPath === model._tocPath);
  model.docurl = model.docurl || common.getImproveTheDocHref(model, model._gitContribute, model._gitUrlPattern);

  // Collect up to # anchor char, which causes downstream problems
  // Also remove final / separator if # exists

  var pos = model.docurl && model.docurl.indexOf('#');

  if (pos > 0) {
    if (model.docurl.charAt(pos-1) === '/') {
      --pos;
    }
  }

  model.cleandocurl = pos < 0 ? model.docurl : model.docurl.substring(0, pos);

  if (extension && extension.postTransform) {
    model = extension.postTransform(model);
  }

  return model;
}