by default we can't run javascript es6+ on node js
------------------ to solve it --------------------
1) add type: module in package.json
2) add start script to package.json
3) in start command add 'node --experimental-modules entrypoint_file.js'
