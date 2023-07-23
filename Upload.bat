@echo off

:upload
git status | find /i "nothing to commit, working tree clean" > nul
if errorlevel 1 (
  echo Detected local changes!
  echo Pulling changes from the remote repository...
  git pull
  echo Adding and committing changes...
  git add -A
  git commit -m "Added Some Pictures for my Hexo Blog"
  git push -f
)
goto upload
