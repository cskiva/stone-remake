git diff HEAD --diff-algorithm=histogram > last.diff
start ./last.diff
git diff --diff-algorithm=histogram origin/dev > lastBranch.diff