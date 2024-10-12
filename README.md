# Ricochet Robots

## Start

### Development

First add listener for all messages

```js
window.addEventListener('message', (event) => console.log(event.data))
```

Next prepare board

```js
window.postMessage({ event: 'prepare', schema: [ 0, 1, 2, 3 ], robotsCoords: { "blue": { "x": 14, "y": 5 }, "green": { "x": 9, "y": 12 }, "yellow": { "x": 10, "y": 2 }, "red": { "x": 15, "y": 9 }, "grey": { "x": 11, "y": 12 }} }, '*')

```

And setup token

```js
window.postMessage({ event: 'select_token', token: 'blue-gear' }, '*')
```
