# Ricochet Robots

## Start

### Development

1. add listener for all messages

```js
window.addEventListener('message', (event) => console.log(event.data))
```

2. Prepare board

```js
window.postMessage({
  event: 'core:configure_game',
  order_map_parts: [ 0, 1, 2, 3 ],
  robots_coords: {
    "blue": [14, 5],
    "green": [9, 12],
    "yellow": [10, 2],
    "red": [15, 9],
    "grey": [11, 12]
  }
}, '*')

```

3. Setup token

```js
window.postMessage({
  event: 'core:set_target_token',
  token: 'blue-gear'
}, '*')
```

4. Enable moving robots

```js
window.postMessage({
  event: 'core:enable_move_robots'
}, '*')
```
