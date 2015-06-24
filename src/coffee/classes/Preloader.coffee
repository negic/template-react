class Preloader

    WORKER_JS_FILE: ""
    count: 0

    constructor: (callbacks) ->
        @callbacks = callbacks
        @enableWorker = !!window.Worker

    start: (urls) =>
        @total = urls.length

        # Worker使えるブラウザ
        if @enableWorker
            @loadWorker urls

        # Worker使えないブラウザ
        else
            @loadPreload urls

        # @loadPreload urls

    loadWorker: (urls) =>
        @worker = new Worker @WORKER_JS_FILE
        # Workerから受信する関数を設定
        @worker.onmessage = @workerHandler
        # WorkerにURLのリストを送りつつ実行
        @worker.postMessage urls

    # Worker内でファイルが読み込まれるごとに呼び出されるコールバック関数
    workerHandler: (e) =>
        switch e.data.progress
            when "end"
                @worker.terminate() # Workerを停止
                @loadComplete()
            when "next"
                @loadComplete e.data.url

    loadPreload: (urls) =>
        load = (url) =>
            xhr = new XMLHttpRequest()
            xhr.onreadystatechange = (e) =>
                if xhr.readyState == 4
                    @loadComplete xhr.responseURL

            xhr.open "GET", url, false
            xhr.send null

        for url in urls then load url

    loadComplete: (url) =>
        @count++
        if @count > @total
            @end()
        else
            @progress url

    progress: (url) =>
        @callbacks.progress?(@count)

    end: =>
        @callbacks.end?()

module.exports = Preloader
