/*
 * @Author: 21746209
 * @Date:   2018-01-17 11:53:59
 * @Last Modified by:   21746209
 * @Last Modified time: 2018-01-22 11:21:15
 */
$(document).ready(function () {


// "<tr class="+'detail'+">"
    //左侧边框填充
    for(var i=0;i<examType.length;i++){
        var itemNum = examType[i][2];
        var typeNum =examType[i][0];
        var str = "<tr class='detail "+typeNum+"'>" +
            "<th class="+typeNum+">"+examType[i][1]+"</th>" +
            "<td class="+'white1'+"></td>" +
            "<td class="+'white2'+"></td>" +
            "<td class="+'white3'+"></td>" +
            "</tr>";
        $("#item"+itemNum).after(str);
        $(".tableBody .title").find("th").addClass("blue");
        //正因为标记了itemNum才能准确的插在哪个后面
    }
    //先发送请求得到所需的数据，然后渲染

    var reportIds = [];
    // newRequest();
    request(dataMain);
    renderRed();
    toggle();
    delAfter();



    //此时再点击加号的时候,循环此时的reportId


    //只有两条,点击出现mask,提醒：已无更多健检报告。
    //有三条或者三条以上
    //这里得到了数据的id总和
    //点击一下先记下当前reportId，然后再
    // 點擊一則報告，依次在兩個地方進行添加數據
    // 標題和內容
    var height = screen.height;
    var topHeight = document.getElementsByClassName("tableToggle")[0].offsetHeight;
    var finalHeight = height-topHeight;
    flex1();
    function flex1() {
        $('#bigBox').mobileFixedColumnsTable({
            'sScrollY': finalHeight,
            'sScrollX': '120%',
            'bScrollCollapse': true,
            'oLanguage': {
                'sInfo': ''
            }
        });
    }

    //点击添加新的健检报告
    $(".tableTop img").click(function(){
        var addIndex = $(this).parent().index();
        $(".mask").show();
        innerContainer(reportIds);
        $(".container").css({"bottom":"0"}).slideDown("fast");

        $(".mask").bind('click', function() {
            //点击的不是div或其子元素
            $('.container').hide();
            $(".mask").hide();
        });
        $(".container .cut").click(function() {
            $(this).css({"backgroundColor":"#99CC99","color":"#000"});
            var lireportId = $(this).find(".littleId").text();
            var bioaji;
            for(var i=0;i<dataMain.reportList.length;i++){
                if(dataMain.reportList[i].reportId===lireportId){
                    biaoji = i;
                }
            }
            if(addIndex=="0"){
                render1(dataMain.reportList[biaoji]);
                repeat();
            }
            if(addIndex=="1"){
                render2(dataMain.reportList[biaoji]);
                repeat();
            }else if(addIndex=="2"){
                render3(dataMain.reportList[biaoji]);
                repeat();
            }
            //点击确定
            $('.container').slideUp("fast");
            $(".mask").hide();
            // $(".tableTop").find(".second").find(".cancel").click(function () {
            //     var dataNum = $(".dataTables_scrollHeadInner").find(".cancel").length;
            //     if(dataNum===2){
            //         $(this).siblings("img").show();
            //         $(this).parent().css("backgroundColor","#fff");
            //         cancel("second");
            //         repeat();
            //     }else {
            //         cancel("second","third");
            //         repeat();
            //         $(".dataTables_scrollHeadInner").find(".third").find("img").show();
            //         $(".dataTables_scrollHeadInner").find(".third").css("backgroundColor","#fff");
            //     }
            // });
            // $(".tableTop").find(".third").find(".cancel").click(function () {
            //     $(this).siblings("img").show();
            //     $(this).parent().css("backgroundColor","#fff");
            //     cancel("third");
            //     repeat();
            // });
        });
    });



    //点击列表中的li,进行渲染。


    //左上角切换事事件
    $(".tableToggle span").click(function () {
        $(this).addClass("active").siblings("span").removeClass("active");
    });
    $(".tableToggle span").eq(0).click(function () {
        $(".tableBody .detail").show();
        $(".tableBody .title").find("th").removeClass("yellow").addClass("blue");
    });
    $(".tableToggle span").eq(1).click(function () {
        $(".tableBody .detail").hide();
        $(".tableBody .title").find("th").addClass("yellow").removeClass("blue");
    });
    $(".tableToggle span").eq(2).click(function () {
        $(".title th").addClass("blue").removeClass("yellow");
        repeat();
    });







    //初始填充请求
    function request(data){
        if(data.status==="true"){
            render1(data.reportList[0]);
            render2(data.reportList[1]);
            if(data.reportList.length>2){
                render3(data.reportList[2]);
            }else {
                $(".tableTop").find(".third").find("img").hide();
            }
            for(var i=0;i<data.reportList.length;i++){
                reportIds.push(data.reportList[i].reportId);
            }
        }
    }


// 先把所有的都渲染出来，再剔除
//内容填充
//渲染第一栏
    function render1(data) {
        var str = "<span class="+'cancel'+"></span>";
        var st = "<i class='empty'>"+data.reportId+"</i>";
        $(".tableTop .first").eq(0).append(st);
        $(".tableTop .first").eq(0).append(str);
        var time = formatDate(data.reportTime);
        $(".tableTop .first").find(".date").text(time).siblings(".reportName").text(data.reportName);
        $(".tableTop .first").css("backgroundColor","#F1FEF4").find("img").hide();
        $.each(data.itemList,function (i,v) {
            num = v.type;
            differ = getItemDiffer(v.type,v.value);
            range = getItemRange(v.type,v.value);
            val = v.value.split(",")[0];
            if(range!==""){
                if(val===""){
                    s = "<p class="+'number'+">-</p>";
                }else {
                    s = "<p class="+'number'+">"+val+"</p><p class="+'unit'+">("+range+")</p>"
                }
            }else {
                if(val===""){
                    s = "<p class="+'number'+">-</p>";
                }else {
                    s = "<p class="+'number'+">"+val+"</p>"
                }
            }
            $("tr."+num).find(".white1").html(s);
            if((val=='異常') || (val=='异常') || differ==1){
                $("tr."+num).find(".white1").find(".number").addClass("text-warning");
            }
        });
    }

//渲染第二栏
    function render2(data) {
        var str = "<span class="+'cancel'+"></span>";
        var st = "<i class='empty'>"+data.reportId+"</i>";
        $(".tableTop .second").eq(0).append(st);
        $(".tableTop .second").eq(0).append(str);
        var time = formatDate(data.reportTime);
        $(".tableTop .second").find(".date").text(time).siblings(".reportName").text(data.reportName);
        $(".tableTop .second").css("backgroundColor","#F1FEF4").find("img").hide();
        $.each(data.itemList,function (i,v){
            num = v.type;
            differ = getItemDiffer(v.type,v.value);
            range = getItemRange(v.type,v.value);
            val = v.value.split(",")[0];
            if(range!==""){
                if(val===""){
                    s = "<p class="+'number'+">-</p>";
                }else {
                    s = "<p class="+'number'+">"+val+"</p><p class="+'unit'+">("+range+")</p>"
                }
            }else {
                if(val===""){
                    s = "<p class="+'number'+">-</p>";
                }else {
                    s = "<p class="+'number'+">"+val+"</p>"
                }
            }
            $("tr."+num).find(".white2").html(s);
            if((val=='異常') || (val=='异常') || differ==1){
                $("tr."+num).find(".white2").find(".number").addClass("text-warning").parent().parent().addClass("disper");
            }
        })
    }

//渲染第三栏
    function render3(data) {
        var str = "<span class="+'cancel'+"></span>";
        var st = "<i class='empty'>"+data.reportId+"</i>";
        $(".tableTop .third").eq(0).append(st);
        $(".tableTop .third").eq(0).append(str);
        var time = formatDate(data.reportTime);
        $(".tableTop .third").find(".date").text(time).siblings(".reportName").text(data.reportName);
        $(".tableTop .third").css("backgroundColor","#F1FEF4").find("img").hide();
        $.each(data.itemList,function (i,v) {
            num = v.type;
            differ = getItemDiffer(v.type,v.value);
            range = getItemRange(v.type,v.value);
            val = v.value.split(",")[0];
            if(range!==""){
                if(val===""){
                    s = "<p class="+'number'+">-</p>";
                }else {
                    s = "<p class="+'number'+">"+val+"</p><p class="+'unit'+">("+range+")</p>"
                }
            }else {
                if(val===""){
                    s = "<p class="+'number'+">-</p>";
                }else {
                    s = "<p class="+'number'+">"+val+"</p>"
                }
            }
            $("tr."+num).find(".white3").html(s);
            if((val=='異常') || (val=='异常') || differ==1){
                $("tr."+num).find(".white3").find(".number").addClass("text-warning").parent().parent().addClass("disper");
            }
        })
    }


    function innerContainer(arr) {
        //传值修改
        var arr2 = [];
        for (var t = 0; t<arr.length; t++){
            arr2[t] = arr[t]
        }
        $(".container .cut").remove();
        var nArr=[];
        var len = $(".tableTop th").find("i").length;
        for(var s=0;s<len;s++){
            nArr.push($(".tableTop th").find("i").eq(s).text());
        }

        for(var i=0;i<arr2.length;i++){
            for(var k=0;k<nArr.length;k++){
                if(arr2[i]===nArr[k]){
                    removeNum(arr2,nArr[k]);
                }
            }
        }
        // 已经得到最新的arr
        for(var i=0;i<arr2.length;i++){
            var $tt = $(".container .template").clone().removeClass("template").addClass("cut");
            for(var j=0;j<dataMain.reportList.length;j++){
                if(dataMain.reportList[j].reportId===arr2[i]){
                    $tt.find(".littleName").text(dataMain.reportList[j].reportName);
                    $tt.find(".littleId").text(dataMain.reportList[j].reportId);
                }
            }
            $(".container ul").append($tt);
        }
    }



});

