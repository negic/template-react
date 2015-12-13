
import EventDispatcher from '../events/EventDispatcher'


export default class YouTubeIframePlayer extends EventDispatcher {

    constructor(opt) {
        this.opt = opt;

        if (!window.onYouTubeIframeAPIReady) {
            var script = document.createElement('script');
            script.src = '//www.youtube.com/iframe_api';
            document.getElementsByTagName("head")[0].appendChild(script);

            window.onYouTubeIframeAPIReady = this.init.bind(this);
        } else {
            this.init()
        }
    }

    init() {
        this.player = new YT.Player(this.opt.el, {
            height: this.opt.height,
            width: this.opt.width,
            videoId: this.opt.id,
            playerVars: this.opt.playerVars
            events: {
                onReady: this.opt.onPlayerReady,
                onStateChange: this.onPlayerStateChange
            }
        });
    }

    onPlayVideo() {
        this.player.playVideo();
    }

    onStopVideo() {
        this.player.stopVideo();
    }

    onPauseVideo() {
        this.player.pauseVideo();
    }

    onPlayerStateChange(event) {
        switch (event.data) {
            case YT.PlayerState.ENDED:
                if (this.opt.ended) this.opt.ended();
                break;
            case YT.PlayerState.PLAYING:
                if (this.opt.playing) this.opt.playing();
                break;
            case YT.PlayerState.PAUSED:
                if (this.opt.paused) this.opt.paused();
                break;
            case YT.PlayerState.BUFFERING:
                if (this.opt.buffering) this.opt.buffering();
                break;
            case YT.PlayerState.CUED:
                if (this.opt.cued) this.opt.cued();
                break;
        }
    }
}
