export const sortingAlgorithms = {
  bubbleSort: {
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
  },
  
  selectionSort: {
    java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[minIdx], arr[i]);
    }
}`
  },

  insertionSort: {
    java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    cpp: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
  },

  mergeSort: {
    java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
    python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]
        
        merge_sort(left_half)
        merge_sort(right_half)
        
        i = j = k = 0
        
        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1
        
        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1
        
        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
    
    return arr`,
    cpp: `void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`
  },

  quickSort: {
    java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}`,
    python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
  },

  radixSort: {
    java: `public static void radixSort(int[] arr) {
    int max = getMax(arr);
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, exp);
}

public static int getMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++)
        if (arr[i] > max)
            max = arr[i];
    return max;
}

public static void countSort(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}`,
    python: `def radix_sort(arr):
    max_num = max(arr)
    exp = 1
    while max_num // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1
    
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1
    
    for i in range(n):
        arr[i] = output[i]`,
    cpp: `int getMax(vector<int>& arr) {
    return *max_element(arr.begin(), arr.end());
}

void countSort(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    vector<int> count(10, 0);
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    int max = getMax(arr);
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, exp);
}`
  },

  bucketSort: {
    java: `public static void bucketSort(float[] arr) {
    int n = arr.length;
    if (n <= 0) return;
    
    @SuppressWarnings("unchecked")
    ArrayList<Float>[] buckets = new ArrayList[n];
    
    for (int i = 0; i < n; i++)
        buckets[i] = new ArrayList<Float>();
    
    for (int i = 0; i < n; i++) {
        int bucketIndex = (int) (n * arr[i]);
        buckets[bucketIndex].add(arr[i]);
    }
    
    for (int i = 0; i < n; i++)
        Collections.sort(buckets[i]);
    
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i].get(j);
        }
    }
}`,
    python: `def bucket_sort(arr):
    if len(arr) == 0:
        return arr
    
    bucket_count = len(arr)
    buckets = [[] for _ in range(bucket_count)]
    
    for num in arr:
        bucket_index = int(bucket_count * num)
        buckets[bucket_index].append(num)
    
    for bucket in buckets:
        bucket.sort()
    
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result`,
    cpp: `void bucketSort(vector<float>& arr) {
    int n = arr.size();
    vector<vector<float>> buckets(n);
    
    for (int i = 0; i < n; i++) {
        int bucketIndex = n * arr[i];
        buckets[bucketIndex].push_back(arr[i]);
    }
    
    for (int i = 0; i < n; i++)
        sort(buckets[i].begin(), buckets[i].end());
    
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i][j];
        }
    }
}`
  },

  heapSort: {
    java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
    }
}

public static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        
        heapify(arr, n, largest);
    }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[i] < arr[left]:
        largest = left
    
    if right < n and arr[largest] < arr[right]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
  },

  timSort: {
    java: `// Tim Sort is built into Java's Arrays.sort()
public static void timSort(int[] arr) {
    Arrays.sort(arr);
}

// Manual implementation would be complex
// involving merge sort and insertion sort hybrid`,
    python: `# Tim Sort is built into Python's sorted() and list.sort()
def tim_sort(arr):
    return sorted(arr)

# Or in-place:
# arr.sort()`,
    cpp: `// Tim Sort is available in C++20 std::ranges::sort
// Manual implementation using stable_sort as approximation
void timSort(vector<int>& arr) {
    stable_sort(arr.begin(), arr.end());
}`
  },

  introSort: {
    java: `// Introspective Sort implementation
public static void introSort(int[] arr) {
    int depthLimit = 2 * (int)(Math.log(arr.length) / Math.log(2));
    introSortUtil(arr, 0, arr.length - 1, depthLimit);
}

private static void introSortUtil(int[] arr, int low, int high, int depthLimit) {
    if (high - low > 16) {
        if (depthLimit == 0) {
            heapSort(arr, low, high);
            return;
        }
        
        depthLimit--;
        int pivot = partition(arr, low, high);
        introSortUtil(arr, low, pivot - 1, depthLimit);
        introSortUtil(arr, pivot + 1, high, depthLimit);
    } else {
        insertionSort(arr, low, high);
    }
}`,
    python: `import math

def intro_sort(arr):
    max_depth = 2 * int(math.log2(len(arr)))
    intro_sort_util(arr, 0, len(arr) - 1, max_depth)

def intro_sort_util(arr, low, high, depth_limit):
    if high - low > 16:
        if depth_limit == 0:
            heap_sort_range(arr, low, high)
            return
        
        depth_limit -= 1
        pivot = partition(arr, low, high)
        intro_sort_util(arr, low, pivot - 1, depth_limit)
        intro_sort_util(arr, pivot + 1, high, depth_limit)
    else:
        insertion_sort_range(arr, low, high)`,
    cpp: `#include <algorithm>

void introSort(vector<int>& arr) {
    // C++ std::sort typically uses introsort
    sort(arr.begin(), arr.end());
}

// Manual implementation
void introSortUtil(vector<int>& arr, int low, int high, int depthLimit) {
    if (high - low > 16) {
        if (depthLimit == 0) {
            make_heap(arr.begin() + low, arr.begin() + high + 1);
            sort_heap(arr.begin() + low, arr.begin() + high + 1);
            return;
        }
        
        depthLimit--;
        int pivot = partition(arr, low, high);
        introSortUtil(arr, low, pivot - 1, depthLimit);
        introSortUtil(arr, pivot + 1, high, depthLimit);
    } else {
        // Use insertion sort for small arrays
        for (int i = low + 1; i <= high; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= low && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`
  },


