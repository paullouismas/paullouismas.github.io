#!/bin/bash

read -r -d '' u<<EOF
Usage:	$(basename "$0")	<command>	<databasefile>
				create		<databasefile>
				adduser		<databasefile>	<username>	<password>
				removeuser	<databsefile>	<username>
EOF

if [[ $# -eq 0 ]]; then
	echo "${u}"
	exit 0
fi

if [[ "$2" && $# != 2 ]]; then
	cmd="$1"
	dbf="$2"
else
	read -p "Choose database file: " dbf
fi
if [[ ! -ef "${dbf}" && "${cmd}" != "create" ]]; then
	echo "Database file doesn't exist."
	exit 1
fi
case ${cmd} in
	create)
		if [[ -ef "${dbf}" ]]; then
			echo "Databse file already exist."
			read -p "Overwrite? (y/n) " -n1 tmp
			if [[ "${tmp}" != "Y" && "${tmp}" != "y" ]]; then
				echo "Aborted."
				exit 1
			fi
			unset tmp
			rm "${dbf}"
		fi
		touch "${dbf}"
		echo "[DATABASE] $(basename \"${dbf}\") $(basename \"${dbf}\" | base64)" > "${dbf}"
		;;
	adduser)
		if [[ "$3" && "$4" ]]; then
			username="$3"
			username="${username// /}"
			password="$(echo -n \"$4\" | shasum -a 256)"
			echo "${username} true ${password}" >> "${dbf}"
		fi
		;;
	removeuser)
		if [[ "$3" ]]; then
			username="$3"
			username="${username// /}"
			tmp="$(grep -F \"${username}\" | awk '{print $2}')"
			if [[ "${tmp}" == "true" ]]; then
				
			fi
		fi
		;;
	*)
		;;
esac
