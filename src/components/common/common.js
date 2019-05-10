import Vue from 'vue';
import Component from "vue-class-component";
// import { HttpService} from '@assets/js/http.js'
import { mapState } from 'vuex';
import { FormInput } from "./form.js";

// 所有组件最外层class命名加上前缀"cuz-"

const Flex ={
    name: 'Flex',
    props: {
        styles: {
            type: Object,
            default: function () {
                return {
                    "height":'20px'
                }
            }
        }
    },
    render() {
        return (
            <div class="cuz-flex" style={Object.assign({}, this.styles)}>
                {this.$slots.default}
            </div>
        )
    }
}

@Component({
    props: {
        cover: {
            type:Boolean,
            default: true
        },
        title: String,
        msg: String,
        show: Boolean,
        confirm: Function,
        cancel: Function,
    }
})
class Model extends Vue {
    constructor() {
        super();
        // this.show = false;
    }
    _confirm() {
        !!this.$props.confirm && this.$props.confirm();
    }
    _cancel() {
        !!this.$props.cancel && this.$props.cancel();
    }
    beforeUpdate() {
        // this.show = this.$props.show;
    }
    beforeMount(){
    }
    mounted() {
    }
    render() {
        return (
            <div class="cuz-model" style={Object.assign({}, {
                "backgroundColor": this.$props.cover?'rgba(0,0,0,0.3)':'',
                "opacity": this.$props.show? '1':'0',
                "transform": this.$props.show? 'scale(1)':'scale(1.1)',
                "pointerEvents": this.$props.show? 'auto': 'none',
            })}>
                <div class='body'>
                    <section class="header">
                        {!!this.$props.title ? this.$props.title: '提示'}
                    </section>
                    <section class="content">
                        {!!this.$props.msg ? this.$props.msg : '这里是默认消息'}
                    </section>
                    <section class="footer">
                        <div class='confirm' style={{}} onClick={this._confirm}>确认</div>
                        <div class='cancel' style={{}} onClick={this._cancel}>取消</div>
                    </section>
                </div>
            </div>
        )
    }
}

@Component({
    props: {
        msg: {
            type: String,
            default: "Tips here!"
        },
    }
})
class FeedBack extends Vue {
    constructor(){
        super();
    }
    render(){
        return(
            <div class="cuz-feedback">
                <div>Tips</div>
                <div>{this.$slots.default}</div>
            </div>
        )
    }
}


