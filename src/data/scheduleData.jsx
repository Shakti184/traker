export const phasesData = [
  {
    id: 'phase1',
    title: 'DSA & Coding',
    subtitle: 'Algorithms, LeetCode, and Machine Coding.'
  },
  {
    id: 'phase2',
    title: 'Backend',
    subtitle: 'Spring Boot, Kafka, Redis, and APIs.'
  },
  {
    id: 'phase3',
    title: 'Cloud',
    subtitle: 'Azure, CI/CD, Containers, and DevOps.'
  },
  {
    id: 'phase4',
    title: 'System Design',
    subtitle: 'LLD, HLD, and Architecture Interviews.'
  },
  {
    id: 'phase5',
    title: 'AI & GenAI',
    subtitle: 'ML, LLMs, RAG, Agents, and MLOps.'
  }
];

/**
 * Generates the granular, day-by-day tracking data.
 * Includes Phase 1, Phase 2, Phase 3, and the newly integrated Phase 4.
 */
export const generateTrackerData = () => {
  return [
// ==========================================
// PHASE 1: WEEK 1 - Arrays, Matrices & Strings (14 Problems)
// ==========================================

{
  id: 'p1-w1-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 1 - Task-1',
  topic: 'Array Hashing & State Tracking',
  directive: 'Solve "Two Sum" and "Group Anagrams". For SDE 2, focus on hash map internals (load factors, collisions). For Group Anagrams, optimize the hashing key using character counts instead of sorting to achieve strictly O(N*K) time.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/two-sum/',
    'https://leetcode.com/problems/group-anagrams/'
  ]
},
{
  id: 'p1-w1-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 1 - Task-2',
  topic: 'Sequence & Validation Systems',
  directive: 'Solve "Longest Consecutive Sequence" and "Valid Sudoku". Prioritize O(N) execution by leveraging HashSet properties. Understand memory overhead limits of object allocation in Java/C#.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/longest-consecutive-sequence/',
    'https://leetcode.com/problems/valid-sudoku/'
  ]
},
{
  id: 'p1-w1-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 1 - Task-3',
  topic: 'Math Operations & Randomized Structures',
  directive: 'Solve "Product of Array Except Self" and "Insert Delete GetRandom O(1)". Achieve O(N) time without division for the first. For the second, architect a system coupling a HashMap with an ArrayList to allow O(1) eviction.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/product-of-array-except-self/',
    'https://leetcode.com/problems/insert-delete-getrandom-o1/'
  ]
},
{
  id: 'p1-w1-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 1 - Task-4',
  topic: 'In-Place Matrix Transformations',
  directive: 'Solve "Spiral Matrix" and "Rotate Image". Master O(1) space constraints. For Rotate Image, implement the transpose-then-reverse matrix mathematical approach rather than brute forcing layer by layer.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/spiral-matrix/',
    'https://leetcode.com/problems/rotate-image/'
  ]
},
{
  id: 'p1-w1-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 1 - Task-5',
  topic: 'State Machine emulation on 2D Grids',
  directive: 'Solve "Set Matrix Zeroes" and "Game of Life". Utilize the first row/column as state indicators to achieve O(1) space. For Game of Life, use bit manipulation to track previous and next states simultaneously.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/set-matrix-zeroes/',
    'https://leetcode.com/problems/game-of-life/'
  ]
},
{
  id: 'p1-w1-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 1 - Task-6',
  topic: 'String Expansion & Palindromes',
  directive: 'Solve "Longest Palindromic Substring" and "Palindromic Substrings". Implement the "Expand Around Center" technique. Discuss Manacher’s Algorithm O(N) theoretically as a scale-up strategy.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/longest-palindromic-substring/',
    'https://leetcode.com/problems/palindromic-substrings/'
  ]
},
{
  id: 'p1-w1-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 1 - Task-7',
  topic: 'Continuous Frequency Matching',
  directive: 'Solve "Find All Anagrams in a String" and "Subarray Sum Equals K". Bridge strings and arrays via frequency maps. Understand cumulative sums and prefix hashing to eliminate nested iterations.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
    'https://leetcode.com/problems/subarray-sum-equals-k/'
  ]
},

// ==========================================
// PHASE 1: WEEK 2 - Pointers, Sliding Window & Binary Search (14 Problems)
// ==========================================

{
  id: 'p1-w2-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 2 - Task-1',
  topic: 'Multi-Pointer Optimization',
  directive: 'Solve "3Sum" and "Container With Most Water". Bypass O(N^3) and O(N^2) brute forces. Focus heavily on avoiding duplicate triplets natively without relying on a slow HashSet.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/3sum/',
    'https://leetcode.com/problems/container-with-most-water/'
  ]
},
{
  id: 'p1-w2-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 2 - Task-2',
  topic: 'Advanced Bounding & Lexicography',
  directive: 'Solve "Trapping Rain Water" and "Next Permutation". For Trapping Rain Water, graduate from the O(N) space array approach to the ultimate O(1) space two-pointer approach tracking absolute maximums.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/trapping-rain-water/',
    'https://leetcode.com/problems/next-permutation/'
  ]
},
{
  id: 'p1-w2-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 2 - Task-3',
  topic: 'Sliding Window Basics',
  directive: 'Solve "Best Time to Buy and Sell Stock" and "Longest Substring Without Repeating Characters". Treat these as streaming data problems where state must be maintained across a dynamic time window.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
  ]
},
{
  id: 'p1-w2-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 2 - Task-4',
  topic: 'Dynamic Window Resizing',
  directive: 'Solve "Longest Repeating Character Replacement" and "Permutation in String". Utilize an array of size 26 as an O(1) space hash map to instantly evaluate character frequencies inside the window.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/longest-repeating-character-replacement/',
    'https://leetcode.com/problems/permutation-in-string/'
  ]
},
{
  id: 'p1-w2-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 2 - Task-5',
  topic: 'Hard Sliding Window Architectures',
  directive: 'Solve "Minimum Window Substring" and "Sliding Window Maximum". Discard O(N*K) approaches. Implement a Monotonic Deque for the latter to store descending potential maximums strictly in O(N).',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/minimum-window-substring/',
    'https://leetcode.com/problems/sliding-window-maximum/'
  ]
},
{
  id: 'p1-w2-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 2 - Task-6',
  topic: 'Binary Search on Rotated Architectures',
  directive: 'Solve "Search in Rotated Sorted Array" and "Find Minimum in Rotated Sorted Array". Identify the inflection point via strict log(N) constraints. Ensure edge cases (size 1, size 2) don’t cause infinite loops.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'
  ]
},
{
  id: 'p1-w2-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 2 - Task-7',
  topic: 'Binary Search in Advanced Data Models',
  directive: 'Solve "Search a 2D Matrix" and "Median of Two Sorted Arrays". The Median problem requires partitioning two arrays simultaneously—a frequent Google/Amazon SDE 2 litmus test.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/search-a-2d-matrix/',
    'https://leetcode.com/problems/median-of-two-sorted-arrays/'
  ]
},

// ==========================================
// PHASE 1: WEEK 3 - Stacks, Queues, & Advanced Linked Lists (14 Problems)
// ==========================================

{
  id: 'p1-w3-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 3 - Task-1',
  topic: 'Stack Memory & AST Execution',
  directive: 'Solve "Min Stack" and "Evaluate Reverse Polish Notation". Emulate memory allocation and abstract syntax tree evaluations. For Min Stack, don\'t use built-in tuples; create a native Node wrapper class.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/min-stack/',
    'https://leetcode.com/problems/evaluate-reverse-polish-notation/'
  ]
},
{
  id: 'p1-w3-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 3 - Task-2',
  topic: 'Monotonic Stacks',
  directive: 'Solve "Daily Temperatures" and "Car Fleet". Map out how a monotonically decreasing stack automatically maintains physical state (time/distance) barriers for subsequent fleet merging.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/daily-temperatures/',
    'https://leetcode.com/problems/car-fleet/'
  ]
},
{
  id: 'p1-w3-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 3 - Task-3',
  topic: 'Hard Monotonic Geometry',
  directive: 'Solve "Largest Rectangle in Histogram" and "Maximal Rectangle". Use the Monotonic Stack to track strict bounds. Layer the 1D histogram solution progressively across a 2D matrix for Maximal Rectangle.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    'https://leetcode.com/problems/maximal-rectangle/'
  ]
},
{
  id: 'p1-w3-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 3 - Task-4',
  topic: 'Deep Linked List Mutability',
  directive: 'Solve "Reverse Linked List II" and "Copy List with Random Pointer". Focus on pointer safety. Master the O(1) space interweaving technique for the Random Pointer problem instead of a HashMap.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/reverse-linked-list-ii/',
    'https://leetcode.com/problems/copy-list-with-random-pointer/'
  ]
},
{
  id: 'p1-w3-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 3 - Task-5',
  topic: 'Cache Architecture (LLD Preparation)',
  directive: 'Solve "LRU Cache" and "LFU Cache". Build the Doubly Linked List manually. For LFU, engineer a multi-layered structure with two HashMaps and a custom DLL to lock down absolute O(1) latency.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/lru-cache/',
    'https://leetcode.com/problems/lfu-cache/'
  ]
},
{
  id: 'p1-w3-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 3 - Task-6',
  topic: 'Complex List Transformations',
  directive: 'Solve "Merge K Sorted Lists" and "Reverse Nodes in k-Group". Implement O(N log K) merging using a Priority Queue. Handle detachment/reattachment seamlessly to avoid cyclic references.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/merge-k-sorted-lists/',
    'https://leetcode.com/problems/reverse-nodes-in-k-group/'
  ]
},
{
  id: 'p1-w3-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 3 - Task-7',
  topic: 'System Level Queue Emulation',
  directive: 'Solve "Design Circular Queue" and "Design Hit Counter". Map array indices modulo queue capacity to ensure lock-free ring buffer dynamics. (For Hit Counter, simulate time-bucket compression).',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/design-circular-queue/',
    'https://leetcode.com/problems/design-hit-counter/'
  ]
},

// ==========================================
// PHASE 1: WEEK 4 - Trees, Graphing & Tries (14 Problems)
// ==========================================

{
  id: 'p1-w4-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 4 - Task-1',
  topic: 'Tree Serialization & Global Tracking',
  directive: 'Solve "Binary Tree Maximum Path Sum" and "Serialize and Deserialize Binary Tree". Bridge algorithmic DFS tracking (via global/ref variables) with string parsing and object reconstruction.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/'
  ]
},
{
  id: 'p1-w4-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 4 - Task-2',
  topic: 'Structural Reconstruction & Genealogy',
  directive: 'Solve "Construct Binary Tree from Preorder and Inorder Traversal" and "Lowest Common Ancestor of a Binary Tree". Pass pointer boundaries down recursive stacks rather than array slices to optimize memory.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/'
  ]
},
{
  id: 'p1-w4-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 4 - Task-3',
  topic: 'Graphing Binary Trees',
  directive: 'Solve "Binary Tree Right Side View" and "All Nodes Distance K in Binary Tree". Treat the Tree as an undirected Graph for Distance K by mapping parent pointers via DFS before initiating a BFS ripple.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/binary-tree-right-side-view/',
    'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/'
  ]
},
{
  id: 'p1-w4-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 4 - Task-4',
  topic: 'Binary Search Tree Constraints',
  directive: 'Solve "Validate Binary Search Tree" and "Kth Smallest Element in a BST". Maintain absolute strictness of Long.MIN_VALUE and Long.MAX_VALUE bounds during validation. Use iterative Inorder for Kth element.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/validate-binary-search-tree/',
    'https://leetcode.com/problems/kth-smallest-element-in-a-bst/'
  ]
},
{
  id: 'p1-w4-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 4 - Task-5',
  topic: 'BST Node Reallocation',
  directive: 'Solve "Inorder Successor in BST" and "Recover Binary Search Tree". Detect anomalous structural swaps using O(1) space Morris Traversal to prove extreme low-level node manipulation mastery.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/inorder-successor-in-bst/',
    'https://leetcode.com/problems/recover-binary-search-tree/'
  ]
},
{
  id: 'p1-w4-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 4 - Task-6',
  topic: 'Prefix Trees (Tries) Implementation',
  directive: 'Solve "Implement Trie (Prefix Tree)" and "Design Add and Search Words Data Structure". Architect the TrieNode structure precisely. Support dot (.) wildcard backtracking recursively within the Trie.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/implement-trie-prefix-tree/',
    'https://leetcode.com/problems/design-add-and-search-words-data-structure/'
  ]
},
{
  id: 'p1-w4-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 4 - Task-7',
  topic: 'Advanced Trie & Bitwise Navigation',
  directive: 'Solve "Word Search II" and "Maximum XOR of Two Numbers in an Array". Couple backtracking grids with a Trie for simultaneous prefix elimination. Use a Bit-Trie to find max XOR paths.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/word-search-ii/',
    'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/'
  ]
},

