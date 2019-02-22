var searchAjax={};
var G_tocard_maxTips=7;

$(function(){
	(function(){
		var a=$(".plus-tag");
		//检测标签是否存在
		hasTips=function(b){
			var d=$("a",a),c=false;
			d.each(function(){
				if($(this).attr("title")==b){
					c=true;
					return false
				}
			});
			return c
		};
		//检测标签个数
		isMaxTips=function(){
			if($("a",a).length>=G_tocard_maxTips){
				return true
			}else{
				return false;
			}
		};
        //添加标签
		setTips=function(c,d,e){
			if(hasTips(c)){
				return false
			}if(isMaxTips()){
				alert("最多选择"+G_tocard_maxTips+"条曲线");
				return false
			}
			var b=d?'value="'+d+'"':"";
			a.append($("<a "+b+' title="'+c+'" data-value="'+e+'" href="javascript:void(0);" ><span class="pr-5">'+c+"</span><em>X</em></a>"));
			searchAjax(c,d,true);
			return true
		};
		//删除标签
		delTips=function(b,c){
			if(!hasTips(b)){
				return false
			}
			$("a",a).each(function(){
				var d=$(this);
				if(d.attr("title")==b){
					d.remove();
					return false
				}
			});
			searchAjax(b,c,false);
			return true
		};
		//获取标签的名称
		getTips=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("title"))
			});
			return b
		};

		//获取标签的value(同名称)
		getTipsId=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value"))
			});
			return b
		};

		//获取标签的id
		getTipsDataId=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("data-value"))
			});
			return b
		};
		//组合value和title
		getTipsIdAndTag=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value")+"##"+$(this).attr("title"))
			});
			return b
		}
	}
)()});
//更新选中标签标签
$(function(){
	var a=$(".plus-tag");
	$('.plus-tag').append($('.plus-tag a'));
	$("a em",a).live("click",function(){
		var c=$(this).parents("a"),
			b=c.attr("title"),
			d=c.attr("value");
		delTips(b,d);
		var index = [];
		$('#myTags a').each(function(i,val){
			index.push($(this).attr('title'));		
		});
		$('[multiple="multiple"]').multipleSelect('setSelects',index);
	});
	//清空所有
	$('#delAll').on('click',function(){
		initSelectTip();
	});
	//确认
	$('#qxQr').on('click',function(){
		//url为本网页的url
		var url = $('#url').val();
		if ($(this).text() == 'Show') {
			subinfor(url, 'en');
		} else {
			subinfor(url);
		}
	})
});

var searchAjax = function(name, id, isAdd){
	setSelectTips();
};

var arrName;
// 更新显示
function setSelectTips(){
	//保存添加的标签arrName
	arrName = getTips();
	if(arrName.length){
		$('#myTags').show();
	}else{
		$('#myTags').hide();
	}
}
//初始化
function initSelectTip(){
	delTip2();
	$('[multiple="multiple"]').multipleSelect('setSelects',[]);
}
//删除标签
function delTip2(){
	$('.plus-tag').find('a').remove();
	$('.plus-tag').hide();
}
/*
 时间类型:
 	参数1代表不同日期，同一债券
	参数2代表同一日期，不同债券
 * */
var showType = 1;
function showdate(id)
{
	if (id == "1")
	{
		$("#startDate").val("");
		$("#endDateBox").html('<span class="mr-10 ml-20">结束日期</span><input id="endDate" class="date" type="text" value="" onclick="WdatePicker({minDate:\'#F{$dp.$D(\\\'startDate\\\')}\',maxDate:\'#F{$dp.$D(\\\'startDate\\\',{d:6})}\'})" />');
		$("#endDateBox").show()
	}
	else
	{
		$("#startDate").val("");
		$("#endDate").val("");
		$("#endDateBox").hide();
	}
	showType = id;
//	showDefault(id);
}

function showDefault(type){
	
}
/*
 *获取筛选信息
 * */
