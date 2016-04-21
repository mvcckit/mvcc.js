# mvcc.com.create

Adds a component to the component collection.

## Usage

mvcc.com.create(fn, name);

### Arguments

| Parameter    | Type       | Details                            |
| ------------ | ---------- | ---------------------------------- |
| fn           | `Function` | The callback function.             |
| name         | `string`   | The component name.                |

### Properties

The `fn` function has three reserved properties:

| Property     | Type         | Details                                  |
| ------------ | ------------ | ---------------------------------------- |
| init         | `[Function]` | Called before the component is rendered. | 
| draw         | `[Function]` | Called when the component is rendering.  |
| done         | `[Function]` | Called after the component is rendered.  |
| selector     | `string`     | The selector string                      |
