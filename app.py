# Imports
# https://stackoverflow.com/questions/454854/no-module-named-mysqldb
import os

from flask import Flask, jsonify, request, render_template
from flask_pymongo import PyMongo

from bson.json_util import dumps

from matplotlib import style
style.use('fivethirtyeight')
import matplotlib.pyplot as plt

import numpy as np
import pandas as pd

import datetime as dt
from datetime import datetime

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

import json
import pymongo

# # Setup connection to mongodb
# conn = "mongodb://localhost:27017"
# client = pymongo.MongoClient(conn)

# # Select database and collection to use
# db = client.geojson
# collection = db.data

# Database Setup
connection_string = "root:D0ntquit!@localhost/ProjectTwo_db"
engine = create_engine(f'mysql://{connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Baltimore_Crime = Base.classes.crime_data

# Create our session (link) from Python to the DB
session = Session(engine)

# Flask Setup
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/geojson'
mongo = PyMongo(app)

# Flask Routes
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/api/v1.0/geojson")
def monwhy():
    geojson = mongo.db.data.find_one()

    # print(mongo.db.data.find_one())

    return dumps(geojson)

@app.route("/api/v1.0/baltimore_crime")
def baltimore_crime():
    """Return json representation of baltimore crime data query results"""
    results = session.query(Baltimore_Crime).all()

    baltimore_list = []

    for crime in results:
        baltimore_dict = {}
        baltimore_dict["Neighborhood"] = crime.Neighborhood
        baltimore_dict["Description"] = crime.Description
        baltimore_dict["Exact_Location"] = crime.Exact_Location
        baltimore_dict["CrimeDate"] = crime.CrimeDate
        baltimore_list.append(baltimore_dict)
    
    return jsonify(baltimore_list)

@app.route("/api/v1.0/baltimore_group")
def baltimore_group():
    """Return json representation of baltimore total crime data query results"""
    groupby = session.query(
        Baltimore_Crime.Neighborhood, 
        Baltimore_Crime.Description, 
        func.count(Baltimore_Crime.Total_Incidents)
        ).group_by(Baltimore_Crime.Neighborhood,Baltimore_Crime.Description).all()
        
    return jsonify(groupby)

if __name__ == '__main__':
    app.run(debug=True)
