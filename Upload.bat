@echo off
setlocal

set "packageJson=package.json"
set "versionField=version"

:upload
echo Pulling changes from the remote repository...
git pull

echo Checking for local changes...
git status | find /i "nothing to commit, working tree clean" > nul
if errorlevel 1 (
  echo Local files have changed. Updating version...
  
  rem Call the Python script to update package.json
  python update.py

  echo Adding and committing changes...
  git add -A
  git commit -m "Added Some Pictures for my Hexo Blog"
  git push -f

  echo Publishing to npm...
  npm publish
) else (
  echo No local changes found. Skipping version update.
)

goto upload
