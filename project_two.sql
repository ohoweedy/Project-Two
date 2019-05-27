-- DROP DATABASE IF EXISTS ProjectTwo_db;
-- CREATE DATABASE ProjectTwo_db;

USE ProjectTwo_db;

-- CREATE TABLE crime_data (
-- Index_Number INT,
-- CrimeDate TEXT,
-- CrimeTime TEXT,
-- Location_Name TEXT,
-- Description TEXT,
-- Weapon TEXT,
-- District TEXT,
-- Neighborhood TEXT,
-- Longitude FLOAT,   
-- Latitude FLOAT,
-- Exact_Location TEXT,
-- Total_Incidents INT,
-- PRIMARY KEY (Index_Number)
-- );

SELECT * FROM crime_data;

-- Select Neighborhood, Description , COUNT(Total_Incidents) AS 'total_crime'
	-- FROM crime_data
    -- GROUP BY Neighborhood, Description;

Select Description 
	FROM crime_data
		GROUP BY Description;
        
