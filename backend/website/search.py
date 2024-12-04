import csv
import os
import re
from collections import defaultdict
from bisect import bisect_left, bisect_right

# Function to load and preprocess data
def load_data(file_path):
    #print("Loading data...")
    data = []
    with open(file_path, 'r', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Add a new 'transaction_amount' column as the max of 'credit' and 'debit' (since its one or the other)
            row['credit'] = float(row['credit']) if row['credit'] else 0
            row['debit'] = float(row['debit']) if row['debit'] else 0
            row['transaction_amount'] = max(row['credit'], row['debit'])
            data.append(row)
    return data

# Preload the dataset
current_dir = os.path.dirname(os.path.abspath(__file__))
file_name = "data/chuyen_khoan.csv"
file_path = os.path.join(current_dir, file_name)
bank_data = load_data(file_path)


###### Linear search

# Filter function
def filter_data(min_amount=None, max_amount=None, search_term=None):
    filtered_data = bank_data

    # Apply filters
    if min_amount is not None:
        filtered_data = [row for row in filtered_data if row['transaction_amount'] >= min_amount]
    if max_amount is not None:
        filtered_data = [row for row in filtered_data if row['transaction_amount'] <= max_amount]
    if search_term:
        search_term = search_term.lower()
        filtered_data = [row for row in filtered_data if search_term in row['detail'].lower()]

    return filtered_data


###### Search using Inverted index + Buckets - should be faster but idk it's kinda negligible

# Build the inverted index + buckets
#bucket_size = 1000      
bucket_size = 5000
buckets = defaultdict(list)
inverted_index = defaultdict(list)

for i, row in enumerate(bank_data):
    # Inverted index
    #words = row['detail'].lower().split()      # Split by spaces
    words = re.findall(r'\b\w+\b', row['detail'].lower())   # Split by all special character (',' '.' ' ' ...)
    for word in words:
        inverted_index[word].append(i)
    # Bucketing
    bucket_id = int(row['transaction_amount'] // bucket_size)
    buckets[bucket_id].append((row['transaction_amount'], i))  # Store amount and index

# Sort each bucket by transaction amount
for bucket_id in buckets:
    buckets[bucket_id].sort()

# Search function
def filter_data2(min_amount=None, max_amount=None, search_term=None):
    matching_indices = set(range(len(bank_data)))
    
    # Handle matching indices for the search term   
    if search_term:
        #words = search_term.lower().split()
        words = re.findall(r'\b\w+\b', search_term.lower())     # Split by all special character (',' '.' ' ' ...)
        term_matches = None  # Start with no matches

        for word in words:
            if word in inverted_index:
                word_matches = set(inverted_index[word])    
                if term_matches is None:
                    term_matches = word_matches  # Initialize with first word's matches
                else:
                    term_matches &= word_matches # AND
            else:
                term_matches = set()  # If a word has no matched, the result is empty (cuz AND)
                break

        matching_indices &= term_matches

    # Handle transaction amount range filtering
    if min_amount is not None or max_amount is not None:
        amount_matches = set()

        # Bucket ID range
        min_bucket_id = int(min_amount // bucket_size) if min_amount is not None else None
        max_bucket_id = int(max_amount // bucket_size) if max_amount is not None else None

        for bucket_id, records in buckets.items():
            # Skip buckets outside the range
            if (min_bucket_id is not None and bucket_id < min_bucket_id) or \
            (max_bucket_id is not None and bucket_id > max_bucket_id):
                continue

            # Perform binary search to find the range of relevant data
            amounts = [record[0] for record in records]  # Transaction amount
            lower_idx = bisect_left(amounts, min_amount) if min_amount is not None else 0
            upper_idx = bisect_right(amounts, max_amount) if max_amount is not None else len(amounts)

            # Add the relevant indices to the matches
            amount_matches.update(record[1] for record in records[lower_idx:upper_idx])     # index
        
        matching_indices &= amount_matches

    return [bank_data[i] for i in matching_indices]