cycleSort: {
        java: `
        void cycleSort(int arr[]) {
        int n = arr.length;
        for (int cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
            int item = arr[cycle_start];
            int pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
            if (arr[i] < item) pos++;
            if (pos == cycle_start) continue;
            while (item == arr[pos]) pos++;
            int temp = arr[pos]; arr[pos] = item; item = temp;
            while (pos != cycle_start) {
            pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
                if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            temp = arr[pos]; arr[pos] = item; item = temp;
            }
        }
        }
        `,
        python: `
        def cycle_sort(arr):
            n = len(arr)
            for cycle_start in range(0, n - 1):
                item = arr[cycle_start]
                pos = cycle_start
                for i in range(cycle_start + 1, n):
                    if arr[i] < item:
                        pos += 1
                if pos == cycle_start:
                    continue
                while item == arr[pos]:
                    pos += 1
                arr[pos], item = item, arr[pos]
                while pos != cycle_start:
                    pos = cycle_start
                    for i in range(cycle_start + 1, n):
                        if arr[i] < item:
                            pos += 1
                    while item == arr[pos]:
                        pos += 1
                    arr[pos], item = item, arr[pos]
        `,
        cpp: `
        void cycleSort(int arr[], int n) {
        for (int cycle_start = 0; cycle_start <= n - 2; cycle_start++) {
            int item = arr[cycle_start];
            int pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
            if (arr[i] < item) pos++;
            if (pos == cycle_start) continue;
            while (item == arr[pos]) pos++;
            swap(item, arr[pos]);
            while (pos != cycle_start) {
            pos = cycle_start;
            for (int i = cycle_start + 1; i < n; i++)
                if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            swap(item, arr[pos]);
            }
        }
        }
        `,
        },




  shellSort: {
    java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`,
    python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    
    return arr`,
    cpp: `void shellSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`
  },

  countingSort: {
    java: `public static void countingSort(int[] arr) {
    int n = arr.length;
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    
    int[] count = new int[range];
    int[] output = new int[n];
    
    for (int i = 0; i < n; i++)
        count[arr[i] - min]++;
    
    for (int i = 1; i < count.length; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}`,
    python: `def counting_sort(arr):
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    count = [0] * range_val
    output = [0] * len(arr)
    
    for num in arr:
        count[num - min_val] += 1
    
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output`,
    cpp: `void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    vector<int> count(range, 0);
    vector<int> output(arr.size());
    
    for (int num : arr)
        count[num - minVal]++;
    
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    arr = output;
}`
  }

  
};

