
export default class Preloader extends EventDispatcher {

    constructor(callbacks, file) {
        this.WORKER_JS_FILE = file;
        this.count = 0;
        this.callbacks = callbacks;
        this.enableWorker = !!window.Worker;
    }

    start(urls) {
        this.total = urls.length

        // Worker使えるブラウザ
        if this.enableWorker
            this.loadWorker urls

        // Worker使えないブラウザ
        else
            this.loadPreload urls

        // this.loadPreload urls
    }

    loadWorker(urls) {
        this.worker = new Worker this.WORKER_JS_FILE

        // Workerから受信する関数を設定
        this.worker.onmessage = this.workerHandler

        // WorkerにURLのリストを送りつつ実行
        this.worker.postMessage urls
    }

    // Worker内でファイルが読み込まれるごとに呼び出されるコールバック関数
    workerHandler(e) {
        switch (e.data.progress) {
            case "end":
                this.loadComplete(e.data.url);
                this.worker.terminate(); // Workerを停止
                break;
            case "next":
                this.loadComplete(e.data.url);
        }
    }

    loadPreload(urls) {
        let i, len, load, url;

        load = (function(_this) {
            return function(url) {
                var xhr;
                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState === 4) {
                        return _this.loadComplete(xhr.responseURL);
                    }
                };
                xhr.open("GET", url, false);
                return xhr.send(null);
            };
        })(this);

        for (i = 0, len = urls.length; i < len; i++) {
            url = urls[i];
            load(url);
        }
    }

    loadComplete(url) {
        this.count++;
        if (this.count >= this.total) {
            this.complete(url);
        } else{
            this.progress(url);
        }
    }

    progress(url) {
        var base;

        if (typeof (base = this.callbacks).progress === "function") {
            base.progress(this.count);
        }
    }

    complete(url) {
        var base;

        if (typeof (base = this.callbacks).complete === "function") {
            base.complete(url);
        }
    }

}
