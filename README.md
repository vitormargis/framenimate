# framenimate
Small plugin for animating still frames!

## Usage
To make a animation frame by frame, just set a collection of imagens into a container, and set the attribute "framenimate" to it.

```html
  <figure framenimate>
    <img src="image-1.png">
    <img src="image-2.png">
    <img src="image-3.png">
    <img src="image-4.png">
    <img src="image-5.png">
  </figure>
```

You can also bind framenimate to a DOM node with javascript (no options availabel yet):

```javascript
  var element = document.querySelectorAll('.animation');
  var animation = new Framenimate(element);
```

### Options
If you want to customize your animation you can pass a series of values to de "framenimate" attribute, just as if it was a CSS inline style attribute.

```html
  <figure framenimate="speed: 200; smooth: true; smoothFactor: 0.2;">
    <img src="image-1.png">
    <img src="image-2.png">
    <img src="image-3.png">
    <img src="image-4.png">
    <img src="image-5.png">
  </figure>
```

#### Note
For now the script only supports one animation per page.
