#!/bin/bash

# Version du script
var_string_version="";

# Initialisation des variables
var_string_error_msg="/!\\ ERROR /!\\";
var_bool_specified_option_l=false;
var_bool_specified_option_o=false;
var_bool_specified_option_p=false;
var_bool_specified_option_s=false;
var_bool_specified_option_i=false;
var_string_output_file="";
var_int_processing_length=0;
var_string_possible_chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
var_string_dummy="";
var_string_string="";
var_bool_verbose=false;
var_int_times=0;
var_int_index=0;
var_string_temp="";
var_int_sleep_duration=0;
var_string_verbose="";
var_int_findex=();
var_int_place=0;
var_int_max=0;
var_int_somme_findex=0;
var_int_start_time=0;
var_int_stop_time=0;
var_int_duration=0;
var_bool_specified_option_u=false;

# Initialisation des fonctions
function_void_usage() { # Affichage de l'usage
	local var_string_usage;
	read -r -d '' var_string_usage <<EOF
Usage: $(basename ${0}) [-h] [-p] -s <STR> -o <PATH> -i <STR>

This utility is a small tool to generate a wordlist with random strings preceded by their hash. 

Options:
	-h		Display this help and exit
	-l	<S>	Specify a sleep duration (in seconds) between each items calculation. Default is 0
	-o	<P>	The output file
	-p		Print the current data being processed on-screen, disable progress bar
	-i	<S>	String containing the characters that should be used to generate random strings
			Default ones are: [a-zA-Z0-9_]
	-s	<S>	String containing the amount of characters that should be processed
			/!\\WARNING/!\\: The more characters you process, the longer it will take to finish processing
	-u		Upgrade script to latest available version
	-v		Verbose mode

EOF
	echo "${var_string_usage}"
	exit 0;
}
function_string_generate_array() { # Généraion d'une array de taille précisé en ${1}
	local var_string_return="";
	for (( var_int_i = 0; var_int_i < "${1}"; var_int_i++)); do
		var_string_return="${var_string_return}0";
		[[ "${var_int_i}" -lt "$((${1} - 1))" ]] && var_string_return="${var_string_return} ";
	done;
	echo "${var_string_return}";
}
function_void_update_progress_bar() { # Affichage d'une barre de progrès
	local var_int_start="${1}";
	local var_int_current="${2}";
	local var_int_stop="${3}";
	local var_int_full=0;
	local var_int_empty=100;
	local var_string_full="";
	local var_string_empty="";
	local var_int_percent=0;
	var_int_percent="$(python3 -c "import math; print(math.floor( (${var_int_current} - ${var_int_start}) * ((100 - 1) / (${var_int_stop} - ${var_int_start})) + 1 ))")";
	for ((var_int_i = 0; var_int_i < "${var_int_percent}"; var_int_i++)); do
		var_string_full="${var_string_full}=";
	done
	for ((var_int_i = 0; var_int_i < "100 - ${var_int_percent}"; var_int_i++)); do
		var_string_empty=" ${var_string_empty}";
	done
	echo -n -e " Progress:\t[${var_string_full}${var_string_empty}] ${var_int_percent}%\t${var_int_current}/${var_int_stop}\r";
}
function_string_parse_time() { # Affichage du temps
	local var_int_duration="${1}";
	local var_int_seconds="$((${var_int_duration} % 60))";
	local var_int_minutes="$(((${var_int_duration} / 60) % 60))";
	local var_int_hours="$(((${var_int_duration} / 3600) % 24))";
	local var_int_days="$((${var_int_duration} / 86400))";
	echo "${var_int_days}d ${var_int_hours}h ${var_int_minutes}m ${var_int_seconds}s";
}
function_void_upgrade() { # Gestion de mise à jour du script
	local var_string_data="";
	local var_string_sha="$(curl -s "https://api.github.com/repositories/77230994/contents/programs/BASH/sha256-hash-bypass.sh" | grep -F "\"sha\":" | awk '{print $2}' | sed -e 's/[^0-9a-zA-Z]//g')";
	
	if [[ "${var_string_version}" == "${var_string_sha}" ]]; then
		echo "Script is already the latest version";
		return;
	fi;

	var_string_data="$(curl -s "https://raw.githubusercontent.com/paullouismas/paullouismas.github.io/master/programs/BASH/sha256-hash-bypass.sh" | sed -e "s/var_string_version=\".*\";/var_string_version=\"${var_string_sha}\";/g")";
	echo "${var_string_data}";
}

# Affichage de l'aide si aucuns arguments ne sont passés
[[ "${#@}" -eq 0 ]] && function_void_usage && exit 0;

