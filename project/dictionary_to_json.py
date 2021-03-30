import json

# This sorts the english dictionary into buckets based on word length


# Dictionary for holding values
words = {}

with open('words_alpha.txt', 'r') as f:
    for word in f:
        word = word.strip()
        length = len(word)

        # Create key if it doesn't exist
        if length not in words.keys():
            words[length] = []

        words[length].append(word)
        

f.close()

# dump to json and save
json_object = json.dumps(words)

with open("words.json", 'w') as f:
    f.write(json_object)
f.close()