#!/bin/bash

# Author : Paul-Louis Mas https://paullouismas.github.io
#
# ANY MODIFICATIONS TO THIS FILE IS STRICTLY PROHIBITED
#

# Script current version
currentVersion="1.0.0"

# On startup : search for possible update
latestVersion=$(curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/package/app-verification.pkg/latestVersion" | grep "version" | awk '{ print $2 }')
if [[ $currentVersion != $latestVersion ]] # if current version ≠ latest version : update
then
	echo "New version of the script available, updating..."
	curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/package/app-verification.pkg/script.bash" > /usr/local/bin/localCrypt
	echo "Script updated, exiting"
	exit 1
else # if current version = latest version : execute task
	# Begin parsing data into variables
	ip=$(json-parser "ipinfo.io" "ip")
	city=$(json-parser "ipinfo.io" "city")
	region=$(json-parser "ipinfo.io" "region")
	country=$(json-parser "ipinfo.io" "country")
	loc=$(json-parser "ipinfo.io" "loc")
	org=$(json-parser "ipinfo.io" "org")
	postal=$(json-parser "ipinfo.io" "postal")

	# Delete the potential residue of temporary file
	#rm /tmp/data.md5

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
fi
