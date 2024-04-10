#!/bin/bash

# Usage: ./compile.sh <filetype> <source_file> <output_executable>
rm testOutput*
lang=$1
source_file=$2
output_executable=$3

if [ $lang = "c" ]; then
    gcc -o $output_executable $source_file
elif [ $lang = "cpp" ]; then
    g++ -o $output_executable $source_file
elif [ $lang = "java" ]; then
    javac $source_file
    # mv $(basename $source_file .java).class $output_executable
elif [ $lang = "py" ]; then
    # No compilation needed for Python
    cp $source_file $output_executable
else
    echo "Unsupported filetype: $lang"
    exit 1
fi

if [ $? -eq 0 ]; then
    echo "Compilation successful. Executable created: $output_executable"
else
    echo "Compilation failed."
    exit 1
fi