import datefinder

text = 'class="clickable-row past"><td>Tue 6 - Fri 9 Sep 2022<br/>Author Response Period</td>'

matches = datefinder.find_dates(text)

for match in matches:
    print(match)
