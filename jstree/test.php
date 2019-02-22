<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="plugins/jstree/themes/default/style.min.css">
</head>
<body>
<div id="tree">

</div>
<input type="text" id="pinput">
<script src="plugins/jquery-3.3.1.min.js"></script>
<script src="plugins/jstree/jstree.min.js"></script>
<script>
    $(function () {
        // $.ajax({
        //     url: 'getjson.php',
        //     dataType: 'json',
        //     success: function (data) {
        //         console.log(data);
        //     }
        // })
        // $('#tree').jstree({
        //     'core': {
        //         'data': {
        //             'url': 'getjson.php',
        //             'dataType': 'json'
        //         }
        //     },
        //     "plugins" : [
        //         "contextmenu", "dnd", "search",
        //         "state", "types", "wholerow"
        //     ]
        // })

        $('#pinput').on('click', function () {
            alert(1);
        })
    })
</script>
</body>
</html>