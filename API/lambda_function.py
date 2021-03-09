# import dotenv
import os
import requests
import mechanize
import json
from bs4 import BeautifulSoup
from datetime import datetime, timedelta


#
# dotenv.load_dotenv()
#
# PUBLIC_FLIGHT_API_KEY = os.getenv("SCHIPHOL_PUBLIC_FLIGHT_API_KEY")
# PUBLIC_FLIGHT_APPLICATION_ID = os.getenv("SCHIPHOL_PUBLIC_FLIGHT_APPLICATION_ID")
# GOOGLE_DIRECTIONS_API_KEY = os.getenv("GOOGLE_DIRECTIONS_API_KEY")
def scraper():
    br = mechanize.Browser()
    br.set_handle_robots(False)
    br.addheaders = [('User-agent', 'Firefox')]

    response = br.open("https://www.schiphol.nl/nl/mijn-reisdag/vandaag")
    data = response.get_data()
    soup = BeautifulSoup(data, features="html5lib")
    search_results = soup.findAll(attrs={'class': 'crowdedness'}, limit=2)

    if len(search_results) != 2:
        return "No data available", "No data available"

    count = 0
    for result in search_results:
        child = result.children
        if count == 0:
            departure = str(list(child)[0]).strip()
            count += 1
        elif count == 1:
            arrival = str(list(child)[0]).strip()

    if not departure.__contains__("dag"):
        departure = "No data available."
    if not arrival.__contains__("dag"):
        arrival = "No data available."

    return departure, arrival


def fetch_flight_by_code_and_date(fc, d):
    base_url = 'https://api.schiphol.nl/public-flights/flights'
    query = '?flightName=' + fc + '&scheduleDate=' + d

    url = base_url + query

    headers = {
        'accept': 'application/json',
        'resourceversion': 'v4',
        'app_id': "726ea51a",
        'app_key': "acd4b5b3f8eb18443271217288704b4e"
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

        query = "mode=" + t + "&origin=" + u_coordinates + "&destination=" + \
                schiphol_coordinates + "&arrival_time=" + unix_time + "&key=AIzaSyDVdhab4JbR1irNTNvLHs2PejxHKW0ucFg"

        url = base_url + query
        try:
            response = requests.request('GET', url)
        except requests.exceptions.ConnectionError as error:
            print(error)
            response = None
            if response.status_code == 200:
                res = response.json()
                if 'routes' in res and len(res['routes']) > 0:
                    route = res["routes"][0]
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
                    route = []
            else:
                route = []

            routes[t] = route
        return routes


def check_in_time(i):
    if i is True or i == 'true' or i == 'TRUE':
        return 10
    else:
        return 0

def baggage_time(i):
    if i is True or i == 'true' or i == 'TRUE':
        return 10
    else:
        return 0

def priority_time(i):
    if i is True or i == 'true' or i == 'TRUE':
        return 0
    else:
        return 10

def calculate_arrival_time(f_info, w_time, c_in, b, p, e_time):
    print("Calc arrival time")

    offset = check_in_time(c_in) + baggage_time(b) + priority_time(p) + int(e_time)

    w_time_split = [int(i) for i in w_time.split(":")]

    print(w_time_split)
    scheduled_time = datetime.fromisoformat(f_info["data"][0]["scheduleDateTime"])

    a_time = scheduled_time - \
             timedelta(hours=w_time_split[0], minutes=(w_time_split[1] + offset), seconds=w_time_split[2])

    print("Arrival_time:", a_time)
    return a_time


# todo
def validate_input():
    return


def API(flight_code, date, user_coordinates, check_in, baggage, priority, extra_time):
    output = {}
    flight_info = fetch_flight_by_code_and_date(flight_code, date)

    if not flight_info["code"] == 200:
        return flight_info

    output["flight_info"] = flight_info

    airport_status = {
        "normale dag": "00:30:00",
        "drukke dag": "00:30:00",
    }
    a_status, d_status = scraper()

    waiting_time = airport_status[d_status]

    arrival_time = calculate_arrival_time(flight_info, waiting_time, check_in, baggage, priority, extra_time)

    routes = generate_routes(user_coordinates, arrival_time)

    output["routes"] = routes

    return output


def lambda_handler(event, context):
    print("EVENT", event, context)

    flight_code = event["queryStringParameters"]["flight_code"]
    date = event["queryStringParameters"]["date"]
    user_coordinates = event["queryStringParameters"]["u_coordinates"]
    check_in = event["queryStringParameters"]["check_in"]
    baggage = event["queryStringParameters"]["baggage"]
    priority = event["queryStringParameters"]["priority"]
    extra_time = event["queryStringParameters"]["extra_time"]

    data = API(flight_code, date, user_coordinates, check_in, baggage, priority, extra_time)

    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }
