from controllers.prediction import ml_app
from flask import Flask
import logging
import os
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
load_dotenv()

_logger = logging.getLogger(__name__)

app = Flask(__name__)

# Allow cross-brower resource sharing
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

# register blueprints
app.register_blueprint(ml_app)

if __name__ == "__main__":
    app.run(debug=True)
