#!/bin/bash

###################################################################################################
#                                                                                                 #
# Usage: echo "<KEYS>" | function_string_query_arguments ${var_array_string_encoded_arguments[@]} #
# Or:    function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "<KEYS>"    #
#                                                                                                 #
###################################################################################################

function_string_query_arguments() {
	local var_array_string_parameters=(${@});
	local var_array_string_query_param=(`cat /dev/stdin`);
	local var_string_temp="";
	for (( i = 0; i < "${#var_array_string_parameters[@]}"; i++ )); do
		var_string_temp="`openssl enc -A -a -d <<< "${var_array_string_parameters["${i}"]}"`";
		for j in "${var_array_string_query_param[@]}"; do
			if [[ "${var_string_temp:0:2}" = "--" && "${var_string_temp}" = "${j}" && "$((${i} + 1))" != "${#var_array_string_parameters[@]}" ]]; then
				echo "`openssl enc -A -a -d <<< "${var_array_string_parameters["$((${i} + 1))"]}"`";
				return;
			fi;
		done;
	done;
}

var_array_string_encoded_arguments=();
for i in "${@}"; do
	var_array_string_encoded_arguments+=(`openssl enc -A -a <<< "${i}"`);
done;

function_string_query_arguments ${var_array_string_encoded_arguments[@]}<&0;
