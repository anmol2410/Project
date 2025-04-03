from flask import Flask, request, jsonify, send_file
from pytubefix import YouTube
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React communication

DOWNLOAD_FOLDER = "downloads"
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route('/download', methods=['POST'])
def download_video():
    try:
        data = request.get_json()
        url = data.get('url')
        if not url:
            return jsonify({'error': 'No URL provided'}), 400

        yt = YouTube(url)
        video = yt.streams.get_highest_resolution()
        file_path = video.download(output_path=DOWNLOAD_FOLDER)

        return send_file(file_path, as_attachment=True, download_name=video.default_filename)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)