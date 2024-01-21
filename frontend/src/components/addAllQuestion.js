// import React, {useState} from 'react';
// import axios from 'axios';

// const AddQuestion = () => {


//     const problem1 = new Problem(1, "Weird Algorithm", "Consider an algorithm that takes as input a positive integer n. If n is even, the algorithm divides it by two, and if n is odd, the algorithm multiplies it by three and adds one. The algorithm repeats this, until n is one.\nYour task is to simulate the execution of the algorithm for a given value of n.", "1 <= n <= 1e6", { input: "3", output: "3 10 5 16 8 4 2 1" }, false, "Introductory");
//     const problem2 = new Problem(2, "Missing Numbers", "You are given all numbers between 1,2,...,n except one. Your task is to find the missing number.", "2 <= n <= 2e5", { input: "5<br>2 3 1 5", output: "4" }, true, "Introductory");
//     const problem3 = new Problem(3, "Repetitions", "You are given a DNA sequence: a string consisting of characters A, C, G, and T. Your task is to find the longest repetition in the sequence. This is a maximum-length substring containing only one type of character.", "1 <= n <= 1e6", { input: "ATTCGGGA", output: "3" }, false, "Introductory");
//     const problem4 = new Problem(4, "Two Knights", "Your task is to count for k=1,2,...,n the number of ways two knights can be placed on a k X k chessboard so that they do not attack each other.", "1 <= n <= 10000", { input: "8", output: "6<br>28<br>96<br>252<br>550<br>1056<br>1848" }, false, "Introductory");
//     const problem5 = new Problem(5, "Palindrome Reoder", "Given a string, your task is to reorder its letters in such a way that it becomes a palindrome (i.e., it reads the same forwards and backwards). Print a palindrome consisting of the characters of the original string. You may print any valid solution. If there are no solutions, print 'NO SOLUTION'.", "1 <= n <= 1e6", { input: "AAAACACBA", output: "AACABACAA" }, false, "Introductory");


//     const problem6 = new Problem(6, "Subarray Sums I", "Given an array of n positive integers, your task is to count the number of subarrays having sum x. The first input line has two integers n and x: the size of the array and the target sum x.The next line has n integers a_1,a_2,...,a_n: the contents of the array. Print one integer: the required number of subarrays.", "1 <= n <= 2e5 <br> 1 <= x, a_i <= 1e9", { input: "5 7<br>2 4 1 2 7", output: "3" }, false, "Graphs");
//     const problem7 = new Problem(7, "Nearest Smaller Values", "Given an array of n integers, your task is to find for each array position the nearest position to its left having a smaller value. The first input line has an integer n: the size of the array. The second line has n integers x_1,x_2,...,x_n: the array values. Print n integers: for each array position the nearest position with a smaller value. If there is no such position, print 0.", "1 <= n <= 2e5 <br> 1 <= x_i <= 1e9", { input: "8<br>2 5 1 4 8 3 2 5", output: "0 1 0 3 4 3 3 7" }, false, "Graphs");
//     const problem8 = new Problem(8, "Reading Books", "There are n books, and Kotivalo and Justiina are going to read them all. For each book, you know the time it takes to read it. They both read each book from beginning to end, and they cannot read a book at the same time. What is the minimum total time required? The first input line has an integer n: the number of books. The second line has n integers t_1,t_2,...,t_n: the time required to read each book. Print one integer: the minimum total time.", "1 <= n <= 2e5 <br> 1 <= t_i <= 1e9", { input: "3<br>2 8 3", output: "16" }, false, "Graphs");
//     const problem9 = new Problem(9, "", "asdasdasdasdasdasd", false, "Greedy");
//     const problem10 = new Problem(10, "", "asdasdasdasdasdasd", false, "Trees");


//     const problem11 = new Problem(11, "Dice Combinations", "Your task is to count the number of ways to construct sum n by throwing a dice one or more times. Each throw produces an outcome between 1 and  6. The only input line has an integer n. Print the number of ways modulo 10^9+7.", "1 <= n <= 1e6", { input: "3", output: "4" }, false, "Graphs");
//     const problem12 = new Problem(12, "Minimizing Coins", "Consider a money system consisting of n coins. Each coin has a positive integer value. Your task is to produce a sum of money x using the available coins in such a way that the number of coins is minimal. For example, if the coins are \{1,5,7\} and the desired sum is 11, an optimal solution is 5+5+1 which requires 3 coins. The first input line has two integers n and x: the number of coins and the desired sum of money. The second line has n distinct integers c_1,c_2,...,c_n: the value of each coin. Print one integer: the minimum number of coins. If it is not possible to produce the desired sum, print -1.", "1 <= n <= 100 <br> 1 <= x <= 1e6 <br> 1 <= c_i <= 1e6", { input: "3 11<br>1 5 7", output: "3" }, false, "Graphs");
//     const problem13 = new Problem(13, "Coin Combinations I", "Consider a money system consisting of n coins. Each coin has a positive integer value. Your task is to calculate the number of distinct ways you can produce a money sum x using the available coins. The first input line has two integers n and x: the number of coins and the desired sum of money. The second line has n distinct integers c_1,c_2,...,c_n: the value of each coin. Print one integer: the number of ways modulo 10^9+7.", "1 <= n <= 100 <br> 1 <= x <= 1e6 <br> 1 <= c_i <= 1e6", { input: "3 9<br>2 3 5", output: "8" }, false, "Graphs");
//     const problem14 = new Problem(14, "", "asdasdasdasdasdasd", false, "Greedy");
//     const problem15 = new Problem(15, "", "asdasdasdasdasdasd", false, "Trees");


