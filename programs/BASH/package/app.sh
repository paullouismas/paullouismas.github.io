#!/bin/bash

global_directory="${HOME}/.packages";
global_repository="https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/";
global_packages_repository="${global_repository}packages/";
global_packages_directory="${global_directory}/packages/";
global_aliases_directory="${global_directory}/aliases/";
global_configuration_file_path="${global_directory}/config.conf";
global_tool_file_path="${0}";
global_tool_file_repository="${global_repository}package/app.sh";

function_void_usage() {
	function_void_check_internet;
	function_void_setup_conf;
	local var_local_string_usage="";
	read -r -d '' var_local_string_usage <<EOUSAGE
Usage: package [install <PACKAGE_NAME> [<PACKAGE_NAME>]...]
               [update <PACKAGE_NAME> [<PACKAGE_NAME>]...]
               [update-all]
               [list]
               [remove <PACKAGE_NAME> [<PACKAGE_NAME>]...]
               [remove-all]
               [upgrade-tool]
EOUSAGE
	echo -e "${var_local_string_usage}\n";
	exit 0;
	return;
}
function_void_install_package() {
	function_void_check_internet;
	function_void_setup_conf;
	local var_local_package_name="${1}";
	[[ ! -z "`cat "${global_configuration_file_path}" | grep '^PACKAGE '${var_local_package_name}`" ]] && echo "Package \"${var_local_package_name}\" already installed" && exit 1;
	local var_local_package_url="${global_packages_repository}${var_local_package_name}/app.sh";
	local var_local_package_data="`curl -s "${var_local_package_url}"`";
	[[ "${var_local_package_data:0:2}" = "40" ]] && echo "Package \"${var_local_package_name}\" doesn't exist" && exit 1;
	local var_local_package_directory="${global_packages_directory}${var_local_package_name}/";
	[[ ! -d "${var_local_package_directory}" ]] && mkdir -p "${var_local_package_directory}";
	local var_local_package_file="${var_local_package_directory}${var_local_package_name}";
	echo "${var_local_package_data}" > "${var_local_package_file}";
	chmod +x "${var_local_package_file}";
	ln -s "${var_local_package_file}" "${global_aliases_directory}";
	echo "PACKAGE ${var_local_package_name} `openssl enc -a -A <<< "${var_local_package_file}"` `openssl dgst -sha512 "${var_local_package_file}" | awk '{ print $NF }'`" >> "${global_configuration_file_path}";
	return;
}
function_void_list() {
	function_void_check_internet;
	function_void_setup_conf;
	local var_local_int_count=0;
	echo "Installed packages:";
	for i in `cat "${global_configuration_file_path}" | grep '^PACKAGE ' | awk '{ print $2 }'`; do
		if [[ -n "${i}" ]]; then
			echo -e "\t-\t`openssl enc -a -A -d <<< "${i}"`";
			var_local_int_count="$((${var_local_int_count} + 1))";
		fi;
	done;
	echo -e "\nTotal installed packages: ${var_local_int_count}";
	exit 0;
	return;
}
function_void_update_package() {
	function_void_check_internet;
	function_void_setup_conf;
	local var_local_package_name="${1}";
	local var_local_temp_package_file="${global_directory}/temp.tmp";
	[[ -z "`cat "${global_configuration_file_path}" | grep '^PACKAGE '${var_local_package_name}`" ]] && echo "Package \"${var_local_package_name}\" not installed" && exit 1;
	local var_local_package_url="${global_packages_repository}${var_local_package_name}/app.sh";
	local var_local_package_data="`curl -s "${var_local_package_url}"`";
	local var_local_package_file="${global_packages_directory}${var_local_package_name}/${var_local_package_name}";
	[[ "${var_local_package_data:0:2}" = "40" ]] && echo "Package \"${var_local_package_name}\" doesn't exist" && exit 1;
	echo "${var_local_package_data}" > "${var_local_temp_package_file}";
	if [[ "`openssl dgst -sha512 "${var_local_temp_package_file}" | awk '{ print $NF }'`" = "`openssl dgst -sha512 "${var_local_package_file}" | awk '{ print $NF }'`" ]]; then
		echo "Package \"${var_local_package_name}\" is already at the latest version";
	else
		echo "${var_local_package_data}" > "${var_local_package_file}";
	fi;
	rm -P -f "${var_local_temp_package_file}";
	exit 0;
	return;
}
function_void_upgrade_tool() {
	function_void_check_internet;
	function_void_setup_conf;
	local var_local_temp_file="${global_directory}/temp.tmp";
	local var_local_package_data="`curl -s "${global_tool_file_repository}"`";
	echo "${var_local_package_data}" > "${var_local_temp_file}";
	if [[ "`openssl dgst -sha512 "${var_local_temp_file}" | awk '{ print $NF }'`" = "`openssl dgst -sha512 "${global_tool_file_path}" | awk '{ print $NF }'`" ]]; then
		echo "Package tool manager is already at the latest version";
	else
		echo "${var_local_package_data}" > "${global_tool_file_path}";
		echo "Package tool manager updated successfully!";
	fi;
	rm -P -f "${var_local_temp_file}";
	exit 0;
	return;
}
function_void_remove_package() {
	function_void_check_internet;
	function_void_setup_conf;
	local var_local_package_name="${1}";
	[[ -z "`cat "${global_configuration_file_path}" | grep '^PACKAGE '${var_local_package_name}`" ]] && echo "Package \"${var_local_package_name}\" not installed" && exit 1;
	local var_local_package_directory="${global_packages_directory}${var_local_package_name}/";
	local var_local_package_file="${var_local_package_directory}${var_local_package_name}";
	sed -i '' "/^PACKAGE ${var_local_package_name}/d" "${global_configuration_file_path}"
	rm -f "${global_aliases_directory}${var_local_package_name}";
	rm -P -f "${var_local_package_file}";
	rmdir "${var_local_package_directory}";
	return;
}
function_void_setup_conf() {
	local var_local_string_conf="";
	read -r -d '' var_local_string_conf <<EOUSAGE
################################################################
#|============================================================|#
#|@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|#
#|@==========================================================@|#
#|@|       ##########################################       |@|#
#|@|      #                                          #      |@|#
#|@|     ###         ! Configuration file !         ###     |@|#
#|@|    #####                                      #####    |@|#
#|@|   #######                                    #######   |@|#
#|@|  ######### !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #########  |@|#
#|@| ########## DO NOT UPDATE THIS FILE MANUALLY ########## |@|#
#|@|  ######### !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #########  |@|#
#|@|   #######                                    #######   |@|#
#|@|    #####                                      #####    |@|#
#|@|     ###         ! Configuration file !         ###     |@|#
#|@|      #                                          #      |@|#
#|@|       ##########################################       |@|#
#|@==========================================================@|#
#|@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|#
#|============================================================|#
################################################################

# FORMAT: PACKAGE <PACKAGE_NAME> <BASE64_ENCODED_PACKAGE_PATH> <PACKAGE_SHA512_HASH>

##### INSTALLED PACKAGES: #####

EOUSAGE
	[[ ! -d "${global_packages_directory}" ]] && mkdir -p "${global_packages_directory}";
	[[ ! -d "${global_aliases_directory}" ]] && mkdir -p "${global_aliases_directory}";
	[[ ! -e "${global_configuration_file_path}" ]] && echo -e "${var_local_string_conf}\n" > "${global_configuration_file_path}";
	[[ -z "`cat "${HOME}/.bash_profile" | grep '^export PATH="\${PATH}:\${HOME}/.packages/aliases/"'`" ]] && echo 'export PATH="${PATH}:${HOME}/.packages/aliases/"' >> "${HOME}/.bash_profile";
	return;
}
function_void_check_internet() {
	echo -e "GET http://google.com HTTP/1.0\n\n" | nc google.com 80 > /dev/null 2>&1
	if [[ "$?" != 0 ]]; then
		echo "No proper internet connection";
		exit 1;
	fi;
	return;
}

