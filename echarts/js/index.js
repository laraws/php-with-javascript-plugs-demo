$(function () {
    $.ajax({
        type: "post",
        async: false, //同步执行
        url: "mapdata.php",
        dataType: "json", //返回数据形式为json
        success: function(result) {
            console.log(result.name);
            myChart.setOption({ //渲染数据
                xAxis: [{
                    data: result.name
                }],
                series: [{
                    data: result.value
                }]
            });
        },
        error: function() {
            alert("请求数据失败!");
        }
    })
});
