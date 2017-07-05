#!/bin/bash

# Author : Paul-Louis Mas https://paullouismas.github.io
#
# ANY MODIFICATIONS TO THIS FILE IS STRICTLY PROHIBITED
#

# Script current version
# format : bigDeploy.versionDeploy.buildDeploy
read -r -d '' currentVersion<<EOF
LVINFO "0.2.0"
EOF
currentVersion=$(echo $currentVersion | awk '{print $2}')
argument=$1

# Functions
function update {
	echo "Current version: $currentVersion, latest version: $latestVersion"
	echo "New version of the script available, updating..."
	curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/package/app-verification.pkg/script.bash" > /usr/local/bin/localCrypt
	echo "Script updated to version $latestVersion, exiting."
	exit 1
}
function help {
	echo "Usage: localCrypt [argument]"
	echo "  Arguments:  update   Update the script"
	echo "              help     Show this help page"
	
}

# On startup : search for possible update
latestVersion=$(curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/package/app-verification.pkg/script.bash" | grep "LVINFO" | awk '{ print $2 }')
if [[ $currentVersion != $latestVersion ]] # if current version ≠ latest version : update
then
	update;
else # if current version = latest version : execute task
	if [[ "$argument" == "" ]]
	then
		# Begin parsing data into variables
		ip=$(json-parser "ipinfo.io" "ip")
		city=$(json-parser "ipinfo.io" "city")
		region=$(json-parser "ipinfo.io" "region")
		country=$(json-parser "ipinfo.io" "country")
		loc=$(json-parser "ipinfo.io" "loc")
		org=$(json-parser "ipinfo.io" "org")
		postal=$(json-parser "ipinfo.io" "postal")

		# Delete the potential residue of temporary file
		rm /tmp/data.md5 || {echo "" > /dev/null}

		# Create temporary file
		touch /tmp/data.md5

		# Add data from variables to temporary file
		echo -n "[ip:$ip]" >> /tmp/data.md5
		echo -n "[city:$city]" >> /tmp/data.md5
		echo -n "[region:$region]" >> /tmp/data.md5
		echo -n "[country:$country]" >> /tmp/data.md5
		echo -n "[loc:$loc]" >> /tmp/data.md5
		echo -n "[org:$org]" >> /tmp/data.md5
		echo -n "[postal:$postal]" >> /tmp/data.md5

		# Print md5sum onscreen
		md5 /tmp/data.md5 | awk '{ print $4 }'

		# Delete temporary file
		rm /tmp/data.md5

		# End task
		exit 1
	elif [[ $argument == "-update" || $argument == "update" ]]
	then
		update;
	elif [[ $argument == "-h" || $argument == "-help" || $argument == "--help" || $argument == "help" ]]
	then
		help;
	fi
fi