var examType = [
    ["100", "身體質量指數BMI", "1", ""], ["101", "腰圍", "1", "公分"], ["102", "收縮壓", "1", "mmHg"], ["103", "舒張壓", "1", "mmHg"], ["104", "白血球WBC", "3", "10^3/uL"],
    ["105", "血色素Hgb", "3", "g/dL"], ["106", "糖化血色素​HbA1C", "4", "%"], ["107", "尿酸UA", "5", "mg/dL"], ["108", "麩胺酸丙酮酸轉氨基脢ALT", "6", "U/L"], ["109", "肌酸酐Creatinine", "5", "mg/dL"],
    ["110", "飯前血糖AC Sugar", "4", "mg/dL"], ["111", "總膽固醇CHOL", "7", "mg/dL"], ["112", "三酸甘油酯TG", "7", "mg/dL"], ["113", "高密度脂蛋白HDL", "7", "mg/dL"], ["114", "低密度脂蛋白LDL", "7", "mg/dL"],
    ["115", "尿糖Urine-Sugar", "2", ""], ["116", "尿蛋白Urine-Protein", "2", ""], ["117", "胸腔CXR", "8", ""], ["118", "身高", "1", "cm"], ["119", "體重", "1", "kg"],
    ["120", "脈搏", "1", "次/分"], ["121", "祼眼[右眼]", "1", ""], ["122", "祼眼[左眼]", "1", ""], ["123", "矯正[右眼]", "1", ""], ["124", "矯正[左眼]", "1", ""],
    ["125", "辨色力", "1", ""], ["126", "聽力[右]", "1", ""], ["127", "聽力[左]", "1", ""], ["128", "尿潛血U-OB", "2", ""], ["129", "尿素氮BUN", "5", "mg/dL"],
    ["130", "頭頸部", "9", ""], ["131", "呼吸系統", "9", ""], ["132", "血液循環系統", "9", ""], ["133", "肌肉骨骼系統", "9", ""], ["134", "消化系統", "9", ""],
    ["135", "神經系統", "9", ""], ["136", "皮膚系統", "9", ""], ["137", "飯后血糖PC Sugar", "4", "mg/dL"], ["138", "B肝表面抗原 HbsAg", "6", ""], ["139", "B肝表面抗體 anti-HBs", "6", ""],
    ["140", "總蛋白", "5", "g/dl"],["141", "白蛋白", "5", "g/dl"],["142", "球蛋白", "5", "g/dl"],["143", "白蛋白/球蛋白", "5", ""],["144", "腎絲球過濾率", "5", "ml/min"],
    ["145", "尿比重", "2", ""],["146", "尿液顏色", "2", ""],["147", "尿膽素原", "2", ""],["148", "膽紅素", "2", ""],["149", "酮體", "2", ""],
    ["150", "酸鹼值", "2", ""],["151", "亞硝酸鹽", "2", ""],["152", "尿紅血球", "2", "HPF"],["153", "尿白血球", "2", "HPF"],["154", "尿上皮細胞", "2", "HPF"],
    ["155", "尿膿細胞", "2", "HPF"],["156", "尿結晶體", "2", "LPF"],["157", "尿圓柱體", "2", "LPF"],["158", "細菌", "2", "HPF"],["159", "紅血球RBC", "3", "M/UL"],
    ["160", "血球容積比", "3", "%"],["161", "嗜中性球比例", "3", "%"],["162", "淋巴球比例", "3", "%"],["163", "單核球比例", "3", "%"],["164", "嗜鹼性球比例", "3", "%"],
    ["165", "嗜伊紅血球比例", "3", "%"],["166", "血小板", "3", "k/UL"],["167", "平均紅血球血紅素量", "3", "pg"],["168", "平均血球容積", "3", "fl"],["169", "平均紅血球血紅素濃度", "3", "g/dl"],
    ["170", "胰澱粉酶", "6", "U/L"],["171", "總膽紅素", "6", "mg/dL"],["172", "一分鍾膽紅素", "6", "mg/dL"],["173", "麩草酸轉氨脢", "6", "U/L"],["174", "丙麩胺酸轉移酶", "6", "IU/L"],
    ["175", "鈣", "10", "mg/dL"],["176", "血清磷", "10", "mg/dL"],["177", "四碘甲狀腺素", "11", "ug/dl"],["178", "大腸癌", "12", "ng/ml"],["179", "肝癌", "12", "ng/ml"],
    ["180", "胰臟癌", "12", "U/ml"],["181", "前列腺癌", "12", "ng/ml"]
];
examType =  translate(examType);
// document.write(examType);

