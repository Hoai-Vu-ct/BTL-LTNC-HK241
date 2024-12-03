from website import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

# Ensure static files
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)