export const searchAlgorithms = {
  linearSearch: {
    java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    cpp: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`
  },

  binarySearch: {
    java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return -1;
}`,
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
    cpp: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return -1;
}`
  }
};

export const graphAlgorithms = {
  bfs: {
    java: `public static void BFS(ArrayList<ArrayList<Integer>> adj, int start) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> queue = new LinkedList<>();
    
    visited[start] = true;
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}`,
    python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result`,

    cpp: `void BFS(vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
javascript: `function BFS(adj, start) {
    let visited = new Array(adj.length).fill(false);
    let q = [];

    visited[start] = true;
    q.push(start);

    while (q.length > 0) {
        let node = q.shift();  // dequeue
        process.stdout.write(node + " "); // similar to cout in C++

        for (let neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
`
  },

  dfs: {
    java: `public static void DFS(ArrayList<ArrayList<Integer>> adj, int node, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) {
            DFS(adj, neighbor, visited);
        }
    }
}`,
    python: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    result = [node]
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result`,
    cpp: `void DFS(vector<vector<int>>& adj, int node, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            DFS(adj, neighbor, visited);
        }
    }
}`
  },

  dijkstra: {
    java: `public static int[] dijkstra(int[][] graph, int src) {
    int V = graph.length;
    int[] dist = new int[V];
    boolean[] sptSet = new boolean[V];
    
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = true;
        
        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] != 0 && 
                dist[u] != Integer.MAX_VALUE && 
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    return dist;
}`,
    python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
        
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances`,
    cpp: `vector<int> dijkstra(vector<vector<pair<int, int>>>& graph, int src) {
    int V = graph.size();
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        for (auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}`
  },

  bellmanFord: {
    java: `public static boolean bellmanFord(int[][] edges, int V, int src, int[] dist) {
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (int[] edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
            return false; // Negative cycle detected
        }
    }
    
    return true;
}`,
    python: `def bellman_ford(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    
    for _ in range(len(graph) - 1):
        for node in graph:
            for neighbor, weight in graph[node].items():
                if distances[node] + weight < distances[neighbor]:
                    distances[neighbor] = distances[node] + weight
    
    # Check for negative cycles
    for node in graph:
        for neighbor, weight in graph[node].items():
            if distances[node] + weight < distances[neighbor]:
                return None  # Negative cycle detected
    
    return distances`,
    cpp: `bool bellmanFord(vector<vector<int>>& edges, int V, int src, vector<int>& dist) {
    dist.assign(V, INT_MAX);
    dist[src] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (auto& edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
            return false; // Negative cycle detected
        }
    }
    
    return true;
}`
  },

  floydWarshall: {
    java: `public static void floydWarshall(int[][] graph) {
    int V = graph.length;
    int[][] dist = new int[V][V];
    
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            dist[i][j] = graph[i][j];
        }
    }
    
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
    python: `def floyd_warshall(graph):
    V = len(graph)
    dist = [[float('inf')] * V for _ in range(V)]
    
    for i in range(V):
        for j in range(V):
            if i == j:
                dist[i][j] = 0
            elif graph[i][j] != 0:
                dist[i][j] = graph[i][j]
    
    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    
    return dist`,
    cpp: `void floydWarshall(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<vector<int>> dist = graph;
    
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`
  }
};

export const otherAlgorithms = {
  // ...existing code...
};

