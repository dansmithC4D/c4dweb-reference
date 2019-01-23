var Drupal=Drupal||{},jQuery=jQuery||{};!function(l){"use strict";function d(e,t){var i,a,s,n=e.split("?");if(2<=n.length){for(a=encodeURIComponent(t)+"=",s=(i=n[1].split(/[&;]/g)).length;0<s--;)-1!==i[s].lastIndexOf(a,0)&&i.splice(s,1);return 0<i.length?n[0]+"?"+i.join("&"):n[0]}return e}function c(e,t,i){var a,s,n,o,r,l,d;if(0<e.indexOf("#")?(s=e.indexOf("#"),a=e.substring(e.indexOf("#"),e.length)):(a="",s=e.length),o="",1<(n=e.substring(0,s).split("?")).length)for(r=n[1].split("&"),d=0;d<r.length;d++)(l=r[d].split("="))[0]!==t&&(""===o?o="?":o+="&",o+=l[0]+"="+(l[1]?l[1]:""));return""===o&&(o="?"),""!==o&&"?"!==o&&(o+="&"),o+=t+"="+(i||""),n[0]+o+a}function u(e,t){var i,a,s,n=e.split("?");if(1<n.length)for(i=n[1].split("&"),s=0;s<i.length;s++)if((a=i[s].split("="))[0]===t)return a[1]}function i(){this.requiredImageFields=null,this.emptyImageFields=null,this.requiredDragAndDropFields=null,this.emptyDragAndDropFields=null,this.requiredTextFields=null,this.emptyTextFields=null,this.requiredWidgetFields=null,this.emptyWidgetFields=null,this.requiredAngularFields=null,this.emptyAngularFields=null,this.form=null,this.submitButtons=null,this.updateSubmitButtons=function(){this.emptyImageFields||this.emptyDragAndDropFields||this.emptyTextFields||this.emptyWidgetFields||this.emptyAngularFields?this.submitButtons.hasClass("form-disabled")||(this.submitButtons.closest(".form-actions").before('<p class="required-fields-message text-danger">'+Drupal.t("Please fill in required fields before submitting the form")+"</p>"),this.submitButtons.addClass("form-disabled").attr("disabled","disabled")):(this.submitButtons.removeClass("form-disabled").each(function(){l(this).hasClass(/-disabled/)||l(this).removeAttr("disabled")}),this.form.find(".required-fields-message").remove())},this.checkImageFields=function(){var e=!1;this.requiredImageFields.each(function(){"0"===l(this).find("input.fid").val()&&(e=!0)}),this.emptyImageFields=e},this.checkDragAndDropFields=function(){var e=!1;this.requiredDragAndDropFields.each(function(){"0"===l(this).find("input[name$='[fid]']").val()&&(e=!0)}),this.emptyDragAndDropFields=e},this.checkTextFields=function(){var e=!1;this.requiredTextFields.each(function(){(""===l(this).val()||"_none"===l(this).val()&&"select"===l(this).prop("tagName").toLowerCase())&&("textarea"===l(this).prop("type")&&l(this).parent().find("iframe")?""===l(this).parent().find("iframe").contents().find("p").text()&&(e=!0):e=!0)}),this.emptyTextFields=e},this.checkWidgetFields=function(){var e=!1;this.requiredWidgetFields.each(function(){""===l(this).val()&&(e=!0)}),this.emptyWidgetFields=e},this.checkAngularFields=function(){var e=!1;this.requiredAngularFields.each(function(){0===l(this).find(".selected-values > .ng-scope:not(.ng-hide)").length&&(e=!0)}),this.emptyAngularFields=e},this.checkFields=function(){this.checkImageFields(),this.checkDragAndDropFields(),this.checkTextFields(),this.checkWidgetFields(),this.checkAngularFields()},this.initializeFields=function(){this.requiredImageFields=this.form.find(".field-type-image").has(".form-required"),this.requiredDragAndDropFields=this.form.find(".field-widget-dragndrop-upload-file").has(".form-required"),this.requiredTextFields=this.form.find(".required, #security_code"),this.requiredWidgetFields=this.form.find(".required-checkbox"),this.requiredAngularFields=this.form.find(".c4m_vocab_topic, .c4m_vocab_document_type").has(".form-required"),this.submitButtons=this.form.find(".form-actions").find(".form-submit, .form-preview").not("#edit-cancel, #edit-delete");var e=this;this.requiredTextFields.on("input change",function(){e.checkFields(),e.updateSubmitButtons()}),this.requiredWidgetFields.click(function(){e.checkFields(),e.updateSubmitButtons()}),this.requiredAngularFields.click(function(){e.checkFields(),e.updateSubmitButtons()})}}Drupal.behaviors.discussionFormClasses={attach:function(){var e=l("#edit-c4m-discussion-type-und");e.addClass("row"),l("input:radio",e).each(function(){var e=l(this).attr("value"),t=l(this).parent();t.addClass("discussion-type-button").addClass("discussion-type-"+e),t.parent().addClass("col-xs-6").addClass("col-sm-3")})}},Drupal.behaviors.eventFormClasses={attach:function(){var e=l("#edit-c4m-event-type-und");e.addClass("row"),l("input:radio",e).each(function(){var e=l(this).attr("value"),t=l(this).parent();t.addClass("event-type-button").addClass("event-type-"+e),t.parent().addClass("col-xs-4")})}},Drupal.behaviors.youTubeVideo={attach:function(){var e,t;l("body").is(".front, .not-logged-in")&&((e=document.createElement("script")).src="https://www.youtube.com/iframe_api",(t=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,t))}},Drupal.behaviors.sidebarCollapseExpand={attach:function(){var e=u(location.href,"fullscreen"),t=l("#collapse-sidebar"),o=l(".og-menu-link.wiki .c4m-book-og-menu-link, #group-pages-navigation-left .field-name-c4m-content-wiki-page-navigation a, .book-navigation a");function r(e,t){var i,a=l(".group-left"),s=l(".group-right");e.addClass("collapsed"),e.html('<i class="fa fa-chevron-circle-right"></i>'),a.removeClass("col-sm-4").addClass("col-sm-1 sidebar-collapsed"),s.removeClass("col-sm-8").addClass("col-sm-11"),l(t).each(function(){i=c(l(this).attr("href"),"fullscreen","1"),l(this).attr("href",i)})}"1"===e&&r(t),t.on("click",function(){var e,t,i,a,s,n;0<=l(this).attr("class").indexOf("collapsed")?(e=l(this),t=o,a=l(".group-left"),s=l(".group-right"),n=l(".collapsible"),e.removeClass("collapsed"),e.html('<i class="fa fa-chevron-circle-left"></i> '+Drupal.t("Hide sidebar")),a.removeClass("col-sm-1 sidebar-collapsed").addClass("col-sm-4"),s.removeClass("col-sm-11").addClass("col-sm-8"),n.show(),l(t).each(function(){i=d(l(this).attr("href"),"fullscreen"),l(this).attr("href",i)})):r(l(this),o)})}},Drupal.behaviors.wikiPagesSubNavigation={attach:function(){var e,t,i,a,s,n,o=l("#group-pages-navigation-left");0!==o.length&&(s=l('ul[role="menu"]',o),(n=l(s)).find("li.expanded").each(function(e,t){var i=l(t),a=i.find("> .collapse");a.hasClass("in")&&i.find("> a > i").removeClass("fa-caret-right").addClass("fa-caret-down")}),n.find('[data-toggle="collapse"]').on("click",function(e){var t,i=l(this);return e.preventDefault(),t=i.data("target"),l(t).toggleClass("in"),i.hasClass("fa-caret-right")?(i.removeClass("fa-caret-right"),i.addClass("fa-caret-down")):i.hasClass("fa-caret-down")&&(i.removeClass("fa-caret-down"),i.addClass("fa-caret-right")),!1}),0!==(e=o.get(0)).length&&(t=u(location.href,"collapsed"),i=l(".og-menu-link.wiki .c4m-book-og-menu-link, #group-pages-navigation-left .field-name-c4m-content-wiki-page-navigation a, .book-navigation a"),l(".field-group-format-title",e).on("click",function(){l(e).hasClass("collapsed")?l(i).each(function(){a=c(l(this).attr("href"),"collapsed","1"),l(this).attr("href",a)}):l(i).each(function(){a=d(l(this).attr("href"),"collapsed"),l(this).attr("href",a)})}),"1"!==t?function(e){var t;if(!e.animating||null===e.animating)e.animating=!0,t=l(e).hasClass("speed-fast")?300:1e3,l(e).is(".effect-none, .speed-none")?l("> .field-group-format-wrapper",e).toggle():l(e).hasClass("effect-blind")?l("> .field-group-format-wrapper",e).toggle("blind",{},t):l("> .field-group-format-wrapper",e).toggle(t),e.animating=!1,l(e).toggleClass("collapsed")}(e):l(i).each(function(){a=c(l(this).attr("href"),"collapsed","1"),l(this).attr("href",a)})))}},Drupal.behaviors.initTooltips={attach:function(){l('[data-toggle="tooltip"]').tooltip()}},Drupal.behaviors.initDropdowns={attach:function(){l(".dropdown-toggle").dropdown()}},Drupal.behaviors.jumpToTitle={attach:function(e,t){var i,a=0;e===document&&(t.c4m&&!t.c4m.jumpToTitle||(i=l("body"),l(i).hasClass("admin-menu")&&(a=500),setTimeout(function(){0===l(i).scrollTop()&&l("html, body").animate({scrollTop:parseInt(l("h1").offset().top)+"px"},100)},a)))}},Drupal.behaviors.fixLeafletMaps={attach:function(e,t){setTimeout(function(){void 0!==t.leaflet&&t.leaflet instanceof Array&&t.leaflet[0].lMap.invalidateSize(!1)},100)}},Drupal.behaviors.registration={attach:function(e,t){l(".use-another-email",e).click(function(){return l('input[name="mail"]').val("").focus(),!1})}},Drupal.behaviors.restrictedOrganisations={syncSelectedOrganisations:function(){l(".form-item-restricted-organisations input").each(function(){l(this).attr("checked")?l(this).parent().show():l(this).parent().hide()})},syncSelectedOrganisation:function(e){var t=l(".form-item-restricted-organisations label[for="+l(e).attr("id")+"]"),i=l("input[id="+l(e).attr("id")+"]");e.checked?(l(t).show(),l(i).attr("checked","checked")):(l(t).hide(),l(i).removeAttr("checked"))},attach:function(e,t){Drupal.behaviors.restrictedOrganisations.syncSelectedOrganisations();var i=l("#restrictedOrganisationsButton",e).data("contentwrapper");l(".form-item-restricted-organisations input").on("change",function(){Drupal.behaviors.restrictedOrganisations.syncSelectedOrganisation(this)}),l("#restrictedOrganisationsButton",e).once("restrictedOrganisationsButton").popover({html:!0,placement:"right",content:function(){return l(i).html()}}).on("shown.bs.popover",function(){l("#edit-restricted-organisations-selector label").show(),l("#edit-restricted-organisations-selector input").once("restrictedOrganisationsListener").on("change",function(){Drupal.behaviors.restrictedOrganisations.syncSelectedOrganisation(this)})})}},Drupal.behaviors.scrollToTop={attach:function(e,t){var i=window.innerHeight;l(".container--push .page-content").add(window).on("scroll",function(){l(this).scrollTop()>i/2?l("#scroll-top:hidden").stop(!0,!0).fadeIn():l("#scroll-top").stop(!0,!0).fadeOut()}),l(function(){l("#scroll-top").on("click",function(e){return e.preventDefault(),l("html, body, .container--push .page-content").animate({scrollTop:0},"2000"),!1})})}},l(window).bind("load",function(){l('[id^=user-register] input[name="mail"]').focus()}),l(document).ajaxStart(function(){l(".form-submit").addClass("drupal-ajax-disabled").attr("disabled","disabled")}).ajaxComplete(function(){l(".drupal-ajax-disabled").removeClass("drupal-ajax-disabled").each(function(){l(this).hasClass(/-disabled/)||l(this).removeAttr("disabled")})}),Drupal.behaviors.disableSubmitUntilAllRequired={forms:[],attach:function(e){if(e!==document)return"div"===l(e).prop("tagName").toLowerCase()&&l(e).attr("id")&&l.each(Drupal.behaviors.disableSubmitUntilAllRequired.forms,function(){this.initializeFields()}),void l.each(Drupal.behaviors.disableSubmitUntilAllRequired.forms,function(){this.checkFields(),this.updateSubmitButtons()});var t=0;l("form").each(function(){l(this).attr("id")&&(Drupal.behaviors.disableSubmitUntilAllRequired.forms[t]=new i,Drupal.behaviors.disableSubmitUntilAllRequired.forms[t].form=l(this),Drupal.behaviors.disableSubmitUntilAllRequired.forms[t].initializeFields(),t++)}),setTimeout(function(){l.each(Drupal.behaviors.disableSubmitUntilAllRequired.forms,function(){this.checkFields(),this.updateSubmitButtons()})},1e3)}},Drupal.behaviors.disableSubmitButtons={attach:function(e){l("form",e).once("disableSubmitButtons",function(){var t=l(this);t.find("#edit-submit, #edit-draft, #edit-cancel, #edit-delete").click(function(e){var t=l(this);return t.closest("form").find(".input_button_name").remove(),t.after('<input type="hidden" class="input_button_name" name="'+t.attr("name")+'" value="'+t.attr("value")+'" />'),!0}),t.submit(function(e){e.isDefaultPrevented()||(t.find("#edit-submit, #edit-draft, #edit-cancel, #edit-delete").addClass("form-disabled").attr("disabled","disabled"),t.find("#edit-preview-changes").addClass("disabled-preview"))})})}}}(jQuery),function(o){jQuery.fn.hasClass=function(e){if(e&&"function"==typeof e.test){for(var t=0,i=this.length;t<i;t++)for(var a=this[t].className.split(/\s+/),s=0,n=a.length;s<n;s++)if(e.test(a[s]))return!0;return!1}return o.call(this,e)}}(jQuery.fn.hasClass),function(e){"use strict";function i(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}var a,s,n;function t(e,t){(a(e,t)?n:s)(e,t)}n="classList"in document.documentElement?(a=function(e,t){return e.classList.contains(t)},s=function(e,t){e.classList.add(t)},function(e,t){e.classList.remove(t)}):(a=function(e,t){return i(t).test(e.className)},s=function(e,t){a(e,t)||(e.className=e.className+" "+t)},function(e,t){e.className=e.className.replace(i(t)," ")});var o={hasClass:a,addClass:s,removeClass:n,toggleClass:t,has:a,add:s,remove:n,toggle:t};"function"==typeof define&&define.amd?define(o):e.classie=o}(window),Drupal.behaviors.sideBarEffects={attach:function(e,t){function i(e,t){return e!==document&&(!!window.classie.has(e,t)||e.parentNode&&i(e.parentNode,t))}var a,s,n,o,r,l,d,c,u;n=document.getElementsByClassName("page-container").item(0),o=document.getElementById("closeMenu"),r=Array.prototype.slice.call(document.querySelectorAll(".js-navigationButton")),s=!1,a=navigator.userAgent||navigator.vendor||window.opera,(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))&&(s=!0),l=s?"touchstart":"click",d=function(){window.classie.remove(n,"offCanvasNavigation--visible")},c=function(e){i(e.target,"offCanvasNavigation")||i(e.target,"offCanvasNavigation--left")||i(e.target,"group-right")||(d(),document.removeEventListener(l,c))},u=function(e){e.target==o&&(d(),document.removeEventListener(l,c))},r.forEach(function(e,t){var i=e.getAttribute("data-effect");e.addEventListener(l,function(e){e.stopPropagation(),e.preventDefault(),n.className="page-container",window.classie.addClass(n,i),setTimeout(function(){window.classie.addClass(n,"offCanvasNavigation--visible")},25),document.addEventListener(l,c),document.addEventListener(l,u)})})}};