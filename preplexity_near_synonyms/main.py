from evaluate import load
import pandas as pd
import json
import csv


def calculate_perplexity(sentences):
    perplexity = load("perplexity", module_type="metric")
    results = perplexity.compute(model_id='gpt2',
                                 add_start_token=False,
                                 predictions=sentences)
    return results["perplexities"]


def load_data(file_path):
    df = pd.read_csv(file_path)
    return df


def main():
    '''
    with open('config.json', 'r') as json_file:
        config = json.load(json_file)
    '''
    df = load_data('synonyms_sentences_friends.csv')
    sentences_list = df['sentence'].tolist()
    resentences_list = df['re-sentence'].tolist()

    sentences_perp_result = calculate_perplexity(sentences_list)
    resentences_perp_result = calculate_perplexity(resentences_list)
    write_to_file(sentences_perp_result, resentences_perp_result)


def write_to_file(sentences_perp_result, resentences_perp_result):
    csv_file = 'results/perplexity_results.csv'
    with open(csv_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['sentence perplexity', 're-sentence perplexity'])
        for item1, item2 in zip(sentences_perp_result, resentences_perp_result):
            writer.writerow([item1, item2])


if __name__ == '__main__':
    main()