// ==========================================
// PHASE 1: WEEK 5 - Heaps, Intervals & Greedy Approaches (14 Problems)
// ==========================================

{
  id: 'p1-w5-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 5 - Task-1',
  topic: 'Priority Queue Optimization',
  directive: 'Solve "Kth Largest Element in an Array" and "Top K Frequent Elements". Implement both via Heap and Quickselect to contrast worst-case O(N^2) against guaranteed O(N log K).',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    'https://leetcode.com/problems/top-k-frequent-elements/'
  ]
},
{
  id: 'p1-w5-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 5 - Task-2',
  topic: 'Data Streams & CPU Emulation',
  directive: 'Solve "Find Median from Data Stream" and "Task Scheduler". Structure a synchronized Min-Max Heap pair for real-time median processing. Use idle-slot math for CPU scheduling.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/find-median-from-data-stream/',
    'https://leetcode.com/problems/task-scheduler/'
  ]
},
{
  id: 'p1-w5-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 5 - Task-3',
  topic: 'Chronological Sweep Line Algorithms',
  directive: 'Solve "Meeting Rooms II" and "Minimum Number of Refueling Stops". Master chronological event tracking via sweep line patterns and continuous greedy heap re-evaluation.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/meeting-rooms-ii/',
    'https://leetcode.com/problems/minimum-number-of-refueling-stops/'
  ]
},
{
  id: 'p1-w5-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 5 - Task-4',
  topic: 'Interval Collisions',
  directive: 'Solve "Merge Intervals" and "Insert Interval". Focus on sorting by start times. Handle completely enclosed intervals safely. Keep code modular enough that new interval objects could be injected.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/merge-intervals/',
    'https://leetcode.com/problems/insert-interval/'
  ]
},
{
  id: 'p1-w5-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 5 - Task-5',
  topic: 'Interval Pruning & Greedy Selection',
  directive: 'Solve "Non-overlapping Intervals" and "Minimum Number of Arrows to Burst Balloons". Shift focus to sorting by END times. Recognize why greedy earliest-end-time guarantees global optimums.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/non-overlapping-intervals/',
    'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/'
  ]
},
{
  id: 'p1-w5-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 5 - Task-6',
  topic: 'Greedy State Tracking',
  directive: 'Solve "Jump Game" and "Jump Game II". Traverse from the end backwards, or maintain an ongoing mathematical window of `farthestJump` to reduce an O(N^2) DP to an O(N) Greedy algorithm.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/jump-game/',
    'https://leetcode.com/problems/jump-game-ii/'
  ]
},
{
  id: 'p1-w5-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 5 - Task-7',
  topic: 'Continuous Cyclic Greedy Scenarios',
  directive: 'Solve "Gas Station" and "Hand of Straights". Understand cyclic invariants (if total gas > cost, a path exists). Use a TreeMap for Straights to guarantee sequential card selection.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/gas-station/',
    'https://leetcode.com/problems/hand-of-straights/'
  ]
},

// ==========================================
// PHASE 1: WEEK 6 - Graphs, Connectivity & Topo Sort (14 Problems)
// ==========================================

{
  id: 'p1-w6-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 6 - Task-1',
  topic: 'Graph Instantiation & Cycle Detection',
  directive: 'Solve "Clone Graph" and "Course Schedule". Prevent deep copy cycles using a HashMap to store visited objects. Implement DFS path-visit arrays to detect topological cycles natively.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/clone-graph/',
    'https://leetcode.com/problems/course-schedule/'
  ]
},
{
  id: 'p1-w6-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 6 - Task-2',
  topic: 'Kahn’s Algorithm & Disjoint Sets',
  directive: 'Solve "Course Schedule II" and "Redundant Connection". Fully construct Adjacency Lists and In-Degree maps. Implement a robust Union-Find with Path Compression and Union by Rank.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/course-schedule-ii/',
    'https://leetcode.com/problems/redundant-connection/'
  ]
},
{
  id: 'p1-w6-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 6 - Task-3',
  topic: 'Grid BFS/DFS Mutations',
  directive: 'Solve "Number of Islands" and "Max Area of Island". Mutate the matrix in-place to save O(N) visited array space if interviewer allows, otherwise implement strict decoupled tracking arrays.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/number-of-islands/',
    'https://leetcode.com/problems/max-area-of-island/'
  ]
},
{
  id: 'p1-w6-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 6 - Task-4',
  topic: 'Multi-Source BFS Expansions',
  directive: 'Solve "Rotting Oranges" and "01 Matrix". Avoid single-source O(N^2) delays by enqueuing all initial sources (rotten/zeros) into the BFS queue simultaneously to simulate uniform outward ripple effects.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/rotting-oranges/',
    'https://leetcode.com/problems/01-matrix/'
  ]
},
{
  id: 'p1-w6-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 6 - Task-5',
  topic: 'Implicit Graph Spaces',
  directive: 'Solve "Word Ladder" and "Shortest Path in Binary Matrix". Optimize Word Ladder drastically by replacing sequential string comparisons with a dynamic 26-character wildcard alphabet swap loop.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/word-ladder/',
    'https://leetcode.com/problems/shortest-path-in-binary-matrix/'
  ]
},
{
  id: 'p1-w6-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 6 - Task-6',
  topic: 'Dijkstra’s Algorithm & Weighted Paths',
  directive: 'Solve "Network Delay Time" and "Cheapest Flights Within K Stops". Implement Dijkstra’s using a Priority Queue. Adapt the logic for flights to halt exploration if `stops > k` rather than pure distance.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/network-delay-time/',
    'https://leetcode.com/problems/cheapest-flights-within-k-stops/'
  ]
},
{
  id: 'p1-w6-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 6 - Task-7',
  topic: 'Hard Graph Vulnerability Analysis',
  directive: 'Solve "Alien Dictionary" and "Critical Connections in a Network". Implement Tarjan’s Algorithm for Critical Connections to isolate network bridges in O(V+E) time by tracking discovery and low-link tiers.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/alien-dictionary/',
    'https://leetcode.com/problems/critical-connections-in-a-network/'
  ]
},

// ==========================================
// PHASE 1: WEEK 7 - Backtracking & Dynamic Programming (14 Problems)
// ==========================================

{
  id: 'p1-w7-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 7 - Task-1',
  topic: 'Combinatorial State Spaces',
  directive: 'Solve "Permutations" and "Subsets". Grasp the template for backtracking: Choose, Explore, Un-choose. Emphasize object reference safety (copying lists before adding to results).',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/permutations/',
    'https://leetcode.com/problems/subsets/'
  ]
},
{
  id: 'p1-w7-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 7 - Task-2',
  topic: 'Bounded Branch Explorations',
  directive: 'Solve "Combination Sum" and "Word Search". Implement early-stopping mechanisms. For Word Search, toggle the grid cell in-place to mark visited paths without allocating a new visited matrix.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/combination-sum/',
    'https://leetcode.com/problems/word-search/'
  ]
},
{
  id: 'p1-w7-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 7 - Task-3',
  topic: 'Heavy Backtracking Constraints',
  directive: 'Solve "N-Queens" and "Sudoku Solver". Construct decoupled validator functions. Utilize Bitmasking (or HashSets) to instantly verify column, diagonal, and block safety.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/n-queens/',
    'https://leetcode.com/problems/sudoku-solver/'
  ]
},
{
  id: 'p1-w7-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 7 - Task-4',
  topic: '1D State DP Patterns',
  directive: 'Solve "House Robber II" and "Decode Ways". Compress DP arrays down to O(1) space tracking just `prev1` and `prev2`. Handle cyclic connections conceptually by running the DP logic twice.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/house-robber-ii/',
    'https://leetcode.com/problems/decode-ways/'
  ]
},
{
  id: 'p1-w7-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 7 - Task-5',
  topic: 'Combinatorial DP & Substring Verification',
  directive: 'Solve "Coin Change" and "Word Break". Differentiate between Unbounded Knapsack structures and string partitioning memoization techniques.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/coin-change/',
    'https://leetcode.com/problems/word-break/'
  ]
},
{
  id: 'p1-w7-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 7 - Task-6',
  topic: 'Subsequence vs Substring Formats',
  directive: 'Solve "Longest Increasing Subsequence" and "Palindrome Partitioning II". For LIS, bypass the standard O(N^2) DP loop and implement the precise O(N log N) binary search override method.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/longest-increasing-subsequence/',
    'https://leetcode.com/problems/palindrome-partitioning-ii/'
  ]
},
{
  id: 'p1-w7-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 7 - Task-7',
  topic: 'Complex 2D DP Matrices',
  directive: 'Solve "Edit Distance" and "Burst Balloons". Formulate standard Levenshtein distance 2D tables, then tackle the extreme Divide & Conquer matrix manipulation required for Balloons.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/edit-distance/',
    'https://leetcode.com/problems/burst-balloons/'
  ]
},

// ==========================================
// PHASE 1: WEEK 8 - Machine Coding & LLD Capstones (2 Problems)
// ==========================================

{
  id: 'p1-w8-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 8 - Task-1',
  topic: 'LLD Machine Coding: Edge/Graph Compressor (Splitwise)',
  directive: '90-Minute Timed Run: Architect Splitwise in pure Java/C#. Embed the exact/percentage strategies via interfaces. Implement a greedy debt simplification algorithm to compress transitive edges dynamically.',
  isCompleted: false,
  notes: '',
  links: [
    'https://github.com/prasadgujar/low-level-design-primer/blob/master/solutions.md?plain=1'
  ]
},
{
  id: 'p1-w8-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 8 - Task-2',
  topic: 'LLD Machine Coding: Concurrency & Locks (BookMyShow)',
  directive: '90-Minute Timed Run: Architect a Movie Booking System. Structure multi-layered DB schema equivalents (Cities, Theatres, Screens, Seats). Apply synchronized blocks or ReentrantLocks to prevent booking collisions.',
  isCompleted: false,
  notes: '',
  links: [
    'https://github.com/dipjul/machine-coding-round'
  ]
},

// ==========================================
// PHASE 1: WEEK 9 - Advanced Arrays & Sliding Window
// ==========================================

{
  id: 'p1-w9-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 9 - Task-1',
  topic: 'Advanced Hashing',
  directive: 'Solve "Contains Duplicate" and "First Missing Positive". Master O(N) hashing and in-place index mapping techniques.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/contains-duplicate/',
    'https://leetcode.com/problems/first-missing-positive/'
  ]
},
{
  id: 'p1-w9-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 9 - Task-2',
  topic: 'Frequency Windows',
  directive: 'Solve "Fruit Into Baskets" and "Max Consecutive Ones III". Practice dynamic sliding windows with frequency tracking.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/fruit-into-baskets/',
    'https://leetcode.com/problems/max-consecutive-ones-iii/'
  ]
},
{
  id: 'p1-w9-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 9 - Task-3',
  topic: 'Hard Sliding Window',
  directive: 'Solve "Subarrays with K Different Integers". Learn the at-most-K trick for exact-K problems.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/subarrays-with-k-different-integers/'
  ]
},
{
  id: 'p1-w9-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 9 - Task-4',
  topic: 'Monotonic Structures',
  directive: 'Solve "Longest Continuous Subarray with Absolute Difference Less Than or Equal to Limit". Combine deques with sliding windows.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/'
  ]
},
{
  id: 'p1-w9-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 9 - Task-5',
  topic: 'Interview Mix',
  directive: 'Solve "Maximum Subarray" and "Maximum Product Subarray". Compare Kadane’s algorithm with product tracking.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/maximum-subarray/',
    'https://leetcode.com/problems/maximum-product-subarray/'
  ]
},
{
  id: 'p1-w9-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 9 - Task-6',
  topic: 'Array Challenge',
  directive: 'Solve "Shortest Unsorted Continuous Subarray". Practice prefix/suffix boundary reasoning.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/shortest-unsorted-continuous-subarray/'
  ]
},
{
  id: 'p1-w9-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 9 - Task-7',
  topic: 'Weekly Mock',
  directive: 'Complete a 90-minute mock using any three medium problems from this week.',
  isCompleted: false,
  notes: '',
  links: []
},

// ==========================================
// PHASE 1: WEEK 10 - Stack, Queue & Parsing
// ==========================================

{
  id: 'p1-w10-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 10 - Task-1',
  topic: 'Expression Evaluation',
  directive: 'Solve "Basic Calculator II" and "Decode String". Learn stack-based parsing.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/basic-calculator-ii/',
    'https://leetcode.com/problems/decode-string/'
  ]
},
{
  id: 'p1-w10-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 10 - Task-2',
  topic: 'Monotonic Stack',
  directive: 'Solve "Asteroid Collision" and "Remove K Digits". Master greedy stack removals.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/asteroid-collision/',
    'https://leetcode.com/problems/remove-k-digits/'
  ]
},
{
  id: 'p1-w10-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 10 - Task-3',
  topic: 'Queue Simulation',
  directive: 'Solve "Dota2 Senate". Practice queue-based simulations.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/dota2-senate/'
  ]
},
{
  id: 'p1-w10-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 10 - Task-4',
  topic: 'Stack Design',
  directive: 'Solve "Maximum Frequency Stack". Combine HashMap with Stack behavior.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/maximum-frequency-stack/'
  ]
},
{
  id: 'p1-w10-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 10 - Task-5',
  topic: 'String Parsing',
  directive: 'Solve "Simplify Path". Build canonical paths using stacks.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/simplify-path/'
  ]
},
{
  id: 'p1-w10-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 10 - Task-6',
  topic: 'Parentheses',
  directive: 'Solve "Longest Valid Parentheses". Learn stack vs DP approaches.',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/longest-valid-parentheses/'
  ]
},
{
  id: 'p1-w10-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 10 - Task-7',
  topic: 'Weekly Mock',
  directive: 'Complete three timed stack/queue problems.',
  isCompleted: false,
  notes: '',
  links: []
},

// ==========================================
// PHASE 1: WEEK 11 - Advanced Trees
// ==========================================

{
  id: 'p1-w11-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 11 - Task-1',
  topic: 'Tree Paths',
  directive: 'Solve "Path Sum III" and "Diameter of Binary Tree".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/path-sum-iii/',
    'https://leetcode.com/problems/diameter-of-binary-tree/'
  ]
},
{
  id: 'p1-w11-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 11 - Task-2',
  topic: 'Tree Views',
  directive: 'Solve "Vertical Order Traversal".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/'
  ]
},
{
  id: 'p1-w11-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 11 - Task-3',
  topic: 'Boundary Traversal',
  directive: 'Solve "Boundary of Binary Tree".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/boundary-of-binary-tree/'
  ]
},
{
  id: 'p1-w11-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 11 - Task-4',
  topic: 'BST Design',
  directive: 'Solve "Convert BST to Greater Tree".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/convert-bst-to-greater-tree/'
  ]
},
{
  id: 'p1-w11-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 11 - Task-5',
  topic: 'Tree Construction',
  directive: 'Solve "Construct Binary Tree from Inorder and Postorder Traversal".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/'
  ]
},
{
  id: 'p1-w11-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 11 - Task-6',
  topic: 'Hard Tree',
  directive: 'Solve "House Robber III".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/house-robber-iii/'
  ]
},
{
  id: 'p1-w11-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 11 - Task-7',
  topic: 'Weekly Mock',
  directive: 'Solve three tree mediums under interview conditions.',
  isCompleted: false,
  notes: '',
  links: []
},

// ==========================================
// PHASE 1: WEEK 12 - Advanced Graphs
// ==========================================

{
  id: 'p1-w12-d1',
  phaseId: 'phase1',
  dayLabel: 'Week 12 - Task-1',
  topic: 'BFS State Graphs',
  directive: 'Solve "Bus Routes" and "Open the Lock".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/bus-routes/',
    'https://leetcode.com/problems/open-the-lock/'
  ]
},
{
  id: 'p1-w12-d2',
  phaseId: 'phase1',
  dayLabel: 'Week 12 - Task-2',
  topic: 'Shortest Paths',
  directive: 'Solve "Swim in Rising Water".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/swim-in-rising-water/'
  ]
},
{
  id: 'p1-w12-d3',
  phaseId: 'phase1',
  dayLabel: 'Week 12 - Task-3',
  topic: 'Minimum Spanning Tree',
  directive: 'Solve "Min Cost to Connect All Points".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/min-cost-to-connect-all-points/'
  ]
},
{
  id: 'p1-w12-d4',
  phaseId: 'phase1',
  dayLabel: 'Week 12 - Task-4',
  topic: 'Eulerian Path',
  directive: 'Solve "Reconstruct Itinerary".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/reconstruct-itinerary/'
  ]
},
{
  id: 'p1-w12-d5',
  phaseId: 'phase1',
  dayLabel: 'Week 12 - Task-5',
  topic: 'Union Find',
  directive: 'Solve "Accounts Merge".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/accounts-merge/'
  ]
},
{
  id: 'p1-w12-d6',
  phaseId: 'phase1',
  dayLabel: 'Week 12 - Task-6',
  topic: 'Advanced BFS',
  directive: 'Solve "Shortest Path Visiting All Nodes".',
  isCompleted: false,
  notes: '',
  links: [
    'https://leetcode.com/problems/shortest-path-visiting-all-nodes/'
  ]
},
{
  id: 'p1-w12-d7',
  phaseId: 'phase1',
  dayLabel: 'Week 12 - Task-7',
  topic: 'Weekly Mock',
  directive: 'Complete a 90-minute graph mock.',
  isCompleted: false,
  notes: '',
  links: []
},

    // ==========================================
// PHASE 2: WEEK 1 - Spring Boot Core & Internals
// ==========================================

{
  id: 'p2-w1-d1',
  phaseId: 'phase2',
  dayLabel: 'Week 1 - Task-1',
  topic: 'Spring Boot Auto-Configuration',
  directive: 'Master @SpringBootApplication, @EnableAutoConfiguration, @ComponentScan and @Configuration. Explain how Spring discovers auto-configurations.',
  isCompleted: false,
  notes: '',
  links: ['https://www.wecreateproblems.com/interview-questions/spring-boot-interview-questions']
},
{
  id: 'p2-w1-d2',
  phaseId: 'phase2',
  dayLabel: 'Week 1 - Task-2',
  topic: 'Bean Lifecycle',
  directive: 'Understand BeanFactory vs ApplicationContext. Implement BeanPostProcessor, @PostConstruct and @PreDestroy.',
  isCompleted: false,
  notes: '',
  links: ['https://www.hirist.tech/blog/top-40-spring-boot-interview-questions/']
},
{
  id: 'p2-w1-d3',
  phaseId: 'phase2',
  dayLabel: 'Week 1 - Task-3',
  topic: 'Dependency Injection',
  directive: 'Constructor vs Field vs Setter Injection. Explain circular dependency and lazy initialization.',
  isCompleted: false,
  notes: '',
  links: ['https://docs.spring.io/spring-framework/reference/core/beans/dependencies.html']
},
{
  id: 'p2-w1-d4',
  phaseId: 'phase2',
  dayLabel: 'Week 1 - Task-4',
  topic: 'Configuration Properties',
  directive: 'Implement @ConfigurationProperties and @Value. Handle environment profiles and property precedence.',
  isCompleted: false,
  notes: '',
  links: ['https://docs.spring.io/spring-boot/reference/features/external-config.html']
},
{
  id: 'p2-w1-d5',
  phaseId: 'phase2',
  dayLabel: 'Week 1 - Task-5',
  topic: 'REST Exception Handling',
  directive: 'Build @RestControllerAdvice with standardized error responses, validation errors and custom exceptions.',
  isCompleted: false,
  notes: '',
  links: ['https://www.baeldung.com/exception-handling-for-rest-with-spring']
},
{
  id: 'p2-w1-d6',
  phaseId: 'phase2',
  dayLabel: 'Week 1 - Task-6',
  topic: 'Actuator & Monitoring',
  directive: 'Expose health, metrics, info and custom endpoints. Explain production security considerations.',
  isCompleted: false,
  notes: '',
  links: ['https://docs.spring.io/spring-boot/reference/actuator/index.html']
},
{
  id: 'p2-w1-d7',
  phaseId: 'phase2',
  dayLabel: 'Week 1 - Task-7',
  topic: 'Spring Boot Mock Interview',
  directive: 'Answer 12 interview questions covering bean lifecycle, auto-configuration, dependency injection and Actuator.',
  isCompleted: false,
  notes: '',
  links: []
},

// ==========================================
// PHASE 2: WEEK 2 - Spring Data JPA & Hibernate
// ==========================================

