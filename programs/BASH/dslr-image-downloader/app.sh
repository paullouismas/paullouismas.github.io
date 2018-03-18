#!/bin/bash

if [[ "`exiftool -ver > /dev/null; echo "$?"`" != 0 ]]; then
	echo "This software require the exiftool software.";
	echo "Get it there: https://sno.phy.queensu.ca/~phil/exiftool/";
	exit 1;
fi;

##### VARIABLES DECLARATION #####

var_int_minimum_rating=0;
var_array_string_extension_match=("jpg");
var_string_output_path="${HOME}/Pictures/";
var_string_source_path="`pwd`";
var_array_string_current_files_1=();
var_array_string_current_files_2=();
var_bool_ignore=false;
var_string_current="";
var_string_destination="";
var_array_string_temp=();
var_int_transfer_time=0;

##### /VARIABLES DECLARATION #####

##### FUNCTIONS DECLARATION #####

# Usage function declaration
function_void_usage() {
	local var_string_usage="";
	read -r -d '' var_string_usage<<EOUSAGE
Usage: `basename "${0}"` [-h] OPTIONS...

Options:
    -r VALUE        Specify the minimum rating, minimum is 0 and maximum is 5.
                    Default is ${var_int_minimum_rating}.

    -e TYPE         Specify the extension(s) to match, separate them using a blank space (" ").
                    Default is "${var_array_string_extension_match[@]}".

    -o PATH         Specify the destination of the files.
                    Default is "${var_string_output_path}".

    -s PATH         Specify the source directory to search files in.
                    Default is current working directory.

    -h              Show this help and exit.
EOUSAGE
	echo -e "${var_string_usage}\n";
	exit 0;
}

##### /FUNCTIONS DECLARATION #####

# Check if nothing is passed as arguments or parameters
[[ "${#@}" -eq 0 ]] && function_void_usage;

# Parameters parsing
while getopts ":r:e:o:s:h" o; do
	case "${o}" in
		r) var_int_minimum_rating="${OPTARG}";;
		e) var_array_string_extension_match="${OPTARG}";;
		o) var_string_output_path="${OPTARG}";;
		s) var_string_source_path="${OPTARG}";;
	esac;
done;

# Check that the minimum rating is a valid number between 0 and 5
if [[ "${var_int_minimum_rating}" != [0-5] ]]; then
	echo "The minimum rating value is not a valid number between 0 and 5.";
	echo "Aborting.";
	exit 1;
fi;

# Check that the source directory exist
if [[ ! -d "${var_string_source_path}" ]]; then
	echo "Source directory does not exist.";
	echo "Aborting.";
	exit 1;
fi;

# Create the output path if it does not already exist
if [[ ! -d "${var_string_output_path}" ]]; then
	mkdir -p "${var_string_output_path}";
	echo "Output path did not exist and has been created.";
fi;

# Variables reformating
var_array_string_extension_match=(`echo "${var_array_string_extension_match[@]}"`);
[[ "${var_string_output_path:$((${#var_string_output_path} - 1)):1}" != "/" ]] && var_string_output_path="${var_string_output_path}/";
[[ "${var_string_source_path:$((${#var_string_source_path} - 1)):1}" != "/" ]] && var_string_source_path="${var_string_source_path}/";

##### MAIN #####

# Parse extension match into regex format
for (( i = 0; i < "${#var_array_string_extension_match[@]}"; i++ )); do
	var_array_string_extension_match["${i}"]="\\.${var_array_string_extension_match["${i}"]}$";
done

##### DEBUG #####
if [[ false = true ]]; then
	echo -e "var_string_output_path:\t${var_string_output_path}";
	echo -e "var_string_source_path:\t${var_string_source_path}";
	echo -e "var_int_minimum_rating:\t${var_int_minimum_rating}";
	echo -e "var_array_string_extension_match:\t( ${var_array_string_extension_match[@]} )";
fi;
##### /DEBUG #####

for (( i = 0; i < "${#var_array_string_extension_match[@]}"; i++ )); do
	var_array_string_current_files_1=(`ls -d1 "${var_string_source_path}"* | grep -e "${var_array_string_extension_match["${i}"]}"`);
	if [[ "${var_int_minimum_rating}" != 0 ]]; then
		for (( j = 0; j < "${#var_array_string_current_files_1[@]}"; j++ )); do
			[[ "`exiftool "${var_array_string_current_files_1["${j}"]}" | grep "Rating" | awk '{ print $3 }'`" -gt "$((${var_int_minimum_rating} - 1))" ]] && var_array_string_current_files_2+=("${var_array_string_current_files_1["${j}"]}");
		done;
	else
		var_array_string_current_files_2=(${var_array_string_current_files_1[@]});
	fi;
	for (( j = 0; j < "${#var_array_string_current_files_2[@]}"; j++ )); do
		var_bool_ignore=false;
		var_int_current_index=1;
		var_string_current="${var_array_string_current_files_2["${j}"]}";
		while [[ -e "${var_string_output_path}`basename "${var_string_current}"`" ]]; do
			var_array_string_temp[0]="${var_array_string_current_files_2["${j}"]}"; # Current
			var_array_string_temp[1]="${var_string_output_path}$(basename "${var_string_current}")"; # Destination
			if [[ "`openssl dgst -sha512 "${var_array_string_temp[0]}" | awk '{ print $2 }'`" == "`openssl dgst -sha512 "${var_array_string_temp[1]}" | awk '{ print $2 }'`" ]]; then
				var_bool_ignore=true;
				echo "Duplicate! (\"${var_array_string_temp[0]}\" and \"${var_array_string_temp[1]}\")";
				break;
			fi;
			if [[ "${var_int_current_index}" -eq 1 ]]; then
				var_string_current="`sed -e "s/${var_array_string_extension_match["${i}"]}/_${var_int_current_index}${var_array_string_extension_match["${i}"]//$/}/g" <<<"${var_string_current}"`";
			else
				var_string_current="`sed -e "s/_$((${var_int_current_index} - 1))${var_array_string_extension_match["${i}"]}/_${var_int_current_index}${var_array_string_extension_match["${i}"]//$/}/g" <<<"${var_string_current}"`";
			fi;
			var_int_current_index="$((${var_int_current_index} + 1))";
		done
		var_string_destination="${var_string_output_path}`basename "${var_string_current}"`";
		[[ "${var_bool_ignore}" = true ]] && continue;
		echo -n "Copying file \"${var_array_string_current_files_2["${j}"]}\" to \"${var_string_destination}\" ...     ";
		var_int_transfer_time="`date +"%s"`"
		cp -n "${var_array_string_current_files_2["${j}"]}" "${var_string_destination}";
		echo "Copied! ($((`date +"%s"` - ${var_int_transfer_time}))s)";
	done
done

##### /MAIN #####