@Component({
    props:{
        list:{
            type: Array,
            default: function () {
                return [1, 2, 3,4,5,6,7,8,9,10,11,12]
            }
        }
    }
})
class Ferris extends Vue{
    constructor(){
        super();
        this.distance = 0;
    }
    mounted(){
    }
    render(){
        let deg = 360/this.list.length;
        return(
            <Square>
                <div class="cuz-ferris">
                    <ul style={{
                        "width": `${Math.sqrt(1 / 2) * 100}%`,
                        "height": `${Math.sqrt(1 / 2) * 100}%`,
                    }}>
                        {this.list.map((item,index)=>{
                            return (
                                <li data-index={index} style={{
                                    "transform":`rotate(${index*deg}deg)`
                                }}>
                                        <div style={{
                                            "display":"inline-block",
                                            "transform": `rotate(-${index * deg + this.distance}deg)`
                                        }}>
                                            <div class='detail'>{item}</div>
                                        </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Square>
        )
    }
}


@Component()
class Looper extends Vue {
    constructor() {
        super();
        this.leftNode = null;
        this.curNode = null;
        this.rightNode = null;
        this.currentIndex = 1;
        this.total = 3;                 //默认三个
        this.slots = [];
        this.direction = 'toRight';
        this.interval = null;
        this.timer = null;
        this.looperDuration = 2000;     //轮播 速度
        this.duration = 500;     //动画 速度
        this.distance = -1 / 3;
        this.isMoving = false;
    }
    tap() {
    }
    touch() {
    }
    animate() {
        if (this.direction === 'toLeft') {
            this.interval = setInterval(() => {
                this.toLeft();
            }, this.looperDuration);
        } else if (this.direction === 'toRight') {
            this.interval = setInterval(() => {
                this.toRight();
            }, this.looperDuration);
        }
    }
    toLeft() {
        if (this.isMoving) { return }
        this.isMoving = true;
        this.timer = setTimeout(() => {
            this.leftNode = this.curNode;
            this.curNode = this.rightNode;
            this.rightNode = this.slots[(this.currentIndex + 2) % this.total];
            this.currentIndex = (this.currentIndex + 1) % this.total;
            this.distance = -1 / 3;
            this.isMoving = false;
            !!this.timer && clearTimeout(this.timer);
            this.timer = null;
        }, this.duration);
        this.distance = -1 / 3 * 2;
    }
    toRight() {
        if (this.isMoving) { return }
        this.isMoving = true;
        this.timer = setTimeout(() => {
            this.rightNode = this.curNode;
            this.curNode = this.leftNode;
            this.leftNode = this.slots[(this.currentIndex - 2 + this.total) % this.total];
            this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
            this.distance = -1 / 3;
            this.isMoving = false;
            !!this.timer && clearTimeout(this.timer);
            this.timer = null;
        }, this.duration);
        this.distance = 0;
    }
    mounted() {
        // this.animate()
    }
    updated() {
    }
    beforeMount() {
        for (let i = 0; i < this.$slots.default.length; i++) {
            if (this.$slots.default[i].tag !== "li") {
                this.$slots.default.splice(i, 1);
            }
        }
        let slots = this.slots = this.$slots.default;
        let total = this.total = slots.length;
        if (total === 1) {
            this.leftNode = slots[0];
            this.curNode = slots[0];
            this.rightNode = slots[0];
        } else if (total === 2) {
            this.leftNode = slots[0];
            this.curNode = slots[1];
            this.rightNode = slots[0];
        } else {
            this.leftNode = slots[0];
            this.curNode = slots[1];
            this.rightNode = slots[2];
        }
    }
    beforeDestroy() {
        !!this.timer && clearTimeout(this.timer);
        !!this.interval && clearInterval(this.interval);
    }
    render() {
        return (
            <div class="cuz-looper" onTouchMove={this.touch} onTouchStart={this.touch}>
                <ul style={{
                    "transform": `translate3d(${this.distance * 100}%,0,1px)`,
                    "transition": `transform ${this.isMoving ? this.duration : 0}ms`
                }}>
                    {this.leftNode}
                    {this.curNode}
                    {this.rightNode}
                </ul>
                <div style={{
                    "position": 'absolute',
                    "right": '0',
                    "top": '0',
                    "backgourndColor": '#eee',
                    "lineHeight": '18px'
                }} onClick={this.toRight}>next</div>
            </div>
        )
    }
}

const Square = {
    name: "Square",
    props: {
        size: {
            type: Number,         //可不写
            default: 1,
        },
        claz: {
            type: String,
            default: '',
        }
    },
    render(){
        return(
            <div class={['cuz-square',this.$props.claz].join('')}>
                <div class='func'></div>
                <div class='inner'>
                    {this.$slots.default[0]}
                </div>
            </div>
        )
    }
}

@Component()
class UpLoad extends Vue{
    constructor(){
        super();
        this.file = null;
    }
    mounted(){
        this.file = this.$refs["file"];
    }
    render(){
        return(
            <div class="cuz-upload" ref='file'>
                <input type="file" />
                <span onClick={this.fileUpLoad}>+</span>
            </div>
        )
    }
}

@Component()
class SerchList extends Vue{
    constructor(){
        super();
        this.show = false;
        this.isfocus = false;
    }
    focus(e){
        this.show = true;
        this.isfocus = true;
    }
    blur(e){
        this.show = false;
        setTimeout(()=> {
            this.isfocus = false
        }, 200)
    }
    //相当于computed
    get showList(){
        return this.show && this.isfocus;
    }
    render() {
        return(
            <div class='cuz-serchlist'>
                <div class='input-cover'>
                    <input type="text" onFocus={this.focus} onBlur={this.blur}/>
                </div>
                <dl style={{
                    "display": this.showList ? 'inherit' : 'none',
                }}>
                    <dd><a href="">1</a></dd>
                    <dd><a href="">1</a></dd>
                    <dd><a href="">1</a></dd>
                </dl>
            </div>
        )
    }
}


@Component({
    props: {
        yearPick: {
            type: Function,
        },
        monthPick: {
            type: Function,
        },
        dayPick: {
            type: Function,
        }
    }
})
class TimePickerV1 extends Vue {
    constructor() {
        super();
        this.type = 'day';
        this.show = false;
        this.info = {//日历当前选择的 以及上一级和下一级的相关信息
            year: [],//默认年集合
            month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],//默认月集合
            prev: {
                year: null,
                month: null,
                date: null,
                day: [],
                preRest: [],
                nextRest: [],
            },
            now: {
                year: null,
                month: null,
                date: null,
                day: [],
                preRest: [],
                nextRest: [],
            },
            next: {
                year: null,
                month: null,
                date: null,
                day: [],
                preRest: [],
                nextRest: [],
            },
        };
        this.date = {//实际生活中的年月日信息
            year: null,
            month: null,
            date: null,
        }
    }

    focus(){
        this.show = true;
    }
    blur(){
        this.show = false;
    }

    /**上一月 下一月切换 */
    prevClick() {
        this.getPrevMonInfo();
        this.info.now = this.info.prev;
    }
    nextClick() {
        this.getNextMonInfo();
        this.info.now = this.info.next;
    }
    getPrevMonInfo() {
        let year = this.info.now['year'],
            mon = this.info.now['month'];
        this.setDayInfo(mon == 1 ? year - 1 : year, mon == 1 ? 12 : mon - 1, 'prev');
    }
    getNextMonInfo() {
        let year = this.info.now['year'],
            mon = this.info.now['month'];
        this.setDayInfo(mon == 12 ? year + 1 : year, mon == 12 ? 1 : mon + 1, 'next');
    }
    /**================== */

    //给this.info.now.day设置年信息
    setMonInfo() {
        this.info['year'] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return;
    }
    //重设信息
    resetDayInfo(limit){
        this.info[limit] = {
            year: null,
            month: null,
            date: null,
            day: [],
            preRest: [],
            nextRest: [],
        }
    }
    //给this.info.now.day设置日信息 limit表示now或者prev或者next 默认now
    setDayInfo(year,mon,limit='now') {
        if(!this.info[limit]){
            this.info[limit] = {};
        }
        this.resetDayInfo(limit);
        this.info[limit]['year'] = year;
        this.info[limit]['month'] = mon;
        let thatMon = new Date(year, mon, 0);
        let monLen = thatMon.getDate(),
            startDay = new Date(thatMon.setDate(1)).getDay(),
            days = [];
        /**补充当月前不足的ui 日期 */
        let _endDate = new Date(mon == 1 ? year - 1 : year, mon == 1 ? 12 : mon - 1, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            // days[i] = _endDate--
            this.info[limit]['preRest'][i] = _endDate--;
        }
        /**===================== */
        for (let i = 1; i <= monLen; i++) {
            days.push(i);
        }
        /**补充当下个月在本月不足的ui 日期 */
        for (let i = 1, len = (7 - (days.length + this.info[limit]['preRest'].length) % 7) % 7; i <= len; i++) {
            // days.push(i);
            this.info[limit]['nextRest'].push(i);
        }
        /**===================== */
        this.info[limit]['day'] = days;
    }
    /**选择年月日触发事件 */
    itemPick(e){
        let type = this.type,
            value = e.target.dataset['value'],
            use = e.target.dataset['use'];
        if (use) {
            if (type == 'day') {
                this.pickDay(value);
            } else if (type == 'month') {
                this.pickMonth(value);
            } else if (type == 'year') {
                this.pickYear(value);
            }
        }
    }
    pickYear(value) {
        this.info.now.year = value;
        this.type = 'month';
        this.$props.yearPick(value);
    }
    pickMonth(value) {
        this.info.now.month = value;
        this.setDayInfo(this.info.now.year,this.info.now.month);
        this.type = 'day';
        this.$props.monthPick(value);

    }
    pickDay(value) {
        this.info.now.date = value;
        this.$props.monthPick(value);
    }
    /**============================= */
    /**选择年月日触发事件 */
    choseType(){
        switch (this.type) {
            case 'day':
                this.type = 'month';
                this.info.now.preRest = [];
                this.info.now.nextRest = [];
                break;
            case 'month':
                this.type = 'year';
                break;
            case 'year':
            default:
                break;
        }
    }
    /**============================= */

    beforeMount(){
        let dateInfo = new Date(),
            _dayObj = {
                year: dateInfo.getFullYear(),
                month: dateInfo.getMonth() + 1,
                date: dateInfo.getDate(),
            };
        this.date = _dayObj;
        Object.assign(this.info.now, _dayObj)
        /**设置信息 */
        this.setDayInfo(this.date.year,this.date.month);//初始化设置实际当前时间
    }

    render() {
        let info  = this.type == 'day' ? this.info.now['day'] : (
            this.type == 'month' ? this.info.month : (
                this.type = 'year' ? this.info.year : []
            )
        ),
            title = this.type == 'day' ? this.info.now['month']+'月份' : (
                this.type == 'month' ? this.info.now['year'] : (
                    this.type = 'year' ? '' : ''
                )
            );
        return (
            <section class='cuz-calendar'>
                <FormInput focus = {this.focus} blur = {this.blur}></FormInput>
                    <section style={{
                        display: this.show ? 'block' : 'block',
                    }}>
                        <div class='calendar-head'>
                            <div class="calendar-info">
                                <div class="calendar-prev" onClick={() => { this.prevClick(); }}>&lt;</div>
                                <div class="calendar-title" onClick={this.choseType}>{title}</div>
                                <div class="calendar-next" onClick={() => { this.nextClick() }}>&gt;</div>
                            </div>
                            <div class="calendar-nav" style={{
                                display: this.type == 'day' ? '' : 'none',
                            }}>
                                <div class="calendar-nav-item">日</div>
                                <div class="calendar-nav-item">一</div>
                                <div class="calendar-nav-item">二</div>
                                <div class="calendar-nav-item">三</div>
                                <div class="calendar-nav-item">四</div>
                                <div class="calendar-nav-item">五</div>
                                <div class="calendar-nav-item">六</div>
                            </div>
                        </div>
                        <ul key={title} class='calendar-main' onClick={(e) => { this.itemPick(e) }}>
                            {this.info.now['preRest'].map((item, index) => {
                                return (
                                    <li data-index={index} data-type={this.type}>
                                        {item}
                                    </li>
                                )
                            })}
                            {info.map((item, index) => {
                                return (
                                    <li data-index={index} data-use={true} data-value={item} data-type={this.type}>
                                        {item}
                                    </li>
                                )
                            })}
                            {this.info.now['nextRest'].map((item, index) => {
                                return (
                                    <li data-index={index} data-type={this.type}>
                                        {item}
                                    </li>
                                )
                            })}
                        </ul>
                    <div class='calendar-foot'></div>
                </section>
            </section>
        )
    }
}

@Component({
    props:{
        list: {
            type: Array,
            default: function () {
                return [{
                    time: '2019-05-16 20:50:15',
                    desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    }, {
                        time: '2019-05-16 20:50:15',
                        desc: '冯德富的说法水电费SD卡上的解放了KDJ看了看决定离开房间开两间房来得及发空间老师KDJ法拉第；方式；打飞机；大家放了假；拉萨剪短发；凉快地方'
                    },]
            }
        },
        status:{
            type: String,
            default: '努力跟踪中...',
        }
    }
})
class TimeAxis extends Vue{
    constructor(){
        super();
    }
    mounted(){
    }
    render(){
        return(
            <div class="cuz-timeaxis clearfix">
                <div style={{
                    display: !!this.$props.status ? 'inline-block' : 'none',
                }} class="timeaxis-status">{this.$props.status}</div>
                <div class="timeaxis-crossline"></div>
                <div>
                    {this.$props.list.map((item,index)=>{
                        return(
                            <div class="cuz-timeaxis-item">
                                <div class="timeaxis-left-item">{item.time}</div>
                                <div class="timeaxis-right-item">{item.desc}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

module.exports = {
    TimeAxis,               //时间轴
    Looper,                 //轮播
    Model,                  //弹框
    Flex,                   //flex容器
    FeedBack,               //反馈提示
    Square,                 //长方形
    Ferris,                 //摩天轮
    UpLoad,                 //上传图片
    SerchList,              //搜索框
    TimePickerV1,
}