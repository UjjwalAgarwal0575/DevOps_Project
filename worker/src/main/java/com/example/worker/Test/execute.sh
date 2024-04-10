#!/bin/bash

# Usage: ./run.sh  <lang> <executable> <input_testcase_file> <output_file>

lang=$1
executable=$2
input_testcase_file=$3
output_file=$4


echo $input_testcase_file 
echo $executable
echo $output_file
# cat $3 | ./$2 &>> $4 


if [ $lang = "c" ]; then
    cat $input_testcase_file | $executable >> $output_file
elif [ $lang = "cpp" ]; then
    cat $input_testcase_file | $executable >> $output_file 
elif [ $lang = "java" ]; then
    # cat $input_testcase_file | java $executable &>> $output_file 
    cat $input_testcase_file | java $(basename $executable .java) >> $output_file 
elif [ $lang = "py" ]; then
    cat $input_testcase_file | python3 $executable >> $output_file 
else
    echo "Unsupported filetype: $lang"
    exit 1
fi


# Check if the execution encountered any errors
if [ $? -ne 0 ]; then
    echo "Runtime error occurred."
    exit 1
else
    echo "Execution completed successfully."
fi

# elif [ $lang = "cpp" ]; then
#     g++ -o solution $2 &> $3
#     if [ $? -eq 0 ]; then
#          echo "Compilation successful."
#         # Step 2: Execution on multiple test cases
#         while IFS= read -r -d '' testcase  || [ -n "$testcase" ]; do
#             echo "Running on testcase: $testcase"
#             echo "$testcase" | ./solution &>> $3 || { 
#                 echo "Runtime error occurred on testcase: $testcase"
#                 RTE=1
#             } 
#             echo "" >> $3
            
#         done < "$4"
#     else
#         CE=1
#     fi