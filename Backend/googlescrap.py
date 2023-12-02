from googlesearch import search
import time

x = set()
try:
    # to search
    query = "landslide after:2020-10-01 site:*.my"

    for j in search(query, tld="co.in", num=1000, stop=10, pause=2):
        x.add(j)

        # Pause for 10 seconds before the next iteration

except ImportError:
    print("No module named 'google' found")


from openai import OpenAI

client = OpenAI(api_key="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")

gpt_model = "gpt-3.5-turbo-16k"
gpt_role_prompt = """Your job is to extract landslide data as the following:
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


def gpt_details_Extraction(prompt):
    response = client.chat.completions.create(
        model=gpt_model,
        messages=[
            {
                "role": "system",
                "content": gpt_role_prompt,
            },
            {"role": "user", "content": f"{prompt}"},
        ],
    )
    return parse_gpt_output(response.choices[0].message.content)


def parse_gpt_output(gpt_output):
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



# print(list(x))


import json
json_output = []
json_file_path = "output.json"
with open(json_file_path, 'w') as file:
    json.dump(list(x), file, indent=2)

# for i in list(x):
#     print(i)
#     res = gpt_details_Extraction(i)
#     json_output.append(res)
#     print(res)
#     with open(json_file_path, 'w') as file:
#         json.dump(json_output, file, indent=2)

