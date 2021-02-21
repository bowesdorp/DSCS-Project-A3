import dotenv
import os
import requests
from datetime import datetime, timedelta


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
        return {"code": response.status_code, "message": "No flight data", "data": []}
    else:
        return {"code": response.status_code, "message": response.text, "data": []}


# link to documentation https://developers.google.com/maps/documentation/directions/get-directions
def generate_routes(u_coordinates, a_time):
    routes = {}
    transport_modes = ["driving", "walking", "bicycling", "transit"]
    schiphol_coordinates = "52.30806,4.76417"
    base_url = "https://maps.googleapis.com/maps/api/directions/json?"
    unix_time = str(int(a_time.timestamp()))
    for t in transport_modes:

        query = "mode=" + t + "&origin=" + u_coordinates + "&destination=" +\
                schiphol_coordinates + "&arrival_time=" + unix_time + "&key=" + GOOGLE_DIRECTIONS_API_KEY

        url = base_url + query
        try:
            response = requests.request('GET', url)
        except requests.exceptions.ConnectionError as error:
            print(error)
            response = None
        if response.status_code == 200:
            route = response.json()["routes"][0]
            if t != 'transit':
                duration = int(route["legs"][0]["duration"]["value"])

                a_time_string = str(a_time.time())[:5]
                d_time_string = str((a_time - timedelta(seconds=duration)).time())[:5]

                route["legs"][0]["arrival_time"] = {
                    "text": a_time_string,
                    "time_zone": "Europe/Amsterdam"
                }

                route["legs"][0]["departure_time"] = {
                    "text": d_time_string,
                    "time_zone": "Europe/Amsterdam"
                }
        else:
            route = {}

        routes[t] = route
    return routes


# todo
def calculate_arrival_time(f_info, m, w_time):
    modes = {
        "short": 90,
        "average": 120,
        "long": 180,
    }
    # 2021-02-21T16:40:00.000+01:00

    offset = modes[m]
    w_time_split = [int(i) for i in w_time.split(":")]

    print(w_time_split)
    scheduled_time = datetime.fromisoformat(f_info["data"][0]["scheduleDateTime"])

    a_time = scheduled_time - \
             timedelta(hours=w_time_split[0], minutes=(w_time_split[1] + offset), seconds=w_time_split[2])

    return a_time


# todo
def validate_input():
    return


def API(flight_code, date, user_coordinates, mode):
    output = {}
    flight_info = fetch_flight_by_code_and_date(flight_code, date)

    if not flight_info["code"] == 200:
        return flight_info

    output["flight_info"] = flight_info

    # todo change to schiphol api
    waiting_time = "00:30:00"

    arrival_time = calculate_arrival_time(flight_info, mode, waiting_time)

    routes = generate_routes(user_coordinates, arrival_time)

    output["routes"] = routes

    return output


if __name__ == '__main__':
    dotenv.load_dotenv()

    PUBLIC_FLIGHT_API_KEY = os.getenv("SCHIPHOL_PUBLIC_FLIGHT_API_KEY")
    PUBLIC_FLIGHT_APPLICATION_ID = os.getenv("SCHIPHOL_PUBLIC_FLIGHT_APPLICATION_ID")
    GOOGLE_DIRECTIONS_API_KEY = os.getenv("GOOGLE_DIRECTIONS_API_KEY")
    flight_code = 'KL1771'
    date = '2021-02-21'
    user_coordinates = "52.356900,4.900840"
    mode = "long"

    data = API(flight_code, date, user_coordinates, mode)

    # print(data)
    # generate_routes(user_coordinates, arrival_time)
