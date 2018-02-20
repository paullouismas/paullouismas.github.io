local var_int_value="${1}";
local var_int_lower_old="${2}";
local var_int_upper_old="${3}";
local var_int_lower_new="${4}";
local var_int_upper_new="${5}";
echo "$(( (${var_int_value} - ${var_int_lower_old}) * ((${var_int_upper_new} - ${var_int_lower_new}) / (${var_int_upper_old} - ${var_int_lower_old})) + ${var_int_lower_new} ))";