function translate(data){
    var arrr1=[];
    var arrr2=[];
    var arrr3=[];
    var arrr4=[];
    var arrr5=[];
    var arrr6=[];
    var arrr7=[];
    var arrr8=[];
    var arrr9=[];
    var arrr10=[];
    var arrr11=[];
    var arrr12=[];
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="1"){
            arrr1.push(data[i]);

        }
    }
    arrr1.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="2"){
            arrr2.push(data[i]);

        }
    }
    arrr2.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="3"){
            arrr3.push(data[i]);

        }
    }
    arrr3.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="4"){
            arrr4.push(data[i]);

        }
    }
    arrr4.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="5"){
            arrr5.push(data[i]);

        }
    }
    arrr5.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="6"){
            arrr6.push(data[i]);

        }
    }
    arrr6.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="7"){
            arrr7.push(data[i]);

        }
    }
    arrr7.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="8"){
            arrr8.push(data[i]);

        }
    }
    arrr8.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="9"){
            arrr9.push(data[i]);

        }
    }
    arrr9.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="10"){
            arrr10.push(data[i]);

        }
    }
    arrr10.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="11"){
            arrr11.push(data[i]);

        }
    }
    arrr11.reverse();
    for(var i=0;i<data.length;i++){
        if(data[i][2]==="12"){
            arrr12.push(data[i]);

        }
    }
    arrr12.reverse();
    return  arrr1.concat(arrr2).concat(arrr3).concat(arrr4).concat(arrr5).concat(arrr6).concat(arrr7).concat(arrr8).concat(arrr9).concat(arrr10).concat(arrr11).concat(arrr12);

}





//例外：根据值来判断-尿糖115、尿蛋白116、尿潛血128、尿液顏色146、尿膽素原147、膽紅素148、酮體149、亞硝酸鹽151、尿結晶體156、尿圓柱體157、細菌158
//1-無下限+無上限
//2-無下限+有上限
//3-有下限+無上限
//4-正常
//5-無明顯異常
//6-陰性|陽性
//7-有下限+有上限




