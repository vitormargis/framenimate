(function() {

  function faceStopMotion(){
    frame <= frames.length-2 ? frame++ : frame = 0;

    function removeFrameCurrent(){
      if(frame !== 0) frames[frame-1].setAttribute('style', framenimateCSS);
      if(frame === 0) frames[frames.length-1].setAttribute('style', framenimateCSS);
    }
    setTimeout(removeFrameCurrent, framenimateConfig.speed/2 || defaults.speed/2);
    frames[frame].setAttribute('style', framenimateCSS.replace('opacity: 0', 'opacity: 1'));
  }

  var defaults = {
    speed: 50,
    smooth: false,
    smoothFactor: 0,
  };

  if(document.querySelectorAll('[framenimate]').length !== 0){
    var frame = -1;
    var framenimateCSS;
    var framenimateSmoothFactor;
    var framenimateWrapper = document.querySelectorAll('[framenimate]');

    var framenimateAttr =  framenimateWrapper[0].getAttribute('framenimate').toString().split(';');
    var framenimateConfig = {};

    if(framenimateWrapper[0].getAttribute('framenimate')){
      for (var i = 0; i < framenimateAttr.length; i++) {
        if(framenimateAttr[i] !== ''){
          var entry = framenimateAttr[i].replace(' ', '').split(':');
          framenimateConfig[entry.splice(0,1)[0]] = entry.join(':').replace(' ', '');
        }
      }
    }

    if(framenimateConfig.smooth){
      framenimateSmoothFactor = framenimateConfig.smoothFactor || framenimateConfig.speed/1000 || defaults.speed/1000;
      framenimateCSS = "transition: opacity " + framenimateSmoothFactor + "s ease; position: absolute; opacity: 0";
    } else {
      framenimateCSS = "position: absolute; opacity: 0";
    }

    for(var index in framenimateWrapper){
      if(+index >= 0){
        var frames = framenimateWrapper[index].children;
        for (var i = 0; i < frames.length; ++i) {
          frames[i].setAttribute('class', 'frame frame-' + i);
          frames[i].setAttribute('style', framenimateCSS);
        }
        setInterval(faceStopMotion, framenimateConfig.speed || defaults.speed);
      }
    }
  }
})();
