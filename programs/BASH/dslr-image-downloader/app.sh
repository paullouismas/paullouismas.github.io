#!/bin/bash

if [[ "`exiftool -ver 2> /dev/null; echo "$?"`" != 0 ]]; then
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
var_string_rename_format=""; # Blank means no renaming
var_bool_directory_hierarchy=false;

##### /VARIABLES DECLARATION #####

##### FUNCTIONS DECLARATION #####

# Usage function declaration
function_void_usage() {
	local var_string_usage="";
	read -r -d '' var_string_usage<<EOUSAGE
Usage: `basename "${0}"` OPTIONS...

Options:\n
    -r VALUE        Specify the minimum rating, minimum is 0 and maximum is 5.
                    Default is ${var_int_minimum_rating}.\n
    -e TYPE         Specify the extension(s) to match, separate them using a blank space (" ").
                    Default is "${var_array_string_extension_match[@]}".\n
    -o PATH         Specify the destination of the files.
                    Default is "${var_string_output_path}".\n
    -s PATH         Specify the source directory to search files in.
                    Default is current working directory.\n
    -i FORMAT       Rename the files using FORMAT.
                    Format is "<NAME_OF_FILE>:<EXTENSION_OF_FILE>:<INCREMENT_START_VALUE>:<INCREMENT_STEPS>".
                    <INCREMENT_START_VALUE> and <INCREMENT_STEPS> must be positive integers.
                    Ex: "--rename (dog_:jpg:1:1)"\n
    -c BOOLEAN      Create directory using this format ("YYYY/MM/YYYY_MM_DD") to transfer files.
                    Default is false.\n
    -h              Show this help and exit.
                    \n
EOUSAGE
	echo -e "${var_string_usage}";
	exit 0;
}

# Function to parse renaming format
function_string_renaming() {
	local var_array_string_format=(`echo ${1//:/ }`);
	local var_string_prefix="${var_array_string_format[0]}";
	local var_string_extension="${var_array_string_format[1]}";
	local var_int_increment_start="${var_array_string_format[2]}";
	local var_int_increment_steps="${var_array_string_format[3]}";
	[[ "${var_int_increment_start}" == "" || "${var_int_increment_steps}" == "" ]] && echo "" && return;
	echo "`openssl enc -a -A <<< "${var_string_prefix}"` `openssl enc -a -A <<< "${var_string_extension}"` `echo "${var_int_increment_start}" | sed -e 's/[^0-9]//g'` `echo "${var_int_increment_steps}" | sed -e 's/[^0-9]//g'`";
}

# Function for assembling directories hierarchy
function_string_hierarchy() {
	local var_string_file="${1}";
	local var_string_destination="${2}";
	local var_array_int_file_exif=(`exiftool "${var_string_file}" | grep "Create Date" | head -n 1 | awk '{ print $4 }' | sed -e 's/:/ /g'`);
	local var_int_file_year="${var_array_int_file_exif[0]}";
	local var_int_file_month="${var_array_int_file_exif[1]}";
	local var_int_file_day="${var_array_int_file_exif[2]}";
	local var_string_path="`dirname "${var_string_destination}"`/${var_int_file_year}/${var_int_file_month}/${var_int_file_year}_${var_int_file_month}_${var_int_file_day}/";
	mkdir -p "${var_string_path}";
	echo "${var_string_path}`basename "${var_string_destination}"`";
}

##### /FUNCTIONS DECLARATION #####

# Check if nothing is passed as arguments or parameters
[[ "${#@}" -eq 0 ]] && function_void_usage;

# Parameters parsing
while getopts ":r:e:o:s:i:c:h" o; do
	case "${o}" in
	 	r) var_int_minimum_rating="${OPTARG}" ;;
		e) var_array_string_extension_match="${OPTARG}" ;;
		o) var_string_output_path="${OPTARG}" ;;
		s) var_string_source_path="${OPTARG}" ;;
		i) var_string_rename_format="`function_string_renaming ${OPTARG}`" ;;
		c) var_bool_directory_hierarchy=true ;;
		h) function_void_usage ;;
	 esac