// function newRequest(){
//     var reportIds = getParameter("reportIds");
//     var uid = getParameter("uid");
//     if(reportIds && uid){
//         $.ajax({
//             type: "POST",
//             url: "/api/getHealthReportCompareDetail",
//             data:{
//                 reportIds: reportIds,
//                 uid: uid
//             },
//             dataType: "json",
//             success: function(data){
//                 dataMain = data;
//             }
//         })
//     }
// }
var dataMain= {
    "status":"true",
    "reportList": [
        {
            "reportId":"11111",
            "reportTime":1515054003215,
            "reportName":"大家的健检报告",
            "itemList": [{
                "unit": "",
                "value": "77,18.5,24",
                "type": "100"
            },
                {
                    "unit": "¤½¤À",
                    "value": "120,0,90",
                    "type": "101"
                },
                {
                    "unit": "mmHg",
                    "value": "10,90,140",
                    "type": "102"
                },
                {
                    "unit": "mmHg",
                    "value": "20,60,90",
                    "type": "103"
                },
                {
                    "unit": "103/uL",
                    "value": "3,4,10",
                    "type": "104"
                },
                {
                    "unit": "g/dL",
                    "value": "12,13,18",
                    "type": "105"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "106"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "107"
                },
                {
                    "unit": "IU/L",
                    "value": "23,14,40",
                    "type": "108"
                },
                {
                    "unit": "mg/dL",
                    "value": "0.1,0.4,1.2",
                    "type": "109"
                },
                {
                    "unit": "mg/dL",
                    "value": "98,70,99",
                    "type": "110"
                },
                {
                    "unit": "mg/dL",
                    "value": "110,130,200",
                    "type": "111"
                },
                {
                    "unit": "mg/dL",
                    "value": "100,35,150",
                    "type": "112"
                },
                {
                    "unit": "mg/dL",
                    "value": "35,40,",
                    "type": "113"
                },
                {
                    "unit": "mg/dL",
                    "value": "90,,130",
                    "type": "114"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "115"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "116"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "117"
                },
                {
                    "unit": "cm",
                    "value": "156,,",
                    "type": "118"
                },
                {
                    "unit": "kg",
                    "value": "52,,",
                    "type": "119"
                },
                {
                    "unit": "¦¸/¤À",
                    "value": "80,,90",
                    "type": "120"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "121"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "122"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "123"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "124"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "125"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "126"
                },
                {
                    "unit": "",
                    "value": "13,,",
                    "type": "127"
                },
                {
                    "unit": "",
                    "value": "-AO5,-,-",
                    "type": "128"
                },
                {
                    "unit": "mg/dL",
                    "value": "1.2,0.4,1.2",
                    "type": "129"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "130"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "131"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "132"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "133"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "134"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "135"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "136"
                },
                {
                    "unit": "mg/dL",
                    "value": ",100,140",
                    "type": "137"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "138"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "139"
                },
                {
                    "unit": "g/dl",
                    "value": "7,6,8.3",
                    "type": "140"
                },
                {
                    "unit": "g/dl",
                    "value": "5,4.2,5.5",
                    "type": "141"
                },
                {
                    "unit": "g/dl",
                    "value": "2.7,2,3",
                    "type": "142"
                },
                {
                    "unit": "",
                    "value": "1.85,1.1,2.5",
                    "type": "143"
                },
                {
                    "unit": "ml/min",
                    "value": "108,90,9999",
                    "type": "144"
                },
                {
                    "unit": "",
                    "value": "1.03,1,1.03",
                    "type": "145"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "146"
                },
                {
                    "unit": "",
                    "value": "Normal,-,-",
                    "type": "147"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "148"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "149"
                },
                {
                    "unit": "",
                    "value": "6.5,5,8",
                    "type": "150"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "151"
                },
                {
                    "unit": "HPF",
                    "value": "2,0,4",
                    "type": "152"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "153"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "154"
                },
                {
                    "unit": "HPF",
                    "value": "0,0,1",
                    "type": "155"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "156"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "157"
                },
                {
                    "unit": "HPF",
                    "value": "(-),-,-",
                    "type": "158"
                },
                {
                    "unit": "M/UL",
                    "value": "5.45,4.27,5.49",
                    "type": "159"
                },
                {
                    "unit": "%",
                    "value": "48.7,40|34,54|50",
                    "type": "160"
                },
                {
                    "unit": "%",
                    "value": "40.2,43.2,71.5",
                    "type": "161"
                },
                {
                    "unit": "%",
                    "value": "45.7,16.8,43.399",
                    "type": "162"
                },
                {
                    "unit": "%",
                    "value": "7.2,4.6,12.4",
                    "type": "163"
                },
                {
                    "unit": "%",
                    "value": "1.1,0.2,1.2",
                    "type": "164"
                },
                {
                    "unit": "%",
                    "value": "5.8,0.7,7.8",
                    "type": "165"
                },
                {
                    "unit": "k/UL",
                    "value": "235,165,353",
                    "type": "166"
                },
                {
                    "unit": "pg",
                    "value": "29.3,26.8,33",
                    "type": "167"
                },
                {
                    "unit": "fl",
                    "value": "89.4,79.299,100",
                    "type": "168"
                },
                {
                    "unit": "g/dl",
                    "value": "32.7,32,36",
                    "type": "169"
                },
                {
                    "unit": "U/L",
                    "value": "28,29,103",
                    "type": "170"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.8,0.3,1",
                    "type": "171"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.15,0.03,0.18",
                    "type": "172"
                },
                {
                    "unit": "U/L",
                    "value": "10,13,39",
                    "type": "173"
                },
                {
                    "unit": "IU/L",
                    "value": "22,9,64",
                    "type": "174"
                },
                {
                    "unit": "mg/dl",
                    "value": "9.2,8.6,10.3",
                    "type": "175"
                },
                {
                    "unit": "mg/dl",
                    "value": "3.5,2.5,5",
                    "type": "176"
                },
                {
                    "unit": "ug/dl",
                    "value": "8.26,5.7,10.91",
                    "type": "177"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.67,0,5",
                    "type": "178"
                },
                {
                    "unit": "ng/ml",
                    "value": "3.12,0,13.4",
                    "type": "179"
                },
                {
                    "unit": "U/ml",
                    "value": "65,0,27",
                    "type": "180"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.72,0,4",
                    "type": "181"
                }]
        },
        {
            "reportId":"22222",
            "reportTime":1515654803215,
            "reportName":"医生的健检报告",
            "itemList": [{
                "unit": "",
                "value": "77,18.5,24",
                "type": "100"
            },
                {
                    "unit": "¤½¤À",
                    "value": "15,0,90",
                    "type": "101"
                },
                {
                    "unit": "mmHg",
                    "value": "120,90,140",
                    "type": "102"
                },
                {
                    "unit": "mmHg",
                    "value": "20,60,90",
                    "type": "103"
                },
                {
                    "unit": "103/uL",
                    "value": "3,4,10",
                    "type": "104"
                },
                {
                    "unit": "g/dL",
                    "value": "12,13,18",
                    "type": "105"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "106"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "107"
                },
                {
                    "unit": "IU/L",
                    "value": "10,14,40",
                    "type": "108"
                },
                {
                    "unit": "mg/dL",
                    "value": "0.1,0.4,1.2",
                    "type": "109"
                },
                {
                    "unit": "mg/dL",
                    "value": "52,70,99",
                    "type": "110"
                },
                {
                    "unit": "mg/dL",
                    "value": "150,130,200",
                    "type": "111"
                },
                {
                    "unit": "mg/dL",
                    "value": "100,35,150",
                    "type": "112"
                },
                {
                    "unit": "mg/dL",
                    "value": "35,40,",
                    "type": "113"
                },
                {
                    "unit": "mg/dL",
                    "value": "90,,130",
                    "type": "114"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "115"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "116"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "117"
                },
                {
                    "unit": "cm",
                    "value": "156,,",
                    "type": "118"
                },
                {
                    "unit": "kg",
                    "value": "52,,",
                    "type": "119"
                },
                {
                    "unit": "¦¸/¤À",
                    "value": "100,,90",
                    "type": "120"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "121"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "122"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "123"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "124"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "125"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "126"
                },
                {
                    "unit": "",
                    "value": "13,,",
                    "type": "127"
                },
                {
                    "unit": "",
                    "value": "-AO5,-,-",
                    "type": "128"
                },
                {
                    "unit": "mg/dL",
                    "value": "1.2,0.4,1.2",
                    "type": "129"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "130"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "131"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "132"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "133"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "134"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "135"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "136"
                },
                {
                    "unit": "mg/dL",
                    "value": ",100,140",
                    "type": "137"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "138"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "139"
                },
                {
                    "unit": "g/dl",
                    "value": "7,6,8.3",
                    "type": "140"
                },
                {
                    "unit": "g/dl",
                    "value": "5,4.2,5.5",
                    "type": "141"
                },
                {
                    "unit": "g/dl",
                    "value": "2.7,2,3",
                    "type": "142"
                },
                {
                    "unit": "",
                    "value": "1.85,1.1,2.5",
                    "type": "143"
                },
                {
                    "unit": "ml/min",
                    "value": "30,90,9999",
                    "type": "144"
                },
                {
                    "unit": "",
                    "value": "1.03,1,1.03",
                    "type": "145"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "146"
                },
                {
                    "unit": "",
                    "value": "Normal,-,-",
                    "type": "147"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "148"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "149"
                },
                {
                    "unit": "",
                    "value": "6.5,5,8",
                    "type": "150"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "151"
                },
                {
                    "unit": "HPF",
                    "value": "2,0,4",
                    "type": "152"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "153"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "154"
                },
                {
                    "unit": "HPF",
                    "value": "0,0,1",
                    "type": "155"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "156"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "157"
                },
                {
                    "unit": "HPF",
                    "value": "(-),-,-",
                    "type": "158"
                },
                {
                    "unit": "M/UL",
                    "value": "5.45,4.27,5.49",
                    "type": "159"
                },
                {
                    "unit": "%",
                    "value": "48.7,40|34,54|50",
                    "type": "160"
                },
                {
                    "unit": "%",
                    "value": "40.2,43.2,71.5",
                    "type": "161"
                },
                {
                    "unit": "%",
                    "value": "45.7,16.8,43.399",
                    "type": "162"
                },
                {
                    "unit": "%",
                    "value": "7.2,4.6,12.4",
                    "type": "163"
                },
                {
                    "unit": "%",
                    "value": "1.1,0.2,1.2",
                    "type": "164"
                },
                {
                    "unit": "%",
                    "value": "5.8,0.7,7.8",
                    "type": "165"
                },
                {
                    "unit": "k/UL",
                    "value": "235,165,353",
                    "type": "166"
                },
                {
                    "unit": "pg",
                    "value": "29.3,26.8,33",
                    "type": "167"
                },
                {
                    "unit": "fl",
                    "value": "89.4,79.299,100",
                    "type": "168"
                },
                {
                    "unit": "g/dl",
                    "value": "32.7,32,36",
                    "type": "169"
                },
                {
                    "unit": "U/L",
                    "value": "28,29,103",
                    "type": "170"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.8,0.3,1",
                    "type": "171"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.15,0.03,0.18",
                    "type": "172"
                },
                {
                    "unit": "U/L",
                    "value": "10,13,39",
                    "type": "173"
                },
                {
                    "unit": "IU/L",
                    "value": "22,9,64",
                    "type": "174"
                },
                {
                    "unit": "mg/dl",
                    "value": "9.2,8.6,10.3",
                    "type": "175"
                },
                {
                    "unit": "mg/dl",
                    "value": "3.5,2.5,5",
                    "type": "176"
                },
                {
                    "unit": "ug/dl",
                    "value": "8.26,5.7,10.91",
                    "type": "177"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.67,0,5",
                    "type": "178"
                },
                {
                    "unit": "ng/ml",
                    "value": "3.12,0,13.4",
                    "type": "179"
                },
                {
                    "unit": "U/ml",
                    "value": "4.65,0,27",
                    "type": "180"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.72,0,4",
                    "type": "181"
                }]
        },
        {"reportId":"33333",
            "reportTime":1510639803015,
            "reportName":"华清池健检报告",
            "itemList": [{
                "unit": "",
                "value": "77,18.5,24",
                "type": "100"
            },
                {
                    "unit": "¤½¤À",
                    "value": "150,0,90",
                    "type": "101"
                },
                {
                    "unit": "mmHg",
                    "value": "10,90,140",
                    "type": "102"
                },
                {
                    "unit": "mmHg",
                    "value": "20,60,90",
                    "type": "103"
                },
                {
                    "unit": "103/uL",
                    "value": "3,4,10",
                    "type": "104"
                },
                {
                    "unit": "g/dL",
                    "value": "12,13,18",
                    "type": "105"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "106"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "107"
                },
                {
                    "unit": "IU/L",
                    "value": "23,14,40",
                    "type": "108"
                },
                {
                    "unit": "mg/dL",
                    "value": "0.1,0.4,1.2",
                    "type": "109"
                },
                {
                    "unit": "mg/dL",
                    "value": "98,70,99",
                    "type": "110"
                },
                {
                    "unit": "mg/dL",
                    "value": "110,130,200",
                    "type": "111"
                },
                {
                    "unit": "mg/dL",
                    "value": "100,35,150",
                    "type": "112"
                },
                {
                    "unit": "mg/dL",
                    "value": "35,40,",
                    "type": "113"
                },
                {
                    "unit": "mg/dL",
                    "value": "90,,130",
                    "type": "114"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "115"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "116"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "117"
                },
                {
                    "unit": "cm",
                    "value": "156,,",
                    "type": "118"
                },
                {
                    "unit": "kg",
                    "value": "52,,",
                    "type": "119"
                },
                {
                    "unit": "¦¸/¤À",
                    "value": "80,,90",
                    "type": "120"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "121"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "122"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "123"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "124"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "125"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "126"
                },
                {
                    "unit": "",
                    "value": "13,,",
                    "type": "127"
                },
                {
                    "unit": "",
                    "value": "-AO5,-,-",
                    "type": "128"
                },
                {
                    "unit": "mg/dL",
                    "value": "1.2,0.4,1.2",
                    "type": "129"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "130"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "131"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "132"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "133"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "134"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "135"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "136"
                },
                {
                    "unit": "mg/dL",
                    "value": ",100,140",
                    "type": "137"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "138"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "139"
                },
                {
                    "unit": "g/dl",
                    "value": "7,6,8.3",
                    "type": "140"
                },
                {
                    "unit": "g/dl",
                    "value": "5,4.2,5.5",
                    "type": "141"
                },
                {
                    "unit": "g/dl",
                    "value": "2.7,2,3",
                    "type": "142"
                },
                {
                    "unit": "",
                    "value": "1.85,1.1,2.5",
                    "type": "143"
                },
                {
                    "unit": "ml/min",
                    "value": "108,90,9999",
                    "type": "144"
                },
                {
                    "unit": "",
                    "value": "1.03,1,1.03",
                    "type": "145"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "146"
                },
                {
                    "unit": "",
                    "value": "Normal,-,-",
                    "type": "147"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "148"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "149"
                },
                {
                    "unit": "",
                    "value": "6.5,5,8",
                    "type": "150"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "151"
                },
                {
                    "unit": "HPF",
                    "value": "2,0,4",
                    "type": "152"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "153"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "154"
                },
                {
                    "unit": "HPF",
                    "value": "0,0,1",
                    "type": "155"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "156"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "157"
                },
                {
                    "unit": "HPF",
                    "value": "(-),-,-",
                    "type": "158"
                },
                {
                    "unit": "M/UL",
                    "value": "5.45,4.27,5.49",
                    "type": "159"
                },
                {
                    "unit": "%",
                    "value": "48.7,40|34,54|50",
                    "type": "160"
                },
                {
                    "unit": "%",
                    "value": "40.2,43.2,71.5",
                    "type": "161"
                },
                {
                    "unit": "%",
                    "value": "45.7,16.8,43.399",
                    "type": "162"
                },
                {
                    "unit": "%",
                    "value": "7.2,4.6,12.4",
                    "type": "163"
                },
                {
                    "unit": "%",
                    "value": "1.1,0.2,1.2",
                    "type": "164"
                },
                {
                    "unit": "%",
                    "value": "5.8,0.7,7.8",
                    "type": "165"
                },
                {
                    "unit": "k/UL",
                    "value": "235,165,353",
                    "type": "166"
                },
                {
                    "unit": "pg",
                    "value": "29.3,26.8,33",
                    "type": "167"
                },
                {
                    "unit": "fl",
                    "value": "89.4,79.299,100",
                    "type": "168"
                },
                {
                    "unit": "g/dl",
                    "value": "32.7,32,36",
                    "type": "169"
                },
                {
                    "unit": "U/L",
                    "value": "28,29,103",
                    "type": "170"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.8,0.3,1",
                    "type": "171"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.15,0.03,0.18",
                    "type": "172"
                },
                {
                    "unit": "U/L",
                    "value": "10,13,39",
                    "type": "173"
                },
                {
                    "unit": "IU/L",
                    "value": "22,9,64",
                    "type": "174"
                },
                {
                    "unit": "mg/dl",
                    "value": "9.2,8.6,10.3",
                    "type": "175"
                },
                {
                    "unit": "mg/dl",
                    "value": "3.5,2.5,5",
                    "type": "176"
                },
                {
                    "unit": "ug/dl",
                    "value": "8.26,5.7,10.91",
                    "type": "177"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.67,0,5",
                    "type": "178"
                },
                {
                    "unit": "ng/ml",
                    "value": "3.12,0,13.4",
                    "type": "179"
                },
                {
                    "unit": "U/ml",
                    "value": "4.65,0,27",
                    "type": "180"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.72,0,4",
                    "type": "181"
                }]
        },
        {"reportId":"66666",
            "reportTime":1510639803015,
            "reportName":"长林王健检报告",
            "itemList": [{
                "unit": "",
                "value": "77,18.5,24",
                "type": "100"
            },
                {
                    "unit": "¤½¤À",
                    "value": "15,0,90",
                    "type": "101"
                },
                {
                    "unit": "mmHg",
                    "value": "120,90,140",
                    "type": "102"
                },
                {
                    "unit": "mmHg",
                    "value": "20,60,90",
                    "type": "103"
                },
                {
                    "unit": "103/uL",
                    "value": "3,4,10",
                    "type": "104"
                },
                {
                    "unit": "g/dL",
                    "value": "12,13,18",
                    "type": "105"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "106"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "107"
                },
                {
                    "unit": "IU/L",
                    "value": "23,14,40",
                    "type": "108"
                },
                {
                    "unit": "mg/dL",
                    "value": "0.1,0.4,1.2",
                    "type": "109"
                },
                {
                    "unit": "mg/dL",
                    "value": "98,70,99",
                    "type": "110"
                },
                {
                    "unit": "mg/dL",
                    "value": "110,130,200",
                    "type": "111"
                },
                {
                    "unit": "mg/dL",
                    "value": "100,35,150",
                    "type": "112"
                },
                {
                    "unit": "mg/dL",
                    "value": "35,40,",
                    "type": "113"
                },
                {
                    "unit": "mg/dL",
                    "value": "90,,130",
                    "type": "114"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "115"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "116"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "117"
                },
                {
                    "unit": "cm",
                    "value": "156,,",
                    "type": "118"
                },
                {
                    "unit": "kg",
                    "value": "52,,",
                    "type": "119"
                },
                {
                    "unit": "¦¸/¤À",
                    "value": "80,,90",
                    "type": "120"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "121"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "122"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "123"
                },
                {
                    "unit": "",
                    "value": ",,",
                    "type": "124"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "125"
                },
                {
                    "unit": "",
                    "value": "¥¿±`,¥¿±`,¥¿±`",
                    "type": "126"
                },
                {
                    "unit": "",
                    "value": "13,,",
                    "type": "127"
                },
                {
                    "unit": "",
                    "value": "-AO5,-,-",
                    "type": "128"
                },
                {
                    "unit": "mg/dL",
                    "value": "1.2,0.4,1.2",
                    "type": "129"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "130"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "131"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "132"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "133"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "134"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "135"
                },
                {
                    "unit": "",
                    "value": "µL©úÅã²§±`,µL©úÅã²§±`,µL©úÅã²§±`",
                    "type": "136"
                },
                {
                    "unit": "mg/dL",
                    "value": ",100,140",
                    "type": "137"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "138"
                },
                {
                    "unit": "",
                    "value": ",³±©Ê|¶§©Ê,³±©Ê|¶§©Ê",
                    "type": "139"
                },
                {
                    "unit": "g/dl",
                    "value": "7,6,8.3",
                    "type": "140"
                },
                {
                    "unit": "g/dl",
                    "value": "5,4.2,5.5",
                    "type": "141"
                },
                {
                    "unit": "g/dl",
                    "value": "2.7,2,3",
                    "type": "142"
                },
                {
                    "unit": "",
                    "value": "1.85,1.1,2.5",
                    "type": "143"
                },
                {
                    "unit": "ml/min",
                    "value": "108,90,9999",
                    "type": "144"
                },
                {
                    "unit": "",
                    "value": "1.03,1,1.03",
                    "type": "145"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "146"
                },
                {
                    "unit": "",
                    "value": "Normal,-,-",
                    "type": "147"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "148"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "149"
                },
                {
                    "unit": "",
                    "value": "6.5,5,8",
                    "type": "150"
                },
                {
                    "unit": "",
                    "value": "-,-,-",
                    "type": "151"
                },
                {
                    "unit": "HPF",
                    "value": "2,0,4",
                    "type": "152"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "153"
                },
                {
                    "unit": "HPF",
                    "value": "5,0,4",
                    "type": "154"
                },
                {
                    "unit": "HPF",
                    "value": "0,0,1",
                    "type": "155"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "156"
                },
                {
                    "unit": "LPF",
                    "value": "(-),-,-",
                    "type": "157"
                },
                {
                    "unit": "HPF",
                    "value": "(-),-,-",
                    "type": "158"
                },
                {
                    "unit": "M/UL",
                    "value": "5.45,4.27,5.49",
                    "type": "159"
                },
                {
                    "unit": "%",
                    "value": "48.7,40|34,54|50",
                    "type": "160"
                },
                {
                    "unit": "%",
                    "value": "40.2,43.2,71.5",
                    "type": "161"
                },
                {
                    "unit": "%",
                    "value": "45.7,16.8,43.399",
                    "type": "162"
                },
                {
                    "unit": "%",
                    "value": "7.2,4.6,12.4",
                    "type": "163"
                },
                {
                    "unit": "%",
                    "value": "1.1,0.2,1.2",
                    "type": "164"
                },
                {
                    "unit": "%",
                    "value": "5.8,0.7,7.8",
                    "type": "165"
                },
                {
                    "unit": "k/UL",
                    "value": "235,165,353",
                    "type": "166"
                },
                {
                    "unit": "pg",
                    "value": "29.3,26.8,33",
                    "type": "167"
                },
                {
                    "unit": "fl",
                    "value": "89.4,79.299,100",
                    "type": "168"
                },
                {
                    "unit": "g/dl",
                    "value": "32.7,32,36",
                    "type": "169"
                },
                {
                    "unit": "U/L",
                    "value": "28,29,103",
                    "type": "170"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.8,0.3,1",
                    "type": "171"
                },
                {
                    "unit": "mg/dl",
                    "value": "0.15,0.03,0.18",
                    "type": "172"
                },
                {
                    "unit": "U/L",
                    "value": "10,13,39",
                    "type": "173"
                },
                {
                    "unit": "IU/L",
                    "value": "22,9,64",
                    "type": "174"
                },
                {
                    "unit": "mg/dl",
                    "value": "9.2,8.6,10.3",
                    "type": "175"
                },
                {
                    "unit": "mg/dl",
                    "value": "3.5,2.5,5",
                    "type": "176"
                },
                {
                    "unit": "ug/dl",
                    "value": "8.26,5.7,10.91",
                    "type": "177"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.67,0,5",
                    "type": "178"
                },
                {
                    "unit": "ng/ml",
                    "value": "3.12,0,13.4",
                    "type": "179"
                },
                {
                    "unit": "U/ml",
                    "value": "4.65,0,27",
                    "type": "180"
                },
                {
                    "unit": "ng/ml",
                    "value": "0.72,0,4",
                    "type": "181"
                }]
        }
    ]
}


