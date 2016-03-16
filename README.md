# battlebots

####Local Setup
1. Install Node
  - Mac: I recommend using homebrew aka brew install node
  - PC: Install from nodejs.org
2. In the root of the project. execute npm install to restore the necessary files.
3. Execute "npm install -g browserify mocha" to install global modules.
4. Execute "browserify public/client.js -o public/bundle.js" to bundle the client.js and dependent scripts.
5. Launch the web server by running "node server.js"
6. Navigate to http://localhost:3000/ to see the magic.
