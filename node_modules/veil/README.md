# Veil: Convert email or HTTP messages to Javascript objects

Veil turns this

    Subject: Hello, Veil!
    Date: Tue Jan 17 2012 09:06:59 GMT+0700 (ICT)
    From: jhs@iriscouch.com

    Hello, Veil. Welcome to the party.

into this.

```javascript
{ Date: Tue, 17 Jan 2012 02:06:59 GMT,
  From: 'jhs@iriscouch.com',
  Subject: 'Hello, Veil!',
  body: 'Hello, Veil. Welcome to the party.' }
```

You can use it, for example, to edit [blog posts][blog] in a useful Markdown style but load them as Javascript objects.

Veil is available as an NPM module.

    $ npm install veil

Follow (upper-case *F*) comes from an internal Iris Couch project used in production for over a year. It works in the browser (beta) and is available as an NPM module.

    $ npm install follow

## Example

```javascript
var veil = require('veil')

var message = 'Date: Tue, 17 Jan 2012 02:11:48 GMT\n'
            + 'Subject: This is the example\n'
            + '\n'
            + 'This is the body'

message = veil.parse(message)
console.dir(message)
```

Output:

    { Date: Tue, 17 Jan 2012 02:11:48 GMT,
      Subject: 'This is the example'
      body: 'This is the body' }

## Options

Veil is [defaultable][defaultable]. Customize its major behaviors by setting its default options:

```javascript
// Stock behavior
var veil = require('veil')

// Modified behavior, with inheritance.
var better_veil = veil.defaults({ keys: 'underscore' })
  , best_veil = better_veil.defaults({ dates: true
                                     , numbers: true
                                     })
```

<a name="api"></a>
## API Overview

Veil has one function:

`parse(message, [options])` | Return an object representing the message, with optional extra options.

<a name="options"></a>
## Options

The options to *parse()* are the same as those for `.defaults()`.

* `keys` | If this is `"underscore"`, convert keys like `"Content-Type"` to `"content_type"`
* `dates` | Enable this to convert timestamp values into `Date` objects
* `numbers` | Enable this to convert numeric values to `Number`s

## Tests

Veil uses [node-tap][tap]. If you clone this Git repository, tap is included.

    $ ./node_modules/.bin/tap test
    XXX

    ok

## License

Apache 2.0

[tap]: https://github.com/isaacs/node-tap
[blog]: https://github.com/jhs/jason.io/tree/master/posts/
[defaultable]: https://github.com/iriscouch/defaultable