function subinfor(url, lang){
	var url = url;
	var type = showType;//时间类型
	var starDate = $('#startDate').val();//开始日期
	var endDate = $('#endDate').val();//结束日期
	var strPara = '';//保存标签的名称
	var strParamsId = '';//保存标签的id
	var count = 0;//用来计算标签的个数
	var tags = getTips();//获取标签的名称
	var tagsId = getTipsDataId();//获取标签的id
	//遍历标签得个数,就是选了多少个
	for (var i = 0; i < tags.length; i++)
	{
		count++;
		strPara += tags[i]+ ",";
		strParamsId += tagsId[i]+ ",";
	}
	strPara = strPara.substring(0, strPara.length - 1);
	strParamsId = strParamsId.substring(0, strParamsId.length - 1);
	//选取的标签不为空
	if (strPara != ""){
	    //1代表同一日期,
		if (type == "1"){
		    //标签个数<=1
			if(count<=1){
				if(starDate !="" && endDate != ""){
					strPara = strPara + "|" + strParamsId + "|" +starDate+"|"+endDate;
					var lineType = document.getElementsByName('curveType');
					var checkedLineType, strLineType;
					for(var i = 0;i<lineType.length;i++){
						if (lineType[i].checked)
						{
							checkedLineType = lineType[i].value;
						}
					}
					if (checkedLineType == 1)
					{
						strLineType = "maturity";
					}
					else if (checkedLineType == 2)
					{
						strLineType = "spot";
					}
					else if (checkedLineType == 3)
					{
						strLineType = "forward";
					}
					//获取数据信息
					$.ajax({
			             type: "GET",
			             url: url,
			             data: {
			            	 'line_type':checkedLineType,
			            	 'line_params':strPara,
			            	 'line_date':2
			            	 },
			             dataType: "json",
			             success: function(data){
			            	 if (data.data) {
			            		 if (lang == 'en') {
				            		 charts_qx(data.legend_data, data.data, data.x_data, 'en')
				            	 } else {
				            		 charts_qx(data.legend_data, data.data, data.x_data)
				            	 } 
			            	 } else {
			            		 if (lang == 'en') {
			            			 alert('No Data');
			            		 } else {
			            			 alert('暂无数据');
			            		 }
				            	 charts_qx([], [], [])
			            	 }
			            },
			             error: function(msg){
			            	 if (lang == 'en') {
		            			 alert('No Data');
		            		 } else {
		            			 alert('暂无数据');
		            		 }
			            	 charts_qx([], [], [])
			             },
			         });
				}else{
					alert("请先选择开始，结束日期！");
				}
			}else{
				alert("只能选择一条曲线类型");
			}
			//多个标签
		}else{
//			strPara = starDate.replace('-','').replace('-', '')+"|"+strPara+"|"+strParamsId;
			strPara = strPara+"|"+strParamsId+"|"+starDate;
			//曲线类型
			var lineType = document.getElementsByName('curveType');
			var checkedLineType, strLineType;
			//判断是类型
			for(var i = 0;i<lineType.length;i++){
				if (lineType[i].checked)
				{
					checkedLineType = lineType[i].value;
				}
			}
			if (checkedLineType == 1)
			{
				strLineType = "maturity";
			}
			else if (checkedLineType == 2)
			{
				strLineType = "spot";
			}
			else if (checkedLineType == 3)
			{
				strLineType = "forward";
			}
			//获取标签???
			$.ajax({
	             type: "GET",
	             url: url,
	             data: {
	             	//曲线类型
	            	 'line_type':checkedLineType,
					 //保存标签的名称\id\时间
	            	 'line_params':strPara,
	            	 'line_date':1
	            	 },
	             dataType: "json",
	             success: function(data){
	            	 if (data.data) {
	            		 if (lang == 'en') {
		            		 charts_qx(data.legend_data, data.data, data.x_data, 'en')
                             //获取多条折线,重点!!!!!!!!!
		            	 } else {
		            		 charts_qx(data.legend_data, data.data, data.x_data)
		            	 } 
	            	 } else {
	            		 if (lang == 'en') {
	            			 alert('No Data');
	            		 } else {
	            			 alert('暂无数据');
	            		 }
		            	 charts_qx([], [], [])
	            	 } 
	             },
	             error: function(msg){
	            	 if (lang == 'en') {
            			 alert('No Data');
            		 } else {
            			 alert('暂无数据');
            		 }
	            	 charts_qx([], [], [])
	             },
	         });
		}
	}else{
		alert("请先选择曲线类型");
	}
}
///*改变曲线类型*/
//function ChangeVariety(value){
//	subinfor();
//}

function charts_qx(legend_data, data, x_data, lang){
    //获取曲线的显示位置
	var charts_qx = echarts.init(document.getElementById('charts_qx'));
    //使用关键词 new 来创建数组对象
	var seriesData = new Array();//seriesData数组对象
	var legendData = new Array();//legendData数组对象
    //遍历每个legend_data键值,并保存在定义的数组对象
	$.each(legend_data, function(i, v) {
		seriesData.push({
            name:v,
            type:'line',
            smooth:true,
            symbol:'none',
            data:data[i],
        });
		legendData.push(v);
	});
	//x轴数据
	var xData = x_data;
	var option = {
	    title : {
	        text: '',
	    },
	    tooltip : {
	        trigger: 'axis',
	        formatter: function (params) {
	        	var nx=params[0].axisValue
	        	if (lang == 'en'){
	        		var html = '<div class="boxs">Year：'+nx+"<p>";
	        	} else {
	        	    //用来鼠标悬浮显示的数据
	        		var html = '<div class="boxs">年限：'+nx+"<p>";
	        	}
	        	 //用来鼠标悬浮显示的数据
	        	$(params).each(function(i,val){
	        		html+='<span class="name">'+params[i].seriesName +"：</span>"+
		        		  '<span class="inner">'+params[i].data+'</span> '+
		        		  '<span class="inner">'+(params[0].data - params[i].data).toFixed(4)+'</span>'+
		        		  '</p></div>'
	        	})
	        	return html;
			},
			backgroundColor:'#b5505a'
	    },
	    legend: {
	        data:legendData,
	        icon:'',
	        top:'20px',
	        right:"30"
	    },
	    toolbox: {
	        show : false,
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : xData,
	            axisLabel:{
	            	show:true,
	            	interval:'auto'
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : seriesData
	};
	charts_qx.setOption(option)
}

//中证债券估值数据下载
$('.table .more-1').on('click',function(){
	 $(this).toggleClass('more-2');
	 $(this).parents('.list-div-table').next('div').toggle();
})
