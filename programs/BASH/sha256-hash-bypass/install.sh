#!/bin/bash

#######################################################################################
##### This is a tempporary update file and by so, should not be executed manually #####
#######################################################################################

var_string_file_path="${HOME}/sha256-hash-bypass.sh";
var_string_file_data="$(echo "$(curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/sha256-hash-bypass/app.sh")" | base64)";
var_int_result=0;

echo "${var_string_file_data}" | base64 -D > "${var_string_file_path}";
{
	chmod +x "${var_string_file_path}" && ln -s "${var_string_file_path}" "/bin/";
} || {
	echo "You might needs root access to fully install this ";
	sudo chmod +x "${var_string_file_path}" && sudo ln -s "${var_string_file_path}" "/bin/";
}

var_int_result="$?";

if [[ "${var_int_result}" -eq "0" ]]; then echo "App installed successfully."
else echo "App installed with errors.";
fi;

exit "${var_int_result}";