export const linkedListAlgorithms = {
  insertAtBeginning: {
    java: `public void insertAtBeginning(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
    size++;
}

class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}`,
    python: `def insert_at_beginning(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
    self.size += 1

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None`,
    cpp: `void insertAtBeginning(int data) {
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
    size++;
}

struct Node {
    int data;
    Node* next;
    
    Node(int data) {
        this->data = data;
        this->next = nullptr;
    }
};`
  },

  insertAtEnd: {
    java: `public void insertAtEnd(int data) {
    Node newNode = new Node(data);
    
    if (head == null) {
        head = newNode;
        size++;
        return;
    }
    
    Node current = head;
    while (current.next != null) {
        current = current.next;
    }
    
    current.next = newNode;
    size++;
}`,
    python: `def insert_at_end(self, data):
    new_node = Node(data)
    
    if not self.head:
        self.head = new_node
        self.size += 1
        return
    
    current = self.head
    while current.next:
        current = current.next
    
    current.next = new_node
    self.size += 1`,
    cpp: `void insertAtEnd(int data) {
    Node* newNode = new Node(data);
    
    if (head == nullptr) {
        head = newNode;
        size++;
        return;
    }
    
    Node* current = head;
    while (current->next != nullptr) {
        current = current->next;
    }
    
    current->next = newNode;
    size++;
}`
  },

  insertAtPosition: {
    java: `public void insertAtPosition(int data, int position) {
    if (position < 0 || position > size) {
        throw new IndexOutOfBoundsException("Invalid position");
    }
    
    if (position == 0) {
        insertAtBeginning(data);
        return;
    }
    
    Node newNode = new Node(data);
    Node current = head;
    
    for (int i = 0; i < position - 1; i++) {
        current = current.next;
    }
    
    newNode.next = current.next;
    current.next = newNode;
    size++;
}`,
    python: `def insert_at_position(self, data, position):
    if position < 0 or position > self.size:
        raise IndexError("Invalid position")
    
    if position == 0:
        self.insert_at_beginning(data)
        return
    
    new_node = Node(data)
    current = self.head
    
    for i in range(position - 1):
        current = current.next
    
    new_node.next = current.next
    current.next = new_node
    self.size += 1`,
    cpp: `void insertAtPosition(int data, int position) {
    if (position < 0 || position > size) {
        throw std::out_of_range("Invalid position");
    }
    
    if (position == 0) {
        insertAtBeginning(data);
        return;
    }
    
    Node* newNode = new Node(data);
    Node* current = head;
    
    for (int i = 0; i < position - 1; i++) {
        current = current->next;
    }
    
    newNode->next = current->next;
    current->next = newNode;
    size++;
}`
  },

  deleteNode: {
    java: `public boolean delete(int data) {
    if (head == null) return false;
    
    // Delete head node
    if (head.data == data) {
        head = head.next;
        size--;
        return true;
    }
    
    Node current = head;
    while (current.next != null) {
        if (current.next.data == data) {
            current.next = current.next.next;
            size--;
            return true;
        }
        current = current.next;
    }
    
    return false; // Node not found
}`,
    python: `def delete(self, data):
    if not self.head:
        return False
    
    # Delete head node
    if self.head.data == data:
        self.head = self.head.next
        self.size -= 1
        return True
    
    current = self.head
    while current.next:
        if current.next.data == data:
            current.next = current.next.next
            self.size -= 1
            return True
        current = current.next
    
    return False  # Node not found`,
    cpp: `bool deleteNode(int data) {
    if (head == nullptr) return false;
    
    // Delete head node
    if (head->data == data) {
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
        return true;
    }
    
    Node* current = head;
    while (current->next != nullptr) {
        if (current->next->data == data) {
            Node* temp = current->next;
            current->next = current->next->next;
            delete temp;
            size--;
            return true;
        }
        current = current->next;
    }
    
    return false; // Node not found
}`
  },

  deleteAtPosition: {
    java: `public boolean deleteAtPosition(int position) {
    if (position < 0 || position >= size || head == null) {
        return false;
    }
    
    // Delete head node
    if (position == 0) {
        head = head.next;
        size--;
        return true;
    }
    
    Node current = head;
    for (int i = 0; i < position - 1; i++) {
        current = current.next;
    }
    
    current.next = current.next.next;
    size--;
    return true;
}`,
    python: `def delete_at_position(self, position):
    if position < 0 or position >= self.size or not self.head:
        return False
    
    # Delete head node
    if position == 0:
        self.head = self.head.next
        self.size -= 1
        return True
    
    current = self.head
    for i in range(position - 1):
        current = current.next
    
    current.next = current.next.next
    self.size -= 1
    return True`,
    cpp: `bool deleteAtPosition(int position) {
    if (position < 0 || position >= size || head == nullptr) {
        return false;
    }
    
    // Delete head node
    if (position == 0) {
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
        return true;
    }
    
    Node* current = head;
    for (int i = 0; i < position - 1; i++) {
        current = current->next;
    }
    
    Node* temp = current->next;
    current->next = current->next->next;
    delete temp;
    size--;
    return true;
}`
  },

  traverse: {
    java: `public void traverse() {
    Node current = head;
    System.out.print("LinkedList: ");
    
    while (current != null) {
        System.out.print(current.data + " -> ");
        current = current.next;
    }
    
    System.out.println("null");
}

public void traverseRecursive(Node node) {
    if (node == null) {
        System.out.println("null");
        return;
    }
    
    System.out.print(node.data + " -> ");
    traverseRecursive(node.next);
}`,
    python: `def traverse(self):
    current = self.head
    result = []
    
    while current:
        result.append(current.data)
        current = current.next
    
    print(" -> ".join(map(str, result)) + " -> None")
    return result

def traverse_recursive(self, node):
    if not node:
        print("None")
        return []
    
    result = [node.data]
    print(f"{node.data} -> ", end="")
    result.extend(self.traverse_recursive(node.next))
    return result`,
    cpp: `void traverse() {
    Node* current = head;
    cout << "LinkedList: ";
    
    while (current != nullptr) {
        cout << current->data << " -> ";
        current = current->next;
    }
    
    cout << "null" << endl;
}

void traverseRecursive(Node* node) {
    if (node == nullptr) {
        cout << "null" << endl;
        return;
    }
    
    cout << node->data << " -> ";
    traverseRecursive(node->next);
}`
  },

  reverse: {
    java: `public void reverse() {
    Node prev = null;
    Node current = head;
    Node next = null;
    
    while (current != null) {
        next = current.next;  // Store next node
        current.next = prev;  // Reverse the link
        prev = current;       // Move prev forward
        current = next;       // Move current forward
    }
    
    head = prev; // Update head to the new first node
}

public Node reverseRecursive(Node node) {
    // Base case
    if (node == null || node.next == null) {
        return node;
    }
    
    // Recursively reverse the rest of the list
    Node newHead = reverseRecursive(node.next);
    
    // Reverse the current connection
    node.next.next = node;
    node.next = null;
    
    return newHead;
}`,
    python: `def reverse(self):
    prev = None
    current = self.head
    
    while current:
        next_node = current.next  # Store next node
        current.next = prev       # Reverse the link
        prev = current            # Move prev forward
        current = next_node       # Move current forward
    
    self.head = prev  # Update head to the new first node

def reverse_recursive(self, node):
    # Base case
    if not node or not node.next:
        return node
    
    # Recursively reverse the rest of the list
    new_head = self.reverse_recursive(node.next)
    
    # Reverse the current connection
    node.next.next = node
    node.next = None
    
    return new_head`,
    cpp: `void reverse() {
    Node* prev = nullptr;
    Node* current = head;
    Node* next = nullptr;
    
    while (current != nullptr) {
        next = current->next;     // Store next node
        current->next = prev;     // Reverse the link
        prev = current;           // Move prev forward
        current = next;           // Move current forward
    }
    
    head = prev; // Update head to the new first node
}

Node* reverseRecursive(Node* node) {
    // Base case
    if (node == nullptr || node->next == nullptr) {
        return node;
    }
    
    // Recursively reverse the rest of the list
    Node* newHead = reverseRecursive(node->next);
    
    // Reverse the current connection
    node->next->next = node;
    node->next = nullptr;
    
    return newHead;
}`
  },

  search: {
    java: `public int search(int data) {
    Node current = head;
    int position = 0;
    
    while (current != null) {
        if (current.data == data) {
            return position;
        }
        current = current.next;
        position++;
    }
    
    return -1; // Not found
}

public boolean contains(int data) {
    return search(data) != -1;
}`,
    python: `def search(self, data):
    current = self.head
    position = 0
    
    while current:
        if current.data == data:
            return position
        current = current.next
        position += 1
    
    return -1  # Not found

def contains(self, data):
    return self.search(data) != -1`,
    cpp: `int search(int data) {
    Node* current = head;
    int position = 0;
    
    while (current != nullptr) {
        if (current->data == data) {
            return position;
        }
        current = current->next;
        position++;
    }
    
    return -1; // Not found
}

bool contains(int data) {
    return search(data) != -1;
}`
  },

  getSize: {
    java: `public int getSize() {
    return size;
}

public int getSizeByTraversal() {
    int count = 0;
    Node current = head;
    
    while (current != null) {
        count++;
        current = current.next;
    }
    
    return count;
}`,
    python: `def get_size(self):
    return self.size

def get_size_by_traversal(self):
    count = 0
    current = self.head
    
    while current:
        count += 1
        current = current.next
    
    return count`,
    cpp: `int getSize() {
    return size;
}

int getSizeByTraversal() {
    int count = 0;
    Node* current = head;
    
    while (current != nullptr) {
        count++;
        current = current->next;
    }
    
    return count;
}`
  },

  clear: {
    java: `public void clear() {
    head = null;
    size = 0;
}

public boolean isEmpty() {
    return head == null;
}`,
    python: `def clear(self):
    self.head = None
    self.size = 0

def is_empty(self):
    return self.head is None`,
    cpp: `void clear() {
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
    size = 0;
}

bool isEmpty() {
    return head == nullptr;
}`
  }
};

