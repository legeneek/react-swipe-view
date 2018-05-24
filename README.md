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
check the demo code at `exapmle` folder and effect [here](https://legeneek.github.io/react-swipe-view/index.html)

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| cur | Number | ✓ | current tab index start from 0 |
| num | Number | ✓ | total number of tab view|
| tabWidth | Number | ✓ | width of each tab view |
| tabChange | Function |  | callback invoked when tab view changed by user's gesture `(index: Number): void` |
| onSwipe | Function |  | callback invoked when user is sliding `(isSwipe: Boolean):void`, if user is sliding horizontally `isSwipe` is true else false |
