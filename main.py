import threading
import sys
import os
import pandas as pd
import numpy as np
from datetime import datetime, timezone, timedelta
from flask import Flask, jsonify, request, render_template, redirect
from flask_wtf.csrf import CSRFProtect
# from flask_cors import CORS, cross_origin
import json
import re
import cal

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config.update(dict(
    SECRET_KEY="unhandledQueries",
    WTF_CSRF_SECRET_KEY="unhandledQueriesCSRF"
))

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html', name='index')



@csrf.exempt
@app.route('/upload', methods=['POST', 'GET'])
def getFile():
    if request.method == 'POST':
        print("posttttt")
        if 'file' not in request.files:
            print('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            print('No file selected for uploading')
            return redirect(request.url)
        if file:# and allowed_file(file.filename):
            report, users = cal.calculate(file)
            return jsonify(report=report, users=users)
            print('File successfully uploaded')
            return redirect('/')
        else:
            flash('Allowed file types are txt, pdf, png, jpg, jpeg, gif')
            return redirect(request.url)
    
        
    return render_template('index.html', name='index')

@app.route("/downloadXlsx")
def downloadxl():
    print(url, "GGGGGGGGGGGGGGGGGGGGGGGGGg")
    return render_template('downloadExcel.html', name='downloadpage', url=url)


if __name__ == '__main__':

    port = int(os.environ.get("PORT", 7333))    
    app.run(host='0.0.0.0', port=port, threaded = True)
    #app.run_server(host='0.0.0.0', port=port,threaded = True)
