#!/bin/bash

#######################################################################################
##### This is a tempporary update file and by so, should not be executed manually #####
#######################################################################################

var_string_file_path="${HOME}/sha256-hash-bypass.sh";
var_string_file_data="$(echo "$(curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/sha256-hash-bypass/app.sh")" | base64)";

echo "${var_string_file_data}" | base64 -D > "${var_string_file_path}";
chmod +x "${var_string_file_path}" || {
	echo "You might needs root access to fully install this program";
	sudo chmod +x "${var_string_file_path}";
}

exit $?;