# Analyse des arguments passés
while getopts ":l:ho:pi:s:uv" o; do
	case "${o}" in
		l)
			var_int_sleep_duration="${OPTARG}";
			var_bool_specified_option_l=true;
			;;
		h)
			function_void_usage;
			exit 0;
			;;
		o)
			if [[ "${OPTARG}" ]]; then
				var_string_output_file="${OPTARG}";
				var_bool_specified_option_o=true;
			else
				echo "${var_string_error_msg} You must specify a path for the output file";
				var_bool_specified_option_o=false;
			fi;
			;;
		p)
			var_bool_specified_option_p=true;
			;;
		i)
			if [[ "${OPTARG}" ]]; then
				var_string_possible_chars="${OPTARG}";
				var_bool_specified_option_i=true;
			fi;
			;;
		s)
			if [[ "${OPTARG}" ]]; then
				var_int_processing_length="${#OPTARG}";
				var_bool_specified_option_s=true;
			else
				echo "${var_string_error_msg} You must specify a string containing characters";
				var_bool_specified_option_s=false;
			fi;
			;;
		u)
			var_bool_specified_option_u=true;
			;;
		v)
			var_bool_verbose=true;
			;;
		*)
			echo "${var_string_error_msg} Argument \"${OPTARG}\" unknown.";
			exit 1;
			;;
	esac;
done;

# Système de mise à jour
if [[ "${var_bool_specified_option_u}" = true ]]; then
	function_void_upgrade;
	exit 0;
fi;

# Filtrage des erreurs
if [[ "${var_bool_specified_option_o}" = false ]]; then
	echo "${var_string_error_msg} You must specify the option -o with a file path. Refer to the help for detailled informations.";
	exit 1;
fi;

if [[ "${var_bool_specified_option_s}" = false ]]; then
	echo "${var_string_error_msg} You must specify the option -s with a string. Refer to the help for detailled informations."
	exit 1;
fi;

if [[ -f "${var_string_output_file}" ]]; then
	read -p "The output file already exist, processing will overwrite the file, do you want to continue? (y/n) " var_string_dummy;
	if [[ "${var_string_dummy}" != "y" && "${var_string_dummy}" != "Y" ]]; then
		echo "Quiting.";
		exit 0;
	fi
	echo -n "" > "${var_string_output_file}";
	echo "File overwriten.";
else
	touch "${var_string_output_file}";
	echo "Output file (${var_string_output_file}) created.";
fi;

##################################
##	Exécution du 'Main' script	##
##################################

if [[ "${var_bool_verbose}" = true ]]; then
	clear;
	read -r -d '' var_string_dummy <<EOVERBOSE
/!\\ VERBOSE MODE /!\\
	Output file:		$([[ "${var_string_output_file:0:1}" != "/" ]] && echo "$(pwd)/" || echo "")${var_string_output_file}
	Processing length:	${var_int_processing_length}
	List of characters:	${var_string_possible_chars}
	Total calculations:	$((${#var_string_possible_chars} ** ${var_int_processing_length}))
/!\\ VERBOSE MODE /!\\
EOVERBOSE
	echo -e "${var_string_dummy}";
fi

var_int_max="$((${#var_string_possible_chars} ** ${var_int_processing_length}))";
var_int_findex=($(function_string_generate_array "${var_int_processing_length}"));

echo "Press ^C at any time to stop execution.";
echo "Generating random strings...";

var_int_start_time="$(date +"%s")";

while [[ "$(wc -c "${var_string_output_file}" | awk '{ print $1 }')" -lt 10000000000 ]]; do
	var_int_index="$((${var_int_index} + 1))";
	var_int_somme_findex=0;
	var_string_temp="";
	for ((var_int_i = 0; var_int_i < "${#var_int_findex[@]}"; var_int_i++)); do
		var_string_temp="${var_string_temp}${var_string_possible_chars:${var_int_findex["${var_int_i}"]}:1}";
	done;
	[[ "${var_string_temp}" == "!STOP!" ]] && break;
	var_string_dummy="$(echo -n "${var_string_temp}" | openssl dgst -sha256)\t${var_string_temp}";
	echo -e "${var_string_dummy}" >> "${var_string_output_file}";
	[[ "${var_bool_specified_option_p}" = true ]] && echo -e "Try:\t${var_int_index}\t\t${var_string_dummy}";
	[[ "${var_bool_specified_option_p}" = false ]] && function_void_update_progress_bar "1" "${var_int_index}" "${var_int_max}";
	for ((var_int_i = 0; var_int_i < "${#var_int_findex[@]}"; var_int_i++)); do
		var_int_place="$((${#var_int_findex[@]} - ${var_int_i} - 1))";
		[[ "${var_int_i}" -eq 0 ]] && var_int_findex["${var_int_place}"]="$((var_int_findex["${var_int_place}"] + 1))";
		if [[ "${var_int_findex["${var_int_place}"]}" -eq "${#var_string_possible_chars}" ]]; then
			var_int_findex["${var_int_place}"]=0;
			[[ "${var_int_place}" -gt 0 ]] && var_int_findex["$((${var_int_place} - 1))"]="$((${var_int_findex["$((${var_int_place} - 1))"]} + 1))";
		fi;
	done;
	sleep "${var_int_sleep_duration}";
	[[ "${var_int_index}" -eq "${var_int_max}" ]] && break;
done

var_int_stop_time="$(date +"%s")";
var_int_duration="$((${var_int_stop_time} - ${var_int_start_time}))";

echo "";
[[ "${var_bool_verbose}" = true ]] && echo -e "Total processing time:\t$(function_string_parse_time "${var_int_duration}")";

exit 0;
