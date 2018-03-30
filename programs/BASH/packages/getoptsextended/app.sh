#!/bin/bash

# Usage: echo "<KEYS>" | getoptsextended <BASE64_ENCODED_ARGUMENTS>

# Return:	Line 1:	<KEYS>
#			Line 2:	<MATCHED_KEY>
#			Line 3:	<BASE64_ENCODED_ARGUMENTS>
#			Line 4:	<VALUE>

# To simply get the returned value, extract the last line using "| tail -n 1"

getoptsextended() {
	local var_array_string_keys=(`cat "/dev/stdin"`);
	local var_string_match_key="";
	local var_array_string_encoded_arguments=($@);
	local var_string_value="";

	for (( i = 0; i < "${#var_array_string_keys[@]}"; i++ )); do
		for (( j = 0; j < "${#var_array_string_encoded_arguments[@]}"; j++ )); do
			if [[ "${var_array_string_keys["${i}"]}" = "`openssl enc -a -A -d <<< "${var_array_string_encoded_arguments["${j}"]}"`" ]]; then
				if [[ "$((${j} + 1))" -lt "${#var_array_string_encoded_arguments[@]}" ]]; then
					var_string_match_key="${var_array_string_keys["${i}"]}";
					var_string_value="`openssl enc -a -A -d <<< "${var_array_string_encoded_arguments["$((${j} + 1))"]}"`";
				fi;
			fi;
		done;
	done;

	echo "${var_array_string_keys[@]}";
	echo "${var_string_match_key}";
	echo "${var_array_string_encoded_arguments[@]}";
	echo "${var_string_value}";
	return;
}

echo "`cat /dev/stdin`" | getoptsextended `for i in $@; do echo -n "$i" | openssl enc -a -A; echo -n " "; done`;
