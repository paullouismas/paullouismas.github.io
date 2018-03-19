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
var_array_int_transfer_time=0;
var_int_processed_files=0;
var_array_string_encoded_arguments=();

##### /VARIABLES DECLARATION #####

##### FUNCTIONS DECLARATION #####

# Usage function declaration
function_void_usage() {
	local var_string_usage="";
	read -r -d '' var_string_usage<<EOUSAGE
Usage: `basename "${0}"` [-h] OPTIONS...

Options:\n
    -r VALUE            Specify the minimum rating, minimum is 0 and maximum is 5.
    --rating VALUE      Default is ${var_int_minimum_rating}.\n
    -e TYPE             Specify the extension(s) to match, separate them using a blank space (" ").
    --extension TYPE    Default is "${var_array_string_extension_match[@]}".\n
    -o PATH             Specify the destination of the files.
    --output PATH       Default is "${var_string_output_path}".\n
    -s PATH             Specify the source directory to search files in.
    --source PATH       Default is current working directory.\n
    -h                  Show this help and exit.
    --help
EOUSAGE
	echo -e "${var_string_usage}\n";
	exit 0;
}

# Function to parse arguments
function_string_query_arguments() {
	local var_array_string_parameters=(${@}); local var_string_query_param="`cat /dev/stdin`"; local var_string_temp="";
	for (( i = 0; i < "${#var_array_string_parameters[@]}"; i++ )); do var_string_temp="`openssl enc -A -a -d <<< "${var_array_string_parameters["${i}"]}"`"; [[ "${var_string_temp:0:2}" = "--" && "${var_string_temp}" = "${var_string_query_param}" && "$((${i} + 1))" != "${#var_array_string_parameters[@]}" ]] && echo "`openssl enc -A -a -d <<< "${var_array_string_parameters["$((${i} + 1))"]}"`" && return; done;
}

##### /FUNCTIONS DECLARATION #####

# Check if nothing is passed as arguments or parameters
[[ "${#@}" -eq 0 ]] && function_void_usage;

# Parameters parsing
{
	var_array_string_encoded_arguments=(); for i in "${@}"; do var_array_string_encoded_arguments+=(`openssl enc -A -a <<< "${i}"`); done;
	
	# Rating
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "-r"`";
	[[ -n "${OPTARG}" ]] && var_int_minimum_rating="${OPTARG}";
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "--rating"`";
	[[ -n "${OPTARG}" ]] && var_int_minimum_rating="${OPTARG}";

	# Extension
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "-e"`";
	[[ -n "${OPTARG}" ]] && var_array_string_extension_match="${OPTARG}";
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "--extension"`";
	[[ -n "${OPTARG}" ]] && var_array_string_extension_match="${OPTARG}";

	# Output
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "-o"`";
	[[ -n "${OPTARG}" ]] && var_string_output_path="${OPTARG}";
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "--output"`";
	[[ -n "${OPTARG}" ]] && var_string_output_path="${OPTARG}";

	# Source
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "-s"`";
	[[ -n "${OPTARG}" ]] && var_string_source_path="${OPTARG}";
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "--source"`";
	[[ -n "${OPTARG}" ]] && var_string_source_path="${OPTARG}";

	# Help
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "-h"`";
	[[ -n "${OPTARG}" ]] && function_void_usage;
	OPTARG="`function_string_query_arguments ${var_array_string_encoded_arguments[@]} <<< "--help"`";
	[[ -n "${OPTARG}" ]] && function_void_usage;
}

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

# Task presentation
clear;
echo -e "Source path:            \t${var_string_source_path}";
echo -e "Output path:            \t${var_string_output_path}";
echo -e "Minimum rating required:\t${var_int_minimum_rating}";
echo -e "Regex extensions match: \t${var_array_string_extension_match[@]}";
echo -e "\n";

var_array_int_transfer_time[0]="`date +"%s"`";

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
		var_array_int_transfer_time[1]="`date +"%s"`"
		cp -n "${var_array_string_current_files_2["${j}"]}" "${var_string_destination}" && var_int_processed_files="$((${var_int_processed_files} + 1))";
		echo "Copied! ($((`date +"%s"` - ${var_array_int_transfer_time[1]}))s)";
	done
done

echo "Finished processing ${var_int_processed_files} files in $((`date +"%s"` - ${var_array_int_transfer_time[0]})) seconds!";

##### /MAIN #####
