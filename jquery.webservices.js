/**
 * jquery.webservice.js
 * ASP.NET Web Service Javascript proxy using jQuery
 * 
 * Copyright (c) 2009 Ægir Þorsteinsson
 * http://thorsteinsson.is
 *
 * Licensed under a Creative Commons Attribution 3.0 license
 * http://creativecommons.org/licenses/by/3.0/
 */
var Sys = {};
Sys.Net = {};
Sys.Net.WebServiceProxy = function() { };
window.Type = Function;
Type.registerNamespace = function(str) { eval(str + ' = {};'); };
Type.prototype.initializeBase = function() { };
Type.prototype.replace = function() { };
Sys.Net.WebServiceProxy._generateTypedConstructor = function(str) { return new Type(); };
Type.prototype.registerClass = function(classname, type) {
    if (typeof(classname) == 'string' && type != null) {
        this.prototype["_invoke"] = function(servicePath, methodName, useGet, params, onSuccess, onFailure, userContext) {
            $.ajax({
                type: useGet ? "GET" : "POST",
                url: servicePath + "/" + methodName,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(params),
                dataType: "json",
                success: function(data) { onSuccess(data.d); },
                error: onFailure
            });
            return true;
        };
        var servicePath = '';
        this.prototype["set_path"] = function(path) { servicePath = path; };
        this.prototype["get_path"] = function() { return servicePath; };
    }
    else if (typeof(classname) == 'string' && type == null) {
        this.prototype = new Type();
    }
};