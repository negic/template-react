
import {addClass, removeClass} from './BaseUtils'


export default class TapStyle {

    constructor(opt) {
        this.className = (opt.className) ? this.className : 'tap-style';

        opt.el.addEventListener('touchstart', this.eventHandler, false)
        opt.el.addEventListener('touchend',   this.eventHandler, false)
    }

    eventHandler(event) {
        var el = event.currentTarget;

        if (event.type === 'touchstart') {
            addClass(el, this.className);

        } else if (event.type === 'touchend'){
            removeClass(el, this.className);
        }
    }

}