{
  id:'p2-w2-d1',
  phaseId:'phase2',
  dayLabel:'Week 2 - Task-1',
  topic:'Hibernate Entity Lifecycle',
  directive:'Explain Transient, Persistent, Detached and Removed states with EntityManager examples.',
  isCompleted:false,
  notes:'',
  links:['https://docs.hibernate.org/orm/current/userguide/html_single/Hibernate_User_Guide.html']
},
{
  id:'p2-w2-d2',
  phaseId:'phase2',
  dayLabel:'Week 2 - Task-2',
  topic:'Fetch Types',
  directive:'Solve N+1 Query problems using JOIN FETCH, EntityGraph and Batch Fetching.',
  isCompleted:false,
  notes:'',
  links:['https://www.baeldung.com/spring-hibernate-n1-problem']
},
{
  id:'p2-w2-d3',
  phaseId:'phase2',
  dayLabel:'Week 2 - Task-3',
  topic:'Transactions',
  directive:'Understand @Transactional propagation, isolation levels and rollback behavior.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-framework/reference/data-access/transaction.html']
},
{
  id:'p2-w2-d4',
  phaseId:'phase2',
  dayLabel:'Week 2 - Task-4',
  topic:'Optimistic vs Pessimistic Locking',
  directive:'Implement @Version and database locks. Explain race-condition scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://www.baeldung.com/jpa-optimistic-locking']
},
{
  id:'p2-w2-d5',
  phaseId:'phase2',
  dayLabel:'Week 2 - Task-5',
  topic:'Repository Design',
  directive:'Compare CrudRepository, JpaRepository and custom repositories.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-data/jpa/reference/']
},
{
  id:'p2-w2-d6',
  phaseId:'phase2',
  dayLabel:'Week 2 - Task-6',
  topic:'Pagination & Specifications',
  directive:'Build dynamic filters using Specification API with sorting and pagination.',
  isCompleted:false,
  notes:'',
  links:['https://www.baeldung.com/rest-api-search-language-spring-data-specifications']
},
{
  id:'p2-w2-d7',
  phaseId:'phase2',
  dayLabel:'Week 2 - Task-7',
  topic:'JPA Interview Round',
  directive:'Answer 10 Hibernate interview questions including lazy loading, transactions, locking and entity lifecycle.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 2: WEEK 3 - Spring Security
// ==========================================

{
  id:'p2-w3-d1',
  phaseId:'phase2',
  dayLabel:'Week 3 - Task-1',
  topic:'Security Filter Chain',
  directive:'Replace WebSecurityConfigurerAdapter with SecurityFilterChain configuration.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-security/reference/']
},
{
  id:'p2-w3-d2',
  phaseId:'phase2',
  dayLabel:'Week 3 - Task-2',
  topic:'JWT Authentication',
  directive:'Generate, validate and refresh JWT tokens. Explain stateless authentication.',
  isCompleted:false,
  notes:'',
  links:['https://jwt.io/introduction']
},
{
  id:'p2-w3-d3',
  phaseId:'phase2',
  dayLabel:'Week 3 - Task-3',
  topic:'OAuth2',
  directive:'Implement OAuth2 login using Google or GitHub and compare OAuth2 with JWT.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-security/reference/servlet/oauth2/']
},
{
  id:'p2-w3-d4',
  phaseId:'phase2',
  dayLabel:'Week 3 - Task-4',
  topic:'Method Security',
  directive:'Secure APIs using @PreAuthorize, roles and permissions.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html']
},
{
  id:'p2-w3-d5',
  phaseId:'phase2',
  dayLabel:'Week 3 - Task-5',
  topic:'Password Security',
  directive:'Implement BCrypt hashing and explain why passwords should never be encrypted.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html']
},
{
  id:'p2-w3-d6',
  phaseId:'phase2',
  dayLabel:'Week 3 - Task-6',
  topic:'Security Best Practices',
  directive:'CSRF, CORS, session fixation and refresh-token interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-security/reference/features/exploits.html']
},
{
  id:'p2-w3-d7',
  phaseId:'phase2',
  dayLabel:'Week 3 - Task-7',
  topic:'Security Mock Interview',
  directive:'Answer 10 Spring Security interview questions covering JWT, OAuth2 and authorization.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 2: WEEK 4 - WebFlux
// ==========================================

{
  id:'p2-w4-d1',
  phaseId:'phase2',
  dayLabel:'Week 4 - Task-1',
  topic:'Reactive Programming',
  directive:'Understand Mono, Flux and backpressure using Project Reactor.',
  isCompleted:false,
  notes:'',
  links:['https://projectreactor.io/docs']
},
{
  id:'p2-w4-d2',
  phaseId:'phase2',
  dayLabel:'Week 4 - Task-2',
  topic:'WebFlux vs MVC',
  directive:'Compare Servlet threads vs Event Loop architecture with interview diagrams.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-framework/reference/web/webflux.html']
},
{
  id:'p2-w4-d3',
  phaseId:'phase2',
  dayLabel:'Week 4 - Task-3',
  topic:'WebClient',
  directive:'Replace RestTemplate with WebClient. Aggregate two APIs concurrently.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-framework/reference/web/webflux-webclient.html']
},
{
  id:'p2-w4-d4',
  phaseId:'phase2',
  dayLabel:'Week 4 - Task-4',
  topic:'Schedulers',
  directive:'Use subscribeOn, publishOn and parallel execution correctly.',
  isCompleted:false,
  notes:'',
  links:['https://projectreactor.io/docs']
},
{
  id:'p2-w4-d5',
  phaseId:'phase2',
  dayLabel:'Week 4 - Task-5',
  topic:'Reactive Error Handling',
  directive:'Handle timeout, retry and fallback using Reactor operators.',
  isCompleted:false,
  notes:'',
  links:['https://projectreactor.io/docs']
},
{
  id:'p2-w4-d6',
  phaseId:'phase2',
  dayLabel:'Week 4 - Task-6',
  topic:'WebFlux Interview',
  directive:'Answer 8 interview questions comparing blocking and non-blocking systems.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p2-w4-d7',
  phaseId:'phase2',
  dayLabel:'Week 4 - Task-7',
  topic:'Reactive Coding Challenge',
  directive:'Build a reactive endpoint calling three external services in parallel.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 2: WEEK 5 - Kafka
// ==========================================

{
  id:'p2-w5-d1',
  phaseId:'phase2',
  dayLabel:'Week 5 - Task-1',
  topic:'Kafka Architecture',
  directive:'Topics, partitions, brokers, KRaft and replication interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://kafka.apache.org/documentation/']
},
{
  id:'p2-w5-d2',
  phaseId:'phase2',
  dayLabel:'Week 5 - Task-2',
  topic:'Producer Reliability',
  directive:'Understand acks=all, retries, idempotent producers and durability.',
  isCompleted:false,
  notes:'',
  links:['https://kafka.apache.org/documentation/']
},
{
  id:'p2-w5-d3',
  phaseId:'phase2',
  dayLabel:'Week 5 - Task-3',
  topic:'Consumer Groups',
  directive:'Rebalancing, offset commits and exactly-once interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://kafka.apache.org/documentation/']
},
{
  id:'p2-w5-d4',
  phaseId:'phase2',
  dayLabel:'Week 5 - Task-4',
  topic:'Performance Tuning',
  directive:'Optimize linger.ms, batch.size and compression.',
  isCompleted:false,
  notes:'',
  links:['https://kafka.apache.org/documentation/']
},
{
  id:'p2-w5-d5',
  phaseId:'phase2',
  dayLabel:'Week 5 - Task-5',
  topic:'Log Compaction',
  directive:'Retention policies, cleanup.policy and compacted topics.',
  isCompleted:false,
  notes:'',
  links:['https://kafka.apache.org/documentation/']
},
{
  id:'p2-w5-d6',
  phaseId:'phase2',
  dayLabel:'Week 5 - Task-6',
  topic:'Spring Kafka',
  directive:'Build a producer and consumer using Spring Boot.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-kafka/reference/']
},
{
  id:'p2-w5-d7',
  phaseId:'phase2',
  dayLabel:'Week 5 - Task-7',
  topic:'Kafka Interview Round',
  directive:'Answer 10 Kafka interview questions including partitions, ordering and durability.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 2: WEEK 6 - Redis & Distributed Systems
// ==========================================

{
  id:'p2-w6-d1',
  phaseId:'phase2',
  dayLabel:'Week 6 - Task-1',
  topic:'Redis Data Structures',
  directive:'Strings, Hashes, Sets, Sorted Sets and interview use cases.',
  isCompleted:false,
  notes:'',
  links:['https://redis.io/docs']
},
{
  id:'p2-w6-d2',
  phaseId:'phase2',
  dayLabel:'Week 6 - Task-2',
  topic:'Caching Patterns',
  directive:'Cache Aside, Write Through, Write Back and Read Through.',
  isCompleted:false,
  notes:'',
  links:['https://redis.io/docs']
},
{
  id:'p2-w6-d3',
  phaseId:'phase2',
  dayLabel:'Week 6 - Task-3',
  topic:'Distributed Locking',
  directive:'Implement Redis distributed locks and explain Redlock.',
  isCompleted:false,
  notes:'',
  links:['https://redis.io/docs']
},
{
  id:'p2-w6-d4',
  phaseId:'phase2',
  dayLabel:'Week 6 - Task-4',
  topic:'Consistent Hashing',
  directive:'Build a TreeMap-based consistent hashing ring.',
  isCompleted:false,
  notes:'',
  links:['https://github.com/Gautam-aman/System-Design-Sheet']
},
{
  id:'p2-w6-d5',
  phaseId:'phase2',
  dayLabel:'Week 6 - Task-5',
  topic:'Rate Limiting',
  directive:'Build Token Bucket and Sliding Window limiters.',
  isCompleted:false,
  notes:'',
  links:['https://redis.io/docs']
},
{
  id:'p2-w6-d6',
  phaseId:'phase2',
  dayLabel:'Week 6 - Task-6',
  topic:'Distributed Interview',
  directive:'Answer 8 interview questions covering cache invalidation, TTL and consistency.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p2-w6-d7',
  phaseId:'phase2',
  dayLabel:'Week 6 - Task-7',
  topic:'Redis Coding Challenge',
  directive:'Build a Redis-backed API cache with automatic expiration.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 2: WEEK 7 - Performance & Testing
// ==========================================

{
  id:'p2-w7-d1',
  phaseId:'phase2',
  dayLabel:'Week 7 - Task-1',
  topic:'JUnit 5',
  directive:'Write unit tests with Mockito and Testcontainers.',
  isCompleted:false,
  notes:'',
  links:['https://junit.org/junit5/docs/current/user-guide/']
},
{
  id:'p2-w7-d2',
  phaseId:'phase2',
  dayLabel:'Week 7 - Task-2',
  topic:'Integration Testing',
  directive:'Test Spring Boot REST APIs using MockMvc.',
  isCompleted:false,
  notes:'',
  links:['https://docs.spring.io/spring-framework/reference/testing/mockmvc.html']
},
{
  id:'p2-w7-d3',
  phaseId:'phase2',
  dayLabel:'Week 7 - Task-3',
  topic:'Performance',
  directive:'Profile memory leaks, GC and thread pools.',
  isCompleted:false,
  notes:'',
  links:['https://docs.oracle.com/javase/']
},
{
  id:'p2-w7-d4',
  phaseId:'phase2',
  dayLabel:'Week 7 - Task-4',
  topic:'Connection Pools',
  directive:'Understand HikariCP tuning and database bottlenecks.',
  isCompleted:false,
  notes:'',
  links:['https://github.com/brettwooldridge/HikariCP']
},
{
  id:'p2-w7-d5',
  phaseId:'phase2',
  dayLabel:'Week 7 - Task5',
  topic:'API Design',
  directive:'Versioning, idempotency and pagination interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/best-practices/api-design']
},
{
  id:'p2-w7-d6',
  phaseId:'phase2',
  dayLabel:'Week 7 - Task-6',
  topic:'Backend Interview',
  directive:'Answer 12 mixed Spring Boot, JPA and Security interview questions.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p2-w7-d7',
  phaseId:'phase2',
  dayLabel:'Week 7 - Task-7',
  topic:'Performance Challenge',
  directive:'Optimize an API suffering from N+1 queries and slow responses.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================

// PHASE 2: WEEK 8 - Capstone

// ==========================================
{
  id:'p2-w8-d1',
  phaseId:'phase2',
  dayLabel:'Week 8 - Task-1',
  topic:'Event-Driven Microservice Capstone',
  directive:'Build a production-style Spring Boot + WebFlux + Redis + Kafka microservice with JWT authentication, pagination, validation, caching, distributed rate limiting and complete interview review covering all 50 backend questions.',
  isCompleted:false,
  notes:'',
  links:[]
},
    // ==========================================
// PHASE 3: WEEK 1 - Azure Fundamentals
// ==========================================

{
  id:'p3-w1-d1',
  phaseId:'phase3',
  dayLabel:'Week 1 - Task-1',
  topic:'Azure Resource Manager',
  directive:'Understand Resource Groups, ARM vs Bicep, subscriptions and management groups. Explain how Azure Resource Manager processes deployments.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/azure-resource-manager/management/overview']
},
{
  id:'p3-w1-d2',
  phaseId:'phase3',
  dayLabel:'Week 1 - Task-2',
  topic:'Azure Regions & Availability',
  directive:'Differentiate Regions, Availability Zones and Availability Sets. Solve disaster recovery interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/reliability/availability-zones-overview']
},
{
  id:'p3-w1-d3',
  phaseId:'phase3',
  dayLabel:'Week 1 - Task-3',
  topic:'Azure Functions',
  directive:'Master .NET 8 Isolated Worker, HttpTrigger, TimerTrigger and Durable Functions interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/azure-functions/']
},
{
  id:'p3-w1-d4',
  phaseId:'phase3',
  dayLabel:'Week 1 - Task-4',
  topic:'Azure CLI & PowerShell',
  directive:'Deploy resources using Azure CLI and compare imperative vs declarative provisioning.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/cli/azure/']
},
{
  id:'p3-w1-d5',
  phaseId:'phase3',
  dayLabel:'Week 1 - Task-5',
  topic:'Bicep Basics',
  directive:'Write reusable Bicep templates with parameters, modules and outputs.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/azure-resource-manager/bicep/']
},
{
  id:'p3-w1-d6',
  phaseId:'phase3',
  dayLabel:'Week 1 - Task-6',
  topic:'Cost Management',
  directive:'Analyze Azure pricing, budgets, reserved instances and cost optimization interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/cost-management-billing/']
},
{
  id:'p3-w1-d7',
  phaseId:'phase3',
  dayLabel:'Week 1 - Task-7',
  topic:'Azure Fundamentals Mock',
  directive:'Answer 10 Azure fundamentals interview questions involving subscriptions, regions, pricing and deployments.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 3: WEEK 2 - Compute Services
// ==========================================

{
  id:'p3-w2-d1',
  phaseId:'phase3',
  dayLabel:'Week 2 - Task-1',
  topic:'Azure App Service',
  directive:'Deploy a Spring Boot API. Compare App Service with Azure Functions and Virtual Machines.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/app-service/']
},
{
  id:'p3-w2-d2',
  phaseId:'phase3',
  dayLabel:'Week 2 - Task-2',
  topic:'Deployment Slots',
  directive:'Implement Staging, UAT and Production slots with zero-downtime swap.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/app-service/deploy-staging-slots']
},
{
  id:'p3-w2-d3',
  phaseId:'phase3',
  dayLabel:'Week 2 - Task-3',
  topic:'Azure Container Apps',
  directive:'Compare Container Apps vs AKS vs App Service. Deploy a containerized Spring Boot application.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/container-apps/']
},
{
  id:'p3-w2-d4',
  phaseId:'phase3',
  dayLabel:'Week 2 - Task-4',
  topic:'Azure Kubernetes Service',
  directive:'Understand node pools, pods, deployments, services and autoscaling interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/aks/']
},
{
  id:'p3-w2-d5',
  phaseId:'phase3',
  dayLabel:'Week 2 - Task-5',
  topic:'Container Registry',
  directive:'Push Docker images to Azure Container Registry and secure image access.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/container-registry/']
},
{
  id:'p3-w2-d6',
  phaseId:'phase3',
  dayLabel:'Week 2 - Task-6',
  topic:'Scaling Strategies',
  directive:'Configure autoscaling, scale-out vs scale-up and cold-start interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-overview']
},
{
  id:'p3-w2-d7',
  phaseId:'phase3',
  dayLabel:'Week 2 - Task-7',
  topic:'Compute Mock Interview',
  directive:'Answer 10 interview questions comparing Functions, App Service, Container Apps and AKS.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 3: WEEK 3 - Storage & Messaging
// ==========================================

{
  id:'p3-w3-d1',
  phaseId:'phase3',
  dayLabel:'Week 3 - Task-1',
  topic:'Blob Storage',
  directive:'Master Hot, Cool and Archive tiers with lifecycle management policies.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/storage/blobs/']
},
{
  id:'p3-w3-d2',
  phaseId:'phase3',
  dayLabel:'Week 3 - Task-2',
  topic:'Azure Files vs Blob',
  directive:'Compare Blob Storage, Azure Files and Managed Disks for interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/storage/']
},
{
  id:'p3-w3-d3',
  phaseId:'phase3',
  dayLabel:'Week 3 - Task-3',
  topic:'Cosmos DB',
  directive:'Understand partition keys, consistency levels and RU/s optimization.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/cosmos-db/']
},
{
  id:'p3-w3-d4',
  phaseId:'phase3',
  dayLabel:'Week 3 - Task-4',
  topic:'Azure Queue Storage',
  directive:'Build asynchronous processing using Queue Storage and compare it with Service Bus.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/storage/queues/']
},
{
  id:'p3-w3-d5',
  phaseId:'phase3',
  dayLabel:'Week 3 - Task-5',
  topic:'Azure Service Bus',
  directive:'Master Topics, Queues, Sessions and Dead Letter Queues.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/service-bus-messaging/']
},
{
  id:'p3-w3-d6',
  phaseId:'phase3',
  dayLabel:'Week 3 - Task-6',
  topic:'Event Grid',
  directive:'Differentiate Event Grid, Service Bus and Event Hubs for event-driven architectures.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/event-grid/']
},
{
  id:'p3-w3-d7',
  phaseId:'phase3',
  dayLabel:'Week 3 - Task-7',
  topic:'Storage Mock Interview',
  directive:'Answer 8 interview questions covering Cosmos DB, Blob Storage and messaging services.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 3: WEEK 4 - Networking
// ==========================================

{
  id:'p3-w4-d1',
  phaseId:'phase3',
  dayLabel:'Week 4 - Task-1',
  topic:'Virtual Networks',
  directive:'Understand VNets, Subnets and private IP communication.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/virtual-network/']
},
{
  id:'p3-w4-d2',
  phaseId:'phase3',
  dayLabel:'Week 4 - Task-2',
  topic:'Network Security Groups',
  directive:'Implement inbound and outbound NSG rules with interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview']
},
{
  id:'p3-w4-d3',
  phaseId:'phase3',
  dayLabel:'Week 4 - Task-3',
  topic:'Private Endpoints',
  directive:'Secure Azure Storage and Key Vault using Private Endpoints.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/private-link/private-endpoint-overview']
},
{
  id:'p3-w4-d4',
  phaseId:'phase3',
  dayLabel:'Week 4 - Task-4',
  topic:'Application Gateway',
  directive:'Configure Layer-7 routing, SSL termination and Web Application Firewall.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/application-gateway/']
},
{
  id:'p3-w4-d5',
  phaseId:'phase3',
  dayLabel:'Week 4 - Task-5',
  topic:'Azure Front Door',
  directive:'Compare Front Door with Application Gateway and Traffic Manager.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/frontdoor/']
},
{
  id:'p3-w4-d6',
  phaseId:'phase3',
  dayLabel:'Week 4 - Task-6',
  topic:'Traffic Manager',
  directive:'Implement geographic routing, failover routing and latency-based routing.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/traffic-manager/']
},
{
  id:'p3-w4-d7',
  phaseId:'phase3',
  dayLabel:'Week 4 - Task-7',
  topic:'Networking Mock',
  directive:'Answer 8 networking interview questions involving VNets, Front Door and Application Gateway.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 3: WEEK 5 - Identity & Security
// ==========================================

{
  id:'p3-w5-d1',
  phaseId:'phase3',
  dayLabel:'Week 5 - Task-1',
  topic:'Microsoft Entra ID',
  directive:'Understand users, groups, service principals and managed identities.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/entra/identity/']
},
{
  id:'p3-w5-d2',
  phaseId:'phase3',
  dayLabel:'Week 5 - Task-2',
  topic:'Managed Identity',
  directive:'Access Azure resources without storing secrets.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/']
},
{
  id:'p3-w5-d3',
  phaseId:'phase3',
  dayLabel:'Week 5 - Task-3',
  topic:'Azure Key Vault',
  directive:'Store secrets, certificates and keys securely using RBAC.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/key-vault/']
},
{
  id:'p3-w5-d4',
  phaseId:'phase3',
  dayLabel:'Week 5 - Task-4',
  topic:'RBAC',
  directive:'Compare RBAC with Access Policies and least-privilege interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/role-based-access-control/']
},
{
  id:'p3-w5-d5',
  phaseId:'phase3',
  dayLabel:'Week 5 - Task-5',
  topic:'Defender for Cloud',
  directive:'Understand security posture management and vulnerability recommendations.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/defender-for-cloud/']
},
{
  id:'p3-w5-d6',
  phaseId:'phase3',
  dayLabel:'Week 5 - Task-6',
  topic:'Conditional Access',
  directive:'Build Conditional Access policies with MFA interview scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/entra/identity/conditional-access/']
},
{
  id:'p3-w5-d7',
  phaseId:'phase3',
  dayLabel:'Week 5 - Task-7',
  topic:'Security Mock',
  directive:'Answer 10 identity and security interview questions covering Key Vault, RBAC and Managed Identity.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 3: WEEK 6 - Monitoring
// ==========================================

{
  id:'p3-w6-d1',
  phaseId:'phase3',
  dayLabel:'Week 6 - Task-1',
  topic:'Azure Monitor',
  directive:'Collect metrics, logs and alerts for production workloads.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/azure-monitor/']
},
{
  id:'p3-w6-d2',
  phaseId:'phase3',
  dayLabel:'Week 6 - Task-2',
  topic:'Application Insights',
  directive:'Trace distributed requests and diagnose slow APIs.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview']
},
{
  id:'p3-w6-d3',
  phaseId:'phase3',
  dayLabel:'Week 6 - Task-3',
  topic:'Log Analytics',
  directive:'Write KQL queries for interview-style debugging scenarios.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/azure-monitor/logs/log-query-overview']
},
{
  id:'p3-w6-d4',
  phaseId:'phase3',
  dayLabel:'Week 6 - Task-4',
  topic:'Backup & Disaster Recovery',
  directive:'Compare Backup, Site Recovery and geo-redundant storage.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/backup/']
},
{
  id:'p3-w6-d5',
  phaseId:'phase3',
  dayLabel:'Week 6 - Task-5',
  topic:'Reliability Patterns',
  directive:'Implement retry, circuit breaker and exponential backoff patterns.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/patterns/']
},
{
  id:'p3-w6-d6',
  phaseId:'phase3',
  dayLabel:'Week 6 - Task-6',
  topic:'Observability Mock',
  directive:'Answer 8 monitoring interview questions involving KQL, Application Insights and Azure Monitor.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p3-w6-d7',
  phaseId:'phase3',
  dayLabel:'Week 6 - Task-7',
  topic:'Incident Response',
  directive:'Diagnose a simulated production outage using logs, metrics and traces.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 3: WEEK 7 - GitHub Actions
// ==========================================

{
  id:'p3-w7-d1',
  phaseId:'phase3',
  dayLabel:'Week 7 - Task-1',
  topic:'GitHub Actions Fundamentals',
  directive:'Build workflows with events, jobs, matrices and reusable workflows.',
  isCompleted:false,
  notes:'',
  links:['https://docs.github.com/actions']
},
{
  id:'p3-w7-d2',
  phaseId:'phase3',
  dayLabel:'Week 7 - Task-2',
  topic:'OIDC Authentication',
  directive:'Replace service principal secrets with OpenID Connect authentication.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/developer/github/connect-from-azure-openid-connect']
},
{
  id:'p3-w7-d3',
  phaseId:'phase3',
  dayLabel:'Week 7 - Task-3',
  topic:'CI Pipeline',
  directive:'Build, test and package a Spring Boot application.',
  isCompleted:false,
  notes:'',
  links:['https://docs.github.com/actions']
},
{
  id:'p3-w7-d4',
  phaseId:'phase3',
  dayLabel:'Week 7 - Task-4',
  topic:'CD Pipeline',
  directive:'Deploy automatically to Azure App Service with rollback support.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/app-service/deploy-github-actions']
},
{
  id:'p3-w7-d5',
  phaseId:'phase3',
  dayLabel:'Week 7 - Task-5',
  topic:'Environment Protection',
  directive:'Use approvals, protected environments and deployment gates.',
  isCompleted:false,
  notes:'',
  links:['https://docs.github.com/actions']
},
{
  id:'p3-w7-d6',
  phaseId:'phase3',
  dayLabel:'Week 7 - Task-6',
  topic:'Pipeline Debugging',
  directive:'Fix failed GitHub Actions deployments using logs and workflow reruns.',
  isCompleted:false,
  notes:'',
  links:['https://docs.github.com/actions']
},
{
  id:'p3-w7-d7',
  phaseId:'phase3',
  dayLabel:'Week 7 - Task-7',
  topic:'CI/CD Mock',
  directive:'Answer 8 interview questions covering OIDC, deployment slots and GitHub Actions.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 3: WEEK 8 - Architecture Capstone
// ==========================================

{
  id:'p3-w8-d1',
  phaseId:'phase3',
  dayLabel:'Week 8 - Task-1',
  topic:'Production Cloud Architecture Capstone',
  directive:'Design and deploy a production-ready Spring Boot microservice using App Service, Azure Functions, Blob Storage, Cosmos DB, Service Bus, Key Vault, Managed Identity, Azure Monitor, GitHub Actions OIDC and zero-downtime deployment while answering a complete 50-question cloud interview simulation.',
  isCompleted:false,
  notes:'',
  links:[]
},
    // ==========================================
// PHASE 4: WEEK 1 - LLD Foundations
// ==========================================

{
  id:'p4-w1-d1',
  phaseId:'phase4',
  dayLabel:'Week 1 - Task-1',
  topic:'SOLID Principles Deep Dive',
  directive:'Explain SRP, OCP, LSP, ISP and DIP using Java examples. Refactor a tightly coupled class into a SOLID-compliant design.',
  isCompleted:false,
  notes:'',
  links:['https://refactoring.guru/design-patterns']
},
{
  id:'p4-w1-d2',
  phaseId:'phase4',
  dayLabel:'Week 1 - Task-2',
  topic:'UML Class Design',
  directive:'Convert requirements into UML Class Diagrams with composition, aggregation and inheritance.',
  isCompleted:false,
  notes:'',
  links:['https://refactoring.guru']
},
{
  id:'p4-w1-d3',
  phaseId:'phase4',
  dayLabel:'Week 1 - Task-3',
  topic:'Factory Pattern',
  directive:'Design a Notification System supporting Email, SMS and Push using Factory Pattern.',
  isCompleted:false,
  notes:'',
  links:['https://refactoring.guru/design-patterns/factory-method']
},
{
  id:'p4-w1-d4',
  phaseId:'phase4',
  dayLabel:'Week 1 - Task-4',
  topic:'Strategy Pattern',
  directive:'Implement Payment Gateway supporting UPI, Card and Wallet with Strategy Pattern.',
  isCompleted:false,
  notes:'',
  links:['https://refactoring.guru/design-patterns/strategy']
},
{
  id:'p4-w1-d5',
  phaseId:'phase4',
  dayLabel:'Week 1 - Task-5',
  topic:'Observer Pattern',
  directive:'Build a Stock Price Notification system using Observer Pattern.',
  isCompleted:false,
  notes:'',
  links:['https://refactoring.guru/design-patterns/observer']
},
{
  id:'p4-w1-d6',
  phaseId:'phase4',
  dayLabel:'Week 1 - Task-6',
  topic:'Decorator Pattern',
  directive:'Design Coffee Ordering with dynamic toppings using Decorator Pattern.',
  isCompleted:false,
  notes:'',
  links:['https://refactoring.guru/design-patterns/decorator']
},
{
  id:'p4-w1-d7',
  phaseId:'phase4',
  dayLabel:'Week 1 - Task-7',
  topic:'LLD Mock Round',
  directive:'Complete a 45-minute interview designing Payment Gateway using multiple design patterns.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 4: WEEK 2 - Machine Coding Classics
// ==========================================

{
  id:'p4-w2-d1',
  phaseId:'phase4',
  dayLabel:'Week 2 - Task-1',
  topic:'Parking Lot',
  directive:'Design Parking Lot supporting multiple vehicle types and slot allocation strategies.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w2-d2',
  phaseId:'phase4',
  dayLabel:'Week 2 - Task-2',
  topic:'Vending Machine',
  directive:'Implement Idle, HasMoney and Dispensing states using State Pattern.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w2-d3',
  phaseId:'phase4',
  dayLabel:'Week 2 - Task-3',
  topic:'Splitwise',
  directive:'Support Equal, Exact and Percentage expenses with debt simplification.',
  isCompleted:false,
  notes:'',
  links:['https://github.com/prasadgujar/low-level-design-primer']
},
{
  id:'p4-w2-d4',
  phaseId:'phase4',
  dayLabel:'Week 2 - Task-4',
  topic:'Snake and Ladder',
  directive:'Design Board, Dice and Player movement with extensible rules.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w2-d5',
  phaseId:'phase4',
  dayLabel:'Week 2 - Task-5',
  topic:'LRU Cache',
  directive:'Implement O(1) operations using HashMap and Doubly Linked List.',
  isCompleted:false,
  notes:'',
  links:['https://leetcode.com/problems/lru-cache/']
},
{
  id:'p4-w2-d6',
  phaseId:'phase4',
  dayLabel:'Week 2 - Task-6',
  topic:'LFU Cache',
  directive:'Implement frequency buckets with O(1) operations.',
  isCompleted:false,
  notes:'',
  links:['https://leetcode.com/problems/lfu-cache/']
},
{
  id:'p4-w2-d7',
  phaseId:'phase4',
  dayLabel:'Week 2 - Task-7',
  topic:'Machine Coding Mock',
  directive:'Complete a 90-minute Parking Lot interview simulation.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 4: WEEK 3 - Advanced Machine Coding
// ==========================================

{
  id:'p4-w3-d1',
  phaseId:'phase4',
  dayLabel:'Week 3 - Task-1',
  topic:'BookMyShow',
  directive:'Implement seat locking and concurrency-safe booking.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w3-d2',
  phaseId:'phase4',
  dayLabel:'Week 3 - Task-2',
  topic:'Food Delivery System',
  directive:'Design Swiggy/Zomato order lifecycle with delivery assignment.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w3-d3',
  phaseId:'phase4',
  dayLabel:'Week 3 - Task-3',
  topic:'Ride Sharing',
  directive:'Design Uber ride matching and driver allocation.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w3-d4',
  phaseId:'phase4',
  dayLabel:'Week 3 - Task-4',
  topic:'Rate Limiter',
  directive:'Implement Token Bucket and Sliding Window algorithms.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/patterns']
},
{
  id:'p4-w3-d5',
  phaseId:'phase4',
  dayLabel:'Week 3 - Task-5',
  topic:'Elevator System',
  directive:'Support multiple elevators with scheduling strategies.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w3-d6',
  phaseId:'phase4',
  dayLabel:'Week 3 - Task-6',
  topic:'ATM System',
  directive:'Design authentication, withdrawal and cash dispensing modules.',
  isCompleted:false,
  notes:'',
  links:['https://workat.tech/machine-coding']
},
{
  id:'p4-w3-d7',
  phaseId:'phase4',
  dayLabel:'Week 3 - Task-7',
  topic:'Advanced LLD Mock',
  directive:'Complete a 90-minute BookMyShow interview.',
  isCompleted:false,
  notes:'',
  links:[]
},



// ==========================================
// PHASE 4: WEEK 4 - HLD Foundations
// ==========================================

{
  id:'p4-w4-d1',
  phaseId:'phase4',
  dayLabel:'Week 4 - Task-1',
  topic:'Scalability Basics',
  directive:'Vertical vs Horizontal Scaling, Load Balancers and Reverse Proxies.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/']
},
{
  id:'p4-w4-d2',
  phaseId:'phase4',
  dayLabel:'Week 4 - Task-2',
  topic:'CAP Theorem',
  directive:'Explain CP vs AP databases with interview examples.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/']
},
{
  id:'p4-w4-d3',
  phaseId:'phase4',
  dayLabel:'Week 4 - Task-3',
  topic:'Caching',
  directive:'Redis cache invalidation, TTL and Cache-Aside patterns.',
  isCompleted:false,
  notes:'',
  links:['https://redis.io/docs']
},
{
  id:'p4-w4-d4',
  phaseId:'phase4',
  dayLabel:'Week 4 - Task-4',
  topic:'Database Scaling',
  directive:'Replication, Sharding and Read Replicas.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/']
},
{
  id:'p4-w4-d5',
  phaseId:'phase4',
  dayLabel:'Week 4 - Task-5',
  topic:'Message Queues',
  directive:'Kafka vs RabbitMQ vs Azure Service Bus.',
  isCompleted:false,
  notes:'',
  links:['https://kafka.apache.org/documentation/']
},
{
  id:'p4-w4-d6',
  phaseId:'phase4',
  dayLabel:'Week 4 - Task-6',
  topic:'API Gateway',
  directive:'Authentication, Rate Limiting and Request Routing.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/api-management/']
},
{
  id:'p4-w4-d7',
  phaseId:'phase4',
  dayLabel:'Week 4 - Task-7',
  topic:'HLD Mock',
  directive:'Explain scalability concepts in a 45-minute interview.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 4: WEEK 5 - Popular HLD Systems
// ==========================================

{
id:'p4-w5-d1',
phaseId:'phase4',
dayLabel:'Week 5 - Task-1',
topic:'TinyURL',
directive:'Design URL Shortener supporting billions of links.',
isCompleted:false,
notes:'',
links:['donnemartin/system-design-primer']
},
{
id:'p4-w5-d2',
phaseId:'phase4',
dayLabel:'Week 5 - Task-2',
topic:'WhatsApp',
directive:'Design messaging with delivery guarantees and offline synchronization.',
isCompleted:false,
notes:'',
links:['donnemartin/system-design-primer']
},
{
id:'p4-w5-d3',
phaseId:'phase4',
dayLabel:'Week 5 - Task-3',
topic:'Instagram Feed',
directive:'Design feed generation with fan-out strategies.',
isCompleted:false,
notes:'',
links:['donnemartin/system-design-primer']
},
{
id:'p4-w5-d4',
phaseId:'phase4',
dayLabel:'Week 5 - Task-4',
topic:'YouTube',
directive:'Design video upload, transcoding and CDN delivery.',
isCompleted:false,
notes:'',
links:['donnemartin/system-design-primer']
},
{
id:'p4-w5-d5',
phaseId:'phase4',
dayLabel:'Week 5 - Task-5',
topic:'Uber',
directive:'Design ride matching with location indexing.',
isCompleted:false,
notes:'',
links:['donnemartin/system-design-primer']
},
{
id:'p4-w5-d6',
phaseId:'phase4',
dayLabel:'Week 5 - Task-6',
topic:'Netflix',
directive:'Design streaming architecture using CDN and caching.',
isCompleted:false,
notes:'',
links:['donnemartin/system-design-primer']
},
{
id:'p4-w5-d7',
phaseId:'phase4',
dayLabel:'Week 5 - Task-7',
topic:'System Design Mock',
directive:'Complete a 60-minute WhatsApp design interview.',
isCompleted:false,
notes:'',
links:[]
},

// ==========================================
// PHASE 4: WEEK 6 - Advanced HLD
// ==========================================

{
  id:'p4-w6-d1',
  phaseId:'phase4',
  dayLabel:'Week 6 - Task-1',
  topic:'Distributed Cache',
  directive:'Design Redis Cluster with Consistent Hashing.',
  isCompleted:false,
  notes:'',
  links:['https://redis.io/docs']
},
{
  id:'p4-w6-d2',
  phaseId:'phase4',
  dayLabel:'Week 6 - Task-2',
  topic:'Notification Service',
  directive:'Email, SMS and Push notification architecture.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/']
},
{
  id:'p4-w6-d3',
  phaseId:'phase4',
  dayLabel:'Week 6 - Task-3',
  topic:'Payment System',
  directive:'Design Razorpay/Stripe with idempotency and retries.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/']
},
{
  id:'p4-w6-d4',
  phaseId:'phase4',
  dayLabel:'Week 6 - Task-4',
  topic:'Search Autocomplete',
  directive:'Design Trie-based autocomplete at scale.',
  isCompleted:false,
  notes:'',
  links:['https://github.com/donnemartin/system-design-primer']
},
{
  id:'p4-w6-d5',
  phaseId:'phase4',
  dayLabel:'Week 6 - Task-5',
  topic:'Distributed Scheduler',
  directive:'Design Cron jobs across multiple servers.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/']
},
{
  id:'p4-w6-d6',
  phaseId:'phase4',
  dayLabel:'Week 6 - Task-6',
  topic:'Live Chat',
  directive:'Design WebSocket-based chat with horizontal scaling.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/architecture/']
},
{
  id:'p4-w6-d7',
  phaseId:'phase4',
  dayLabel:'Week 6 - Task-7',
  topic:'Advanced HLD Mock',
  directive:'Complete a Payment System interview simulation.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================

// PHASE 4: WEEK 7 - FAANG Interview Marathon

// ==========================================



{

  id:'p4-w7-d1',

  phaseId:'phase4',

  dayLabel:'Week 7 - Task-1',

  topic:'Google Mock',

  directive:'Design Google Drive.',

  isCompleted:false,

  notes:'',

  links:[]

},

{

  id:'p4-w7-d2',

  phaseId:'phase4',

  dayLabel:'Week 7 - Task-2',

  topic:'Amazon Mock',

  directive:'Design Amazon Order Management.',

  isCompleted:false,

  notes:'',

  links:[]

},

{

  id:'p4-w7-d3',

  phaseId:'phase4',

  dayLabel:'Week 7 - Task-3',

  topic:'Microsoft Mock',

  directive:'Design Microsoft Teams.',

  isCompleted:false,

  notes:'',

  links:[]

},

{

  id:'p4-w7-d4',

  phaseId:'phase4',

  dayLabel:'Week 7 - Task-4',

  topic:'Uber Mock',

  directive:'Design Uber Dispatch.',

  isCompleted:false,

  notes:'',

  links:[]

},

{

  id:'p4-w7-d5',

  phaseId:'phase4',

  dayLabel:'Week 7 - Task-5',

  topic:'Flipkart Mock',

  directive:'Design Inventory Service.',

  isCompleted:false,

  notes:'',

  links:[]

},
{
  id:'p4-w7-d6',
  phaseId:'phase4',
  dayLabel:'Week 7 - Task-6',
  topic:'Atlassian Mock',
  directive:'Design Jira Ticketing System.',
  isCompleted:false,
  notes:'',
  links:[]
},

{
  id:'p4-w7-d7',
  phaseId:'phase4',
  dayLabel:'Week 7 - Task-7',
  topic:'Interview Review',
  directive:'Review weak areas across LLD, HLD and concurrency questions.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 4: WEEK 8 - Grand Finale
// ==========================================

{
  id:'p4-w8-d1',
  phaseId:'phase4',
  dayLabel:'Week 8 - Task-1',
  topic:'End-to-End Interview Simulation',
  directive:'Complete a full 3-hour interview consisting of 45 minutes DSA, 60 minutes LLD, 45 minutes HLD and 30 minutes behavioral discussion. Build a production-grade design combining Spring Boot, Azure, Redis, Kafka and distributed architecture while defending every design decision.',
  isCompleted:false,
  notes:'',
  links:[]
},
// ==========================================
// PHASE 5: WEEK 1 - Python for AI
// ==========================================

{
  id:'p5-w1-d1',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-1',
  topic:'NumPy Internals',
  directive:'Master ndarray, broadcasting, vectorization and why NumPy is faster than Python lists.',
  isCompleted:false,
  notes:'',
  links:['https://numpy.org/doc/stable/']
},
{
  id:'p5-w1-d2',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-2',
  topic:'Pandas Interview',
  directive:'Practice merge, groupby, pivot tables and handling missing values.',
  isCompleted:false,
  notes:'',
  links:['https://pandas.pydata.org/docs/']
},
{
  id:'p5-w1-d3',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-3',
  topic:'Vectorization',
  directive:'Replace loops with vectorized NumPy operations.',
  isCompleted:false,
  notes:'',
  links:['https://numpy.org/doc/stable/']
},
{
  id:'p5-w1-d4',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-4',
  topic:'Python Memory',
  directive:'Understand references, shallow copy, deep copy and garbage collection.',
  isCompleted:false,
  notes:'',
  links:['https://docs.python.org/3/']
},
{
  id:'p5-w1-d5',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-5',
  topic:'Generators',
  directive:'Implement generators and iterators for memory-efficient pipelines.',
  isCompleted:false,
  notes:'',
  links:['https://docs.python.org/3/']
},
{
  id:'p5-w1-d6',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-6',
  topic:'Comprehensions',
  directive:'Optimize Python interview questions using comprehensions.',
  isCompleted:false,
  notes:'',
  links:['https://docs.python.org/3/']
},
{
  id:'p5-w1-d7',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-7',
  topic:'Decorators',
  directive:'Build logging and timing decorators.',
  isCompleted:false,
  notes:'',
  links:['https://docs.python.org/3/']
},
{
  id:'p5-w1-d8',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-8',
  topic:'Context Managers',
  directive:'Implement custom context managers using __enter__ and __exit__.',
  isCompleted:false,
  notes:'',
  links:['https://docs.python.org/3/']
},
{
  id:'p5-w1-d9',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-9',
  topic:'Async Python',
  directive:'Compare threading, multiprocessing and asyncio.',
  isCompleted:false,
  notes:'',
  links:['https://docs.python.org/3/library/asyncio.html']
},
{
  id:'p5-w1-d10',
  phaseId:'phase5',
  dayLabel:'Week 1 - Task-10',
  topic:'Python AI Mock',
  directive:'Solve 10 Python interview questions commonly asked in ML interviews.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 5: WEEK 2 - Mathematics for ML
// ==========================================

{
  id:'p5-w2-d1',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-1',
  topic:'Linear Algebra',
  directive:'Vectors, matrices, dot product and matrix multiplication interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d2',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-2',
  topic:'Eigenvalues',
  directive:'Understand PCA intuition through eigenvectors.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d3',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-3',
  topic:'Calculus',
  directive:'Differentiate gradients, chain rule and partial derivatives.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d4',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-4',
  topic:'Gradient Descent',
  directive:'Batch, Mini-Batch and Stochastic Gradient Descent.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d5',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-5',
  topic:'Probability',
  directive:'Bayes Theorem and conditional probability interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d6',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-6',
  topic:'Distributions',
  directive:'Normal, Bernoulli, Binomial and Poisson distributions.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d7',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-7',
  topic:'Statistics',
  directive:'Mean, variance, covariance and correlation.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d8',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-8',
  topic:'Loss Functions',
  directive:'MSE, Cross Entropy and Hinge Loss.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d9',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-9',
  topic:'Optimization',
  directive:'Adam, RMSProp and Momentum interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://www.deeplearningbook.org/']
},
{
  id:'p5-w2-d10',
  phaseId:'phase5',
  dayLabel:'Week 2 - Task-10',
  topic:'Math Mock',
  directive:'Answer 10 mathematics interview questions for ML engineers.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 5: WEEK 3 - Machine Learning
// ==========================================

{
  id:'p5-w3-d1',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-1',
  topic:'Linear Regression',
  directive:'Bias, variance and assumptions.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d2',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-2',
  topic:'Logistic Regression',
  directive:'Sigmoid function and decision boundaries.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d3',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-3',
  topic:'Decision Trees',
  directive:'Entropy, Gini and pruning.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d4',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-4',
  topic:'Random Forest',
  directive:'Bagging vs boosting interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d5',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-5',
  topic:'XGBoost',
  directive:'Why XGBoost wins Kaggle competitions.',
  isCompleted:false,
  notes:'',
  links:['https://xgboost.readthedocs.io/']
},
{
  id:'p5-w3-d6',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-6',
  topic:'SVM',
  directive:'Kernel trick and margin intuition.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d7',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-7',
  topic:'Clustering',
  directive:'K-Means vs DBSCAN.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d8',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-8',
  topic:'PCA',
  directive:'Dimensionality reduction interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d9',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-9',
  topic:'Model Evaluation',
  directive:'Precision, Recall, ROC, AUC and confusion matrix.',
  isCompleted:false,
  notes:'',
  links:['https://scikit-learn.org/stable/']
},
{
  id:'p5-w3-d10',
  phaseId:'phase5',
  dayLabel:'Week 3 - Task-10',
  topic:'ML Mock',
  directive:'Answer 10 ML interview questions from Google and Amazon.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 5: WEEK 4 - Deep Learning
// ==========================================

{
  id:'p5-w4-d1',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-1',
  topic:'Neural Networks',
  directive:'Forward propagation and backpropagation.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d2',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-2',
  topic:'Activation Functions',
  directive:'ReLU, GELU, Sigmoid and Tanh.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d3',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-3',
  topic:'CNN',
  directive:'Convolution, pooling and feature maps.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d4',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-4',
  topic:'RNN',
  directive:'Vanishing gradient problem.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d5',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-5',
  topic:'LSTM vs GRU',
  directive:'Sequence modeling interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d6',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-6',
  topic:'Dropout',
  directive:'Prevent overfitting.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d7',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-7',
  topic:'Batch Normalization',
  directive:'Training stabilization.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d8',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-8',
  topic:'Transfer Learning',
  directive:'Fine-tune pretrained models.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d9',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-9',
  topic:'PyTorch Interview',
  directive:'Implement a training loop from scratch.',
  isCompleted:false,
  notes:'',
  links:['https://pytorch.org/tutorials/']
},
{
  id:'p5-w4-d10',
  phaseId:'phase5',
  dayLabel:'Week 4 - Task-10',
  topic:'Deep Learning Mock',
  directive:'Answer 10 deep learning interview questions.',
  isCompleted:false,
  notes:'',
  links:[]
},
    // ==========================================
// PHASE 5: WEEK 5 - NLP & Transformers
// ==========================================

{
  id:'p5-w5-d1',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-1',
  topic:'Text Preprocessing',
  directive:'Tokenization, stemming and lemmatization.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d2',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-2',
  topic:'Word Embeddings',
  directive:'Word2Vec, GloVe and FastText.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d3',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-3',
  topic:'Attention',
  directive:'Understand self-attention mathematically.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d4',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-4',
  topic:'Transformers',
  directive:'Encoder vs Decoder architecture.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d5',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-5',
  topic:'BERT',
  directive:'Masked language modeling interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d6',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-6',
  topic:'GPT',
  directive:'Autoregressive generation.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d7',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-7',
  topic:'T5',
  directive:'Text-to-text framework.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d8',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-8',
  topic:'Prompt Engineering',
  directive:'Zero-shot, Few-shot and Chain-of-Thought.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w5-d9',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-9',
  topic:'Tokenizers',
  directive:'BPE vs SentencePiece.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w5-d10',
  phaseId:'phase5',
  dayLabel:'Week 5 - Task-10',
  topic:'NLP Mock',
  directive:'Answer 10 Transformer interview questions.',
  isCompleted:false,
  notes:'',
  links:[]
},
// ==========================================
// PHASE 5: WEEK 6 - LLM Internals
// ==========================================

{
  id:'p5-w6-d1',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-1',
  topic:'How GPT Actually Generates Tokens',
  directive:'Understand autoregressive decoding, next-token prediction, context windows and why LLMs generate one token at a time.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs/transformers']
},
{
  id:'p5-w6-d2',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-2',
  topic:'Self-Attention Mathematics',
  directive:'Derive Q, K and V matrices, scaled dot-product attention and why attention replaces recurrence.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs/transformers']
},
{
  id:'p5-w6-d3',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-3',
  topic:'Multi-Head Attention',
  directive:'Explain why multiple heads learn different relationships and how outputs are concatenated.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs/transformers']
},
{
  id:'p5-w6-d4',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-4',
  topic:'Positional Encoding & RoPE',
  directive:'Compare sinusoidal positional encoding with Rotary Positional Embeddings (RoPE) and explain why modern LLMs use RoPE.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs/transformers']
},
{
  id:'p5-w6-d5',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-5',
  topic:'KV Cache',
  directive:'Explain Key-Value Cache, why inference becomes faster and common interview optimization questions.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs/transformers']
},
{
  id:'p5-w6-d6',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-6',
  topic:'Quantization',
  directive:'Compare FP32, FP16, INT8 and 4-bit quantization. Explain GPTQ and AWQ interview questions.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w6-d7',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-7',
  topic:'Fine-Tuning vs LoRA',
  directive:'Compare full fine-tuning, PEFT and LoRA. Explain why LoRA drastically reduces GPU memory usage.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs/peft']
},
{
  id:'p5-w6-d8',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-8',
  topic:'RLHF & SFT',
  directive:'Differentiate Supervised Fine-Tuning, Reward Models and Reinforcement Learning from Human Feedback.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w6-d9',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-9',
  topic:'Mixture of Experts',
  directive:'Understand sparse activation, expert routing and why Mixtral and DeepSeek improve efficiency.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w6-d10',
  phaseId:'phase5',
  dayLabel:'Week 6 - Task-10',
  topic:'LLM Internals Mock',
  directive:'Answer 15 interview questions covering attention, KV Cache, LoRA, RLHF, RoPE and quantization.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 5: WEEK 7 - RAG & Vector Databases
// ==========================================

{
  id:'p5-w7-d1',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-1',
  topic:'RAG Architecture',
  directive:'Build a Retrieval-Augmented Generation pipeline and explain every stage from query to final answer.',
  isCompleted:false,
  notes:'',
  links:['https://python.langchain.com/docs']
},
{
  id:'p5-w7-d2',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-2',
  topic:'Embeddings',
  directive:'Understand embedding vectors, cosine similarity, dot product and semantic search.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w7-d3',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-3',
  topic:'Chunking Strategies',
  directive:'Compare fixed-size, recursive, semantic and sliding-window chunking.',
  isCompleted:false,
  notes:'',
  links:['https://python.langchain.com/docs']
},
{
  id:'p5-w7-d4',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-4',
  topic:'Vector Databases',
  directive:'Compare FAISS, ChromaDB, Pinecone and Azure AI Search.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/search/']
},
{
  id:'p5-w7-d5',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-5',
  topic:'Hybrid Search',
  directive:'Combine BM25 with vector search and explain when hybrid search beats pure vector retrieval.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/search/']
},
{
  id:'p5-w7-d6',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-6',
  topic:'Reranking',
  directive:'Use Cross-Encoders to rerank retrieved documents and improve answer quality.',
  isCompleted:false,
  notes:'',
  links:['https://www.sbert.net']
},
{
  id:'p5-w7-d7',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-7',
  topic:'Metadata Filtering',
  directive:'Implement document filtering by source, user and permissions.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/search/']
},
{
  id:'p5-w7-d8',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-8',
  topic:'Reducing Hallucinations',
  directive:'Implement grounding, citations, confidence scoring and retrieval verification.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w7-d9',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-9',
  topic:'RAG Evaluation',
  directive:'Evaluate recall, precision, faithfulness and answer relevance.',
  isCompleted:false,
  notes:'',
  links:['https://docs.ragas.io']
},
{
  id:'p5-w7-d10',
  phaseId:'phase5',
  dayLabel:'Week 7 - Task-10',
  topic:'RAG Interview Round',
  directive:'Build a document Q&A system and answer 12 RAG interview questions.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 5: WEEK 8 - AI Agents & MCP
// ==========================================

{
  id:'p5-w8-d1',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-1',
  topic:'What is an AI Agent?',
  directive:'Differentiate workflows from autonomous agents and understand planning loops.',
  isCompleted:false,
  notes:'',
  links:['https://python.langchain.com/docs']
},
{
  id:'p5-w8-d2',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-2',
  topic:'Function Calling',
  directive:'Build an LLM that calls external functions reliably.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w8-d3',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-3',
  topic:'Tool Calling',
  directive:'Integrate APIs, databases and search tools into an agent workflow.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w8-d4',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-4',
  topic:'Model Context Protocol (MCP)',
  directive:'Understand MCP architecture, servers, tools, resources and prompts.',
  isCompleted:false,
  notes:'',
  links:['https://modelcontextprotocol.io']
},
{
  id:'p5-w8-d5',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-5',
  topic:'LangGraph',
  directive:'Build stateful multi-step agents using LangGraph.',
  isCompleted:false,
  notes:'',
  links:['https://langchain-ai.github.io/langgraph/']
},
{
  id:'p5-w8-d6',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-6',
  topic:'CrewAI',
  directive:'Coordinate multiple specialized agents solving a shared objective.',
  isCompleted:false,
  notes:'',
  links:['https://docs.crewai.com']
},
{
  id:'p5-w8-d7',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-7',
  topic:'Agent Memory',
  directive:'Implement short-term, long-term and semantic memory for agents.',
  isCompleted:false,
  notes:'',
  links:['https://python.langchain.com/docs']
},
{
  id:'p5-w8-d8',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-8',
  topic:'Multi-Agent Systems',
  directive:'Design planner-worker, manager-worker and debate agent architectures.',
  isCompleted:false,
  notes:'',
  links:['https://docs.crewai.com']
},
{
  id:'p5-w8-d9',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-9',
  topic:'Agent Failure Modes',
  directive:'Debug tool failures, infinite loops and hallucinated tool calls.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w8-d10',
  phaseId:'phase5',
  dayLabel:'Week 8 - Task-10',
  topic:'AI Agent Mock',
  directive:'Build a multi-agent IT Service Desk assistant and answer 15 agent interview questions.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 5: WEEK 9 - MLOps & Deployment
// ==========================================

{
  id:'p5-w9-d1',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-1',
  topic:'Docker for AI',
  directive:'Containerize ML applications and optimize Docker images for inference.',
  isCompleted:false,
  notes:'',
  links:['https://docs.docker.com']
},
{
  id:'p5-w9-d2',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-2',
  topic:'FastAPI Inference',
  directive:'Deploy a model behind a FastAPI REST endpoint.',
  isCompleted:false,
  notes:'',
  links:['https://fastapi.tiangolo.com']
},
{
  id:'p5-w9-d3',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-3',
  topic:'MLflow',
  directive:'Track experiments, register models and compare training runs.',
  isCompleted:false,
  notes:'',
  links:['https://mlflow.org/docs/latest/']
},
{
  id:'p5-w9-d4',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-4',
  topic:'Model Versioning',
  directive:'Implement model registries and rollback strategies.',
  isCompleted:false,
  notes:'',
  links:['https://mlflow.org/docs/latest/']
},
{
  id:'p5-w9-d5',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-5',
  topic:'Kubernetes for AI',
  directive:'Deploy scalable inference services on Kubernetes.',
  isCompleted:false,
  notes:'',
  links:['https://kubernetes.io/docs']
},
{
  id:'p5-w9-d6',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-6',
  topic:'Model Drift',
  directive:'Detect data drift, concept drift and retraining triggers.',
  isCompleted:false,
  notes:'',
  links:['https://mlflow.org/docs/latest/']
},
{
  id:'p5-w9-d7',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-7',
  topic:'A/B Testing',
  directive:'Safely compare multiple model versions in production.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/machine-learning/']
},
{
  id:'p5-w9-d8',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-8',
  topic:'Azure AI Foundry',
  directive:'Deploy and monitor models using Azure AI Foundry services.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/ai-foundry/']
},
{
  id:'p5-w9-d9',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-9',
  topic:'GPU Optimization',
  directive:'Understand batching, KV Cache reuse and inference throughput optimization.',
  isCompleted:false,
  notes:'',
  links:['https://huggingface.co/docs']
},
{
  id:'p5-w9-d10',
  phaseId:'phase5',
  dayLabel:'Week 9 - Task-10',
  topic:'MLOps Mock',
  directive:'Deploy an end-to-end ML service and answer 12 MLOps interview questions.',
  isCompleted:false,
  notes:'',
  links:[]
},

