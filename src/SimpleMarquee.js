/**
 * Created by yunying on 2016/4/18.
 */
(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent
    };

    function fListenEvent(oDom, sEventName, fCallback, bUseCapture){
        if(oWin.attachEvent){
            oDom.attachEvent('on' + sEventName, function(){
                var oEvent = oWin.event;
                fCallback && fCallback(oEvent);
            });
        }else{
            oDom.addEventListener(sEventName, fCallback, !!bUseCapture);
        }
    }


    var SimpleMarquee = fConstructor;
    // 静态变量
    SimpleMarquee.prototype.XXX = '';
    // 静态方法
    SimpleMarquee.prototype.init = fInit;
    SimpleMarquee.prototype.createItems = fCreateItems;
    SimpleMarquee.prototype.getGapWidth = fGetGapWidth;
    SimpleMarquee.prototype.render = fRender;
    SimpleMarquee.prototype.getItemsWidthAndHeight = fGetItemsWidthAndHeight;
    SimpleMarquee.prototype.setWrapWidthAndHeight = fSetWrapWidthAndHeight;
    SimpleMarquee.prototype.setStartPosition = fSetStartPosition;
    SimpleMarquee.prototype.run = fRun;
    SimpleMarquee.prototype.updatePosition = fUpdatePosition;
    SimpleMarquee.prototype.isHeaderInvisible = fIsHeaderInvisible;
    SimpleMarquee.prototype.stop = fStop;

    function fConstructor(oConf){
        oConf = oConf || {};
        this.target = oConf.target;
        this.minGap = oConf.gap || oConf.minGap || 10;
        this.maxGap = oConf.gap || oConf.maxGap || 10;
        this.speed = oConf.speed || 2;
        this.item = oConf.item || '';
        this.fps = oConf.fps || 30;
        this.data = oConf.data || [];
        this.fromOutside = oConf.fromOutside;

        this.init();
    }

    function fInit(){
        this.interval = Math.floor(1000 / this.fps);
        this.render();
    }

    function fCreateItems(){
        var sItemsHTML = '';
        for(var cnt = 0, length = this.data.length; cnt < length; cnt++){
            var oData = this.data[cnt];
            sItemsHTML += '<li style="padding-right: ' + this.getGapWidth() + 'px">' + this.item(cnt, oData) + '</li>';
        }
        return sItemsHTML;
    }

    function fGetGapWidth(){
        return Math.floor(Math.random() * (this.maxGap - this.minGap)) + this.minGap;
    }

    function fRender(){
        this.wrap = oDoc.createElement('ul');
        this.wrap.innerHTML = this.createItems();
        this.wrap.style.position = 'absolute';
        this.wrap.style.top = '0px';

        this.target.style.position = 'relative';
        this.target.style.overflow = 'hidden';
        this.target.appendChild(this.wrap);

        this.setWrapWidthAndHeight(this.getItemsWidthAndHeight());
        this.setStartPosition();
    }

    function fGetItemsWidthAndHeight(){
        var oLis = this.target.getElementsByTagName('li');
        var nWidth = 0;
        var nHeight = 0;
        for(var cnt = 0, length = oLis.length; cnt < length; cnt ++){
            var oLi = oLis[cnt];
            nWidth += (oLi.offsetWidth + 1);
            if(oLi.offsetHeight > nHeight){
                nHeight = oLi.offsetHeight;
            }
        }

        this.header = oLis[0];

        return {
            width: nWidth,
            height: nHeight
        }
    }

    function fSetWrapWidthAndHeight(oParams){
        this.wrap.style.width = oParams.width + 'px';
        this.wrap.height = oParams.height + 'px';
        this.wrap.lineHeight = oParams.height + 'px';
        this.target.style.height = oParams.height + 'px';
    }

    function fSetStartPosition(){
        if(this.fromOutside){
            this.wrap.style.left = this.target.offsetWidth + 'px';
        }else{
            this.wrap.style.left = '0px';
        }
    }

    function fRun(){
        var that = this;
        this.intervalID = setInterval(function(){
            that.updatePosition();
        }, this.interval);
    }

    function fUpdatePosition(){

    }

    function fIsHeaderInvisible(){

    }

    function fStop(){

    }

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return SimpleMarquee;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = function(oConf){
            return new SimpleMarquee(oConf);
        };
        module.exports.SimpleMarquee = SimpleMarquee;
    } else {
        if(!oWin.SimpleMarquee){
            oWin.SimpleMarquee = SimpleMarquee;
        }else{
            throw new Error("It's duplicate to defined 'SimpleMarquee', please check the scripts which you has been imported!");
        }
    }

})(window, document);