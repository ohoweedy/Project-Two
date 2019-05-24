import json
import requests

with open('geobalt.geojson', 'r') as f:
    geodata = json.load(f)

with open('Baltimore.json','r') as f:
    zilData = json.load(f)

print(len(zilData['list']['region']))

# # #Loop over GeoJSON features and add the new properties
for feat in geodata['features']:
    for i in range(len(zilData['list']['region'])):
        try:
            if(feat['properties']['Neighborhood'] == zilData['list']['region'][i]['name']):
                feat['properties']['price'] = zilData['list']['region'][i]['zindex']['#text']
        except KeyError:
            feat['properties']['price'] = 0

# # # #Write result to a new file
with open('new.geojson', 'w') as f:
    json.dump(geodata, f)