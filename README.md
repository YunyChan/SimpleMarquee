# SimpleMarquee [![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/YunyChan/SimpleMarquee/blob/master/LICENSE) #

一个不依赖任何第三方框架库的简易走马灯组件。

## 快速开始 ##

+ 直接从上面下载
+ 克隆项目：https://github.com/YunyChan/SimpleMarquee.git

## 使用 ##

首先在页面中引入`SimpleMarquee.js`JS文件

```html
<script src="SimpleMarquee.js"></script>
```

然后通过创建SimpleMarquee的实例并传入相应的参数来插入并使用组件

```html
<div id="marquee"></div>
<script src="SimpleMarquee.js"></script>
<script>
    var oData = [{
            name: 'test1',
            age: 15
        }, {
            name: 'test2',
            age: 20
        }, {
            name: 'test3',
            age: 25
        }, {
            name: 'test4',
            age: 30
        }, {
            name: 'test5',
            age: 35
        }
    ];
    var oMarquee = new SimpleMarquee({
        target: document.getElementById('marquee'),
        width: 800,
        data: oData,
        item: function(nIndex, oData){
            return 'Name：' + oData.name + ' & Age:' + oData.age + '.';
        },
        gap: 50,
        speed: 5,
        fps: 40
    });
    oMarquee.run();
</script>
```

下面是组件的配置参数说明：

+ `width` - __必须__, 走马灯遮罩宽度
+ `unit` - _default: px_, 样式单位px/rem
+ `data` - __必须__, 数据源
+ `item` - _必须_, 走马灯每项的模板
+ `gap` - _default: 10px_, 走马灯各项间隔宽度
+ `maxGap` - _default: 10px_, 走马灯间隔最大宽度
+ `minGap` - _default: 10px_, 走马灯间隔最小宽度
+ `speed` - _default: 2px_, 走马灯每帧移动距离
+ `fps` - _default: 40_, 走马灯移动帧速
+ `fromOutside` - _default: false_, 走马灯内容起始位置是否从遮罩的最右边开始

APIs
* `render(DOM)` - 渲染组件
    * `DOM` - 需要插入组件的DOM元素对象
* `run()` - 启动走马灯
* `stop()` - 暂停走马灯

## 作者 ##

Yuny Chan

+ [GitHub：https://github.com/YunyChan](https://github.com/YunyChan)
+ [博客：http://yuny.me/](http://yuny.me/)