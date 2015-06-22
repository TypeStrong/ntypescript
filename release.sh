#!/bin/sh

# Get the git commit hash
typeScriptDirectory='./TypeScript'
cd $typeScriptDirectory
commitHash=`git rev-parse HEAD`
cd ..

# Version of this script
toolsVersion="1"

commitVersion="1.$(date +%Y%m%d%H%M).$toolsVersion+$commitHash"
commitName="$(date +%Y-%m-%d) Version: $commitVersion"

# Kick travis
echo $commitName > kicktravis

# Update package.json
< package.json > package.json.new sed -E "s/(\s+\"version\": \")[^\"]+(\",)/\1$commitVersion\2/"
mv package.json.new package.json
git checkout -b release
echo "Adding to git"
git add -A

# Commit,tag,push,publish
git commit -m "$commitName"
git tag $commitVersion
git push
git push --tags
