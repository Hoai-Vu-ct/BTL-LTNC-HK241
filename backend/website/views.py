from flask import Blueprint, render_template, request, jsonify
from .search import filter_data, filter_data2

views = Blueprint('views', __name__)

@views.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@views.route('/search', methods=['GET'])
# def search():
#     # Extract query parameters
#     min_amount = request.args.get('min_amount', type=float)
#     max_amount = request.args.get('max_amount', type=float)
#     search_term = request.args.get('searchTerm', type=str)

#     # Call the search engine
#     results = filter_data2(min_amount, max_amount, search_term)
#     total_count = len(results)

#     return jsonify({
#         "results": results,
#         "total_count": total_count,
#     })
def search():
    min_amount = request.args.get('min_amount', type=float)
    max_amount = request.args.get('max_amount', type=float)
    search_term = request.args.get('searchTerm', type=str)

    # Sử dụng `filter_data2` để lọc dữ liệu
    results = filter_data2(min_amount=min_amount, max_amount=max_amount, search_term=search_term)

    # Chuyển định dạng ngày và số tiền
    for result in results:
        result['amount'] = f"{result['transaction_amount']:,.0f} đ"
        result['date'] = result['date_time'].split("_")[0]

    return jsonify({
        "results": results,
        "total_count": len(results),
    })
