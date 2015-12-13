
export default class EventDispatcher {

    constructor() {

        /**
         * イベントを登録しておくための器
         */
        this.listeners = {};
    }

    /**
     *  イベントの登録
     *  @param  {string}   name     イベント名
     *  @param  {function} listener 登録する関数
     */
    addEventListener(name, listener, context) {

        if (this.listeners[name] === null) {
            this.listeners[name] = [];
        }

        this.listeners[name].push([listener, context]);
    }

    /**
     * イベントの削除
     *  @param  {string}   name     イベント名
     *  @param  {function} listener 削除する関数
     */
    removeEventListener(name, listener) {
        let i, j, len, ref, listeners;

        if (!this.listeners[name]) {
            return this;
        }

        ref = this.listeners[name];

        for (i = j = 0, len = ref.length; j < len; i = ++j) {
            listeners = ref[i];

            if (listeners[0] === listener) {
                this.listeners[name].splice(i, 1);
            }
        }
    }

    /**
     * イベントの実行
     *  @param  {string} eventName  イベント名
     */
    dispatchEvent(name) {
        let e, j, len, list, ref, listeners;

        list = (ref = this.listeners) != null ? ref[name] : void 0;

        if (!list) {
            return this;
        }

        e = {};
        e.target = null;
        e.context = null;
        e.target = this;

        for (j = 0, len = list.length; j < len; j++) {
            listeners = list[j];
            e.context = listeners[1];
            listeners[0](e);
        }
    }

}
