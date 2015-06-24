
{common, develop, dest, release} = require './base.config.coffee'

#android = require './android.config.coffee'
#ios = require './ios.config.coffee'


_clone = (obj)->
    return JSON.parse(JSON.stringify(obj))

_overwrite = (target, over)->
    for key, value of over
        if typeof value is 'object'
            _overwrite(target[key], value)
        else
            target[key] = value

_addExtensions = (list, addList)->
    return list.concat addList


_getManifesst = (id)->
    return _replaceId android.base.manifest, id

_replaceId = (src, id)->
    return src.replace /__id__/gm, id

_escapeLB = (str)->
    return str.replace /\r\n/gm, '\\r\\n'


getData = (envConfig, base = common) ->
    result = _clone(base)
    _overwrite result, envConfig
    return result


module.exports = exports =
    config:
        develop: develop
        dest: dest
        release: release
        common: common
        getData: getData
