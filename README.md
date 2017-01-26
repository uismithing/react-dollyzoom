## React Dollyzoom Effect

Dollyzoom is a React component designed to easily produce a commonly used videographic technique known as the dolly-zoom effect. The component acts as a wrapper around a single child, which itself can contain any number of children. Any of those children (i.e. direct descendents) are able to become the subject (i.e. target) of the dollyzoom effect. The primary Dollyzoom child acts as the container for the background imagery and children, while only the targeted element acts as the foreground subject. All non-targeted elements become visually grouped with the background imagery while the targeted element remains in the foreground focus. Perspective, blur, fade, scale, timing, and easing properties are assigned to the Dollyzoom component and applied appropriately to the elements when triggering the effect. Targeted elements may contain interactive controls such as input fields and buttons.

### Features
  * Callbacks for onReady, onChange, onComplete
  * Methods for Apply and Restore
  * Fluid layout
  * CSS Rich

### Learn more
See the demo at [http://www.uismithing.com/main/dollyzoom](http://www.uismithing.com/main/dollyzoom).

### Repository
[https://github.com/uismithing/react-dollyzoom-effect](https://github.com/uismithing/react-dollyzoom-effect)

### Install
`npm install react-dollyzoom-effect -s`

### Deploy
`import Parallax from "react-dollyzoom-effect"`
```html
<Dollyzoom ref="reactdollyzoom" {...props} style={dollyzoomStyle} className="dollyzoom-example">
  <div id="dollyzoom-scene-container" ref="dollyzoomscene" className="dollyzoom-scene">
    <div id="scenechild-one-container" className="scenechild-one">
      ...
    </div>
    <div id="scenechild-two-container" className="scenechild-two">
      ...
    </div>
    ...
    <div id="scenechild-n-container" className="scenechild-n">
      ...
    </div>
  </div>
</Dollyzoom>
```

### props
  * Host:{}
  * Panel:{}
  * Portal:{}

### Aside
The design pattern used is a hybrid flux pattern. Although the flux pattern is the primary authority, jQuery was utilized for its deep-cloning capabilities (i.e. cloning of elements, children, and listeners) of anonymous elements. This was necessary to accomodate functionality for Dollyzoom descendents that are interactive and require listeners. The additional requirement imposed is that listeners on anonymous elements (i.e. child descendents) must be attached using the jQuery ".on" method. The scope of non-flux patterning is very minimal and restricted to the anonymous containers passed into the Dollyzoom component as children.