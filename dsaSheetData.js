/**
 * Dedicated Topic-Wise DSA Preparation Sheet Database
 * Comprehensive curated problems across all major algorithmic patterns
 */

const initialDsaSheet = [
  // --- TOPIC: ARRAYS & HASHING ---
  {
    id: "dsa-1",
    topic: "Arrays & Hashing",
    title: "Two Sum",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Accenture"],
    practiceUrl: "https://leetcode.com/problems/two-sum/",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    bruteForce: "Check every pair using two nested loops. Time: O(N^2), Space: O(1).",
    optimal: "Use a Hash Map to store each element's value and its index. For each element num, check if (target - num) exists in the map.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); ++i) {\n        int complement = target - nums[i];\n        if (seen.count(complement)) return {seen[complement], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}`,
      java: `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) return new int[] { map.get(complement), i };\n        map.put(nums[i], i);\n    }\n    return new int[] {};\n}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`
    }
  },
  {
    id: "dsa-2",
    topic: "Arrays & Hashing",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "Google", "Flipkart"],
    practiceUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    description: "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    bruteForce: "Compare every possible buy day with every future sell day. Time: O(N^2), Space: O(1).",
    optimal: "Track the minimum purchase price seen so far. At each day, calculate current profit = price[i] - minPrice and update maxProfit.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int maxProfit(vector<int>& prices) {\n    int minPrice = INT_MAX, maxProfit = 0;\n    for (int p : prices) {\n        minPrice = min(minPrice, p);\n        maxProfit = max(maxProfit, p - minPrice);\n    }\n    return maxProfit;\n}`,
      java: `public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE, maxProfit = 0;\n    for (int p : prices) {\n        if (p < minPrice) minPrice = p;\n        else if (p - minPrice > maxProfit) maxProfit = p - minPrice;\n    }\n    return maxProfit;\n}`,
      python: `def maxProfit(prices: list[int]) -> int:\n    min_price, max_profit = float('inf'), 0\n    for p in prices:\n        min_price = min(min_price, p)\n        max_profit = max(max_profit, p - min_price)\n    return max_profit`
    }
  },
  {
    id: "dsa-3",
    topic: "Arrays & Hashing",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    companies: ["Microsoft", "Amazon", "Infosys", "TCS"],
    practiceUrl: "https://leetcode.com/problems/maximum-subarray/",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    bruteForce: "Calculate sum of all subarrays O(N^2) or O(N^3).",
    optimal: "Kadane's Algorithm: Maintain current_sum = max(num, current_sum + num). If current_sum drops below zero, reset it or take the current element.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int maxSubArray(vector<int>& nums) {\n    int cur = 0, maxSum = nums[0];\n    for (int x : nums) {\n        cur = max(x, cur + x);\n        maxSum = max(maxSum, cur);\n    }\n    return maxSum;\n}`,
      java: `public int maxSubArray(int[] nums) {\n    int cur = 0, maxSum = nums[0];\n    for (int x : nums) {\n        cur = Math.max(x, cur + x);\n        maxSum = Math.max(maxSum, cur);\n    }\n    return maxSum;\n}`,
      python: `def maxSubArray(nums: list[int]) -> int:\n    cur, max_sum = 0, nums[0]\n    for x in nums:\n        cur = max(x, cur + x)\n        max_sum = max(max_sum, cur)\n    return max_sum`
    }
  },
  {
    id: "dsa-4",
    topic: "Arrays & Hashing",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Apple", "Uber"],
    practiceUrl: "https://leetcode.com/problems/product-of-array-except-self/",
    description: "Return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i] without using the division operator.",
    bruteForce: "For each index, loop through all other elements to multiply. Time: O(N^2).",
    optimal: "Prefix & Suffix products: Store prefix products in the result array in first pass, then multiply running suffix product in second reverse pass.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) extra space",
    code: {
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, 1);\n    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n    int right = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= right;\n        right *= nums[i];\n    }\n    return res;\n}`,
      java: `public int[] productExceptSelf(int[] nums) {\n    int n = nums.length;\n    int[] res = new int[n];\n    res[0] = 1;\n    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n    int right = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= right;\n        right *= nums[i];\n    }\n    return res;\n}`,
      python: `def productExceptSelf(nums: list[int]) -> list[int]:\n    n = len(nums)\n    res = [1] * n\n    for i in range(1, n):\n        res[i] = res[i - 1] * nums[i - 1]\n    right = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= right\n        right *= nums[i]\n    return res`
    }
  },

  // --- TOPIC: TWO POINTERS & SLIDING WINDOW ---
  {
    id: "dsa-5",
    topic: "Two Pointers & Sliding Window",
    title: "Container With Most Water",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Adobe", "Swiggy"],
    practiceUrl: "https://leetcode.com/problems/container-with-most-water/",
    description: "Find two lines that together with the x-axis form a container that contains the most water.",
    bruteForce: "Evaluate area for all pairs (i, j). Time: O(N^2).",
    optimal: "Two pointers at left and right ends. Calculate area = min(height[l], height[r]) * (r - l). Move the pointer pointing to the shorter line inward.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int maxArea(vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxA = 0;\n    while (l < r) {\n        maxA = max(maxA, min(height[l], height[r]) * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}`,
      java: `public int maxArea(int[] height) {\n    int l = 0, r = height.length - 1, maxA = 0;\n    while (l < r) {\n        maxA = Math.max(maxA, Math.min(height[l], height[r]) * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}`,
      python: `def maxArea(height: list[int]) -> int:\n    l, r, max_a = 0, len(height) - 1, 0\n    while l < r:\n        max_a = max(max_a, min(height[l], height[r]) * (r - l))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return max_a`
    }
  },
  {
    id: "dsa-6",
    topic: "Two Pointers & Sliding Window",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Bloomberg", "Infosys"],
    practiceUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    bruteForce: "Generate all substrings and check for duplicates with a set. Time: O(N^3).",
    optimal: "Sliding window with hash map storing last index of each character. When a duplicate is encountered within current window, advance left pointer to lastIndex + 1.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(min(N, M)) where M is character set",
    code: {
      cpp: `int lengthOfLongestSubstring(string s) {\n    vector<int> last(256, -1);\n    int left = 0, maxLen = 0;\n    for (int right = 0; right < s.size(); right++) {\n        if (last[s[right]] >= left) left = last[s[right]] + 1;\n        last[s[right]] = right;\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      java: `public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> map = new HashMap<>();\n    int left = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (map.containsKey(c)) left = Math.max(left, map.get(c) + 1);\n        map.put(c, right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    seen = {}\n    left = max_len = 0\n    for right, char in enumerate(s):\n        if char in seen and seen[char] >= left:\n            left = seen[char] + 1\n        seen[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`
    }
  },
  {
    id: "dsa-7",
    topic: "Two Pointers & Sliding Window",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    companies: ["Google", "Amazon", "Goldman Sachs", "Microsoft"],
    practiceUrl: "https://leetcode.com/problems/trapping-rain-water/",
    description: "Given n non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.",
    bruteForce: "For each element, find maximum height to its left and right. Water = min(maxLeft, maxRight) - height[i]. Time: O(N^2).",
    optimal: "Two pointers approach maintaining leftMax and rightMax. Move the pointer on the smaller max side inward.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int trap(vector<int>& height) {\n    int l = 0, r = height.size() - 1, lMax = 0, rMax = 0, ans = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else ans += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else ans += rMax - height[r];\n            r--;\n        }\n    }\n    return ans;\n}`,
      java: `public int trap(int[] height) {\n    int l = 0, r = height.length - 1, lMax = 0, rMax = 0, ans = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else ans += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else ans += rMax - height[r];\n            r--;\n        }\n    }\n    return ans;\n}`,
      python: `def trap(height: list[int]) -> int:\n    l, r = 0, len(height) - 1\n    l_max = r_max = ans = 0\n    while l < r:\n        if height[l] < height[r]:\n            if height[l] >= l_max: l_max = height[l]\n            else: ans += l_max - height[l]\n            l += 1\n        else:\n            if height[r] >= r_max: r_max = height[r]\n            else: ans += r_max - height[r]\n            r -= 1\n    return ans`
    }
  },

  // --- TOPIC: LINKED LISTS ---
  {
    id: "dsa-8",
    topic: "Linked Lists",
    title: "Reverse a Linked List",
    difficulty: "Easy",
    companies: ["Microsoft", "Amazon", "TCS", "Accenture", "Cognizant"],
    practiceUrl: "https://leetcode.com/problems/reverse-linked-list/",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    bruteForce: "Store values in an array and write them back in reverse. Time: O(N), Space: O(N).",
    optimal: "Iterative pointer reversal: Maintain prev = NULL, curr = head. Save next = curr->next, redirect curr->next = prev, advance prev = curr, curr = next.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode* nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}`,
      java: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode nxt = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}`,
      python: `def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev`
    }
  },
  {
    id: "dsa-9",
    topic: "Linked Lists",
    title: "Detect Cycle in a Linked List (Floyd's Tortoise & Hare)",
    difficulty: "Easy",
    companies: ["Amazon", "Google", "Infosys", "Wipro"],
    practiceUrl: "https://leetcode.com/problems/linked-list-cycle/",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    bruteForce: "Use a HashSet of node references. If current node already in set, cycle exists. Space: O(N).",
    optimal: "Floyd's Cycle Finding: Slow pointer moves 1 step, Fast pointer moves 2 steps. If they meet, a cycle exists.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `bool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}`,
      java: `public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}`,
      python: `def hasCycle(head: Optional[ListNode]) -> bool:\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False`
    }
  },

  // --- TOPIC: STACKS & QUEUES ---
  {
    id: "dsa-10",
    topic: "Stacks & Queues",
    title: "Valid Parentheses",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft", "TCS", "Accenture"],
    practiceUrl: "https://leetcode.com/problems/valid-parentheses/",
    description: "Given a string s containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    bruteForce: "Repeatedly replace '()', '{}', '[]' with empty string until none remain. Time: O(N^2).",
    optimal: "Use a Stack. Push opening brackets. When encountering closing bracket, verify if top of stack matches; otherwise return false.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(') st.push(')');\n        else if (c == '{') st.push('}');\n        else if (c == '[') st.push(']');\n        else {\n            if (st.empty() || st.top() != c) return false;\n            st.pop();\n        }\n    }\n    return st.empty();\n}`,
      java: `public boolean isValid(String s) {\n    Deque<Character> st = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(') st.push(')');\n        else if (c == '{') st.push('}');\n        else if (c == '[') st.push(']');\n        else {\n            if (st.isEmpty() || st.pop() != c) return false;\n        }\n    }\n    return st.isEmpty();\n}`,
      python: `def isValid(s: str) -> bool:\n    mapping = {')': '(', '}': '{', ']': '['}\n    stack = []\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else:\n            stack.append(char)\n    return not stack`
    }
  },
  {
    id: "dsa-11",
    topic: "Stacks & Queues",
    title: "Next Greater Element I",
    difficulty: "Medium",
    companies: ["Amazon", "Flipkart", "Paytm"],
    practiceUrl: "https://leetcode.com/problems/next-greater-element-i/",
    description: "Find the next greater element for each number in the array using a monotonic stack pattern.",
    bruteForce: "Nested loops scanning forward for the first larger number. Time: O(N^2).",
    optimal: "Monotonic decreasing stack: Traverse array from right to left. Pop elements <= current. Top element is next greater.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `vector<int> nextGreater(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> ans(n, -1);\n    stack<int> st;\n    for (int i = n - 1; i >= 0; i--) {\n        while (!st.empty() && st.top() <= nums[i]) st.pop();\n        if (!st.empty()) ans[i] = st.top();\n        st.push(nums[i]);\n    }\n    return ans;\n}`,
      java: `public int[] nextGreater(int[] nums) {\n    int n = nums.length;\n    int[] ans = new int[n];\n    Deque<Integer> st = new ArrayDeque<>();\n    for (int i = n - 1; i >= 0; i--) {\n        while (!st.isEmpty() && st.peek() <= nums[i]) st.pop();\n        ans[i] = st.isEmpty() ? -1 : st.peek();\n        st.push(nums[i]);\n    }\n    return ans;\n}`,
      python: `def nextGreater(nums: list[int]) -> list[int]:\n    n = len(nums)\n    ans, stack = [-1] * n, []\n    for i in range(n - 1, -1, -1):\n        while stack and stack[-1] <= nums[i]:\n            stack.pop()\n        if stack:\n            ans[i] = stack[-1]\n        stack.append(nums[i])\n    return ans`
    }
  },

  // --- TOPIC: BINARY SEARCH ---
  {
    id: "dsa-12",
    topic: "Binary Search",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    companies: ["Google", "Microsoft", "Amazon", "Uber"],
    practiceUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    description: "Given rotated sorted array nums with distinct values, return index of target, or -1 if not in nums in O(log n) time.",
    bruteForce: "Linear scan O(N).",
    optimal: "Modified Binary Search: In any rotated sorted array, at least one half (left or right) is strictly sorted. Identify the sorted half and check if target lies within its bounds.",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int search(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[low] <= nums[mid]) {\n            if (target >= nums[low] && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}`,
      java: `public int search(int[] nums, int target) {\n    int low = 0, high = nums.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[low] <= nums[mid]) {\n            if (target >= nums[low] && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}`,
      python: `def search(nums: list[int], target: int) -> int:\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target: return mid\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]: high = mid - 1\n            else: low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]: low = mid + 1\n            else: high = mid - 1\n    return -1`
    }
  },

  // --- TOPIC: TREES & BST ---
  {
    id: "dsa-13",
    topic: "Trees & BST",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    companies: ["Amazon", "Google", "TCS", "Accenture"],
    practiceUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    description: "Find the maximum depth (number of nodes along the longest path from the root node down to the farthest leaf node).",
    bruteForce: "Traverse tree with recursion. Depth = 1 + max(depth(left), depth(right)).",
    optimal: "DFS Recursion or BFS Level-order traversal with queue counting levels.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H) where H is tree height",
    code: {
      cpp: `int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}`,
      java: `public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`,
      python: `def maxDepth(root: Optional[TreeNode]) -> int:\n    if not root: return 0\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))`
    }
  },
  {
    id: "dsa-14",
    topic: "Trees & BST",
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    practiceUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.",
    bruteForce: "Store root-to-p and root-to-q paths in vectors and find the last common node. Space: O(N).",
    optimal: "Post-order DFS traversal. If root matches p or q, return root. Recurse left and right. If both return non-null, root is LCA.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    code: {
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return (left != null) ? left : right;\n}`,
      python: `def lowestCommonAncestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n    if not root or root == p or root == q:\n        return root\n    left = lowestCommonAncestor(root.left, p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n    if left and right: return root\n    return left or right`
    }
  },

  // --- TOPIC: GRAPHS ---
  {
    id: "dsa-15",
    topic: "Graphs",
    title: "Number of Islands",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Bloomberg", "Uber"],
    practiceUrl: "https://leetcode.com/problems/number-of-islands/",
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    bruteForce: "Iterate over each cell. When finding '1', trigger BFS/DFS to sink connected land cells to '0'. Count total triggers.",
    optimal: "Standard Grid BFS/DFS or Disjoint Set Union (DSU). Marking visited cells in-place eliminates extra memory.",
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N) recursion stack / queue",
    code: {
      cpp: `void dfs(vector<vector<char>>& g, int r, int c) {\n    if (r < 0 || c < 0 || r >= g.size() || c >= g[0].size() || g[r][c] != '1') return;\n    g[r][c] = '0';\n    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);\n}\nint numIslands(vector<vector<char>>& grid) {\n    int count = 0;\n    for (int i = 0; i < grid.size(); i++)\n        for (int j = 0; j < grid[0].size(); j++)\n            if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n    return count;\n}`,
      java: `public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int i = 0; i < grid.length; i++) {\n        for (int j = 0; j < grid[0].length; j++) {\n            if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n        }\n    }\n    return count;\n}\nvoid dfs(char[][] g, int r, int c) {\n    if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;\n    g[r][c] = '0';\n    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);\n}`,
      python: `def numIslands(grid: list[list[str]]) -> int:\n    if not grid: return 0\n    rows, cols, count = len(grid), len(grid[0]), 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1': return\n        grid[r][c] = '0'\n        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count += 1\n                dfs(r, c)\n    return count`
    }
  },

  // --- TOPIC: DYNAMIC PROGRAMMING ---
  {
    id: "dsa-16",
    topic: "Dynamic Programming",
    title: "Climbing Stairs",
    difficulty: "Easy",
    companies: ["Amazon", "TCS", "Accenture", "Infosys"],
    practiceUrl: "https://leetcode.com/problems/climbing-stairs/",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    bruteForce: "Recursion: ways(n) = ways(n-1) + ways(n-2). Time: O(2^N).",
    optimal: "Fibonacci pattern DP with two variables space optimization.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int climbStairs(int n) {\n    if (n <= 2) return n;\n    int prev2 = 1, prev1 = 2;\n    for (int i = 3; i <= n; i++) {\n        int cur = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}`,
      java: `public int climbStairs(int n) {\n    if (n <= 2) return n;\n    int prev2 = 1, prev1 = 2;\n    for (int i = 3; i <= n; i++) {\n        int cur = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}`,
      python: `def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b`
    }
  },
  {
    id: "dsa-17",
    topic: "Dynamic Programming",
    title: "Coin Change (Min Coins)",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft", "Paytm"],
    practiceUrl: "https://leetcode.com/problems/coin-change/",
    description: "You are given an integer array coins and an integer amount. Return fewest number of coins that you need to make up that amount, or -1.",
    bruteForce: "Recursive exploration of all combinations. Exponential time O(S^N).",
    optimal: "1D Bottom-up DP: dp[i] = min number of coins for amount i. dp[i] = min(dp[i], 1 + dp[i - coin]).",
    timeComplexity: "O(amount * len(coins))",
    spaceComplexity: "O(amount)",
    code: {
      cpp: `int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int c : coins) {\n            if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
      java: `public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int c : coins) {\n            if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
      python: `def coinChange(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0:\n                dp[i] = min(dp[i], 1 + dp[i - c])\n    return dp[amount] if dp[amount] != float('inf') else -1`
    }
  },
  {
    id: "dsa-18",
    topic: "Dynamic Programming",
    title: "Longest Increasing Subsequence (LIS)",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "Adobe"],
    practiceUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    bruteForce: "Generate all 2^N subsequences and check if increasing. Time: O(2^N).",
    optimal: "Patience Sorting / Binary Search (lower_bound): Maintain a list tails where tails[i] stores smallest tail of all increasing subsequences of length i+1.",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `int lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return tails.size();\n}`,
      java: `public int lengthOfLIS(int[] nums) {\n    List<Integer> tails = new ArrayList<>();\n    for (int x : nums) {\n        int idx = Collections.binarySearch(tails, x);\n        if (idx < 0) idx = -(idx + 1);\n        if (idx == tails.size()) tails.add(x);\n        else tails.set(idx, x);\n    }\n    return tails.size();\n}`,
      python: `import bisect\ndef lengthOfLIS(nums: list[int]) -> int:\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n    return len(tails)`
    }
  }
];

const DSA_SHEET_STORAGE_KEY = "portal_dsa_sheet_progress";
const DSA_NOTES_STORAGE_KEY = "portal_dsa_user_notes";

function getDsaSheet() {
  const saved = localStorage.getItem(DSA_SHEET_STORAGE_KEY);
  if (!saved) {
    // initialize with default status = "todo"
    const sheetWithStatus = initialDsaSheet.map(item => ({
      ...item,
      status: "todo", // "todo" | "in_progress" | "done" | "revision"
      bookmarked: false
    }));
    localStorage.setItem(DSA_SHEET_STORAGE_KEY, JSON.stringify(sheetWithStatus));
    return sheetWithStatus;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return initialDsaSheet;
  }
}

function updateProblemStatus(problemId, status) {
  const sheet = getDsaSheet();
  const problem = sheet.find(p => p.id === problemId);
  if (problem) {
    problem.status = status;
    localStorage.setItem(DSA_SHEET_STORAGE_KEY, JSON.stringify(sheet));
  }
  return sheet;
}

function toggleDsaBookmark(problemId) {
  const sheet = getDsaSheet();
  const problem = sheet.find(p => p.id === problemId);
  if (problem) {
    problem.bookmarked = !problem.bookmarked;
    localStorage.setItem(DSA_SHEET_STORAGE_KEY, JSON.stringify(sheet));
  }
  return sheet;
}

function getProblemNotes(problemId) {
  const allNotes = JSON.parse(localStorage.getItem(DSA_NOTES_STORAGE_KEY) || "{}");
  return allNotes[problemId] || "";
}

function saveProblemNotes(problemId, notesText) {
  const allNotes = JSON.parse(localStorage.getItem(DSA_NOTES_STORAGE_KEY) || "{}");
  allNotes[problemId] = notesText;
  localStorage.setItem(DSA_NOTES_STORAGE_KEY, JSON.stringify(allNotes));
}

function getDsaStats() {
  const sheet = getDsaSheet();
  const total = sheet.length;
  const solved = sheet.filter(p => p.status === "done").length;
  const inProgress = sheet.filter(p => p.status === "in_progress").length;
  const revision = sheet.filter(p => p.status === "revision").length;
  const easy = {
    total: sheet.filter(p => p.difficulty === "Easy").length,
    solved: sheet.filter(p => p.difficulty === "Easy" && p.status === "done").length
  };
  const medium = {
    total: sheet.filter(p => p.difficulty === "Medium").length,
    solved: sheet.filter(p => p.difficulty === "Medium" && p.status === "done").length
  };
  const hard = {
    total: sheet.filter(p => p.difficulty === "Hard").length,
    solved: sheet.filter(p => p.difficulty === "Hard" && p.status === "done").length
  };

  // Group by topic
  const topicsMap = {};
  sheet.forEach(p => {
    if (!topicsMap[p.topic]) {
      topicsMap[p.topic] = { total: 0, solved: 0 };
    }
    topicsMap[p.topic].total++;
    if (p.status === "done") topicsMap[p.topic].solved++;
  });

  return {
    total,
    solved,
    inProgress,
    revision,
    percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
    easy,
    medium,
    hard,
    topicsMap
  };
}

window.DsaDB = {
  getDsaSheet,
  updateProblemStatus,
  toggleDsaBookmark,
  getProblemNotes,
  saveProblemNotes,
  getDsaStats
};
