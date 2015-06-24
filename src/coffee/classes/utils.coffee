utils =

    # 数値の桁数をチェック
    #
    # @param [Integer] 調べる数値
    # @param [Integer] 基数
    getDigits: (num, base = 10)->
        return Math.log(num) / Math.log(base) + 1 | 0



    # GET値をオブジェクト型で返す
    #
    getUrlVars: ->
        vars = {}
        param = location.search.substring(1).split("&")
        i = 0
        while i < param.length
            keySearch = param[i].search(RegExp("="))
            key = ""
            key = param[i].slice(0, keySearch)  unless keySearch is -1
            val = param[i].slice(param[i].indexOf("=", 0) + 1)
            vars[key] = decodeURI(val)  unless key is ""
            i++

        return vars


    # 指定した文字列の幅をかえす
    #
    # @param [String] 調べたい文字列
    mb_strwidth: (str) ->
        i = 0
        l = str.length
        c = ""
        length = 0
        while i < l
            c = str.charCodeAt(i)
            if 0x0000 <= c and c <= 0x0019
                length += 0
            else if 0x0020 <= c and c <= 0x1fff
                length += 1
            else if 0x2000 <= c and c <= 0xff60
                length += 2
            else if 0xff61 <= c and c <= 0xff9f
                length += 1
            else length += 2  if 0xffa0 <= c
            i++

        return length


    mb_strimwidth: (str, start, width, trimmarker) ->
        trimmarker = ""  if typeof trimmarker is "undefined"
        trimmakerWidth = mb_strwidth(trimmarker)
        i = start
        l = str.length
        trimmedLength = 0
        trimmedStr = ""
        while i < l
            charCode = str.charCodeAt(i)
            c = str.charAt(i)
            charWidth = mb_strwidth(c)
            next = str.charAt(i + 1)
            nextWidth = mb_strwidth(next)
            trimmedLength += charWidth
            trimmedStr += c
            if trimmedLength + trimmakerWidth + nextWidth > width
                trimmedStr += trimmarker
                break
            i++

        return trimmedStr


    historyBack: (event) =>
        event.preventDefault()
        history.back()


    # UNIXTIME取得
    getUnixTime: ->
        return parseInt (new Date) / 1000


module.exports = utils
