# react-swipe-view
react component for mobile, switch tab views by gesture

### install
```shell
npm i react-swipe-view
```

### usage
```jsx
import SwipeView from 'react-swipe-view'

<SwipeView cur={0} num={5} tabWidth={375} tabChange={tabChange} onSwipe={onSwipe} animation={{duration:0.3, timing: 'ease', delay: 0}} disableTouch={['.disabled']}>
    {views}
</SwipeView>
```
check the demo code at `example` folder and effect [here](https://legeneek.github.io/react-swipe-view/index.html)

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| num | Number | ✓ | total number of tab view |
| tabWidth | Number | ✓ | width of each tab view |
| cur | Number |   | current tab index start from 0, default 0 |
| fastSwipeTime | Number |  | swipe time less then `fastSwipeTime`(default 300ms) will cause tab view change |
| tabChange | Function |  | callback invoked when tab view changed by user's gesture `(index: Number): void` |
| onSwipe | Function |  | callback invoked when user is sliding `(isSwipe: Boolean):void`, if user is sliding horizontally `isSwipe` is true else false |
| containerStyle | Object |  | this component use `display: flex` to layout inner tab views, set `containerStyle` to change it |
| animation | Object |  | define the animation props for tab transition. eg:`{duration: 0.3, timing: 'ease', delay: 0}`
| disableTouch | Array |  | an array of `dom selectors`, indicate the dom not trigger touch effect. eg: `['.disabled', '.no-touch']`.
