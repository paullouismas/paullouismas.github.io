#!/bin/bash

if [[ "$2" && $# != 2 ]]; then
	cmd="$1"
	dbf="$2"
else
	read -p "Choose database file: " dbf
fi
if [[ ! -f "${dbf}" && "${cmd}" != "create" ]]; then
	echo "Database file doesn't exist."
	exit 1
fi
case ${cmd} in
	create)
		if [[ -f "${dbf}" ]]; then
			echo "Databse file already exist."
			read -p "Overwrite? (y/n) " -n1 tmp
			if [[ "${tmp}" != "Y" && "${tmp}" != "y" ]]; then
				echo "Aborted."
				exit 1
			fi
		fi
		;;
	edit)
		;;
	*)
		;;
esac
