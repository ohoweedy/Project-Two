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
connection_string = "root:Miamiheat5@localhost/ProjectTwo_db"
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

@app.route("/analysis")
def analysis():
    """Return the homepage."""
    return render_template("analysis.html")

@app.route("/conclusion")
def conclusion():
    """Return the conclusion."""
    return render_template("conclusion.html")

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
    session.close()
    return jsonify(baltimore_list)

@app.route("/api/v1.0/baltimore_group")
def baltimore_group():
    """Return json representation of baltimore total crime data query results"""
    # groupby = session.query(
    #     Baltimore_Crime.Neighborhood, 
    #     Baltimore_Crime.Description, 
    #     func.count(Baltimore_Crime.Total_Incidents)
    #     ).group_by(Baltimore_Crime.Neighborhood,Baltimore_Crime.Description).all()
    # session.close()

    crime_tot = list(engine.execute("""Select Neighborhood, Description , COUNT(Total_Incidents) AS 'total_crime'
	FROM projecttwo_db.crime_data
    GROUP BY Neighborhood, Description;""").fetchall())
    #print(crime_tot)

    # gb_dict = {
    #     "Neighborhood": groupby[0][7]
    # }


    new_dict = {}
    for row in crime_tot:
        if row[0] is None :
            new_dict.update({"Empty Neighborhood" : {}})
        else:
            new_dict.update({row[0] : {}})

            #new_dict[row[0]].update({row[1] : row[2]})
    for dicts in new_dict:
        for row in crime_tot:
            if (dicts == row[0]):
                new_dict[dicts].update({"Neighborhood": row[0]})
                new_dict[dicts].update({row[1]:row[2]})

    return jsonify(new_dict)

if __name__ == '__main__':
    app.run(debug=True)
