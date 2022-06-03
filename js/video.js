$(document).ready(function(){
    var controls = {
        video: $("#myvideo"),
        playpause: $("#playpause"),
        total: $("#total"),
        buffered: $("#buffered"),
        progress: $("#current"),
        duration: $("#duration"),
        currentTime: $("#currenttime"),
        hasHours: false,
        togglePlayback: function() {
        (video.paused) ? video.play() : video.pause();}                 
    };
                
    var video = controls.video[0];
               
    controls.playpause.click(function(){
        if (video.paused) {
            video.play();
            $(this).text("Pause");    
        } else {
            video.pause();
            $(this).text("Play");
        }
                
        $(this).toggleClass("paused");
        controls.togglePlayback(); 
    });
}); 

video.addEventListener("ended", function() {
    video.pause();
    controls.playpause.text("Play");
    controls.playpause.toggleClass("paused");
});

video.addEventListener("play", function() {
    controls.playpause.text("Pause");
    controls.playpause.toggleClass("paused");
});
                
video.addEventListener("pause", function() {
    controls.playpause.text("Play");
    controls.playpause.toggleClass("paused");
});

controls.video.click(function() {
    controls.togglePlayback();
});

video.addEventListener("canplay", function() {
    controls.hasHours = (video.duration / 3600) >= 1.0;                    
    controls.duration.text(formatTime(video.duration, controls.hasHours));
    controls.currentTime.text(formatTime(0),controls.hasHours);
}, false);

function formatTime(time, hours) {
    if (hours) {
        var h = Math.floor(time / 3600);
        time = time - h * 3600;
                    
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
                    
        return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
    } else {
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
                    
        return m.lead0(2) + ":" + s.lead0(2);
    }
}
            
Number.prototype.lead0 = function(n) {
    var nz = "" + this;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};

video.addEventListener("timeupdate", function() {
    controls.currentTime.text(formatTime(video.currentTime, controls.hasHours));
                    
    var progress = Math.floor(video.currentTime) / Math.floor(video.duration);
    controls.progress[0].style.width = Math.floor(progress * controls.total.width()) + "px";
}, false);

controls.total.click(function(e) {
    var x = (e.pageX - this.offsetLeft)/$(this).width();
    video.currentTime = x * video.duration;
});

video.addEventListener("progress", function() {
    var buffered = Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
    controls.buffered[0].style.width =  Math.floor(buffered * controls.total.width()) + "px";
}, false);

controls.dynamic.click(function() {
    var classes = this.getAttribute("class");

    if (new RegExp('\\boff\\b').test(classes)) {
        classes = classes.replace(" off", "");
    } else {
        classes = classes + " off";
    }

    this.setAttribute("class", classes);
                    
    video.muted = !video.muted;
});