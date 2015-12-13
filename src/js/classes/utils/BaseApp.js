
import EventDispatcher from '../events/EventDispatcher'


/**
 * 基本機能を与える継承用クラス
 */
export default class BaseApp extends EventDispatcher {

    constructor() {
        super();

        this.setFPS(30);
        this.onResize();

        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    getFPS() {
        return Math.floor(this.fps);
    }

    setFPS(fps) {
        this.fps = fps;
        this.frameRate = 1000 / this.fps;
    }

    update() {
        setTimeout(this.update, this.fps);
    }

    getWidth() {
        return document.documentElement.clientWidth || window.innerWidth;
    }

    getHeight() {
        return document.documentElement.clientHeight || window.innerHeight;
    }

    getScroll() {
        return {
            top:  document.documentElement.scrollTop || document.body.scrollTop,
            left: document.documentElement.scrollLeft || document.body.scrollLeft
        };
    }

    onResize() {
    }

    onScroll() {
    }

}
