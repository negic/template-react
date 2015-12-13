import velocity from 'velocity-animate'

class Anchor {

    constructor(opt) {
        this.speed  = (opt.speed)  ? opt.speed  : 500;
        this.extra  = (opt.extra)  ? opt.extra  : 0;
        this.easing = (opt.easing) ? opt.easing : 'ease';
        this.el = opt.el;
        this.el.addEventListener('click', this.eventHandler, false);
    }

    eventHandler(event) {
        var idName, to;
        event.preventDefault();
        idName = _this.el.getAttribute('href').replace(/#/, '');
        to = document.getElementById(idName);
        velocity(to, "scroll", {
            duration: _this.speed,
            easing: _this.easing
        });
    }

}
