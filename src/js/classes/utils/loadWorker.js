
this.onmessage = (e) => {

    // 元スレッドからURLのリストを受け取る
    var urls = e.data
    var count = 0

    var load = (url) => {
        var xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            try {
                if (xhr.readyState === 4) {
                    count++;

                    if (count < urls.length) {
                        return postMessage({
                            url: xhr.responseURL,
                            progress: 'next'
                        });
                    } else {
                        return postMessage({
                            progress: 'end'
                        });
                    }
                }
            } catch (_error) {
                e = _error;
            }
        };

        xhr.open("GET", url, false);
        xhr.send(null);
    };

    let url;
    for (let i = 0, len = urls.length; i < len; i++) {
        url = urls[i];
        load(url);
    }
}