done;

# Check that the minimum rating is a valid number between 0 and 5
if [[ "${var_int_minimum_rating}" != [0-5] ]]; then
	echo "The minimum rating value is not a valid number between 0 and 5.";
	echo "Specified value is \"${var_int_minimum_rating}\"";
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
echo -e "Renaming format:        \t`echo "${var_string_rename_format}" | awk '{ print $1 }' | openssl enc -a -A -d`*.`echo "${var_string_rename_format}" | awk '{ print $2 }' | openssl enc -a -A -d` from `echo "${var_string_rename_format}" | awk '{ print $3 }'` increment `echo "${var_string_rename_format}" | awk '{ print $4 }'`";
echo -e "Directories reparsing:  \t${var_bool_directory_hierarchy}";
echo -e "\n";

var_array_int_transfer_time[0]="`date +"%s"`";
var_int_increment_value="`echo "${var_string_rename_format}" | awk '{ print $3 }'`";

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
		var_string_destination="${var_string_output_path}`basename "${var_string_current}"`";
		[[ "${var_string_rename_format}" != "" ]] && var_string_destination="`dirname "${var_string_destination}"`/`echo "${var_string_rename_format}" | awk '{ print $1 }' | openssl enc -a -A -d`${var_int_increment_value}.`echo "${var_string_rename_format}" | awk '{ print $2 }' | openssl enc -a -A -d`";
		[[ "${var_bool_directory_hierarchy}" = true ]] && var_string_destination="`function_string_hierarchy "${var_array_string_current_files_2["${j}"]}" "${var_string_destination}"`";
		while [[ -e "${var_string_destination}" ]]; do
			if [[ "`openssl dgst -sha512 "${var_array_string_current_files_2["${j}"]}" | awk '{ print $2 }'`" == "`openssl dgst -sha512 "${var_string_destination}" | awk '{ print $2 }'`" ]]; then
				var_bool_ignore=true;
				echo "Duplicate! (\"${var_array_string_current_files_2["${j}"]}\" and \"${var_string_destination}\")";
				break;
			fi;
			if [[ "${var_int_current_index}" -eq 1 ]]; then
				var_string_destination="$(sed -e "s/\.`awk -F "." '{ print $NF }' <<< "${var_string_destination}"`$/_${var_int_current_index}\.`awk -F "." '{ print $NF }' <<< "${var_string_destination}"`/g" <<< "${var_string_destination}")";
			else
				var_string_destination="$(sed -e "s/_$((${var_int_current_index} - 1))\.`awk -F "." '{ print $NF }' <<< "${var_string_destination}"`$/_${var_int_current_index}\.`awk -F "." '{ print $NF }' <<< "${var_string_destination}"`/g" <<< "${var_string_destination}")";
			fi;
			var_int_current_index="$((${var_int_current_index} + 1))";
		done
		[[ "${var_string_rename_format}" != "" ]] && var_int_increment_value="$(( ${var_int_increment_value} + `echo "${var_string_rename_format}" | awk '{ print $4 }'` ))";
		[[ "${var_bool_ignore}" = true ]] && continue;
		echo -e -n "Copying file \"${var_array_string_current_files_2["${j}"]}\" to \"${var_string_destination}\"... \t";
		var_array_int_transfer_time[1]="`date +"%s"`"
		cp -n "${var_array_string_current_files_2["${j}"]}" "${var_string_destination}" && var_int_processed_files="$((${var_int_processed_files} + 1))";
		echo "Copied! ($((`date +"%s"` - ${var_array_int_transfer_time[1]}))s)";
	done
done

echo -e "\nFinished processing ${var_int_processed_files} files in $((`date +"%s"` - ${var_array_int_transfer_time[0]})) seconds!";

##### /MAIN #####
