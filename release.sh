#!/bin/sh

# Get the git commit hash
typeScriptDirectory='./TypeScript'
cd $typeScriptDirectory
commitHash=`git rev-parse HEAD`
cd ..

# Version of this script
toolsVersion="2"

commitName="1.$(date +%Y%m%d%H%M).$toolsVersion+$commitHash"

# Update package.json
< package.json > package.json.new sed -E "s/(\s+\"version\": \")[^\"]+(\",)/\1$commitName\2/"
mv package.json.new package.json
echo "Adding to git"
git add -A

# Commit,tag,push,publish
git commit -m $commitName --allow-empty
git tag $commitName
git push
git push --tags
npm publish
