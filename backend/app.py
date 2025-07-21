import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from blockchain.record import record_on_blockchain
from models.analyze import analyze_artwork

load_dotenv()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_artwork():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        # Run AI analysis (stub)
        result = analyze_artwork(filepath)
        # Record on blockchain (stub)
        tx_hash = record_on_blockchain(result)
        return jsonify({'result': result, 'tx_hash': tx_hash}), 200
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/api/provenance/<art_id>', methods=['GET'])
def get_provenance(art_id):
    # Stub: Return mock provenance data
    return jsonify({
        'art_id': art_id,
        'history': [
            {'owner': 'Alice', 'date': '2023-01-01', 'tx': '0x123'},
            {'owner': 'Bob', 'date': '2024-01-01', 'tx': '0x456'}
        ]
    })

if __name__ == '__main__':
    app.run(debug=True) 