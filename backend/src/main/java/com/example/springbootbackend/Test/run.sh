# initMem=${7500}
# g++ -o solution solution.cpp &> $1 

# && {
            # {
            #     cat testcase.txt | /usr/bin/time -f "%e %M" -o $3 timeout $4s ./solution &> $2
            #     # cat testcase.txt | ts=$(date +%s%N) -o $3 timeout $4s ./solution tt=$((($(date +%s%N) - $ts)/1000000)) ; echo "Time taken: $tt milliseconds"
            # } || {
            #     RTE=1
            # }
            # }

g++ -o solution $1 &> $2 && {
    {
        cat $3 | ./solution &> $2
    } 
}