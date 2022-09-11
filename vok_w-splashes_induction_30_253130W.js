"use strict"

// register the application module
b4w.register("NMP_Catalogue_main", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");

// detect application mode
var DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_assets_path("NMP_Catalogue");

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        canvas_resolution_factor: 2,
        autoresize: true
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */

function load() {
    var preloader_cont = document.getElementById("preloader_cont");
    preloader_cont.style.visibility = "visible";
    m_data.load(APP_ASSETS_PATH + "vok_w-splashes_induction_30_253130W.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
	var preload_dynamic_path = document.getElementById("preload_dynamic_path");
    var percantage_num      = preload_dynamic_path.nextElementSibling;

    preload_dynamic_path.style.height = (100 - percentage) + "%";
    percantage_num.innerHTML = percentage + "%";	   
    if (percentage == 100) {
        var preloader_cont = document.getElementById("preloader_cont");
	preloader_cont.style.visibility = "hidden";
        return;
	}	
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();

    // place your code here

}


});

// import the app module and start the app by calling the init method
b4w.require("NMP_Catalogue_main").init();
