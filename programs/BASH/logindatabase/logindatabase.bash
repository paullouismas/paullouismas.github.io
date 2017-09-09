#!/bin/bash

read -r -d '' u<<EOF
Usage:	$(basename "$0")	<command>	<databasefile>
		-	create		<databasefile>
		-	adduser		<databasefile>		<username>		<password>
		-	removeuser	<databasefile>		<username>
		-	activateuser	<databasefile>		<username>
		-	deactivateuser	<databasefile>		<username>
		-	help
EOF

if [[ $# -eq 0 ]]; then
	echo "${u}"
	exit 0
fi

if [[ "$1" ]]; then
	cmd="$1"
fi
if [[ ! "$2" ]]; then
	read -p "Choose database file: " dbf
else
	dbf="$2"
fi
if [[ "${dbf:$((${#dbf}-4)):4}" != ".ldb" ]]; then
	dbf="${dbf}.ldb"
fi
if [[ ! -ef "${dbf}" ]]; then
	if [[ "${cmd}" != "create" ]]; then
		echo "Database file doesn't exist."
		exit 1
	fi
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
		echo "[DATABASE] " $(basename "${dbf}") " " $(basename "${dbf}" | shasum -a 256 | awk '{print $1}') > "${dbf}"
		echo "Database file created at: ${dbf}"
		exit 0
		;;
	adduser)
		if [[ "$3" ]]; then
			username="$3"
			username="${username// /}"
			if [[ ! "$4" ]]; then
				read -p "Enter user \"${username}\" new password: " -s password
				echo ""
			else
				password="$4"
			fi
			password="$(echo -n ${password} | shasum -a 256 | awk '{print $1}')"
			tmp=$(cat "${dbf}" | grep -F "${username}" | awk '{print $2}')
			if [[ "${tmp}" != "" ]]; then
				echo "Username already exist."
				exit 1
			else
				echo "${username} on:false ${password}" >> "${dbf}"
				echo "Username created."
				exit 0
			fi
			unset tmp
		fi
		;;
	removeuser)
		if [[ "$3" ]]; then
			username="$3"
			username="${username// /}"
			tmp1=$(cat "${dbf}" | grep -F "${username}" | awk '{print $1}')
			tmp2=$(cat "${dbf}" | grep -F "${username}" | awk '{print $2}')
			if [[ "${tmp2}" == "on:true" || "${tmp2}" == "on:false" ]]; then
				sed -i '' "/${tmp1}/d" "${dbf}"
				echo "Username deleted."
				exit 0
			else
				echo "Username not found."
				exit 1
			fi
			unset tmp1 tmp2
		fi
		;;
	activateuser)
		if [[ "$3" ]]; then
			username="$3"
			tmp=$(cat "${dbf}" | grep -F "${username}" | awk '{print $2}')
			if [[ "${tmp}" == "on:true" ]]; then
				echo "User account already activated."
				exit 1
			elif [[ "${tmp}" == "on:false" ]]; then
				tmp1=$(cat "${dbf}" | grep -F "${username}")
				tmp1="${tmp1//on:false/on:true}"
				sed -i '' "/${username}/d" "${dbf}"
				echo "${tmp1}" >> "${dbf}"
				echo "User \"${username}\" activated."
				exit 0
			else
				echo "User account doesn't exist."
				exit 1
			fi
			unset tmp tmp1
		fi
		;;
	deactivateuser)
		if [[ "$3" ]]; then
			username="$3"
			tmp=$(cat "${dbf}" | grep -F "${username}" | awk '{print $2}')
			if [[ "${tmp}" == "on:false" ]]; then
				echo "User account already deactivated."
				exit 1
			elif [[ "${tmp}" == "on:true" ]]; then
				tmp1=$(cat "${dbf}" | grep -F "${username}")
				tmp1="${tmp1//on:true/on:false}"
				sed -i '' "/${username}/d" "${dbf}"
				echo "${tmp1}" >> "${dbf}"
				echo "User \"${username}\" deactivated."
				exit 0
			else
				echo "User account doesn't exist."
				exit 1
			fi
			unset tmp tmp1
		fi
		;;
	help)
		echo "${u}"
		exit 0
		;;
	*)
		echo "Command \"${cmd}\" does not exist."
		exit 1
		;;
esac
