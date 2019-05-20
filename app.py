# Imports
from flask import Flask, jsonify
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

# Database Setup
connection_string = "root:Miamiheat5@localhost/ProjectTwo_db"
engine = create_engine(f'mysql://{connection_string}', connect_args={'check_same_thread': False})

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Baltimore_Crime = Base.classes.crime_data

# Create our session (link) from Python to the DB
session = Session(engine)

# Dynamically find the date 1 year ago from the most recent data point date
# r = session.query(Measurement.date).order_by(Measurement.date.desc()).all()
# d = [result[0] for result in r]
# recent_day = datetime.strptime(d[0], '%Y-%m-%d')
# recent_day_year = recent_day.year

# previous_year = recent_day_year - 1

# year_ago = dt.datetime(previous_year, recent_day.month, recent_day.day, 0, 0)
# year_ago = year_ago.strftime('%Y-%m-%d')

# results1 = session.query(Measurement.date).\
#     filter(Measurement.date >= year_ago).all()

# date1 = [result[0] for result in results1]

# one_year_date = date1.sort()
# one_year_date = date1[0]

# Flask Setup
app = Flask(__name__)

# Flask Routes
@app.route("/")
def welcome():
    """List all available api routes"""
    return (
        f"The following is a list of all available api routes for Baltimore Crime:<br/><br/>"
        f"/api/v1.0/baltimore_crime<br/>"
    )

@app.route("/api/v1.0/baltimore_crime")
def baltimore_crime():
    """Return json representation of baltimore crime data query results"""
    results = session.query(Baltimore_Crime.Description, Baltimore_Crime.Exact_Location).\
    order_by(Baltimore_Crime.Exact_Location)
#     filter(Measurement.date >= one_year_date).\
#     filter(Measurement.prcp != "None").all()

    # Convert list of tuples into dictionary with date as the key and prcp's as the value
#     one_year_prcp = dict()
    
    # Updating the dictionary to account for duplicate date keys
#     [one_year_prcp[t[0]].append(t[1]) if t[0] in list(one_year_prcp.keys())
#      else one_year_prcp.update({t[0]: [t[1]]}) for t in results2]
    
    return jsonify(results)

# @app.route("/api/v1.0/stations")
# def stations():
#     """Return a json list of stations from the dataset"""
#     results3 = session.query(Station.station).all()

#     # Convert list of tuples into regular list
#     stations_list = list(np.ravel(results3))

#     return jsonify(stations_list)

# @app.route("/api/v1.0/tobs")
# def tobs():
#     """Return a json list of temperature observations from the previous year"""
#     results4 = session.query(Measurement.date, Measurement.tobs).\
#     order_by(Measurement.date.desc()).\
#     filter(Measurement.date >= one_year_date).all()
    
#     # Convert list of tuples into regular list
#     temps_list = list(np.ravel(results4))
    
#     return jsonify(temps_list)

# @app.route("/api/v1.0/<start>")
# def start(start):
#     """Calculate TMIN, TAVG, and TMAX for all dates greater than and equal to the start date"""
#     results5 = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
#     filter(Measurement.date >= start).all()
    
#     # Convert list of tuples into regular list
#     start_date_temps = list(np.ravel(results5))
    
#     return jsonify(start_date_temps)

# @app.route("/api/v1.0/<start>/<end>")
# def end(start, end):
#     """Calculate the TMIN, TAVG, and TMAX for dates between the start and end date inclusive"""
#     results6 = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
#     filter(Measurement.date >= start).filter(Measurement.date <= end).all()
        
#     # Convert list of tuples into regular list
#     range_date_temps = list(np.ravel(results6))
    
#     return jsonify(range_date_temps)

if __name__ == '__main__':
    app.run(debug=True)
