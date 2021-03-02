import mechanize
from bs4 import BeautifulSoup

def scraper():
    br = mechanize.Browser()
    br.set_handle_robots(False)
    br.addheaders = [('User-agent', 'Firefox')]
    
    response = br.open("https://www.schiphol.nl/nl/mijn-reisdag/vandaag")
    data = response.get_data()
    soup = BeautifulSoup(data)
    search_results = soup.findAll(attrs={'class':'crowdedness'},limit=2)

    if len(search_results) != 2:
        return "No data available"
    
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