# ![atellier](http://framenimate.margis.com.br/framenimate.svg)

<strong><i>Framenimate</i></strong> is a small javascript plugin to create simple sequential frames animations. It was born out os personal necessity of creating a sequential animation out of a series of photos taken using de sequential shooting function from digital cameras.

## Demos in the wild
* [Demo](http://framenimate.margis.com.br/)


## Basic Usage

<p>To start a new frame animation is as simples as eeting the <strong><i>framenimate</i></strong> attribute to the wrapper tag where your images/frame are contained:</p>

```html

        <figure framenimate >
            <img src="image-1.png">
            <img src="image-2.png">
            <img src="image-3.png">
            <img src="image-4.png">
            ...
        </figure>

```

<p>To change the animation properties it's possibel to add some cutom rules to the <strong><i>framenimate</i></strong> attrubute:</p>

```html

        <figure framenimate="speed: 25" >
            <img src="image-1.png">
            <img src="image-2.png">
            <img src="image-3.png">
            <img src="image-4.png">
            ...
        </figure>

```

<p>It is also possible to select the wrappers DOM node and create a new instance of animation for this target(s) through Javascript with <strong><i>new Framenimate</i></strong>:</p>

```javascript

          var element = document.querySelectorAll('.frames');
          var animation = new Framenimate(element, {
            speed: 400,
            smooth: true,
            smoothFactor: 0.5,
            reverse: true
          });

```


## Todo
- [ ] Basic animattion controls
- [ ] Animate using sprites


## License

**Framenimate** is released under the
[MIT license](https://github.com/scup/atellier/blob/development/LICENSE.md).
