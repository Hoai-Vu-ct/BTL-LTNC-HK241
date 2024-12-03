# python -m cProfile -s time test.py
import time

from memory_profiler import memory_usage
from search import filter_data, filter_data2


# Test scenarios
test_cases = [
    {"min_amount": 1000, "max_amount": 50000, "search_term": None},
    {"min_amount": 3000, "max_amount": 4000, "search_term": None},
    {"min_amount": None, "max_amount": None, "search_term": "Hoai"},
    {"min_amount": 5000, "max_amount": 20000, "search_term": "Vu"},
]

# Function to test performance
def test_performance(test_case):
    start_time = time.perf_counter()  # Start time
    mem_usage = memory_usage((filter_data2, (), test_case), interval=0.1)  # Measure memory usage
    end_time = time.perf_counter()  # End time

    execution_time = end_time - start_time
    peak_memory = max(mem_usage)

    return execution_time, peak_memory

# Run tests
results = []
for i, case in enumerate(test_cases):
    print(f"Running test case {i + 1}: {case}")
    execution_time, peak_memory = test_performance(case)
    results.append((case, execution_time, peak_memory))
    print(f"Execution Time: {execution_time:.4f}s, Peak Memory: {peak_memory:.2f} MB")

# Display summary
print("\nSummary:")
for i, (case, exec_time, mem) in enumerate(results):
    print(f"Test Case {i + 1}: {case}")
    print(f"  Execution Time: {exec_time:.4f}s")
    print(f"  Peak Memory: {mem:.2f} MB")
