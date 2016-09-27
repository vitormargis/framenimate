(function() {
  var defaults = {
    speed: 50,
    smooth: false,
    reverse: false,
  };

  window.Framenimate = function(element, config) {
    framenimateWrapper = [];
    framenimateWrapper = element || document.querySelectorAll('[framenimate]');
    for(var index in nodeListToArray(framenimateWrapper)) {
      var frame = [];
      var framenimateCSS = []
      var framenimateConfig = [];

      frame[index] = 0
      framenimateConfig[index] = {};

      var framenimateAttr = element ? '' : framenimateWrapper[index].getAttribute('framenimate').toString().split(';');

      // Get and parse custom config from attr implementation
      if(framenimateWrapper[index].getAttribute('framenimate')) {
        for (var attr = 0; attr < framenimateAttr.length; attr++) {
          if(framenimateAttr[attr] !== '') {
            var entry = framenimateAttr[attr].replace(' ', '').split(':');
            framenimateConfig[index][entry.splice(0,1)[0]] = entry.join(':').replace(' ', '');
          }
        }
      }

      // Merge custom config with default config
      framenimateConfig[index] = config ? Object.assign(framenimateConfig[index], config) : '';

      // Apply smoothness if set
      if(framenimateConfig[index].smooth) {
        var framenimateSmoothFactor = framenimateConfig[index].smooth || framenimateConfig[index].speed/1000 || defaults.speed/1000;
        framenimateCSS[index] = "transition: opacity " + framenimateSmoothFactor + "s ease; position: absolute; opacity: 0";
      } else {
        framenimateCSS[index] = "position: absolute; opacity: 0";
      }

      // convert nodelist into an array
      if(framenimateConfig[index].reverse || defaults.reverse === 'true') {
        var frames = nodeListToArray(framenimateWrapper[index].children).reverse();
      } else {
        var frames = nodeListToArray(framenimateWrapper[index].children);
      }

      for (var i = 0; i < frames.length; ++i) {
        frames[i].setAttribute('style', framenimateCSS[index]);
      }

      var framenimate = {
        totalFrames: frames.length,
        currentFrame: frame[index] + 1
      }

      var direction = 1
      if(framenimateWrapper[index].getAttribute('framenimate') || framenimateWrapper[index].getAttribute('framenimate') === '') {
        setInterval(loop.bind(null, index, frame, frames, framenimateConfig, framenimateCSS, framenimate), framenimateConfig[index].speed || defaults.speed);
      }

      // Create control options
      framenimate.stop = function() {
        window.clearInterval(framenimate.frameLoop)
      }

      framenimate.next = function() {
        framenimate.goTo(framenimate.currentFrame+1)
      };

      framenimate.prev = function() {
        if (framenimate.currentFrame === 1) {
          framenimate.goTo(framenimate.totalFrames)
        }
        framenimate.goTo(framenimate.currentFrame-1)
      };

      framenimate.play = function(config) {
        if (framenimate.frameLoop) {
          framenimate.stop()
        }
        framenimate.frameLoop = setInterval(loop.bind(null, index, frame, frames, framenimateConfig, framenimateCSS, framenimate), framenimateConfig[index].speed || defaults.speed);
      };

      framenimate.reverse = function(config) {
        frames = frames.reverse();
        framenimate.stop()
        framenimate.play()
      };

      framenimate.goTo = function(config) {
        if (direction === 0) {
          frames = frames.reverse();
          direction = 1
        }
        if (config) {
          for (var i = 0; i < frames.length; ++i) {
            frames[i].setAttribute('style', framenimateCSS[index]);
          }
          frame[index] = (config-2)
          loop(index, frame, frames, framenimateConfig, framenimateCSS, framenimate)
        }
      };
    }

    return framenimate
  };

  function loop(index, frame, frames, framenimateConfig, framenimateCSS, framenimate) {
    frame[index] <= frames.length-2 ? frame[index]++ : frame[index] = 0;

    setTimeout(function(){
      if(frame[index] !== 0) frames[frame[index]-1].setAttribute('style', framenimateCSS[index]);
      if(frame[index] === 0) frames[frames.length-1].setAttribute('style', framenimateCSS[index]);
    }, framenimateConfig[index].speed/2 || defaults.speed/2);

    frames[frame[index]].setAttribute('style', framenimateCSS[index].replace('opacity: 0', 'opacity: 1'));
    framenimate.currentFrame = frame[index] + 1;
  };

  function nodeListToArray(nodelist) {
    return Array.prototype.slice.call(nodelist);
  }

  if(document.querySelectorAll('[framenimate]').length !== 0) {
    this.framenimation = new Framenimate();
  }
})();
