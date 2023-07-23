@echo off
setlocal

set "packageJson=package.json"
set "versionField=version"

echo Pulling changes from the remote repository...
git pull

echo Updating version...
  
rem Call the Python script to update package.json
python update.py

echo Adding and committing changes...
git add -A
git commit -m "Added Some Pictures for my Hexo Blog"
git push -f

echo Publishing to npm...
npm publish --proxy http://127.0.0.1:10809

pause

