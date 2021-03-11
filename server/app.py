from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from config import main_config
from selenium import webdriver
from collections import defaultdict

import datetime
import re

app = Flask(__name__)
app.config.from_object(main_config["development"])
app.config["CORS_ORIGINS"] = ["http://localhost:3000", "*"]
app.config["CORS_HEADERS"] = ["Content-Type"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
db.init_app(app)

from models import ParsedText


@app.route("/api/parse", methods=["POST", "GET"])
@cross_origin(headers=["Content-Type"])
def parse_search():
    print(request.json)
    if request.method == "POST":
        website_url = request.json["url"]
        driver = webdriver.Chrome("chromedriver")
        driver.get(website_url)
        el = driver.find_element_by_tag_name("body")

        print("Split start time", datetime.datetime.now())
        pre_processed_text = el.text
        pre_text = re.sub("[^A-Za-z0-9]+", " ", el.text)
        text = pre_text.strip().split()
        print("Split end time", datetime.datetime.now())
        analysis = defaultdict(int)
        for word in text:
            analysis[word] += 1
        driver.close()

        new_instance = ParsedText.ParsedText(
            url=website_url, big_text=pre_processed_text, text_analysis=analysis
        )
        new_instance.save()
        return jsonify(
            {
                "success": "true",
                "url": website_url,
                "text": pre_processed_text,
                "analysis": analysis,
            }
        )
    else:
        return jsonify({"success": "false"})


@app.route("/api/history", methods=["GET"])
@cross_origin(headers=["Content-Type"])
def get_history():
    if request.method == "GET":
        return jsonify(
            history=[e.serialize for e in ParsedText.ParsedText.get_all_results()]
        )
    else:
        return jsonify({"response": "weird method I think... Sorry!"})


if __name__ == "__main__":
    app.run(debug=True)
