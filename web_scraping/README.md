## 01. Introduction

While working on our capstone, one of our big problems was finding a dataset to pull from for our list of hiking trails. There were some that required purchases, some that didn't quite suit our purposes, and others that had data that might over complicate our project. There were websites out there that had the data – but in formats not exactly pleasant for us to sift through. Our solution? Web scraping. **Web scraping** is a method of obtaining vast amounts of data from existing websites – most of which is just sitting around in an unstructured, unpolished HTML format, and converting it into something we can get some practical use out of in a database or application. There are many ways to do this, but for our purposes, a simple `Python` program will do the trick.

## 02. Tools Used

Before getting into it, here are a list of some of the tools we'll use for our capstone project:

- **Python** — Python is a general-purpose programming language with a high focus on readability that supports multiple programming paradigms, which includes OOP, structured programming, and functional programming. ***In Python, Indentation and White Space DOES Matter***
  {[Docs](https://docs.python.org/3/)}
  
- **PyCharm** — PyCharm is the IDE for Python created by JetBrains (who also created IntelliJ). It's probably the best IDE for us to use given our familiarity with IntelliJ.
- {[Shortcuts](https://resources.jetbrains.com/storage/products/pycharm/docs/PyCharm_ReferenceCard.pdf?_ga=2.60594603.703387264.1673891108-75101502.1673639600&_gl=1*1cp3p4h*_ga*NzUxMDE1MDIuMTY3MzYzOTYwMA..*_ga_9J976DJZ68*MTY3Mzg5MTEwNy4zLjEuMTY3Mzg5MTEyNC4wLjAuMA..)}

- **Beautiful Soup**  — Beautiful Soup is a Python library that aids with pulling data from HTML and XML files. 
  { [Docs](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) }

- **Lxml** — Lxml is a very rich library for processing HTML and XML into  readable formats.

- **Requests Library** — Simple Python library for sending HTTP requests.
 {[Docs](https://pypi.org/project/requests/)}


## 03. Getting Started

To get everything started, first we install [PyCharm](https://www.jetbrains.com/pycharm/download/#section=windows)  and pick the Website to be scraped (We're using [Hiking Project](https://www.hikingproject.com/).)

Once we have those things, it's important to note that some websites don't *want* their data scraped. To prevent scraping, websites include parts of their site they want protected in a file called `robots.txt`.  The first thing we should do to avoid wasting time is check Hiking Project's `robots.txt` file. We can do this by simply appending `/robots.txt` to the URL. In our case, typing in `hikingproject.com/robots.txt` should give us something that looks like this:

```Markdown
www.robotstxt.org/
http://code.google.com/web/controlcrawlindex/

Reduce load by limiting search engines in remote areas

User-agent: Yandex
User-agent: MegaIndex.ru/2.0
User-agent: MegaIndex.ru
User-agent: megaIndex.ru
Disallow: /

Default
User-agent: *
Crawl-delay: 60
Disallow: /admin*
Disallow: /ajax*
Disallow: /edit*
Disallow: /earth*
Disallow: /misc*
Disallow: /page-improvements*
Disallow: /data*

Sitemap: https://www.hikingproject.com/sitemap.xml
```

The routed areas of the site that don't allow scrubbing are tagged as "Disallow."
This means our scrubber won't be able to access any URLS with the listed paths. Luckily for us, we're scrubbing from their `/directory` branch, so the data is all clear.

Once we've checked the `robots.txt` it's time to make our scraper. In PyCharm, in the directory for our webscraper, there are a few things we need to do – make a `main.py`, where our scraper is going to run, and make a .csv file where our data will ultimately go. In our case, this is `trails.csv`.

To initialize our `trails.csv` file, we're going to go ahead and create our header row, with the following:
``` CSV
name,distance,difficulty,city,state
```

Save and close for now, we're going to write into it in our program later.

Moving on to our  `main.py` file, we're going to start by installing a few crucial components.

In a terminal, *with admin permissions*, type the following to install the needed libraries 
(you can do this at the global level, you don't have to cd into the project directory):

**Beautiful Soup:**
```Terminal
> pip install beautifulsoup4
```

**Lxml:**
```Terminal
> pip install lxml
```

**Requests Library:**
```Terminal
> pip install requests
```

With these libraries installed, everything we need to begin is installed. Now, we have to tell our program where we want to pull our data from.

## 04. Beautiful Soup

There are a few methods we can use to pull the HTML data from our chosen source. The easiest two are:

**01.** Use Inspect Element to save the target HTML page as a file on our computer, and import it that way.

-- or --

**02.** Call an HTTP Request to our target page, and have it pull the data in that way.

Both have their merits, but because of the sheer number of pages we're going to pull from, it's more efficient to just pull from the pages using an HTTP request.

Since we're going to pull the data directly from their website, included in our webscraper is a file called `sourcepages.py`. This file is just a list of all of the individual directory URLs for each individual state on the hiking project website, and looks something like this:

```Python
URL = [  
    'https://www.hikingproject.com/directory/8006784/alabama',  
    'https://www.hikingproject.com/directory/8006825/alaska',  
    'https://www.hikingproject.com/directory/8006911/arizona',  
    'https://www.hikingproject.com/directory/8007054/arkansas',
    ...
    'https://www.hikingproject.com/directory/8010938/west-virginia',  
    'https://www.hikingproject.com/directory/8010991/wisconsin',  
    'https://www.hikingproject.com/directory/8011070/wyoming'  
]
```

This list is just to keep our `main.py` relatively trimmed and neat. In our `main.py` file, we can call on this file easily because it's in the same directory, with the following code:

```Python
from sourcepages import URL
```

Under this, we'll go ahead and import BeautifulSoup and the Requests library:
```Python
from sourcepages import URL  
from bs4 import BeautifulSoup  
import requests
```

We don't have to import lxml, but we will be calling on it when we declare our soup. Lets go ahead and do that now:
```Python
from sourcepages import URL  
from bs4 import BeautifulSoup  
import requests  
#In Python, to comment, start lines with '#'

## NEW CODE ##

# We're declaring a variable called 'url', and saying it's in a range of 0 - 51. 
# This number comes from the number of indexes in our URL list from sourcepages.
for url in range(0, 51):  

# Here, we're setting a variable called 'req', and calling on a method from our Requests Library. We're telling it to pull an HTTP GET Request on the values from the imported URL list, using the range we set in 'url'. 
    req = requests.get(URL[url])
    
# Finally, here we're declaring our soup. Delicious. The BeautifulSoup method receiving our requests from our 'req' variable, and we're saying we want the text returned. Here, the second argument, is where we tell it that we want it to be formatted using lxml.
    soup = BeautifulSoup(req.text, 'lxml')
```

Now we have to tell our program where to look on these pages, and for what values. This is where Inspect Element is going to come in handy - Luckily for us, every state's directory follows the same formatting, so we can go to any individual state and see how it's set up, and it will apply to the rest. For our purposes, I'm going to use [Georgia](https://www.hikingproject.com/directory/8007899/georgia) as an example.

Scrolling down the page, the best element of the page to pull the data we want from is going to be the *table*, a little over halfway down the page. Using Inspect element, we can see that highlighting a row of data gives us the following html:

```HTML
<tr data-href="https://www.hikingproject.com/trail/7061974/earls-ford-portage-523" class="trail-row">
        ...
    </tr>
```

Every row of data is formatted like this - which means we can take advantage of it to iterate over the page. Every trail is presented in the table as a `tr` element,, with a data-href that links to its page, and the class `trail-row`

There are two commands we can make use of to find data in an HTML file easily with BeautifulSoup –  find() and find_all(). Both are very similar, but find() will only return the first value it catches, and find_all() returns all values it catches. For iterating, we want to use find_all(). To set our program to iterate over every trail on the page, we're going to do the following:

```Python
from sourcepages import URL  
from bs4 import BeautifulSoup  
import requests  
  
for url in range(0, 51):  
    req = requests.get(URL[url])  
    soup = BeautifulSoup(req.text, 'lxml')  
    
  ## NEW CODE ##
    trail_rows = soup.find_all('tr', class_='trail-row')
```

This is telling our program "Hey, search through this HTML document, and every time you find a `tr` element that's been given the class `trail-row`, make note of that. "

This will iterate through every *visible* trail row on the page. I say visible because this site uses pagination to hide some of the trails until you click a "show more" button, but for our purposes, 10 trails from every state is a perfectly acceptable data pool.

Now, we need to break down each individual row into the data we want to collect. The best way to do this is to use the inspect tool to highlight the data you want at the most atomic level - if an element is used only for one piece of data, you don't need to add a class, but if the same element is used multiple times, you may need to hone in on th class as well. We're specifically looking for the trail's `name, distance (in miles), difficulty, city, and state`. The code below covers this:

```Python
from sourcepages import URL  
from bs4 import BeautifulSoup  
import requests  
  
for url in range(0, 51):  
    req = requests.get(URL[url])  
    soup = BeautifulSoup(req.text, 'lxml')  
  
    trail_rows = soup.find_all('tr', class_='trail-row')  
    ## NEW CODE ##

# Declare variable trail
    for trail in trail_rows:  
        name = trail.find('strong').text  
        distance = trail.find('span', class_='imperial').text.split()[-2]  
        difficulty = trail.find('span', class_='difficulty-text text-white align-middle').text  
        city = trail.find('div', class_='float-xs-right').text.split(',')[-2].strip()  
        state = trail.find('div', class_='float-xs-right').text.split(',')[-1].strip()
```

As you can see, there's a few functions in here that haven't yet come up.

`.text` we went over a little - it tells Python we're specifically looking for the text value of something.

`.split()` tells python we want to break up a block of text, with the delimiter passed through as an argument. Here, I used it for `Distance` which is displayed on the page as a block of text as something like `0.8 Miles`, and we're telling the split function to separate the text at the white space, and return us the value at an index of `[-2]`. We do the same to separate `City` and `State`, but telling the function to use ',' as the delimiter.

`.strip()` tells python we want to remove something from a block of text - in this case, I was stripping off some whitespace that was left in the location data during the split.

If you want to verify that the code works, you can include something like the line 

```Python
print(f'{name} | {distance} miles | {difficulty} | {city}, {state}')
```

to have the console print out the data as it gathers it!
Resources Used:
[freeCodeCamp tutorial][https://www.youtube.com/watch?v=XVv6mJpFOb0]
## 05. File I/O

The easiest part of this ordeal so far, all that's left is to write to our `trails.csv` file and get the data ready to be passed through MySQL. First, we need to call on Python's basic file functions and tell it to open our file:

```Python
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
  
## NEW CODE ## 
  
        file = open('trails.csv', 'a', encoding='utf-8')
```

the `.open()` function is taking three arguments here:
01. The File Path
02. The method we're using, in this case, 'a' for 'append'
03. The encoding we're using. Some of the data we're pulling uses characters that may cause issues for our system, so we're going to force 'utf-8' encoding to keep everything simple.

After that, we tell it what to write to the file, and we close the file as good practice!

```Python
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
  
        file = open('trails.csv', 'a', encoding='utf-8')  

## NEW CODE ##

        try:  
            file.write(f'\n{name},{distance},{difficulty},{city},{state}')  
        finally:  
            file.close()
```

Just like that, our web scraper should have written our data to our `.csv`, and now we're sitting on over 500 records we didn't have to manually enter! All that's left is to upload it to MySQL, and do a little cleanup. :)