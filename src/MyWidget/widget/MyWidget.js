define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "dojo/text!MyWidget/widget/template/MyWidget.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, widgetTemplate) {
    return declare("MyWidget.widget.MyWidget", [ _WidgetBase, _TemplatedMixin ], {

        templateString: widgetTemplate,
        inputNodes: null,
        infoTextNode: null,
        StringNode:null,
        InputNode:null,    
        _contextObj: null,

        constructor: function() { },

        postCreate: function() {
            this._updateRendering();
        },

        update: function(obj, callback) {
            this._contextObj = obj;
           // this._resetSubscriptions(); 
            this._updateRendering(callback); 
        },

         reverse: function(s) {
             s = this.StringNode.value;
              this.infoTextNode.innerHTML= s.split('').reverse().join('');
          },

        _updateRendering: function(callback) {
            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }
            this._executeCallback(callback, "_updateRendering");
        },
/*
        _resetSubscriptions: function() {
            this.unsubscribeAll();
            if (this._contextObj) {
                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });

                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    attr: this.backgroundColor,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        this._updateRendering();
                    })
                });

                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    val: true,
                    callback: lang.hitch(this, this._handleValidation)
                });
            }
        },*/
        _executeCallback: function(cb, from) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});
require(["MyWidget/widget/MyWidget"]);
