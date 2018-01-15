$(document).ready(function () {
    //左侧边框填充
    for(var i=0;i<examType.length;i++){
        var itemNum = examType[i][2];
        var typeNum =examType[i][0];
        var str = "<tr class="+'detail'+">" +
            "<th class="+typeNum+">"+examType[i][1]+"</th>" +
            "<td class="+'white1'+"></td>" +
            "<td class="+'white2'+"></td>" +
            "<td class="+'white3'+"></td>" +
            "</tr>";
        $("#item"+itemNum).after(str);
        $(".tableBody .title").find("th").addClass("blue");
        //正因为标记了itemNum才能准确的插在哪个后面
    }

    //真正写的时候可以判断按什么来渲染,点击左上方的时候该怎么渲染？

    render1(data);
    render2(data1);
    render3(data2);
    // render2(data);
    // render3(data);
    // 點擊一則報告，依次在兩個地方進行添加數據
    // 標題和內容
    var height = screen.height;
    var topHeight = document.getElementsByClassName("tableToggle")[0].offsetHeight;
    var finalHeight = height-topHeight;
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
    flex1();

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
        $(".tableBody .detail").show();
        $(".tableBody .title").find("th").addClass("red");
        $(".disper").hide();
        $(".tableBody .detail").addClass("wo");
        $(".wo").hide();
        $(".disper").show();
    });

    $(".tableTop span").click(function () {
        // 取消此次渲染
        //重新渲染一次
        var order =   $(this).parent().attr("class").split(" ")[0];
        console.log(order);
        if("first"===order){
            $(this).siblings(".date").html("").siblings(".reportName").html("").siblings("span").remove();
            $(".white1").html("");
            //开始渲染新的
            // render1(data1);
        }
    })
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
//例外：根据值来判断-尿糖115、尿蛋白116、尿潛血128、尿液顏色146、尿膽素原147、膽紅素148、酮體149、亞硝酸鹽151、尿結晶體156、尿圓柱體157、細菌158
//1-無下限+無上限
//2-無下限+有上限
//3-有下限+無上限
//4-正常
//5-無明顯異常
//6-陰性|陽性
//7-有下限+有上限

