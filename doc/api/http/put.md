# mvcc.http.put

Executes a http PUT request.

## Usage

mvcc.http.put(url, data, [options]).then(success, [failure]);

### Arguments

| Parameter    | Type       | Details                            |
| ------------ | ---------- | ---------------------------------- |
| url          | `string`   | The url of the page or file.       |
| data         | `*`        | The data to send.                  |
| options      | `Object`   | The options to pass.               |
| success      | `Function` | The success callback.              |
| failure      | `Function` | The failure callback.              |