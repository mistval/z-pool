# zz-pool

A promise pool implementation to limit concurrency.

This can be useful for example if you want to limit the number of HTTP requests that can be in-flight simultaneously:

```js
const Pool = require('zz-pool');
const fetch = require('node-fetch');

const pool = new Pool(10); // create a pool of size 10

async function fetchUrl(url) {
  const response = await pool.enqueue(() => fetch(url));
  return response;
}
```

You can enqueue many requests on the pool, but the 11th won't start until the first finishes. Only 10 are allowed to run simultaneously.
