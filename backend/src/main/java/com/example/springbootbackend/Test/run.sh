

# g++ -o solution $1 &> $2 && {
#     {
#         cat $3 | ./solution &> $2
#     } 
# }

# !/bin/bash

# arg1 = filetype, arg2 = filename, arg3 = output.txt, arg4 = testcase.txt
lang=$1
# CE = 0
# RTE = 0

if [ $lang = "c" ]
then {
        
        gcc -o solution $2 &> $3 && {
            {
                cat $4 | ./solution &> $3
            } || {
                RTE=1
            }
        }
    } || {
        CE=1
    }
elif [ $lang = "cpp" ]
then {
        g++ -o solution $2 &> $3 && {
            {
                cat $4 | ./solution &> $3
            } || {
                RTE=1
            }
        }
    } || {

        CE=1
    }
elif [ $lang = "java" ]
then {
        javac $2 &> $3 && {
            {
                cat $4 | java solution &> $3
            } || {
                RTE=1
            }
        }
    } || {
        CE=1
    }
elif [ $lang = "py" ]
then {
        cat $4 | python3 solution.py &> $3
    } || {
        RTE=1
    }
fi

