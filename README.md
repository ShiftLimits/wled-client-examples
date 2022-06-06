# WLED Client Examples

This repository holds several examples for using different features of [WLED Client](https://github.com/ShiftLimits/wled-client).

## Installation

For Node.js and TypeScript examples, install using your favorite package manager:

```bash
$ npm install
```

## Usage

First you need to tell the examples where your device is located. Create a file called `.env` and put the following in:

```
WLED_DEVICE_HOST=<YOUR DEVICE IP>
```

Or you can rename and edit the `.env.example` file. Next, run a command using the structure `npm run example:<node|ts> [example]` where `node|ts` is either `node` for Node.js or `ts` for TypeScript respectively. For example to run the basic Node.js example, use the command:

```bash
$ npm run example:node 1-basic
```

Or to simplify, you only have to use the example number:

```bash
$ npm run example:node 6
```

## Examples
**Warning**: Running any example may reset your device's segments. Please only run these on a testing device.

### 1-basic
Basic example turns on the light, sets it to pure white, then toggles it off and on again.

### 2-events
Same as the above but the code is written using emitted events and plain promises for a more traditional approach.

### 3-websockets
Demonstrates WebSocket only features such as live LED count or manually handling the WebSocket connection. Also demonstrates disabling WebSockets completely.

### 4-segments
Demonstrates how to manipulate segments.

### 5-color-and-effects
Demonstrates how to set colors and effects.

### 6-nightlight
Demonstrates the nightlight feature over a 1 minute period.

### 7-presets
Demonstrates presets manipulation by creating and swapping presets around.
