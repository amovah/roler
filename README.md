# roler

simple and fast role manager for nodejs and browsers.

## Installation

Using NPM:

```
npm install roler --save
```

## Getting started

1. Install package: `npm install roler`

2. Open a file in your editor and write, For example `roler.js`:

```javascript
import Roler from 'roler';
// or
const Roler = require('roler');

let roler = new Roler();

roler.new('guest').add('post', 'view');
roler.new('admin').add('post', ['view', 'edit']).add('media', ['upload', 'remove']);

export default roler;
// or
module.exports = roler;
```

3. In your app file you can use roler, For example in express app:

```javascript
let roler = require('./roler.js');

app.get('/', function(req, res, next) {
  if (roler.get(req.user.role).isAllowed('post', 'view')) {
    next();
  } else {
    res.send('Forbidden');
  }
});
```

## API

### Roler

Return: `Roler`

Create new role manager.

Example: `new Roler()`

#### Methods

##### new

Usage: `roler.new(name)`

Return: `Role`

Arguments:
  - `name`: type `string`, required. name for new role.

Create a new role.

##### get

Usage: `roler.get(name)`

Return: `Role`

Arguments:
  - `name`: type `string`, required. name of role.

Get a role.

##### remove

Usage: `roler.remove(name)`

Return: `undefined`

Arguments:
  - `name`: type `string`, required. name of role.

Remove a role.

### Role

It will be created when you using `roler.new` method.

#### Methods

##### add

Usage: `role.add(resource, permissions)`

Return: `Role`

Arguments:
  - `resource`: type `string`, required. resource name for permissions.
  - `permissions`: type `string` or `array`, required. permissions.

With add function you can add permission for a role.

Example:

```javascript
let roler = new Role();
roler.new('admin').add('blog', 'view');

roler.get('admin').add('media', ['upload', 'download']).add('groups', 'kick');
```

##### isAllowed

Usage: `role.isAllowed(resource, permissions)`

Return: `Boolean`

Arguments:
  - `resource`: type `string`, required. resource name.
  - `permissions`: type `string` or `array`, required. permissions to check.

Check whether this role can access to the resource with specified permissions or not.

Example:

```javascript
roler.get('admin').isAllowed('media', 'remove'); // return false
roler.get('admin').isAllowed('blog', 'view'); // return true
roler.get('admin').isAllowed('groups', ['add', 'kick']); // return false
```

##### whatCanDo

Usage: `role.whatCando()`

Return: `Object`

Give all resources and permissions.

##### removeResource

Usage: `roler.removeResource(resources)`

Return: `Role`

Arguments:
  - `resources`: type `string` or `array`, required. resource names to be removed.

Remove some resources from a role.

##### removePermission

Usage: `roler.removePermission(resource, permissions)`

Return: `Role`

Arguments:
  - `resource`: type `string`, required. resource name.
  - `permissions`: type `string` or `array`, required. permissions list for removing.

Remove permissions from specified resource.

# CONTRIBUTING

Cool! Any ideas and pull requests is appreciated. take a look at this [CONTRIBUTING.md](https://github.com/amovah/roler/blob/master/CONTRIBUTING.md)

# LICENSE

The MIT License (MIT)

Copyright (c) 2017 Ali Movahedi <ali_movahedi@aol.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
