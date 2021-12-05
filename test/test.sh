#!/bin/bash

cd test/ 2>/dev/null

for i in *.json
do
	echo "$i"
	mdfilename="$(basename "$i" ".json").md"
	../cli.js --schema "$i" >"${mdfilename}"
done

if test "x$(git status -s *.md)" != "x"
then
	echo "Error: Generated files changed!" 2>&1
	echo "If the change was intended, commit the changed files and rerun the test" 2>&1
	exit 1
fi

exit 0
