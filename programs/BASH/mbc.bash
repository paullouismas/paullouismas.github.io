#!/bin/bash

# Minimum supported base: 2
ac=({0..9} {A..Z} {a..z})
supportedBases=($(eval "echo {2..${#ac[@]}}"))
{ # Functions
	divNr() {
		local dividende="$1"
		local diviseur="$2"
		if [[ $((3/2)) -eq 1 ]]; then
			echo "$((${dividende}-((${dividende}/${diviseur})*${diviseur})))"
		else
			echo "$((${dividende}%${diviseur}))"
		fi
	}
	reverse() {
		local input="$1"
		local output=""
		local li="${#input}"
		for (( i = 0; i < ${li}; i++ )); do
			output="${output}${input:$((${li}-${i}-1)):1}"
		done
		echo "${output}"
	}
	strsplit() {
		local input="$1"
		local output=""
		local li="${#input}"
		for (( i = 0; i < ${li}; i++ )); do
			if [[ "${input:${i}:1}" != " " ]]; then
				output="${output}${input:${i}:1}"
			fi
		done
		local lo="${#output}"
		input="${output}"
		output=""
		for (( i = 0; i < ${lo}; i++ )); do
			output="${output}$(echo ${input:${i}:1}) "
		done
		echo "${output}"
	}
	sclac() {
		local p="$1"
		local i=0
		while [[ "${ac[$i]}" != "$p" ]]; do
			i="$(($i+1))"
		done
		echo "$i"
	}
}
read -r -d '' u<<EOF
Usage:	$(basename "$0")	<inputBase>	<outputBase>	<string>

	Convert <string> from <inputBase> to <outputBase>

	The supported bases are:
	${supportedBases[@]}
EOF

if [[ $# -eq 0 ]]; then
	echo "${u}"
	exit 0
fi

ibase="$1"
obase="$2"
num="$3"
output=""

if [[ ${ibase} != ${obase} ]]; then
	if [[ ${ibase} != "10" ]]; then # Check if input base is different than base10
		{ # Transform the input to base10
			num="$(reverse ${num})"
			num=($(strsplit "${num}"))
			for (( i = 0; i < ${#num[@]}; i++ )); do
				num[${i}]=$(sclac "${num[${i}]}")
			done
			tmp=0
			for (( i = 0; i < ${#num[@]}; i++ )); do
				tmp="$(( ${tmp}+( ${num[${i}]}*( ${ibase}**${i} ) ) ))"
			done
			num="${tmp}"
			unset tmp
		}
	fi
	inp="${num}"
	{ # Transform from base10
		if [[ ${obase} -eq 10 ]]; then
			echo "${inp}"
		else
			{ # Transform to the selected output base
				tmp=()
				while [[ "${inp}" != "0" ]]; do
					reste="$(( ${inp} % ${obase} ))"
					inp="$((${inp}/${obase}))"
					tmp=(${tmp[@]} ${reste})
				done
				for (( i = 0; i < ${#tmp[@]}; i++ )); do
					tmp[${i}]="${ac[${tmp[${i}]}]}"
					output="${output}${tmp[$i]}"
				done
				output="$(reverse ${output})"
				echo "${output}"
				exit 0
			}
		fi
	}
else
	echo "${num}"
	exit 0
fi
exit 1