//把時間戳轉為年月日
function formatDate(datems){
    var datestr ='';
    if(datems != null && datems != ''){
        var date = new Date(datems);
        datestr =  date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
    }else{
        datestr = "- -";
    }
    return datestr
}


//获取参数
function getParameter(key) {
    var parameters = location.search.slice(1);
    if(parameters.length > 0) {
        var paArray = parameters.split('&');
        for(var i in paArray) {
            if(decodeURIComponent(paArray[i].split('=')[0]) == key) {
                return decodeURIComponent(paArray[i].slice(paArray[i].indexOf('=') + 1));
            }
        }
    }
    return null;
}


//范围的类型是怎么样的
function getRangeType(value){
    var low = value.split(',')[1];
    var high = value.split(',')[2];
    if(!low && !high){
        return 1;
    }else if(!low && high){
        return 2;
    }else if(low && !high){
        return 3;
    }else if(low==high){
        if(low=='正常') return 4;
        if(low=='無明顯異常') return 5;
        if(low=='陰性|陽性') return 6;
    }else if(low && high){
        return 7;
    }
}



function unit(type){
    for(var i=0;i<examType.length;i++){
        if(examType[i][0]===type){
            return examType[i][3];
        }
    }
}



//通过范围类型来拼接字符串
function getItemRange(type, value){
    var str = '';
    var testV = value.split(',')[0];
    var trueUnit = unit(type);
    if(type=='115' || type=='116' || type=='128' || type=='146' || type=='147' || type=='148' || type=='149' || type=='151' || type=='156' || type=='157' || type=='158'){
        // 没有范围设定的
        if(!testV || testV=='-' || testV=='(-)' || testV=='Negative' || testV=='Normal') str = '';
    }else{
        // 有范围设定的
        switch(getRangeType(value)) {
            case 1:
                if(!trueUnit){ //無單位
                    str = '';
                }else{ //有單位
                    str = trueUnit;
                }
                break;
            case 2:
                str ='<='+value.split(',')[2]+' '+trueUnit;
                break;
            case 3:
                str = '>='+value.split(',')[1]+' '+trueUnit;
                break;
            case 4:
                str = '正常';
                break;
            case 5:
                str = '無明顯異常';
                break;
            case 6:
                str = '陰性|陽性';
                break;
            case 7:
                str = value.split(',')[1]+'-'+value.split(',')[2]+' '+trueUnit;
                break;
            default:
                break;
        }
    }
    return str;
}


