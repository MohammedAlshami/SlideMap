import json

def load_json(filename):
    """Load JSON data from a file."""
    try:
        with open(filename, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Error: The file '{filename}' does not exist.")
        return None
    except json.JSONDecodeError:
        print("Error: Failed to decode JSON.")
        return None

# Usage
json_data = load_json('search_results.json')
url_list = []
urls = []
if json_data is not None:
    
    for i in range(0, len(json_data)):
        data = {}
        # json_data[0]["tasks"][0]["result"][0]["items"][0]
        data = json_data[i]["tasks"][0]["result"][0]["items"]
        
        
        # print(data)
        
        for m in data:
            data = m
            # print(data)
            
            if data["url"] in urls:
                continue
            data_item = {
                "title": data["title"],
                "url": data["url"],
                "description": data.get("description")
            }
            # break
           
            url_list.append(data_item)
            urls.append(data["url"])
file_path = "scrapped_news.json"
with open(file_path, 'w') as file:
    json.dump(url_list, file)
