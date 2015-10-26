({
    baseUrl: ".",
    paths: {
    	"aui": "../js/vendor/aui.min",
    	"bootstrap-datepicker": "../js/vendor/bootstrap-datepicker.min",
        "bootstrap-datepicker-es": "../js/vendor/bootstrap-datepicker.es.min",
    	"colpick": "../js/vendor/colpick",
        "datatables": "../js/vendor/datatables",
        "jquery": "../js/vendor/jquery/jquery-1.11.1.min",
        "jquery-fancybox": "../js/vendor/jquery/jquery.fancybox.pack",
        "tinymce": "../js/vendor/tinymce.min",
        "tinymce-config": "../js/vendor/tinymce.customs",
        "rating": "../js/rating",
        "seleccion-material": "../js/seleccionMaterial",
        "yui-animation": "../js/vendor/yui/animation-min",
        "yui-dragdrop": "../js/vendor/yui/dragdrop-min",
        "yui-dragdrop-custom": "../js/vendor/yui/dragdrop-custom",
        "yui-utilities": "../js/vendor/yui/utilities",
        "yui-yahoo": "../js/vendor/yui/yahoo-dom-event"
    },
    optimize: "none",
    name: "main",
    findNestedDependencies: true,
    out: "../dist/main.min.js"
})