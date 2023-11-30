import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import QuestionPage from './components/questionPage';
import AddQuestion from './components/addQuestion';



class Problem{
  constructor(id, title, problemStatement, constraints, examples, isSolved, tag){
    this.id = id;
    this.title = title;
    this.problemStatement = problemStatement;
    this.constraints = constraints;
    this.examples = examples;
    this.isSolved = isSolved;
    this.tag = tag;
  }
}


function App() {

  const problem1 = new Problem(1, "Weird Algorithm", "Consider an algorithm that takes as input a positive integer n. If n is even, the algorithm divides it by two, and if n is odd, the algorithm multiplies it by three and adds one. The algorithm repeats this, until n is one.\nYour task is to simulate the execution of the algorithm for a given value of n.", "1 <= n <= 1e6", {input: "3", output: "3 10 5 16 8 4 2 1"}, false, "Introductory"); 
  const problem2 = new Problem(2, "Missing Numbers", "You are given all numbers between 1,2,...,n except one. Your task is to find the missing number.", "2 <= n <= 2e5", {input: "5<br>2 3 1 5", output: "4"}, true, "Introductory"); 
  const problem3 = new Problem(3, "Repetitions", "You are given a DNA sequence: a string consisting of characters A, C, G, and T. Your task is to find the longest repetition in the sequence. This is a maximum-length substring containing only one type of character.", "1 <= n <= 1e6", {input:"ATTCGGGA", output: "3"}, false, "Introductory"); 
  const problem4 = new Problem(4, "Two Knights", "Your task is to count for k=1,2,...,n the number of ways two knights can be placed on a k X k chessboard so that they do not attack each other.", "1 <= n <= 10000", {input: "8", output:"6<br>28<br>96<br>252<br>550<br>1056<br>1848"}, false, "Introductory"); 
  const problem5 = new Problem(5, "Palindrome Reoder", "Given a string, your task is to reorder its letters in such a way that it becomes a palindrome (i.e., it reads the same forwards and backwards). Print a palindrome consisting of the characters of the original string. You may print any valid solution. If there are no solutions, print 'NO SOLUTION'.", "1 <= n <= 1e6", {input:"AAAACACBA", output: "AACABACAA"}, false, "Introductory"); 


  const problem6 = new Problem(6, "Subarray Sums I", "Given an array of n positive integers, your task is to count the number of subarrays having sum x. The first input line has two integers n and x: the size of the array and the target sum x.The next line has n integers a_1,a_2,...,a_n: the contents of the array. Print one integer: the required number of subarrays.", "1 <= n <= 2e5 <br> 1 <= x, a_i <= 1e9", {input:"5 7<br>2 4 1 2 7", output:"3"}, false, "Graphs"); 
  const problem7 = new Problem(7, "Nearest Smaller Values", "Given an array of n integers, your task is to find for each array position the nearest position to its left having a smaller value. The first input line has an integer n: the size of the array. The second line has n integers x_1,x_2,...,x_n: the array values. Print n integers: for each array position the nearest position with a smaller value. If there is no such position, print 0.", "1 <= n <= 2e5 <br> 1 <= x_i <= 1e9", {input:"8<br>2 5 1 4 8 3 2 5", output:"0 1 0 3 4 3 3 7"},false, "Graphs"); 
  const problem8 = new Problem(8, "Reading Books", "There are n books, and Kotivalo and Justiina are going to read them all. For each book, you know the time it takes to read it. They both read each book from beginning to end, and they cannot read a book at the same time. What is the minimum total time required? The first input line has an integer n: the number of books. The second line has n integers t_1,t_2,...,t_n: the time required to read each book. Print one integer: the minimum total time.", "1 <= n <= 2e5 <br> 1 <= t_i <= 1e9", {input:"3<br>2 8 3", output:"16"},false, "Graphs"); 
  const problem9 = new Problem(9, "", "asdasdasdasdasdasd", false, "Greedy"); 
  const problem10 = new Problem(10, "", "asdasdasdasdasdasd", false, "Trees"); 


  const problem11 = new Problem(11, "Dice Combinations", "Your task is to count the number of ways to construct sum n by throwing a dice one or more times. Each throw produces an outcome between 1 and  6. The only input line has an integer n. Print the number of ways modulo 10^9+7.", "1 <= n <= 1e6", {input: "3", output: "4"}, false, "Graphs"); 
  const problem12 = new Problem(12, "Minimizing Coins", "Consider a money system consisting of n coins. Each coin has a positive integer value. Your task is to produce a sum of money x using the available coins in such a way that the number of coins is minimal. For example, if the coins are \{1,5,7\} and the desired sum is 11, an optimal solution is 5+5+1 which requires 3 coins. The first input line has two integers n and x: the number of coins and the desired sum of money. The second line has n distinct integers c_1,c_2,...,c_n: the value of each coin. Print one integer: the minimum number of coins. If it is not possible to produce the desired sum, print -1.", "1 <= n <= 100 <br> 1 <= x <= 1e6 <br> 1 <= c_i <= 1e6", {input:"3 11<br>1 5 7", output:"3"}, false, "Graphs"); 
  const problem13 = new Problem(13, "Coin Combinations I", "Consider a money system consisting of n coins. Each coin has a positive integer value. Your task is to calculate the number of distinct ways you can produce a money sum x using the available coins. The first input line has two integers n and x: the number of coins and the desired sum of money. The second line has n distinct integers c_1,c_2,...,c_n: the value of each coin. Print one integer: the number of ways modulo 10^9+7.", "1 <= n <= 100 <br> 1 <= x <= 1e6 <br> 1 <= c_i <= 1e6", {input:"3 9<br>2 3 5", output:"8"}, false, "Graphs"); 
  const problem14 = new Problem(14, "", "asdasdasdasdasdasd", false, "Greedy"); 
  const problem15 = new Problem(15, "", "asdasdasdasdasdasd", false, "Trees"); 


  const problem16 = new Problem(16, "Counting Rooms", "You are given a map of a building, and your task is to count the number of its rooms. The size of the map is n \times m squares, and each square is either floor or wall. You can walk left, right, up, and down through the floor squares. The first input line has two integers n and m: the height and width of the map. Then there are n lines of m characters describing the map. Each character is either . (floor) or # (wall). Print one integer: the number of rooms.", "1 <= n, m <= 1000", {input:"5 8 <br> ######## <br> #..#...# <br> ####.#.# <br> #..#...# <br> ########", output:"3"}, false, "Graphs"); 
  const problem17 = new Problem(17, "Labyrinth", "You are given a map of a labyrinth, and your task is to find a path from start to end. You can walk left, right, up and down. The first input line has two integers n and m: the height and width of the map. Then there are n lines of m characters describing the labyrinth. Each character is . (floor), # (wall), A (start), or B (end). There is exactly one A and one B in the input. First print 'YES', if there is a path, and 'NO' otherwise. If there is a path, print the length of the shortest such path and its description as a string consisting of characters L (left), R (right), U (up), and D (down). You can print any valid solution.", "1 <= n, m <= 1000", {input:"5 8<br> ######## <br>#.A#...# <br> #.##.#B# <br> #......# <br>########", output: "YES<br>9<br>LDDRRRRRU"}, false, "Graphs"); 
  const problem18 = new Problem(18, "Building Roads", "Byteland has n cities, and m roads between them. The goal is to construct new roads so that there is a route between any two cities. Your task is to find out the minimum number of roads required, and also determine which roads should be built. The first input line has two integers n and m: the number of cities and roads. The cities are numbered 1,2,..,n. After that, there are m lines describing the roads. Each line has two integers a and b: there is a road between those cities. A road always connects two different cities, and there is at most one road between any two cities. First print an integer k: the number of required roads. Then, print k lines that describe the new roads. You can print any valid solution.", "1 <= n <= 1e5 <br> 1 <= m <= 2e5 <br> 1 <= a, b <= n", {input:"4 2 <br>1 2<br>3 4", output:"1 <br> 2 3"}, false, "Graphs"); 
  const problem19 = new Problem(19, "", "asdasdasdasdasdasd", false, "Greedy"); 
  const problem20 = new Problem(20, "", "asdasdasdasdasdasd", false, "Trees"); 


  const problem21 = new Problem(21, "", "asdasdasdasdasdasd", false, "Graphs"); 
  const problem22 = new Problem(22, "", "asdasdasdasdasdasd", true, "Graphs"); 
  const problem23 = new Problem(23, "", "asdasdasdasdasdasd", false, "Graphs"); 
  const problem24 = new Problem(24, "", "asdasdasdasdasdasd", false, "Greedy"); 
  const problem25 = new Problem(25, "", "asdasdasdasdasdasd", false, "Trees"); 


  const problems = {
    problem1, problem2, problem3, problem4, problem5,
    problem6, problem7, problem8, problem9, problem10,
    problem11, problem12, problem13, problem14, problem15,
    problem16, problem17, problem18, problem19, problem20,
    problem21, problem22, problem23, problem24, problem25
  };
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard problems={problems}/>} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/question-page/1" element={<QuestionPage problem={problem1}/>} />
          <Route path="/question-page/2" element={<QuestionPage problem={problem2}/>} />
          <Route path="/question-page/3" element={<QuestionPage problem={problem3}/>} />
          <Route path="/question-page/4" element={<QuestionPage problem={problem4}/>} />
          <Route path="/question-page/5" element={<QuestionPage problem={problem5}/>} />

          <Route path="/question-page/6" element={<QuestionPage problem={problem6}/>} />
          <Route path="/question-page/7" element={<QuestionPage problem={problem7}/>} />
          <Route path="/question-page/8" element={<QuestionPage problem={problem8}/>} />
          <Route path="/question-page/9" element={<QuestionPage problem={problem9}/>} />
          <Route path="/question-page/10" element={<QuestionPage problem={problem10}/>} />

          <Route path="/question-page/11" element={<QuestionPage problem={problem11}/>} />
          <Route path="/question-page/12" element={<QuestionPage problem={problem12}/>} />
          <Route path="/question-page/13" element={<QuestionPage problem={problem13}/>} />
          <Route path="/question-page/14" element={<QuestionPage problem={problem14}/>} />
          <Route path="/question-page/15" element={<QuestionPage problem={problem15}/>} />

          <Route path="/question-page/16" element={<QuestionPage problem={problem16}/>} />
          <Route path="/question-page/17" element={<QuestionPage problem={problem17}/>} />
          <Route path="/question-page/18" element={<QuestionPage problem={problem18}/>} />
          <Route path="/question-page/19" element={<QuestionPage problem={problem19}/>} />
          <Route path="/question-page/20" element={<QuestionPage problem={problem20}/>} />

          <Route path="/question-page/21" element={<QuestionPage problem={problem21}/>} />
          <Route path="/question-page/22" element={<QuestionPage problem={problem22}/>} />
          <Route path="/question-page/23" element={<QuestionPage problem={problem23}/>} />
          <Route path="/question-page/24" element={<QuestionPage problem={problem24}/>} />
          <Route path="/question-page/25" element={<QuestionPage problem={problem25}/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
