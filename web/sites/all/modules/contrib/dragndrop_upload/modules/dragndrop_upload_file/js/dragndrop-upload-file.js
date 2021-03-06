/**
 * @file
 * Contains a behavior-function to initialize dragndrop_upload_file widget.
 *
 * Settings are provided via Drupal.settings.dragndropUpload variable.
 */

(function ($) {
  Drupal.behaviors.dragndropUploadFile = {
    attach: function (context, settings) {
      if (!settings.dragndropUploadFile || navigator.userAgent.match(/MSIE\s(?!10.0)/)) {
        return;
      }

      $.each(settings.dragndropUploadFile, function (i, selector) {
        $(selector, context).once('dnd-upload-file', function () {
          new DnDUploadFile($(this));
        });
      });
    }
  };
})(jQuery);