# Check for root permissions
[[ "${REQUIRE_ROOT_PERMISSIONS}" = true ]] && [[ "`id -u`" != 0 ]] && echo "[ERROR] Please only execute this script as root." && exit 1;

function_void_check_internet;

# Check if no arguments is provided
[[ "$#" -eq 0 ]] && function_void_usage;

case "${1}" in
	"install")
		for i in "$@"; do
			[[ "${i}" != "${1}" ]] && function_void_install_package "${i}";
		done;
		echo "PAckage(s) installed!";
		;;
	"list")
		function_void_list;
		;;
	"update")
		for i in "$@"; do
			[[ "${i}" != "${1}" ]] && function_void_update_package "${i}";
		done;
		;;
	"update-all")
		for i in `cat "${global_configuration_file_path}" | grep '^PACKAGE ' | awk '{ print $2 }'`; do
			function_void_update_package "${i}";
		done;
		;;
	"upgrade-tool")
		function_void_upgrade_tool;
		;;
	"remove")
		var_local_string_temp="";
		for i in "$@"; do
			[[ "${i}" != "${1}" ]] && function_void_remove_package "${i}";
		done;
		echo "Package(s) removed!";
		exit 0;
		;;
	"remove-all")
		var_local_string_temp="";
		var_local_int_count=0;
		echo "Packages:"
		for i in `cat "${global_configuration_file_path}" | grep '^PACKAGE ' | awk '{ print $2 }'`; do
			if [[ -n "${i}" ]]; then
				echo -e "\t-\t${i}";
				var_local_int_count="$((${var_local_int_count} + 1))";
			fi;
		done;
		[[ "${var_local_int_count}" -eq 0 ]] && echo "No packages are installed" && exit 1;
		read -p "Do you relly want to remove this/those package(s)? (y/N)" var_local_string_temp;
		if [[ "${var_local_string_temp}" = "Y" || "${var_local_string_temp}" = "y" ]]; then
			for i in `cat "${global_configuration_file_path}" | grep '^PACKAGE ' | awk '{ print $2 }'`; do
				[[ -n "${i}" ]] && function_void_remove_package "${i}";
			done;
			echo "Package(s) removed!";
		fi;
		exit 0;
		;;
esac;
