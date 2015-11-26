(function() {

  function faceStopMotion(){
    frame <= frames.length-2 ? frame++ : frame = 0;

    function removeFrameCurrent(){
      if(frame !== 0) frames[frame-1].classList.remove('current-frame');
      if(frame === 0) frames[frames.length-1].classList.remove('current-frame');
    }
    setTimeout(removeFrameCurrent, 50);
    frames[frame].classList.add('current-frame');
  }

  var defaults = {
    className: 'fade-and-drop',
    closeButton: true,
    content: "",
    maxWidth: 600,
    minWidth: 280,
    overlay: true
  };

  if(document.querySelectorAll('[framenimate]').length !== 0){
    var frame = -1;
    var frames = document.querySelectorAll('[framenimate]')[0].children;
    for (var i = 0; i < frames.length; ++i) {
      frames[i].setAttribute('class', 'frame frame-' + i);
    }
    setInterval(faceStopMotion, 100);
  }
})();
