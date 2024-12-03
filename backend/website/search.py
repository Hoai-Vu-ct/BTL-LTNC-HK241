import csv
import os
from collections import defaultdict

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
bucket_size = 2000
buckets = defaultdict(list)
inverted_index = defaultdict(list)

for i, row in enumerate(bank_data):
    # Inverted index
    words = row['detail'].lower().split()
    for word in words:
        inverted_index[word].append(i)
    # Bucketing
    bucket_id = int(row['transaction_amount'] // bucket_size)
    buckets[bucket_id].append(i)
    

# Search function
def filter_data2(min_amount=None, max_amount=None, search_term=None):
    matching_indices = set(range(len(bank_data)))
    
    # Handle matching indices for the search term 
    if search_term:
        search_term = search_term.lower()
        term_matches = set()
        
        for word in inverted_index:
            if search_term in word:
                term_matches.update(inverted_index[word])

        matching_indices &= term_matches

    # Handle transaction amount range filtering
    if min_amount is not None or max_amount is not None:
        amount_matches = set()

        # Bucket ID range
        min_bucket_id = int(min_amount // bucket_size) if min_amount is not None else None
        max_bucket_id = int(max_amount // bucket_size) if max_amount is not None else None

        for bucket_id, indices in buckets.items():
            # Skip buckets outside the range
            if (min_bucket_id is not None and bucket_id < min_bucket_id) or \
            (max_bucket_id is not None and bucket_id > max_bucket_id):
                continue

            # Process buckest in range
            for i in indices:
                transaction_amount = bank_data[i]['transaction_amount']
                if (min_amount is None or transaction_amount >= min_amount) and \
                (max_amount is None or transaction_amount <= max_amount):
                    amount_matches.add(i)
        
        matching_indices &= amount_matches

    return [bank_data[i] for i in matching_indices]
