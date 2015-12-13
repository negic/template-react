
import Stats from 'stats.js'
import EventDispatcher from '../events/EventDispatcher'
import {_log} from './BaseUtils'


/**
 * Debug
 * @param {boolean} isStart
 */
export default class Debug extends EventDispatcher {

    constructor(isStart = false) {
        super();

        this.firstFlg = false;

        if (isStart) {
            this.start();

        } else {
            var div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.right = 0;
            div.style.bottom = 0;
            div.style.width = '50px';
            div.style.height = '50px';
            document.body.appendChild(div);

            this.doubleClickFlg = 0;

            div.addEventListener('click', (event) => {
                this.doubleClickFlg++;

                if (this.doubleClickFlg % 3 === 0) {
                    this.start();
                }
            }, false);
        }
    }

    createDebugBox() {
        this.debugBox = document.createElement('div');
        this.debugBox.style.position = 'fixed';
        this.debugBox.style.left = 0;
        this.debugBox.style.top = 0;
        this.debugBox.style.width = '100%';
        this.debugBox.style.height = '200px';
        this.debugBox.style.backgroundColor = 'rgba(0,0,0,0.85)';
        this.debugBox.style.color = '#0f0';
        this.debugBox.style.zIndex = 1000;
        this.debugBox.style.overflow = 'scroll';
        this.debugBox.className = "debug-box";
        document.body.appendChild(this.debugBox);
    }

    start() {
        if (this.firstFlg) {
            this.toggle();
        } else {
            this.firstFlg = true;
            this.createDebugBox();
            this.initStats();
        }
    }

    toggle() {
        if (this.debugBox.style.display === 'block') {
            this.debugBox.style.display = 'none';
            this.stats.domElement.style.display = 'none';
        } else {
            this.debugBox.style.display = 'block';
            this.stats.domElement.style.display = 'block';
        }
    }

    initStats() {
        this.stats = new Stats();
        this.stats.setMode(0); // 0: fps, 1: ms, 2: mb

        this.stats.domElement.style.position = 'fixed';
        this.stats.domElement.style.right = 0;
        this.stats.domElement.style.top = 0;
        this.stats.domElement.style.zIndex = 1001;
        document.body.appendChild(this.stats.domElement);

        requestAnimationFrame(this.update.bind(this));
    }

    update() {

        this.stats.begin();

        // monitored code goes here
        this.stats.end();

        if (this.debugBox) {
            this.debugBox.innerText = window._DEBUG_TRACE;
        }

        requestAnimationFrame(this.update.bind(this));
    }

}
