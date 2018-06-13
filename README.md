# react-swipe-view
react component for mobile, switch tab views by gesture

### install
```shell
npm i react-swipe-view
```

### usage
```jsx
import SwipeView from 'react-swipe-view'

<SwipeView cur={curTab} num={tabs.length} tabWidth={tabWidth} tabChange={tabChange} onSwipe={onSwipe}>
    {views}
</SwipeView>
```
check the demo code at `example` folder and effect [here](https://legeneek.github.io/react-swipe-view/index.html)

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| cur | Number | ✓ | current tab index start from 0 |
| num | Number | ✓ | total number of tab view |
| tabWidth | Number | ✓ | width of each tab view |
| fastSwipeTime | Number |  | swipe time less then `fastSwipeTime`(default 300ms) will cause tab view change |
| tabChange | Function |  | callback invoked when tab view changed by user's gesture `(index: Number): void` |
| onSwipe | Function |  | callback invoked when user is sliding `(isSwipe: Boolean):void`, if user is sliding horizontally `isSwipe` is true else false |
| containerStyle | Object |  | this component use `display: flex` to layout inner tab views, set `containerStyle` to change it |
