(function() {

  var frame,frames,framenimateCSS,framenimateSmoothFactor,framenimateAtt,framenimateConfig;

  this.Framenimate = function(element, config){
    framenimateWrapper = [];
    framenimateWrapper = element || document.querySelectorAll('[framenimate]');

    for(var index in framenimateWrapper){
      if(+index >= 0){
        frame = [];
        frame[index] = -1
        framenimateConfig = [];
        framenimateConfig[index] = {};
        framenimateCSS = []

        if(!element) framenimateAttr = framenimateWrapper[index].getAttribute('framenimate').toString().split(';');


        if(framenimateWrapper[index].getAttribute('framenimate')){
          for (var attr = 0; attr < framenimateAttr.length; attr++) {
            if(framenimateAttr[attr] !== ''){
              var entry = framenimateAttr[attr].replace(' ', '').split(':');
              framenimateConfig[index][entry.splice(0,1)[0]] = entry.join(':').replace(' ', '');
            }
          }
        }

        if(framenimateConfig[index].smooth){
          framenimateSmoothFactor = framenimateConfig[index].smoothFactor || framenimateConfig[index].speed/1000 || defaults.speed/1000;
          framenimateCSS[index] = "transition: opacity " + framenimateSmoothFactor + "s ease; position: absolute; opacity: 0";
        } else {
          framenimateCSS[index] = "position: absolute; opacity: 0";
        }

        frames = framenimateWrapper[index].children;
        for (var i = 0; i < frames.length; ++i) {
          frames[i].setAttribute('style', framenimateCSS[index]);
        }

        setInterval(this.loop.bind(null, index, frame, frames, framenimateConfig, framenimateCSS), framenimateConfig[index].speed || defaults.speed);
      }
    }
  };

  Framenimate.prototype.loop = function(index, frame, frames, framenimateConfig, framenimateCSS){
    frame[index] <= frames.length-2 ? frame[index]++ : frame[index] = 0;

    function removeFrameCurrent(){
      if(frame[index] !== 0) frames[frame[index]-1].setAttribute('style', framenimateCSS[index]);
      if(frame[index] === 0) frames[frames.length-1].setAttribute('style', framenimateCSS[index]);
    }

    setTimeout(removeFrameCurrent, framenimateConfig[index].speed/2 || defaults.speed/2);
    frames[frame[index]].setAttribute('style', framenimateCSS[index].replace('opacity: 0', 'opacity: 1'));
  };

  var defaults = {
    speed: 50,
    smooth: false,
    smoothFactor: 0,
  };

  if(document.querySelectorAll('[framenimate]').length !== 0){
    this.framenimation = new Framenimate();
  }
})();
