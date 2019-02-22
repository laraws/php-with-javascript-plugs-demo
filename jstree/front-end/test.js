$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url === "ajax/test.html") {
        $(".log").text("Triggered ajaxComplete handler. The result is " +
            xhr.responseHTML);
    }
});

