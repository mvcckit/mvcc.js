# mvcc.com.create

The `create` function creates a new component in the collection.

## Usage

mvcc.route.create(name, fn);

### Arguments

| Parameter    | Type       | Details                            |
| ------------ | ---------- | ---------------------------------- |
| fn           | `Function` | The callback function.             |
| name         | `String`   | The directive name.                |

### Properties

The `fn` function has three reserved properties. 

| Property     | Type       | Details                                  |
| ------------ | ---------- | ---------------------------------------- |
| init         | `Function` | Called before the component is rendered. | 
| draw         | `Function` | Called when the component is rendering.  |
| done         | `Function` | Called after the component is rendered.  |

> The `HTMLElement` is passed in an argument to each of these functions.

