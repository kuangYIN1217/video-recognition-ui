function init() {
  var $ = go.GraphObject.make;  // 简洁定义模板
  myDiagram =
    $(go.Diagram, "myDiagramDiv",  // 绘图区和HTML中div的id绑定
      {
        initialContentAlignment: go.Spot.Top,// 模型图的中心位置所在坐标
        allowDrop: true,  // 接受从Palette拖拽的节点
        "LinkDrawn": showLinkLabel,  // DiagramEvent listener
        "LinkRelinked": showLinkLabel,
        "animationManager.duration": 800, // 稍长与默认的600ms动画
        "undoManager.isEnabled": true     // 启用Ctrl-Z撤销和Ctrl-Y重做快捷键
      });

  //当文档被修改,添加一个“*”标题,使“保存”按钮
  myDiagram.addDiagramListener("Modified", function(e) {
    var button = document.getElementById("SaveButton");
    if (button) button.disabled = !myDiagram.isModified;
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }

  });

  var idArr = getLayers();

  // 为普通节点定义节点模板
  myDiagram.nodeTemplateMap.add("",  // 默认节点模板类
    $(go.Node, "Spot", nodeStyle(),
      // 主要对象是一个环绕TextBlock的矩形的Panel
     $(go.Panel, "Auto",
        $(go.Shape, "RoundedRectangle",
          { minSize: new go.Size(148, 42), fill: "#ffffff", stroke: "#52a683", },
          new go.Binding("figure", "figure")),
       $(go.Panel, "Horizontal",
         $(go.Picture,
          {
            source:"../assets/network/chajian.png",
            background:"#ffffff",
            width:24,
            height:24,
            margin:12,
          }
        ),
        $(go.TextBlock,
          {
            font: "bold 11pt Helvetica, Arial, sans-serif",
            stroke: "#666666",
            // margin:10,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay()
        ))
      ),
      // 节点周围提供连线的四点
      makePort("T", go.Spot.Top, false, true),
      // makePort("L", go.Spot.Left, true, true),
      // makePort("R", go.Spot.Right, true, true),
      makePort("B", go.Spot.Bottom, true, true),
      {click: function(e, Node) {

        // 触发按钮点击事件，达成状态转变
        if(document.getElementById("node_click_btn")){
          document.getElementById("node_click_btn").click();
        }
        var str1 = document.getElementById("plugin_storage").value;//网络层信息
        var test1 = JSON.parse(str1);
        var str2 = document.getElementById("layer_dictionary").value;//数据字典
        var test2 = JSON.parse(str2);
        // console.log(test);
        // var layerId = Node.toString().split("(")[1].split(")")[0];
        var layerId = Node.data['nameId'];
        var textName = Node.data['text'];
        //var flag = "false";
        document.getElementById("property").innerHTML = "";
        // for (var i = 0;i<test["layers"].length;i++){
        //     if (layerId == test["layers"][i].name){
        //         document.getElementById("property").innerHTML = document.getElementById("property").innerHTML + '<div style="margin-bottom: 15px;"><div style="font-size: 20px;margin-bottom: 5px;">'+ test["layers"][i].config.name +'</div><input type="text" style="background: transparent;border: 0px;border-bottom: 1px solid grey;height: 35px;width: 100%;color: white;outline-style: none;" id="' +
        //             test["layers"][i].config.name + '" name="' + test["layers"][i].name + '" placeholder="' + test["layers"][i].config.sparse + '"/></div>';
        //     }else {
        //         continue;
        //     }
        // }
          for (var i = 0;i < test1["layers"].length;i++){
            if (test1["layers"][i].class_name == layerId && test1["layers"][i].name == textName){
              var configStr = test1["layers"][i].config;
              if (test2[layerId]){
                for (var key in configStr){
                  for (var j = 0;j < test2[layerId].editable_param_list.length; j++){
                    if (key == test2[layerId].editable_param_list[j].path){
                      document.getElementById("property").innerHTML = document.getElementById("property").innerHTML + '<div style="margin-bottom: 15px;"><div style="font-size: 20px;margin-bottom: 5px;">'+ test2[layerId].editable_param_list[j]["editable_param"].name +'</div><input type="text" style="background: transparent;border: 0px;border-bottom: 1px solid grey;height: 35px;width: 90%;color: #666666F;outline-style: none;" id="' + layerId + '@' + textName + '" name="' + test2[layerId].editable_param_list[j]["editable_param"].name + '" placeholder="' + test2[layerId].editable_param_list[j]["editable_param"].default_value + '" value="' + test1["layers"][i].config[key] + '"/></div>';
                      // document.getElementById("property").innerHTML = document.getElementById("property").innerHTML + '<div style="margin-bottom: 15px;"><div style="font-size: 20px;margin-bottom: 5px;">'+ test2[layerId].editable_param_list[j]["editable_param"].name +'</div><input type="text"  style="background: transparent;border: 0px;border-bottom: 1px solid grey;height: 35px;width: 100%;color: #666666F;outline-style: none;" id="' + layerId + '@' + textName + '" name="' + test2[layerId].editable_param_list[j]["editable_param"].name + '" placeholder="' + test2[layerId].editable_param_list[j]["editable_param"].default_value + '" value="' + test1["layers"][i].config[key] + '"/></div>';
                      break;
                    }else
                      continue;
                  }
                }
              }
              break;
              // var configArray = JSON.parse(configStr);
              // console.log(configStr);
              // for (var j = 0;j < configStr.length; j++){
              //     console.log("test"+j);
              // }
            }else
              continue;
          }
        // console.log(Node.data['nameId']);
      }
      }
    ));

  myDiagram.nodeTemplateMap.add("start",
    $(go.Node, "Spot", nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      $(go.Panel, "Auto",
        $(go.Shape, "Rectangle",
          { minSize: new go.Size(100, 70), fill: "#ea1b1d", stroke: null },
          new go.Binding("figure", "figure")),
        $(go.TextBlock,
          {
            font: "bold 11pt Helvetica, Arial, sans-serif",
            stroke:"#52a683",
            margin: 20,
            maxSize: new go.Size(100, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay()
        )
      )));
// 替换linkTemplateMap中默认的连接线模板
//连接线模板
  myDiagram.linkTemplate =
    $(go.Link,  // 整个连接线panel
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5, toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true,
        // 鼠标覆盖高亮连接线
        mouseEnter: function(e, link) {
          link.findObject("HIGHLIGHT").stroke = "rgba(30,39,131,0.2)";
        },
        mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
      },
      new go.Binding("points").makeTwoWay(),
      $(go.Shape,  // 突出显示形状，通常是透明的
        { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
      $(go.Shape,  // 连接线的形状
        { isPanelMain: true, stroke: "gray", strokeWidth: 2 }),
      $(go.Shape,  // 连接线箭头
        { toArrow: "standard", stroke: null, fill: "gray"}),
      $(go.Panel, "Auto",  // 连接线label,通常是不可见的
        { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
        new go.Binding("visible", "visible").makeTwoWay(),
        $(go.Shape, "RoundedRectangle",  // label的形状
          { fill: "#F8F8F8", stroke: null }),
        $(go.TextBlock, "Yes",  // 定义label
          {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#333333",
            editable: true
          },
          new go.Binding("text").makeTwoWay())
      )
    );

// temporary links used by LinkingTool and RelinkingTool are also orthogonal:
  myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
  myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
  load();  // 加载保存的流程图信息

//初始化面板左边界面
  myPalette =
    $(go.Palette, "myPaletteDiv",  // 左边面板和HTML中的div的id关联
      {
        "animationManager.duration": 800, // slightly longer than default (600ms) animation
        nodeTemplateMap: myDiagram.nodeTemplateMap.valueOf("start"),  // 和myDiagram共享一套显示模板
        model: new go.GraphLinksModel(idArr)
      });

// 下面的代码覆盖GoJS阻止浏览器滚动
  myDiagram.doFocus = customFocus;
  myPalette.doFocus = customFocus;

// Make link labels visible if coming out of a "conditional" node.
// This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
  function showLinkLabel(e) {
    var label = e.subject.findObject("LABEL");
    if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
  }
// 辅助节点模板的定义
  function nodeStyle() {
    return [
      // The Node.location comes from the "loc" property of the node data,
      // converted by the Point.parse static method.
      // If the Node.location is changed, it updates the "loc" property of the node data,
      // converting back using the Point.stringify static method.
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      {
        // the Node.location is at the center of each node
        locationSpot: go.Spot.Center,
        //isShadowed: true,
        //shadowColor: "#888",
        // 鼠标移到上方或离开显示四点
        mouseEnter: function (e, obj) { showPorts(obj.part, true); },
        mouseLeave: function (e, obj) { showPorts(obj.part, false); }
      }
    ];
  }
// Define a function for creating a "port" that is normally transparent.
// The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
// and where the port is positioned on the node, and the boolean "output" and "input" arguments
// control whether the user can draw links from or to the port.
// 绘制图形四角的圆点
  function makePort(name, spot, output, input) {
    // the port is basically just a small circle that has a white stroke when it is made visible
    return $(go.Shape, "Circle",
      {
        fill: "transparent",
        stroke: "#52a683",  // this is changed to "white" in the showPorts function
        desiredSize: new go.Size(8, 8),
        alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
        portId: name,  // declare this object to be a "port"
        fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
        fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
        cursor: "pointer"  // show a different cursor to indicate potential link point

      });
  }
// 限制窗口滚动
  function customFocus() {
    var x = window.scrollX || window.pageXOffset;
    var y = window.scrollY || window.pageYOffset;
    go.Diagram.prototype.doFocus.call(this);
    window.scrollTo(x, y);
  }

// 获取节点信息
  function getLayers() {
    var str = document.getElementById("plugin_storage").value;
    var test = JSON.parse(str);
    //console.log(test['layers']);
    var arr = "";
    var sep = "";
    var array = new Array();

    for (var i = 0;i<test['layers'].length;i++){
      if (arr == "")
        sep = "";
      else
        sep = ",";
      arr = '{ "text": "' + test['layers'][i].name + '" }';

      arr = JSON.parse(arr);
      array[i] = arr;
    }

    return array;
  }

// 鼠标在图形上方显示四角的圆点
  function showPorts(node, show) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    node.ports.each(function(port) {
      port.stroke = (show ? "#52a683" : null);
    });
  }
} // 初始化函数结束

// 保存编辑的流程图
function save() {
  var str = document.getElementById("plugin_storage").value;
  var test = JSON.parse(str);
  var saveJson = JSON.parse(myDiagram.model.toJson());
  var saveStr = new Array();

  var fromArr = new Array();
  var toArr = new Array();
  var size = saveJson["linkDataArray"].length -1 ;
  var link = new Array(saveJson["linkDataArray"].length + 1);
  var index = 0;
  var class_name = [];
  var nodes = [];
  var nodesName=[];
  //console.log(saveJson["linkDataArray"]);
  for (var i = 0;i<saveJson["linkDataArray"].length;i++){
    fromArr[i] = -saveJson["linkDataArray"][i].from;
    toArr[i] = -saveJson["linkDataArray"][i].to;
  }
  for (var j = 0;j<toArr.length;j++) {
    if (fromArr.indexOf(toArr[j])==-1) {
      link[size + 1] = toArr[j];
      link[size] = fromArr[j];
    }
  }
  for (var m = 1;m <= size;m++) {
    for (var l = 0; l < toArr.length; l++) {
      if (toArr[l] == link[size - index]) {
        index++;
        link[size - index] = fromArr[l];
        break;
      }
    }
  }


  // for (var i = 0;i<saveJson["nodeDataArray"].length;i++){
  //     for (var j = 0;j<test["layers"].length;j++){
  //         if (saveJson["nodeDataArray"][i].text == test["layers"][j].name){
  //             saveStr[i] = test["layers"][j];
  //         }else
  //             continue;
  //     }
  // }


  //console.log(JSON.stringify(fromArr));
 // console.log(JSON.stringify(toArr));
 // console.log(JSON.stringify(link));
 // console.log(JSON.stringify(saveJson["nodeDataArray"]));

  for (var n = 0;n<link.length;n++){
    var lIndex = link[n];
    for (var q = 0;q < saveJson["nodeDataArray"].length;q++){
      if (saveJson["nodeDataArray"][q].key == -lIndex){
        for (var j = 0;j<test["layers"].length;j++){
          if (saveJson["nodeDataArray"][q].text == test["layers"][j].name){
            saveStr[n] = test["layers"][j];
          }else
            continue;
        }
        break;
      }
    }
    // console.log(lIndex);
    //     for (var j = 0;j<test["layers"].length;j++){
    //         if (saveJson["nodeDataArray"][lIndex].text == test["layers"][j].name){
    //             saveStr[n] = test["layers"][j];
    //         }else
    //             continue;
    //     }
  }
  test["layers"] = saveStr;
  for (var i = 0;i<test['layers'].length;i++){
    class_name.push(test['layers'][i].class_name);
    nodes.push(test['layers'][i].inbound_nodes[0]);
  }
 // console.log(class_name);
  for(var j=0;j<nodes.length;j++){
    if(nodes[j]==undefined){
      nodesName.push('');
    }
    else{
      nodesName.push(nodes[j][0][0]);
    }
  }
  //console.log(nodesName);
  //console.log(test["layers"]);
  document.getElementById("plugin_storage").value = JSON.stringify(test);
  // console.log(myDiagram.model.toJson());
  // console.log(JSON.stringify(link));
  // console.log(JSON.stringify(fromArr));
  // console.log(JSON.stringify(toArr));
  // console.log(myDiagram.model.toJson());
  myDiagram.isModified = false;
}

// 保存编辑的属性参数
function saveParam() {
  var str1 = document.getElementById("plugin_storage").value;
  var test1 = JSON.parse(str1);
  var str2 = document.getElementById("layer_dictionary").value;
  var test2 = JSON.parse(str2);
  var test3 = document.getElementById("property").getElementsByTagName("input");
  for (var i = 0; i < test3.length; i++){
    var layerClass = test3[i].id.split("@")[0];
    var layerName = test3[i].id.split("@")[1];
    var pathName = test3[i].name
    for (var j = 0;j < test1["layers"].length; j++){
      if (test1["layers"][j].class_name == layerClass && test1["layers"][j].name == layerName){
        if (test3[i].value.indexOf(",")){
          var dataArr = test3[i].value.split(",");
          var data = new Array();
          for (var k = 0;k < dataArr.length; k++){
            if (dataArr[k] == "null")
              data[k] = null;
            else
              data[k] = parseInt(dataArr[k]);

          }
          test1["layers"][j].config[pathName] = data;
        }else {
          test1["layers"][j].config[pathName] = test3[i].value;
        }
        // console.log(JSON.stringify(test1["layers"][j]));
        break;
      }else
        continue;
    }
  }
  // console.log(JSON.stringify(test1));
  document.getElementById("plugin_storage").value = JSON.stringify(test1);
}

// 组织形成流程图JSON格式数据
function getPicMes() {
  var str = document.getElementById("plugin_storage").value;
  var test = JSON.parse(str);
  var arr2 = "";
  var sep2 = "";
  var array = new Array();
  for (var i = 0;i<test['layers'].length;i++){
    if (arr2 == "")
      sep2 = "";
    else
      sep2 = ",";
    arr2 = '{ "text": "' + test['layers'][i].name + '","name":"' + test['layers'][i].class_name + '" }';
    arr2 = JSON.parse(arr2);
    array[i] = arr2;
  }

  var arrStr = '{ "class": "go.GraphLinksModel","linkFromPortIdProperty": "fromPort","linkToPortIdProperty": "toPort","nodeDataArray": [ ';
  var idArr = array;
  var arr = "";
  var sep = "";
  var arr1 = "";
  var sep1 = "";
  var locY = -418.9999999999997;
  var line1 = -383.9999999999997;
  var line2 = -373.9999999999997;
  var line3 = -353.9999999999997;
  var line4 = -333.9999999999997;
  var line5 = -323.9999999999997;
  for (var i = 0;i<idArr.length;i++){
    if (arr == ""){
      sep = "";
    }
    else
      sep = ",";
    var j = i + 1;
    arr = arr + sep + '{ "text": "' + idArr[i].text + '",' + '"key":-' + j +',"loc":"' + '-307.9999999999999 ' + locY +'"' + ',"nameId":"' + idArr[i].name + '"}';

    locY = locY + 130;
  }

  for (var i = 0;i<idArr.length-1;i++){
    if (arr1 == "")
      sep1 = "";
    else
      sep1 = ",";
    var j = i + 1;
    var k = j + 1;
    arr1 = arr1 + sep1 + '{ "from":-' + j + ',' + '"to":-' + k +',"fromPort":"B", "toPort":"T", "points":[' + '-307.9999999999999,'+line1+',-307.9999999999999,'+line2+',-307.9999999999999,'+line3+',-307.9999999999999,'+line3+',-307.9999999999999,'+line4+',-307.9999999999999,'+line5 + ']}';

    // line1 = line1 + 129.00000000000008;
    // line2 = line2 + 130.00000000000008;
    // line3 = line3 + 134.00000000000008;
    // line4 = line4 + 138.00000000000008;
    // line5 = line5 + 138.00000000000008;

    line1 = line1 + 130;
    line2 = line2 + 130;
    line3 = line3 + 130;
    line4 = line4 + 130;
    line5 = line5 + 130;
  }
  arrStr = arrStr + arr + '],"linkDataArray":[' + arr1 + ']}';
  arrStr = JSON.parse(arrStr);
  return arrStr;
}

//重新显示保存的流程图
function load() {
  myDiagram.model = go.Model.fromJson(getPicMes());
  //console.log(myDiagram.model);
  // console.log(myDiagram.model.toJson());
}
