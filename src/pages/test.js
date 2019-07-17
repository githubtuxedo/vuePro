import Vue from 'vue'
import VueRx from 'vue-rx'
import Component from "vue-class-component";
// import Rx from 'rxjs/Rx'
import { interval, fromEvent } from "rxjs";
import { delay, concatMap, take, map, combineAll, takeUntil, concatAll, filter, withLatestFrom } from "rxjs/operators";

import '../assets/style/index.less';

@Component()
export default class Test extends Vue {
    constructor() {
        super();
        this.fixed = false;
    }
    validValue(value, max, min){
        return Math.min(Math.max(value, min), max);
    }
    rxjsDelayWhen(){
        var imgList = document.getElementsByTagName('img');
        var movePos = fromEvent(document, 'mousemove')
            .pipe(map(e => ({ x: e.clientX, y: e.clientY })))
        const delayTime = 600;
        Array.from(imgList).forEach((item, index) => {
            movePos
                .pipe(delay(delayTime * (Math.pow(0.65, index) + Math.cos(index / 4)) / 2))
                .subscribe(function (pos) {
                    item.style.transform = 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)';
                });
        });
    }
    mounted() {
        // const source = interval(1000).pipe(take(2));
        // const example = source.pipe(
        //     map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
        // );
        // const combined = example.pipe(combineAll());
        // const subscribe = combined.subscribe(val => console.log(val));
        const video = document.getElementById('video');
        const anchor = document.getElementById('anchor');

        const scroll = fromEvent(document, 'scroll');
        /**判断 anchor是否滚动最底部 */
        scroll.pipe(map(e => anchor.getBoundingClientRect().bottom < 0))
            .subscribe(bool => {
                if(bool){
                    this.fixed = true;
                } else {
                    this.fixed = false;
                }
            });
        //還能在用 debounce / throttle 或 requestAnimationFrame 做優化
        const mouseDown = fromEvent(video, 'mousedown')
        const mouseUp = fromEvent(document, 'mouseup')
        const mouseMove = fromEvent(document, 'mousemove');
        mouseDown.pipe(
            filter(e => video.classList.contains('video-fixed')),
            // map(e => mouseMove.pipe(takeUntil(mouseUp))),
            // concatAll(),
            concatMap(e => mouseMove.pipe(takeUntil(mouseUp))), //同上map ， concatAll 合并方法
            withLatestFrom(mouseDown, (move, down) => {
                return {
                    x: this.validValue(move.clientX - down.offsetX, window.innerWidth - 320, 0),
                    y: this.validValue(move.clientY - down.offsetY, window.innerHeight - 180, 0),
                }
            })
        ).subscribe(pos => {
            video.style.top = pos.y + 'px';
            video.style.left = pos.x + 'px';
        });

        this.rxjsDelayWhen();
    }

    inputFn(e) {
        switch (e.type) {
            case 'keyup': {
                var flag = e.target.isNeedPrevent;
                if (flag) return;
                this.response(e.target.value);
                e.target.keyEvent = false;
                break;
            }
            case 'keydown': {
                e.target.keyEvent = true;
                break;
            }
            case 'input': {
                if (!e.target.keyEvent) {
                    this.response(e.target.value);
                }
                break;
            }
            case 'compositionstart': {
                e.target.isNeedPrevent = true;
                break;
            }
            case 'compositionend': {
                e.target.isNeedPrevent = false;
                break;
            }
        }
    }
    response(value) {
        this.input = value;
        console.log(this.input);
    }
    render() {
        const style = {
            video: {
                width: '640px',
                height: '360px',
                margin: '0 auto',
                backgroundColor: 'black',
            },
            anchor: {
                height: '360px',
                width: '100%',
                backgroundColor: '#F0F0F0',
            }
        }
        return (
            <div style='height:300%;' id='testRxjs'>
                <div class="" id='anchor' style={style.anchor}>
                    <div class='video' class={
                        this.fixed ? 'video-fixed' : ''
                    } style={Object.assign({}, style.video)} id="video">
                        <div class="masker"></div>
                        <video width='100%' constrols>
                            <source src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg" type="video/ogg"/>
                        </video>
                    </div>
                </div>


                {/* <input type="text" [(ngModel)]='input' (keyup)='inputFn($event)' (keydown)='inputFn($event)' (input)='inputFn($event)' (compositionstart)='inputFn($event)' (compositionend)='inputFn($event)' /> */}
                <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover6.jpg" alt=""/>
                <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover5.jpg" alt=""/>
                <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover4.jpg" alt=""/>
                <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover3.jpg" alt=""/>
                <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover2.jpg" alt=""/>
                <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover1.jpg" alt=""/>
            </div>
        )
    }
}

// module.exports = {
//     Test,               //时间轴
// }