//判断异常的数据
function getItemDiffer(type, value){
    var differ = 0;
    var testV = value.split(',')[0];
    if(type=='115' || type=='116' || type=='128' || type=='146' || type=='147' || type=='148' || type=='149' || type=='151' || type=='156' || type=='157' || type=='158'){
        if(testV=='-' || testV=='(-)' || testV=='Negative' || testV=='Normal') differ = 0;
        else differ = 1;
    }else{
        switch(getRangeType(value)){
            case 2:
                if(+value.split(',')[0]>+value.split(',')[2]){
                    differ = 1;
                }
                break;
            case 3:
                if(+value.split(',')[0]<+value.split(',')[1]){
                    differ = 1;
                }
                break;
            case 7:
                if(+value.split(',')[0]<+value.split(',')[1]){
                    differ = 1;
                }else if(+value.split(',')[0]>+value.split(',')[2]) {
                    differ = 1;
                }
                break;
            default:
                break;
        }
    }
    return differ;
}


//数组去重
function unique(array){
    var n = [];//临时数组
    for(var i = 0;i < array.length; i++){
        if(n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}

//删除数组中的确定元素
function removeNum(arr, val) {
    for(var i=0;i<arr.length;i++) {
        if(arr[i] === val) {
            arr.splice(i, 1);
            break;
        }
    }
}

//选项卡开关切换
function toggle() {
    $("#item1 th").click(function () {
        for(var i=1;i<15;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item2 th").click(function () {
        for(var i=16;i<33;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item3 th").click(function () {
        for(var i=34;i<47;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item4 th").click(function () {
        for(var i=48;i<51;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item5 th").click(function () {
        for(var i=52;i<60;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item6 th").click(function () {
        for(var i=61;i<69;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item7 th").click(function () {
        for(var i=70;i<74;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item8 th").click(function () {
        for(var i=75;i<76;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item9 th").click(function () {
        for(var i=77;i<84;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item10 th").click(function () {
        for(var i=85;i<87;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item11 th").click(function () {
        for(var i=88;i<89;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
    $("#item12 th").click(function () {
        for(var i=90;i<94;i++){
            $(".tableBody tr").eq(i).toggle();
            $(".white1").parent().parent().find("tr").eq(i).toggle();
        }
        $(this).toggleClass("yellow blue");
    });
}

// cancel事件
//判断点击的是第几个，移动的就是第几个，
//首先就是确定参数
//没目标只执行删除,不进行移动
//所以就要先判定当前有几条健检报告
//当有一条没反应，且提醒
//有两条删除点1执行tar,点2只删除
//有三条第三条不执行，其余两条都执行tar,且移动第一次有两次转移
//例如cli=first,tar=second
function tianChong(s,t) {
    for(var i=0;i<82;i++){
        $this = $("."+s).eq(i);
        $this.find(".number").text($this.siblings("."+t).find(".number").text());
        $this.find(".unit").text($this.siblings("."+t).find(".unit").text());
        if($this.siblings("."+t).find(".number").hasClass("text-warning")){
            $this.find(".number").addClass("text-warning");
        }
    }
}


function cancel(cli,tar) {
    if(!tar){
        $(".tableTop").find("."+cli).find(".date").html("").siblings(".reportName").html("");
        $(".tableTop").find("."+cli).find("span").remove();
        $(".tableTop").find("."+cli).find("i").remove();
        // 只是删除的话是remove 替换的话是替换
        if(cli==="first"){
            $(".white1").html("");
        }else if(cli==="second"){
            $(".white2").html("");
        }else {
            $(".white3").html("");
        }
    }else {
        //如果还有填充的
        if(cli==="first"&&tar==="second"){
            if($(".white1").find(".number").hasClass("text-warning")){
                $(".white1").find(".number").removeClass("text-warning");
            }
            var time = $("."+tar).find(".date").text();
            var reportName = $("."+tar).find(".reportName").text();
            var ii = $("."+tar).find("i").text();
            $(".tableTop").find("."+cli).find(".date").html(time).siblings(".reportName").html(reportName);
            $(".tableTop").find("."+cli).find("i").html(ii);
            //交换规则
            tianChong("white1","white2");
            $(".tableTop").find("."+tar).find(".date").html("").siblings(".reportName").html("");
            $(".tableTop").find("."+tar).find("span").remove();
            $(".tableTop").find("."+tar).find("i").remove();
            $(".white2").html("");
        }else if(cli==="second"&&tar==="third") {
            if($(".white2").find(".number").hasClass("text-warning")){
                $(".white2").find(".number").removeClass("text-warning");
            }
            var time = $("."+tar).find(".date").text();
            var reportName = $("."+tar).find(".reportName").text();
            var ii = $("."+tar).find("i").text();
            $(".tableTop").find("."+cli).find(".date").html(time).siblings(".reportName").html(reportName);
            $(".tableTop").find("."+cli).find("i").html(ii);
            tianChong("white2","white3");
            $(".tableTop").find("."+tar).find(".date").html("").siblings(".reportName").html("");
            $(".tableTop").find("."+tar).find("span").remove();
            $(".tableTop").find("."+tar).find("i").remove();
            $(".white3").html("");
        }
    }
}



function delAfter() {
    $(".tableTop .first").find(".cancel").click(function(){
        var newNum = $(".dataTables_scrollHeadInner").find(".cancel").length;
        console.log(newNum);
        if(newNum===1){
            // cancel("first");
            // $(".dataTables_scrollHeadInner").find(".first").find("img").show();
            // $(".dataTables_scrollHeadInner").find(".first").css("backgroundColor","#fff");
            alert("不能再删除了哦")
        }else if(newNum===2){
                cancel("first","second");
                repeat();
                $(".dataTables_scrollHeadInner").find(".second").find("img").show();
                $(".dataTables_scrollHeadInner").find(".second").css("backgroundColor","#fff");

        }else{
            //交换和取消
            if($(".white1").find(".number").hasClass("text-warning")){
                $(".white1").find(".number").removeClass("text-warning");
            }
            var time = $(".second").find(".date").text();
            var reportName = $(".second").find(".reportName").text();
            var ii = $(".second").find("i").text();
            $(".dataTables_scrollHeadInner").find(".first").find(".date").html(time).siblings(".reportName").html(reportName);
            $(".dataTables_scrollHeadInner").find(".first").find("i").html(ii);
            for(var i=0;i<82;i++){
                $this = $(".white1").eq(i);
                $this.find(".number").text($this.siblings(".white2").find(".number").text());
                $this.find(".unit").text($this.siblings(".white2").find(".unit").text());
                if($this.siblings(".white2").find(".number").hasClass("text-warning")){
                    $this.find(".number").addClass("text-warning");
                }
            }
            cancel("second","third");
            repeat();
            $(".dataTables_scrollHeadInner").find(".third").find("img").show();
            $(".dataTables_scrollHeadInner").find(".third").css("backgroundColor","#fff");
        }
    });
    $(".tableTop .second").find(".cancel").click(function(){
        var newNum = $(".dataTables_scrollHeadInner").find(".cancel").length;
        if(newNum===3){
            cancel("second","third");
            repeat();
            $(".dataTables_scrollHeadInner").find(".third").find("img").show();
            $(".dataTables_scrollHeadInner").find(".third").css("backgroundColor","#fff");

        }else {
            cancel("second");
            repeat();
            $(".dataTables_scrollHeadInner").find(".second").find("img").show();
            $(".dataTables_scrollHeadInner").find(".second").css("backgroundColor","#fff");
        }
    });
    $(".tableTop .third").find(".cancel").click(function(){
        var newNum = $(".dataTables_scrollHeadInner").find(".cancel").length;
        cancel("third");
        repeat();
        $(".dataTables_scrollHeadInner").find(".third").find("img").show();
        $(".dataTables_scrollHeadInner").find(".third").css("backgroundColor","#fff");
    })
}

// function delAfter(){
//     $(".tableTop .first").find(".cancel").click(function(){
//         var newNum = $(".dataTables_scrollHeadInner").find(".cancel").length;
//         if(newNum===1){
//             // cancel("first");
//             // $(".dataTables_scrollHeadInner").find(".first").find("img").show();
//             // $(".dataTables_scrollHeadInner").find(".first").css("backgroundColor","#fff");
//             alert("不能再删除了哦")
//         }else if(newNum===2){
//             if($(".tableTop .second").find("span").hasClass(".cancel")){
//                 cancel("first","second");
//                 $(".dataTables_scrollHeadInner").find(".second").find("img").show();
//                 $(".dataTables_scrollHeadInner").find(".second").css("backgroundColor","#fff");
//             }else{
//                 cancel("first");
//                 $(".dataTables_scrollHeadInner").find(".first").find("img").show();
//                 $(".dataTables_scrollHeadInner").find(".first").css("backgroundColor","#fff");
//             }
//         }else{
//             if($(".white1").find(".number").hasClass("text-warning")){
//                 $(".white1").find(".number").removeClass("text-warning");
//             }
//             var time = $(".second").find(".date").text();
//             var reportName = $(".second").find(".reportName").text();
//             var ii = $(".second").find("i").text();
//             $(".dataTables_scrollHeadInner").find(".first").find(".date").html(time).siblings(".reportName").html(reportName);
//             $(".dataTables_scrollHeadInner").find(".first").find("i").html(ii);
//             for(var i=0;i<82;i++){
//                 $this = $(".white1").eq(i);
//                 $this.find(".number").text($this.siblings(".white2").find(".number").text());
//                 $this.find(".unit").text($this.siblings(".white2").find(".unit").text());
//                 if($this.siblings(".white2").find(".number").hasClass("text-warning")){
//                     $this.find(".number").addClass("text-warning");
//                 }
//             }
//             cancel("second","third");
//             $(".dataTables_scrollHeadInner").find(".third").find("img").show();
//             $(".dataTables_scrollHeadInner").find(".third").css("backgroundColor","#fff");
//         }
//     });
//     $(".tableTop .second").find(".cancel").click(function(){
//         var newNum = $(".dataTables_scrollHeadInner").find(".cancel").length;
//         if(newNum===3){
//             cancel("second","third");
//             $(".dataTables_scrollHeadInner").find(".third").find("img").show();
//             $(".dataTables_scrollHeadInner").find(".third").css("backgroundColor","#fff");
//
//         }else {
//             cancel("second");
//             $(".dataTables_scrollHeadInner").find(".second").find("img").show();
//             $(".dataTables_scrollHeadInner").find(".second").css("backgroundColor","#fff");
//         }
//     });
//     $(".tableTop .third").find(".cancel").click(function(){
//         var newNum = $(".dataTables_scrollHeadInner").find(".cancel").length;
//         cancel("third");
//         $(".dataTables_scrollHeadInner").find(".third").find("img").show();
//         $(".dataTables_scrollHeadInner").find(".third").css("backgroundColor","#fff");
//     })
// }


//一开始就渲染了
//把所有的disper和wo类都删除，渲染加的点也删除，然后找text-warning,有text-warning的这一个title就加点，有text-warning的这一行就显示。
function repeat(){
    $(".tableBody .detail").removeClass("wo");
    $(".tableBody .detail").removeClass("disper");
    var lee = $(".text-warning").parent().parent(".detail").length;
    var myArr = [];
    for(var i=0;i<lee;i++){
        var hih = $(".text-warning").parent().parent(".detail").eq(i).attr("class").split(" ")[1];
        myArr.push(hih);
    }
    for(var j=0;j<myArr.length;j++){
        $("tr."+myArr[j]).addClass("disper");
    }
    $(".tableBody .detail").show();
    renderRed();
    $(".detail").addClass('wo').hide();
    $(".disper").show();

}


//异常渲染
function renderRed() {
    for(var i=1;i<13;i++){
        $("#item"+i).find("th").removeClass("red");
    }
    var lee = $(".text-warning").parent().parent(".detail").length;
    var myArr = [];
    var name = "";
    var con=[];
    for(var i=0;i<lee;i++){
        var hih = $(".text-warning").parent().parent(".detail").eq(i).attr("class").split(" ")[1];
        myArr.push(hih);
    }

    for(var j=0;j<examType.length;j++){
        for(var i=0;i<myArr.length;i++){
            name = myArr[i];
            if(examType[j][0]===name){
                con.push(examType[j][2]);
            }
        }
    }
    var cont = unique(con);
    for(var k=0;k<cont.length;k++){
        $("#item"+cont[k]).find("th").addClass("red");
    }
}





