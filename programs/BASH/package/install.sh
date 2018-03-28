#!/bin/bash

var_string_destination_path="${HOME}/package";
var_string_source_file_path="";
var_int_result=0;

# Installation file for the package manager tool

echo -e "You migh need root privileges to proceed to script installation.\n";

[[ -e "${var_string_destination_path}" ]] && echo "Package manager is already installed." && exit 0;

case "`uname -s`" in
	"Darwin") # Mac OS X
		var_string_source_file_path="${HOME}/.bash_profile";
		;;
	"Linux") # General Linux
		var_string_source_file_path="${HOME}/.profile";
		;;
	*) # Other
		var_string_source_file_path="${HOME}/.profile";
		;;
esac;

echo 'export PATH="${PATH}:${HOME}";' > "${var_string_source_file_path}";
var_int_result="$((${var_int_result} + $?))";

curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/package/app.sh" > "${var_string_destination_path}";
var_int_result="$((${var_int_result} + $?))";

source "${var_string_source_file_path}";
var_int_result="$((${var_int_result} + $?))";

if [[ "${var_int_result}" -eq 0 ]]; then
	echo "Package manager successfully installed!";
else
	echo "Package manager installed with errors.";
fi;

#exit "${var_int_result}";