//     const problem16 = new Problem(16, "Counting Rooms", "You are given a map of a building, and your task is to count the number of its rooms. The size of the map is n \times m squares, and each square is either floor or wall. You can walk left, right, up, and down through the floor squares. The first input line has two integers n and m: the height and width of the map. Then there are n lines of m characters describing the map. Each character is either . (floor) or # (wall). Print one integer: the number of rooms.", "1 <= n, m <= 1000", { input: "5 8 <br> ######## <br> #..#...# <br> ####.#.# <br> #..#...# <br> ########", output: "3" }, false, "Graphs");
//     const problem17 = new Problem(17, "Labyrinth", "You are given a map of a labyrinth, and your task is to find a path from start to end. You can walk left, right, up and down. The first input line has two integers n and m: the height and width of the map. Then there are n lines of m characters describing the labyrinth. Each character is . (floor), # (wall), A (start), or B (end). There is exactly one A and one B in the input. First print 'YES', if there is a path, and 'NO' otherwise. If there is a path, print the length of the shortest such path and its description as a string consisting of characters L (left), R (right), U (up), and D (down). You can print any valid solution.", "1 <= n, m <= 1000", { input: "5 8<br> ######## <br>#.A#...# <br> #.##.#B# <br> #......# <br>########", output: "YES<br>9<br>LDDRRRRRU" }, false, "Graphs");
//     const problem18 = new Problem(18, "Building Roads", "Byteland has n cities, and m roads between them. The goal is to construct new roads so that there is a route between any two cities. Your task is to find out the minimum number of roads required, and also determine which roads should be built. The first input line has two integers n and m: the number of cities and roads. The cities are numbered 1,2,..,n. After that, there are m lines describing the roads. Each line has two integers a and b: there is a road between those cities. A road always connects two different cities, and there is at most one road between any two cities. First print an integer k: the number of required roads. Then, print k lines that describe the new roads. You can print any valid solution.", "1 <= n <= 1e5 <br> 1 <= m <= 2e5 <br> 1 <= a, b <= n", { input: "4 2 <br>1 2<br>3 4", output: "1 <br> 2 3" }, false, "Graphs");
//     const problem19 = new Problem(19, "", "asdasdasdasdasdasd", false, "Greedy");
//     const problem20 = new Problem(20, "", "asdasdasdasdasdasd", false, "Trees");

//     const problems = {
//         problem1, problem2, problem3, problem4, problem5, 
//         problem6, problem7, problem8, 
//         problem11, problem12, problem13, 
//         problem16, problem17, problem18 
//     }

//     // Add questions to database
//     const addAllQuestion = async (e) => {

//         e.preventDefault();

      
//         const questionData = {questionId, title, problemStatement, constraints, tag};
//         // // console.log(id);
//         // console.log(title);
//         // console.log(problemStatement);
//         // console.log(constraints);
//         // console.log(tag);

//         // save the question
//         try {

//             const response = await axios.post('http://localhost:8082/api/add-question', questionData, {
//               headers: {
//                 // 'Content-Type': 'multipart/form-data',
//                 'Content-Type': 'application/json',
//               },
//             });
//             console.log('API Response:', response.data);
//         } 
//         catch (error) {
//             console.error('Error adding question:', error);
//         }



//         // stringfy all the json data

//         testCases.forEach((testCase, index) => {
//             try {
//                 // Parse each JSON string into a JavaScript object
//                 console.log("Json String: ", testCase);
//                 let jsonObject = JSON.stringify(testCase);
        
//                 // Update the array with the parsed object
//                 testCases[index] = jsonObject;
        
//                 console.log(`Successfully parsed element at index ${index}:`, jsonObject);
//             } catch (error) {
//                 console.error(`Error parsing element at index ${index}:`, error.message);
//             }
//         });

//         const testCasesData = {questionId, testCases}; 
        
//         // save the testCases
//         try {

//             const response2 = await axios.post('http://localhost:8082/api/add-testcases', testCasesData, {
//               headers: {
//                 // 'Content-Type': 'multipart/form-data',
//                 'Content-Type': 'application/json',
//               },
//             });
      
//             console.log('API Response:', response2.data);
//         } 
//         catch (error) {
//             console.error('Error adding question:', error);
//         }

//     }



//     return (
//         <div >
//             <button onClick={addAllQuestion}>Add All Questions</button>
//         </div>
//     );

// }

// export default AddQuestion; 