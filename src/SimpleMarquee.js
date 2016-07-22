/**
 * Created by yunying on 2016/4/18.
 */
(function(oWin, oDoc){
    var SimpleMarquee = fConstructor;
    // 静态变量
    //SimpleMarquee.prototype.XXX = '';
    // 静态方法
    SimpleMarquee.prototype.init = fInit;
    SimpleMarquee.prototype.createItems = fCreateItems;
    SimpleMarquee.prototype.getGapWidth = fGetGapWidth;
    SimpleMarquee.prototype.render = fRender;
    SimpleMarquee.prototype.getItemsWidthAndHeight = fGetItemsWidthAndHeight;
    SimpleMarquee.prototype.setWrapWidthAndHeight = fSetWrapWidthAndHeight;
    SimpleMarquee.prototype.setStartPosition = fSetStartPosition;
    SimpleMarquee.prototype.onAfterRender = fOnAfterRender;
    SimpleMarquee.prototype.run = fRun;
    SimpleMarquee.prototype.stop = fStop;
    SimpleMarquee.prototype.onUpdate = fOnUpdate;
    SimpleMarquee.prototype.onHeaderUpdate = fOnHeaderUpdate;
    SimpleMarquee.prototype.onWrapUpdate = fOnWrapUpdate;
    SimpleMarquee.prototype.updatePosition = fUpdatePosition;
    SimpleMarquee.prototype.isHeaderInvisible = fIsHeaderInvisible;
    SimpleMarquee.prototype.moveHeaderToEnd = fMoveHeaderToEnd;
    SimpleMarquee.prototype.isWrapInvisible = fIsWrapInvisible;
    SimpleMarquee.prototype.resetWrapLeftPosition = fResetWrapLeftPosition;

    function fConstructor(oConf){
        oConf = oConf || {};
        this.target = oConf.target;
        this.width = oConf.width;
        this.data = oConf.data || [];
        this.item = oConf.item || '';
        this.minGap = oConf.gap || oConf.minGap || 10;
        this.maxGap = oConf.gap || oConf.maxGap || 10;
        this.speed = oConf.speed || 2;
        this.fps = oConf.fps || 40;
        this.fromOutside = oConf.fromOutside;

        this.init();
        return this;
    }

    function fInit(){
        this.interval = Math.floor(1000 / this.fps);
        this.render();
    }

    function fCreateItems(){
        var sItemsHTML = '';
        for(var cnt = 0, length = this.data.length; cnt < length; cnt++){
            var oData = this.data[cnt];
            sItemsHTML += '<li style="padding-left: ' + this.getGapWidth() + 'px">' + this.item(cnt, oData) + '</li>';
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

        this.target.style.width = this.width + 'px';
        this.target.style.position = 'relative';
        this.target.style.overflow = 'hidden';
        this.target.appendChild(this.wrap);

        var oItemsWithAndHeight = this.getItemsWidthAndHeight();
        this.setWrapWidthAndHeight(oItemsWithAndHeight);
        this.setStartPosition();
        this.onAfterRender(oItemsWithAndHeight.width);
    }

    function fGetItemsWidthAndHeight(){
        var oLis = this.target.getElementsByTagName('li');
        var nTotalWidth = 0;
        var nCurrentMaxHeight = 0;
        for(var cnt = 0, length = oLis.length; cnt < length; cnt ++){
            var oLi = oLis[cnt];
            nTotalWidth += (oLi.clientWidth + 1);
            if(oLi.clientHeight > nCurrentMaxHeight){
                nCurrentMaxHeight = oLi.clientHeight;
            }
        }

        this.header = oLis[0];
        this.last = oLis[oLis.length - 1];

        return {
            width: nTotalWidth,
            height: nCurrentMaxHeight
        }
    }

    function fSetWrapWidthAndHeight(oParams){
        this.wrap.style.width = oParams.width + 'px';
        this.wrap.style.height = oParams.height + 'px';
        //this.wrap.style.lineHeight = oParams.height + 'px'; // ie bug fix
        this.target.style.height = oParams.height + 'px';
    }

    function fSetStartPosition(){
        if(this.fromOutside){
            this.wrap.style.left = this.target.offsetWidth + 'px';
        }else{
            this.wrap.style.left = '0px';
        }
    }

    function fOnAfterRender(nItemsTotalWith){
        if(nItemsTotalWith > this.width){
            this.onUpdate = this.onHeaderUpdate;
        }else{
            this.onUpdate = this.onWrapUpdate;
        }
    }

    function fRun(){
        var that = this;
        if(this.data.length > 0){
            this.intervalID = setInterval(function(){
                that.updatePosition();
                that.onUpdate();
            }, this.interval);
        }
        return this;
    }

    function fStop(){
        if(this.data.length > 0){
            clearInterval(this.intervalID);
        }
        return this;
    }

    function fOnUpdate(){
    }

    function fOnHeaderUpdate(){
        if(this.isHeaderInvisible()){
            this.moveHeaderToEnd();
        }
    }

    function fOnWrapUpdate(){
        if(this.isWrapInvisible()){
            this.resetWrapLeftPosition();
        }
    }

    function fUpdatePosition(){
        var oWrap = this.wrap;
        oWrap.style.left = (parseInt(oWrap.style.left) - this.speed) + 'px';
    }

    function fIsHeaderInvisible(){
        var oTargetRect = this.target.getBoundingClientRect();
        var oHeaderRect = this.header.getBoundingClientRect();
        return oHeaderRect.right < oTargetRect.left;
    }

    function fMoveHeaderToEnd(){
        var nHeaderWidth = this.header.offsetWidth;
        var oWrap = this.wrap;
        oWrap.style.left = (parseInt(oWrap.style.left) + nHeaderWidth) + 'px';
        var oOldFirstItem = oWrap.removeChild(this.header);
        this.header = this.target.getElementsByTagName('li')[0];
        oWrap.appendChild(oOldFirstItem);
    }

    function fIsWrapInvisible(){
        var oTargetRect = this.target.getBoundingClientRect();
        var oLastRect = this.last.getBoundingClientRect();
        return oLastRect.right < oTargetRect.left;
    }

    function fResetWrapLeftPosition(){
        this.wrap.style.left = this.width + 'px';
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