from search import load_data
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
file_name = "data/chuyen_khoan.csv"
file_path = os.path.join(current_dir, file_name)
bank_data = load_data(file_path)

sum = 0
count = 0

for row in bank_data:
    sum += row['transaction_amount']
    count += 1

print(sum)
print(count)