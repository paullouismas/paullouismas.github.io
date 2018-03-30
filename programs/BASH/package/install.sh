#!/bin/bash

var_string_destination_path="${HOME}/package";
var_string_source_file_path="";
var_int_result=0;

##### Installation file for the package manager tool #####

echo -e "[INFORMATION] You migh need root privileges to proceed to script installation.\n";

# Check for previous installations
[[ -e "${var_string_destination_path}" ]] && echo "[ERROR]       Package manager is already installed." && exit 0;

# Check the current OS
case "`uname -s`" in
	"Darwin") # Mac OS X
		echo -e "[INFORMATION] Detected OS: Mac OS X";
		var_string_source_file_path="${HOME}/.bash_profile";
		;;
	"Linux") # General Linux
		echo -e "[INFORMATION] Detected OS: Linux";
		var_string_source_file_path="${HOME}/.profile";
		;;
	*) # Other
		echo -e "[INFORMATION] OS could not be detected properly";
		var_string_source_file_path="${HOME}/.profile";
		;;
esac;

# Download file
echo -e -n "[INFORMATION] Downloading script... ";
curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/package/app.sh" > "${var_string_destination_path}";
var_int_result="$((${var_int_result} + $?))";
echo -e "done";

# Make file executable
echo -e -n "[INFORMATION] Making file executable... ";
chmod +x "${var_string_destination_path}";
var_int_result="$((${var_int_result} + $?))";
echo -e "done";

# Export the file directory to PATH
if [[ -z "`cat "${var_string_source_file_path}" | grep -F 'export PATH="${PATH}:${HOME}";'`" ]]; then
	echo -e -n "[INFORMATION] Exporting path to script to PATH... ";
	echo 'export PATH="${PATH}:${HOME}";' > "${var_string_source_file_path}";
	var_int_result="$((${var_int_result} + $?))";
	echo -e "done";
fi;

# Source profile file
echo -e -n "[INFORMATION] Sourcing profile file... ";
source "${var_string_source_file_path}";
var_int_result="$((${var_int_result} + $?))";
echo -e "done";

# Inform user of success / errors
if [[ "${var_int_result}" -eq 0 ]]; then
	echo "[INFORMATION] Package manager successfully installed!";
else
	echo "[INFORMATION] Package manager installed with errors.";
fi;

#exit "${var_int_result}";
