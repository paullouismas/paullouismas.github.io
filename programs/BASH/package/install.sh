#!/bin/bash

var_string_destination_path="${HOME}/package";
var_string_source_file_path="";
var_int_result=0;

##### Installation file for the package manager tool #####

echo -e "You migh need root privileges to proceed to script installation.\n";

# Check for previous installations
[[ -e "${var_string_destination_path}" ]] && echo "Package manager is already installed." && exit 0;

# Check the current OS
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

# Export the file directory to PATH
if [[ -z "`cat "${var_string_source_file_path}" | grep -F 'export PATH="${PATH}:${HOME}";'`" ]]; then
	echo 'export PATH="${PATH}:${HOME}";' > "${var_string_source_file_path}";
	var_int_result="$((${var_int_result} + $?))";
fi;

# Download file
curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/package/app.sh" > "${var_string_destination_path}";
var_int_result="$((${var_int_result} + $?))";

# Make file executable
chmod +x "${var_string_destination_path}";
var_int_result="$((${var_int_result} + $?))";

# Source profile file
source "${var_string_source_file_path}";
var_int_result="$((${var_int_result} + $?))";

# Inform user of success / errors
if [[ "${var_int_result}" -eq 0 ]]; then
	echo "Package manager successfully installed!";
else
	echo "Package manager installed with errors.";
fi;

#exit "${var_int_result}";
