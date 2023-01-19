from sourcepages import URL
from bs4 import BeautifulSoup
import requests

for url in range(0, 51):
    req = requests.get(URL[url])
    soup = BeautifulSoup(req.text, 'lxml')

    trail_rows = soup.find_all('tr', class_='trail-row')
    for trail in trail_rows:
        name = trail.find('strong').text
        distance = trail.find('span', class_='imperial').text.split()[-2]
        difficulty = trail.find('span', class_='difficulty-text text-white align-middle').text
        city = trail.find('div', class_='float-xs-right').text.split(',')[-2].strip()
        state = trail.find('div', class_='float-xs-right').text.split(',')[-1].strip()

        print(f'{name} | {distance} miles | {difficulty} | {city}, {state}')

        file = open('trails.csv', 'a', encoding='utf-8')

        try:
            file.write(f'\n{name},{distance},{difficulty},{city},{state}')
        finally:
            file.close()
