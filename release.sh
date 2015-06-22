#!/bin/sh
git pull origin release
git checkout -b release

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
echo "Adding to git"
git add -A

# Commit,tag,push,publish
echo "Committing"
git commit -m "$commitName"
echo "Pushing commit"
git push origin

echo "Tagging"
git tag $commitVersion
echo "Pushing tags"
git push --tags
