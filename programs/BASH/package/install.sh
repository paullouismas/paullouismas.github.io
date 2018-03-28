#!/bin/bash

var_string_destination_path="${HOME}/package";

# Installation file for the package manager tool

echo -e "You will be prompted for root privileges to proceed to script installation.\n";

[[ -e "${var_string_destination_path}" ]] && echo "Package manager is already installed." && exit 0;