var data = {
    "status": "true",
    "reportId":"25562",
    "reportTime":1515654803215,
    "reportName":"为民库诊所报告",
    "itemList": [{
        "unit": "",
        "value": "77,18.5,24",
        "type": "100"
    },
        {
            "unit": "¤½¤À",
            "value": "70,0,90",
            "type": "101"
        },
        {
            "unit": "mmHg",
            "value": "120,90,140",
            "type": "102"
        },
        {
            "unit": "mmHg",
            "value": "70,60,90",
            "type": "103"
        },
        {
            "unit": "103/uL",
            "value": "5,4,10",
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
            "value": "190,130,200",
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
            "value": "¥¿±`,¥¿±`,¥¿±`",
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

var data1 = {
    "status": "true",
    "reportId":"25562",
    "reportTime":1515654803215,
    "reportName":"hhh诊所报告",
    "itemList": [{
        "unit": "",
        "value": "77,18.5,24",
        "type": "100"
    },
        {
            "unit": "¤½¤À",
            "value": "70,0,90",
            "type": "101"
        },
        {
            "unit": "mmHg",
            "value": "11,90,140",
            "type": "102"
        },
        {
            "unit": "mmHg",
            "value": "100,60,90",
            "type": "103"
        },
        {
            "unit": "103/uL",
            "value": "5,4,10",
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
            "value": "54,14,40",
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
            "value": "190,130,200",
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
            "value": "50,,130",
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
            "value": "¥¿±`,¥¿±`,¥¿±`",
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

var data2 = {
    "status": "true",
    "reportId":"25562",
    "reportTime":1515654803215,
    "reportName":"666诊所报告",
    "itemList": [{
        "unit": "",
        "value": "77,18.5,24",
        "type": "100"
    },
        {
            "unit": "¤½¤À",
            "value": "70,0,90",
            "type": "101"
        },
        {
            "unit": "mmHg",
            "value": "120,90,140",
            "type": "102"
        },
        {
            "unit": "mmHg",
            "value": "70,60,90",
            "type": "103"
        },
        {
            "unit": "103/uL",
            "value": "5,4,10",
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
            "value": "190,130,200",
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
            "value": "¥¿±`,¥¿±`,¥¿±`",
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

//异常判断




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


//通过范围类型来拼接字符串
function getItemRange(type, value){
    var str = '';
    var testV = value.split(',')[0];
    if(type=='115' || type=='116' || type=='128' || type=='146' || type=='147' || type=='148' || type=='149' || type=='151' || type=='156' || type=='157' || type=='158'){
        // 没有范围设定的
        if(!testV || testV=='-' || testV=='(-)' || testV=='Negative' || testV=='Normal') str = '';
    }else{
        // 有范围设定的
        switch(getRangeType(value)) {
            case 1:
                if(!examType[(+type)-100][3]){ //無單位
                    str = '';
                }else{ //有單位
                    str = examType[(+type)-100][3];
                }
                break;
            case 2:
                str ='<='+value.split(',')[2]+' '+examType[(+type)-100][3];
                break;
            case 3:
                str = '>='+value.split(',')[1]+' '+examType[(+type)-100][3];
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
                str = value.split(',')[1]+'-'+value.split(',')[2]+' '+examType[(+type)-100][3];
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


//内容填充
//第一栏
function render1(data) {
    if(data.status=="true"){
        var str = "<span class="+'cancel'+"></span>";
        $(".tableTop .first").append(str);
        var time = formatDate(data.reportTime);
        $(".tableTop .first").find(".date").text(time).siblings(".reportName").text(data.reportName);
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
            $("."+num).siblings(".white1").html(s);
            if((val=='異常') || (val=='异常') || differ==1){
                $("."+num).siblings(".white1").find(".number").addClass("text-warning").parent().parent().addClass("disper");
            }
        })
    }
}


function render2(data) {
    if(data.status=="true"){
        var str = "<span class="+'cancel'+"></span>";
        $(".tableTop .second").append(str);
        var time = formatDate(data.reportTime);
        $(".tableTop .second").find(".date").text(time).siblings(".reportName").text(data.reportName);
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
            $("."+num).siblings(".white2").html(s);
            if((val=='異常') || (val=='异常') || differ==1){
                $("."+num).siblings(".white2").find(".number").addClass("text-warning").parent().parent().addClass("disper");
            }
        })
    }
}


function render3(data) {
    if(data.status=="true"){
        var str = "<span class="+'cancel'+"></span>";
        $(".tableTop .third").append(str);
        var time = formatDate(data.reportTime);
        $(".tableTop .third").find(".date").text(time).siblings(".reportName").text(data.reportName);
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
            $("."+num).siblings(".white3").html(s);
            if((val=='異常') || (val=='异常') || differ==1){
                $("."+num).siblings(".white3").find(".number").addClass("text-warning").parent().parent().addClass("disper");
            }
        })
    }
}
// // 第二栏
// function render2(data) {
//     var time = formatDate(data.reportTime);
//     console.log(time);
//     $(".tableTop .second").find(".date").text(time).siblings(".reportName").text(data.reportName);
//     $.each(data.itemList,function (i,v) {
//         $(".tableBody").find(".white2").eq(i).text(v.value.split(",")[0]);
//     })
// }
// // 第三栏
// function render3(data) {
//     var time = formatDate(data.reportTime);
//     console.log(time);
//     $(".tableTop .third").find(".date").text(time).siblings(".reportName").text(data.reportName);
//     $.each(data.itemList,function (i,v) {
//         $(".tableBody").find(".white3").eq(i).text(v.value.split(",")[0]);
//     })
// }


// function rever(i) {
//     var len = $("._"+i).length;
//     var arr = [];
//     for(var i=0;i<len;i++){
//         arr.push($("._"+i).eq(i).text());
//     }
//     for(var i=0;i<12;i++){
//         $("._"+i).eq()
//     }
// }
//
// function getRangeType(value){
//     var low = value.split(',')[1];
//     var high = value.split(',')[2];
//     if(!low && !high){
//         return 1;
//     }else if(!low && high){
//         return 2;
//     }else if(low && !high){
//         return 3;
//     }else if(low==high){
//         if(low=='正常') return 4;
//         if(low=='無明顯異常') return 5;
//         if(low=='陰性|陽性') return 6;
//     }else if(low && high){
//         return 7;
//     }
// }
// //獲取差值
//
// function getItemDiffer(type, value){
//     var str = '';
//     var testV = value.split(',')[0];
//     if(!testV) return str;
//     if(type=='115' || type=='116' || type=='128' || type=='146' || type=='147' || type=='148' || type=='149' || type=='151' || type=='156' || type=='157' || type=='158'){
//         if(testV=='-' || testV=='(-)' || testV=='Negative' || testV=='Normal') str = '';
//         else str = '-';
//     }else{
//         switch(getRangeType(value)){
//             case 1:
//                 str='';
//                 break;
//             case 2:
//                 var differ = '';
//                 if(+value.split(',')[0]>+value.split(',')[2]){
//                     differ = (+value.split(',')[0])-(+value.split(',')[2]) + '';
//                     if(differ.indexOf('.')>=0){
//                         differ = (+differ).toFixed(1);
//                     }
//                     str = '&nbsp;↑&nbsp;'+differ;
//                 }else{
//                     str = '';
//                 }
//                 break;
//             case 3:
//                 differ = '';
//                 if(+value.split(',')[0]<+value.split(',')[1]){
//                     differ = (+value.split(',')[1])-(+value.split(',')[0]) + '';
//                     if(differ.indexOf('.')>=0){
//                         differ = (+differ).toFixed(1);
//                     }
//                     str = '&nbsp;↓&nbsp;'+differ;
//                 }else{
//                     str = '';
//                 }
//                 break;
//             case 4:
//             case 5:
//             case 6:
//                 str="";
//                 break;
//             case 7:
//                 differ = '';
//                 if(+value.split(',')[0]<+value.split(',')[1]){
//                     differ = (+value.split(',')[1])-(+value.split(',')[0]) + '';
//                     if(differ.indexOf('.')>=0){
//                         differ = (+differ).toFixed(1);
//                     }
//                     str = '&nbsp;↓&nbsp;'+differ;
//                 }else if(+value.split(',')[0]>+value.split(',')[2]){
//                     differ = (+value.split(',')[0])-(+value.split(',')[2]) + '';
//                     if(differ.indexOf('.')>=0){
//                         differ = (+differ).toFixed(1);
//                     }
//                     str = '&nbsp;↑&nbsp;'+differ;
//                 }else{
//                     str = '';
//                 }
//                 break;
//             default:
//                 break;
//         }
//     }
//     return str;
// }
//
//
//
// //獲取測試項的範圍值
// function getItemRange(type, value){
//     var str = '-';
//     var testV = value.split(',')[0];
//     if(type=='115' || type=='116' || type=='128' || type=='146' || type=='147' || type=='148' || type=='149' || type=='151' || type=='156' || type=='157' || type=='158'){
//         if(!testV || testV=='-' || testV=='(-)' || testV=='Negative' || testV=='Normal') str = '-';
//         else str = '';
//     }else{
//         switch(getRangeType(value)) {
//             case 1:
//                 if(!examType[(+type)-100][3]){ //無單位
//                     str = '';
//                 }else{ //有單位
//                     str = examType[(+type)-100][3];
//                 }
//                 break;
//             case 2:
//                 str = '<='+value.split(',')[2]+' '+examType[(+type)-100][3];
//                 break;
//             case 3:
//                 str = '>='+value.split(',')[1]+' '+examType[(+type)-100][3];
//                 break;
//             case 4:
//                 str = '正常';
//                 break;
//             case 5:
//                 str = '無明顯異常';
//                 break;
//             case 6:
//                 str = '陰性|陽性';
//                 break;
//             case 7:
//                 str = value.split(',')[1]+'-'+value.split(',')[2]+' '+examType[(+type)-100][3];
//                 break;
//             default:
//                 break;
//         }
//     }
//     return str;
// }
//
//
//
//
//
// $(function(){
//     var reportId = getParameter('reportId');
//     var uid = getParameter('uid');
//     var checkType = 0; //默认为0，显示全部检查项
//
//     var showH = window.screen.height-150;
//     if(showH<600){
//         $('.selectList').css({'height':showH, 'overflow-y':'scroll'});
//     }
//
//     //获取会员某一份检查报告的详细信息
//     render(data1);
//     console.log(data1);
//     function render(data) {
//         if(data.status=='true'){
//             var itemNum; //當前大類類型值1-12
//             var differ; //記錄差值串
//             var range; //記錄範圍值
//             $('.selectItem').find('p span').text(data.itemList.length);
//             //填充當前數據
//             $.each(data.itemList, function(i,v){
//                 itemNum = +examType[(+v.type)-100][2];
//                 differ = getItemDiffer(v.type, v.value);
//                 range = getItemRange(v.type, v.value);
//                 var $tr=$('.item'+itemNum).find('tbody').find('.template').clone().removeClass('template');
//                 $tr.find('td').eq(0).text(examType[(+v.type)-100][1]);
//                 $tr.find('td').eq(1).html(formatNA(v.value.split(',')[0]));
//                 if((v.value.split(',')[0]=='異常') || (v.value.split(',')[0]=='异常') || differ){
//                     $tr.find('td').eq(1).addClass('text-danger');
//                 }
//                 if(range==''){
//                     $tr.find('td').eq(2).text(formatNA(range));
//                 }else{
//                     $tr.find('td').eq(2).html(range+'&nbsp;'+differ);
//                 }
//                 $('.item'+itemNum).find('tbody').append($tr);
//                 //這就表明給第幾項數據填充
//             });
//         }
//     }
//
//     function render(data) {
//         var itemNum;
//         var differ;
//         var range;
//         $.each(data.itemList,function (i,v) {
//             itemNum = +examType[(+v.type)-100][2];
//
//         })
//     }
//
//
//
//     //选择查看某一大类的检查结果
//     $('.selectItem').find('.select').on('click', function(){
//         $('.cover').toggle();
//         $('.selectList').toggle();
//     });
//     $('.selectList ul li').on('click', function(){
//         $('.selectList').hide();
//         $('.cover').hide();
//         if($(this).index()==checkType) return;
//         checkType = $(this).index();
//         $('.selectItem .select').find('span').eq(0).text($(this).text());
//         if(checkType==0){
//             $('.checkItem>div').show();
//         }else{
//             $('.checkItem .item'+checkType).show().siblings('div').hide();
//         }
//     });
//     //點擊表格的頭部可以收縮檢查項
//     $('table thead').on('click', function(){
//         $(this).next('tbody').toggle();
//     });
//
// });