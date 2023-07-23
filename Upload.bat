@echo off

:upload
echo Pulling changes from the remote repository...
git pull

echo Checking for local changes...
git status | find /i "nothing to commit, working tree clean" > nul
if errorlevel 1 (
  echo Adding and committing changes...
  git add -A
  git commit -m "Added Some Pictures for my Hexo Blog"
  git push -f
)
goto upload
