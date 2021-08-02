import csv
with open('C:/Users/mitto/2021.07.28.04.56.14/response_codes_redirection_(3xx).csv') as csv_file:
	csv_reader = csv.reader(csv_file, delimiter=',')
	line_count = 0
	for row in csv_reader:
		line_count += 1
print(f'There are {line_count-1} 3xx response codes.')