import pandas as pd
import os

import requests
from bs4 import BeautifulSoup

class LandslideDatasetGeneration:
    def __init__(self, folder):
        self.folder = folder

    def combine_dataset(self):
        # Create an empty list to store individual dataframes
        dataframes = []
        
        # Loop through each file in the specified folder
        for filename in os.listdir(self.folder):
            if filename.endswith('.xlsx'):
                # Construct full file path
                file_path = os.path.join(self.folder, filename)
                # Read the Excel file and append it to the list of dataframes
                dataframes.append(pd.read_excel(file_path))
        
        # Concatenate all the dataframes in the list into a single dataframe
        combined_df = pd.concat(dataframes, ignore_index=True)
        
        # Return the combined dataframe
        return combined_df
    def filter_duplicates(self, dataframe):
        # Ensure the 'Link' column is treated as a string and handle NaN values
        # Convert all links to strings to prevent errors in string operations
        dataframe['Link'] = dataframe['Link'].astype(str).fillna('')

        # Filter out PDF links by checking if they end with '.pdf'
        # The str accessor is used to access the endswith method correctly
        filtered_df = dataframe[~dataframe['Link'].str.contains('/pdf/', case=False, na=False)]
        filtered_df = dataframe[~dataframe['Link'].str.contains('/download/', case=False, na=False)]

        # Then remove duplicates based on the 'Link' column
        filtered_df = filtered_df.drop_duplicates(subset='Link', keep='first')
        
        # Return the filtered dataframe
        return filtered_df



    def filter_by_keywords(self, dataframe, keywords):
        # Filter the dataframe to keep only those rows where the 'Snippet' column contains any of the keywords
        # Make sure to convert the 'Snippet' to string to handle non-string values safely
        filtered_df = dataframe[dataframe['Snippet'].apply(lambda snippet: any(keyword in str(snippet) for keyword in keywords))]
        
        # Return the filtered dataframe
        return filtered_df

    def get_page_content(self, url):
        print(url)
        if "pdf" in url.lower() or "download" in url.lower():
            print(f"Skipped downloading content from PDF URL: {url}")
            return None  # Return None or another value to indicate skipping PDFs
        
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()  # Will raise an HTTPError for bad requests (400 or 500 level responses)
            soup = BeautifulSoup(response.content, 'html.parser')
            print("Done")
            return soup.get_text()  # Extracts all text content from the HTML
        except requests.RequestException as e:
            print(f"Error fetching page content: {e}")
            return pd.NA
    def add_page_content_to_df(self, dataframe):
        # limit records
        # dataframe = dataframe.head(10)
        
        # Apply get_page_content to each URL in the Link column and store the results in a new column
        dataframe['page_content'] = dataframe['Link'].apply(self.get_page_content)
        # The line `dataframe['page_content'] = dataframe['page_content'].replace('None', pd.NA)` is
        # replacing the string 'None' in the 'page_content' column of the dataframe with a missing
        # value represented by `pd.NA`. This is a way to handle and represent missing or null values
        # in the 'page_content' column of the dataframe. By using `pd.NA`, you are indicating that the
        # corresponding values in the 'page_content' column are missing or not available.
        # dataframe['page_content'] = dataframe['page_content'].replace('None', pd.NA)

        dataframe = dataframe.dropna(subset=['page_content'])

        return dataframe
    def save_to_excel(self, dataframe, filename):

        try:
            # Define the file path to save the excel file
            file_path = os.path.join(self.folder, filename)
            # Use Pandas to_excel method to save the dataframe to an Excel file
            dataframe.to_excel(file_path, index=False)
            print(f"Data saved successfully to {file_path}")
        except Exception as e:
            print(f"Failed to save the file: {e}")
# # Usage:
# # Create an instance of the class
# dataset_generator = LandslideDatasetGeneration('Files')
# # Combine the datasets into a single DataFrame
# combined_df = dataset_generator.combine_dataset()


# # Filter out duplicates based on the 'Link' column
# filtered_df = dataset_generator.filter_duplicates(combined_df)

# keywords = ['landslide', 'landslip', 'tanah', "runtuh"]  # example keywords
# # Filter records based on keywords in the 'Snippet' column
# final_df = dataset_generator.filter_by_keywords(filtered_df, keywords)
# # print(final_df.iloc[0]["Link"])

# enhanced_df = dataset_generator.add_page_content_to_df(final_df)
# print(enhanced_df.head())
# dataset_generator.save_to_excel(enhanced_df, 'Enhanced_Dataset.xlsx')