// ==========================================
// PHASE 5: WEEK 10 - GenAI System Design
// ==========================================

{
  id:'p5-w10-d1',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-1',
  topic:'Design ChatGPT',
  directive:'Design a scalable conversational AI supporting millions of users with streaming responses.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w10-d2',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-2',
  topic:'Design GitHub Copilot',
  directive:'Design an AI coding assistant with latency optimization and context retrieval.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w10-d3',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-3',
  topic:'Design Enterprise RAG',
  directive:'Design a secure enterprise document assistant with permissions-aware retrieval.',
  isCompleted:false,
  notes:'',
  links:['https://learn.microsoft.com/azure/search/']
},
{
  id:'p5-w10-d4',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-4',
  topic:'Design AI IT Service Desk',
  directive:'Design an AI Service Desk similar to your project with ticket creation, semantic search and automation.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p5-w10-d5',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-5',
  topic:'Design AI Customer Support',
  directive:'Build an agent capable of tool calling, CRM integration and escalation.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p5-w10-d6',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-6',
  topic:'Design Multi-Agent Workflow',
  directive:'Create planner, researcher and executor agents collaborating on complex tasks.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p5-w10-d7',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-7',
  topic:'Reduce LLM Cost',
  directive:'Optimize prompt caching, batching, routing and model selection to reduce inference costs.',
  isCompleted:false,
  notes:'',
  links:['https://platform.openai.com/docs']
},
{
  id:'p5-w10-d8',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-8',
  topic:'LLM Evaluation',
  directive:'Measure latency, accuracy, faithfulness and cost using automated evaluation pipelines.',
  isCompleted:false,
  notes:'',
  links:['https://docs.ragas.io']
},
{
  id:'p5-w10-d9',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-9',
  topic:'Production AI Architecture Review',
  directive:'Review an end-to-end AI system and identify bottlenecks, security risks and scaling issues.',
  isCompleted:false,
  notes:'',
  links:[]
},
{
  id:'p5-w10-d10',
  phaseId:'phase5',
  dayLabel:'Week 10 - Task-10',
  topic:'FAANG AI Interview Simulation',
  directive:'Complete a 3-hour interview covering Python, ML, Transformers, RAG, Agents, MLOps and GenAI System Design.',
  isCompleted:false,
  notes:'',
  links:[]
},
  ];
};