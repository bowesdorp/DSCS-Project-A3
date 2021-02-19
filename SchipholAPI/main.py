import dotenv
import os
import requests


def fetch_flight_by_code_and_date(fc, d):

    base_url = 'https://api.schiphol.nl/public-flights/flights'
    query = '?flightName=' + fc + '&scheduleDate=' + d

    url = base_url + query

    headers = {
        'accept': 'application/json',
        'resourceversion': 'v4',
        'app_id': PUBLIC_FLIGHT_APPLICATION_ID,
        'app_key': PUBLIC_FLIGHT_API_KEY
    }

    try:
        response = requests.request('GET', url, headers=headers)
    except requests.exceptions.ConnectionError as error:
        print(error)
        return {"code": 416, "message": "Connection error", "data": []}

    if response.status_code == 200:
        flight_list = response.json()

        return {"code": response.status_code, "message": "", "data": flight_list["flights"]}
    elif response.status_code == 204:
        return {"code": response.status_code, "message": "No data", "data": []}
    else:
        return {"code": response.status_code, "message": response.text, "data": []}

# link to documentation https://developers.google.com/maps/documentation/directions/get-directions
def generate_routes(u_coordinates, a_time):

    schiphol_coordinates = "52.3105386,12.7682744"
    base_url = "https://maps.googleapis.com/maps/api/directions/json?"
    query = "origin=" + u_coordinates + "&destination=" + schiphol_coordinates + "&key=" + GOOGLE_DIRECTIONS_API_KEY

    url = base_url + query

    try:
        response = requests.request('GET', url)
    except requests.exceptions.ConnectionError as error:
        print(error)
        return {"code": 416, "message": "Connection error", "data": []}

    if response.status_code == 200:
        routes_list = response.json()
        print(routes_list)
    else:
        return {"code": response.status_code, "message": response.text, "data": []}


if __name__ == '__main__':
    dotenv.load_dotenv()

    PUBLIC_FLIGHT_API_KEY = os.getenv("SCHIPHOL_PUBLIC_FLIGHT_API_KEY")
    PUBLIC_FLIGHT_APPLICATION_ID = os.getenv("SCHIPHOL_PUBLIC_FLIGHT_APPLICATION_ID")
    GOOGLE_DIRECTIONS_API_KEY = os.getenv("GOOGLE_DIRECTIONS_API_KEY")
    flight_code = 'KL1771'
    date = '2021-02-19'

    flight_info = fetch_flight_by_code_and_date(flight_code, date)

    if not flight_info["data"]:
        print('Response, errroorrrr', flight_info)

    user_coordinates = "52.356900,4.900840"
    arrival_time = ""
    generate_routes(user_coordinates, arrival_time)

