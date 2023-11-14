# Crawl from reddit
# Malaysia News sources
# Youtube
# Wikipedia
# Importing dependencies
from openai import OpenAI

client = OpenAI(api_key="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")

import requests
from bs4 import BeautifulSoup
import os
import json

class LandslideCrawler:
    def __init__(self):
        # Setting up GPT api
        self.gpt_model = "gpt-3.5-turbo-16k"
        self.gpt_role_prompt = """Your job is to extract landslide data as the following:
                Location:
                Coordinates:
                Landslide Name:
                Date(YYYY-MM-DD):
                Time: 
                Landslide Type:
                Severity and Magnitude: 
                Triggering Factors:
                Affected Area:
                Casualties: 
                Number of Casualties:
                Infrastructure Damage:
                Response and Recovery Efforts:
                Weather Conditions:
                Land Use Patterns:
                Historical Data:

                if you can't find any information related to the above, then simply write None like the following
                Location: None
            """

        self.indexed_links = set()
        self.queries = ["malaysia", "landslide", "انحدار", "tanah runtuh"]
        self.json_output = []

        self.json_file_path = 'landslide_data.json'
    def google_search(self, query, num_per_query=10, total_results=10000, pause=5):
        search_results = set()
        start = 0

        # while len(search_results) < total_results:

        #     self.indexs
        #     for j in search(query, num=num_per_query, start=start, pause=pause):
        #         search_results.add(j)
        #         self.indexed_links.add(j)

        #     start += num_per_query
        search_results = search("Google", num_results=100)
        with open(self.json_file_path, 'w') as file:
            json.dump(search_results, file, indent=2)

        return list(search_results)
    def get_html_content(self, url):
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
            }
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            page_content = BeautifulSoup(response.content, "html.parser").get_text()
            # text_content = soup.get_text(separator=" ", strip=True)
            return page_content

        except requests.exceptions.RequestException as e:
            print(f"Couldn't extract page content: {e}")
            return None

    def gpt_details_Extraction(self, prompt):
        response = client.chat.completions.create(
            model=self.gpt_model,
            messages=[
                {
                    "role": "system",
                    "content": self.gpt_role_prompt,
                },
                {"role": "user", "content": f"{prompt}"},
            ],
        )
        return response.choices[0].message.content

    def parse_gpt_output(self, gpt_output):
        lines = gpt_output.split("\n")

        # Initialize an empty dictionary to store the extracted information
        landslide_info = {}

        # Iterate through each line
        for line in lines:
            # Split each line into key and value using the first occurrence of ':'
            parts = line.split(":", 1)

            # If there are two parts, add to the dictionary
            if len(parts) == 2:
                key = parts[0].strip()
                value = parts[1].strip()
                landslide_info[key] = value

        return landslide_info
    

            
    def crawl(self, query):
        url_list = self.google_search(query, num=100, stop=100, pause=.1)
        for url in url_list:
            print("url", url)
            try:
                page_content = self.get_html_content(url)
                # if (len(page_content) >= 55000):
                #     print("content too big")
                #     continue

                landslide_data = self.gpt_details_Extraction(page_content)
                parsed_data = self.parse_gpt_output(landslide_data)
                parsed_data["Source"] = url
                print(parsed_data)
                self.json_output.append(parsed_data)
                with open(self.json_file_path, 'w') as file:
                    json.dump(self.json_output, file, indent=2)
            except Exception as ex:
                print("Error Processing: ", ex)



# from googlesearch.googlesearch import GoogleSearch
# response = GoogleSearch().search("something")
# print(response)
# crawl = LandslideCrawler()
# crawl.google_search("site:*.my landslide malaysia")
# url = "https://www.thestar.com.my/news/nation/2023/06/28/heavy-rain-causes-landslide-in-perak"
# page_content = crawl.
# # print(len(url))
# # print(crawl.get_html_content(url))
# result = crawl.
# print("Source: ", url)
# # print()
# crawl.store_landslide_Data(crawl.)
