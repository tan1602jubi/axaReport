import pymongo
import threading
import sys
import os
import pandas as pd
import numpy as np
from datetime import datetime, timezone, timedelta
from flask import Flask, jsonify, request, render_template
from flask_wtf.csrf import CSRFProtect
# from flask_cors import CORS, cross_origin
import json
import re

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config.update(dict(
    SECRET_KEY="unhandledQueries",
    WTF_CSRF_SECRET_KEY="unhandledQueriesCSRF"
))

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html', name='index')

@csrf.exempt
@app.route('/calculation', methods=['POST'])
def getFile():
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            print('No file selected for uploading')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join('/home/jubi/Jubi/local/axaReports/files/', filename))
            print('File successfully uploaded')
            return redirect('/')
        else:
            flash('Allowed file types are txt, pdf, png, jpg, jpeg, gif')
            return redirect(request.url)
    
    return jsonify(url=url, projectId=projectId)

@app.route("/downloadXlsx")
def downloadxl():
    print(url, "GGGGGGGGGGGGGGGGGGGGGGGGGg")
    return render_template('downloadExcel.html', name='downloadpage', url=url)


if __name__ == '__main__':

    port = int(os.environ.get("PORT", 7333))    
    app.run(host='0.0.0.0', port=port, threaded = True)
    #app.run_server(host='0.0.0.0', port=port,threaded = True)
