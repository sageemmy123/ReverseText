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
    "dojo/text!ReverseText/widget/template/ReverseText.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, widgetTemplate) {
    return declare("ReverseText.widget.ReverseText", [ _WidgetBase, _TemplatedMixin ], {

        templateString: widgetTemplate,
       
       //Dom elements
        infoTextNode: null,
        StringNode:null,
        InputNode:null,    
        _contextObj: null,
       
       //microflow elements
        dataAttribute: "",
        anotherText: "",
        micflowAction: "",

        postCreate: function() {
            this._updateRendering();
        },
        createNewItem: function() {
               mx.data.create({
                   entity: this.anotherText,
                   callback: lang.hitch(this, function (obj) {
                     obj.set(this.dataAttribute, this.StringNode.value);
                     this.saveTag(obj);
                   }),
                   error: function (e) {
                       console.log("an error occured: " + e);
                   }
               });
        },
        saveTag: function (Aobj) {
            mx.data.commit({
                mxobj: Aobj,
                callback: function (Aobj) {
                    console.log("Object committed");
                },
                error: function (e) {
                    console.log("Error occurred attempting to commit: " + e);
                }
            });
        },
        update: function(obj, callback) {
            this._contextObj = obj;
            this._updateRendering(callback); 
        },
        _updateRendering: function(callback) {
            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
                var myData = this._contextObj.get(this.dataAttribute);
                this.infoTextNode.innerHTML= myData.split('').reverse().join('');
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }
            this._executeCallback(callback, "_updateRendering");
        },
        _executeCallback: function(cb, from) {
            if (cb && typeof cb === "function") {
                cb();
            }
        },
        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");
            // Release handles on previous object, if any.
            this.unsubscribeAll();

            // When a mendix object exists create subscribtions.
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
        },
    });
});
require(["ReverseText/widget/ReverseText"]);
