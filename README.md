## React Dollyzoom Effect

Dollyzoom is a React component designed to easily produce a commonly used videographic technique known as the dolly-zoom effect. The component acts as a wrapper which can contain any number of children. Any of those children are able to become the subject (i.e. target) of the dollyzoom effect. The primary Dollyzoom child acts as the container for the background imagery and children, while only the targeted element acts as the foreground subject. All non-targeted elements become visually grouped with the background imagery while the targeted element remains in the foreground focus. Perspective, blur, fade, scale, timing, and easing properties are assigned to the Dollyzoom component and applied appropriately to the elements when triggering the effect. Targeted elements may contain interactive controls such as input fields and buttons.

### Features
  * Callbacks for onReady, onChange, onComplete
  * Methods for Apply and Restore

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
</Dollyzoom>
```