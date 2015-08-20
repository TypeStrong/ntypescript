#!/bin/sh
set -e

git submodule update --recursive --init

# Official Microsoft/TypeScript clone
cd ./TypeScript

git clean -xfd
git fetch origin
git reset --hard origin/master

# Fix jakefile to expose the internal APIs to service
< Jakefile.js > Jakefile.new.js sed -E "s/\*stripInternal\*\/ true/\*stripInternal\*\/ false/"
mv Jakefile.new.js Jakefile.js

# Install jake
npm install jake

# Build once to get a new LKG
./node_modules/.bin/jake release tsc --trace
cp ./built/local/* ./bin/

# Copy the source TypeScript compiler and services, but not the tsconfig.json files
cp ./src/compiler/* ../src/compiler
cp -r ./src/services/* ../src/services
rm ../src/services/tsconfig.json ../src/compiler/tsconfig.json

# Do pre build modifications
node ../extensions/preBuild.js

# Now build using the LKG
./bin/tsc -p ../src
./bin/tsc -p ../extensions

# Also copy the lib.* stuff from LKG
cp ./bin/lib* ../bin

# add custom extension
node ../extensions/addExtensions.js

# Reset sub typescript
git reset --hard origin/master
cd ..
