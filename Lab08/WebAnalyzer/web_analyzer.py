import requests
from bs4 import BeautifulSoup
import re
import matplotlib.pyplot as plt
url = "https://en.wikipedia.org/wiki/University_of_Calgary"

try:
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    print(f"Successfully fetched content from {url}")


    # Count the number of header tags
    print(f"H1: {len(soup.find_all('h1'))}")
    print(f"H2: {len(soup.find_all('h2'))}")
    print(f"H3: {len(soup.find_all('h3'))}")
    print(f"H4: {len(soup.find_all('h4'))}")
    print(f"H5: {len(soup.find_all('h5'))}")
    print(f"H6: {len(soup.find_all('h6'))}")

    print(f"p: {len(soup.find_all('p'))}")
    print(f"a: {len(soup.find_all('a'))}")


    page_text = soup.get_text()



    words = re.findall(r'\b\w+\b', page_text.lower())


 
    word_freq = {}
    for word in words:
        if word in word_freq:
            word_freq[word] += 1
        else:
            word_freq[word] = 1



    keyword = input("Enter a keyword to search in the content: ")
    keyword_count = page_text.lower().count(keyword.lower())


  
    print(f"Keyword '{keyword}' found {keyword_count} times in the content")
   
    
  
    sorted_word_freq = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
    most_common_words = sorted_word_freq[:5]


    print("The 5 most frequent words are:")
    for word, freq in most_common_words:
        print(f"{word}: {freq}")

  
    p_tags = soup.find_all('p')
    p_text = [p.get_text() for p in p_tags]

    longest_paragraph = ""
    longest_paragraph_word_count = 0
    for paragraph in p_text:
        words = paragraph.split()
        if len(words) > longest_paragraph_word_count:
            longest_paragraph = paragraph
            longest_paragraph_word_count = len(words)

    print(f"The longest paragraph is: {longest_paragraph}")
    print(f"The longest paragraph contains {longest_paragraph_word_count} words")

    #count all the header tags
    headings = 0
    for i in range(1, 7):
        headings += len(soup.find_all(f'h{i}'))

    links = len(soup.find_all('a'))
    paragraphs = len(soup.find_all('p'))
    labels = ['Headings', 'Links', 'Paragraphs']
    values = [headings, links, paragraphs]
    plt.bar(labels, values)
    plt.title('Group# 15')
    plt.ylabel('Count')
    plt.show()


except Exception as e:
    print(f"Error fetching content: {e}")
