#!/bin/bash

for i in *.json
do
	echo "$i"
	mdfilename="$(basename "$i" ".json").md"
	../cli.js --schema "$i" >"${mdfilename}"
done
