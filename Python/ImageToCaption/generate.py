import os
import keras
from keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import matplotlib.pyplot as plt
import json
from pickle import load, dump
import tensorflow as tf
import sys

    
#Load tokenizer
with open('C:/React Projects/Tenserflow_Course/Models/ImageToCaption/tokenizer.json', 'r') as f:
    tokenizer_json = json.load(f)
tokenizer = tokenizer_from_json(tokenizer_json)
    
model = keras.models.load_model("C:/React Projects/Tenserflow_Course/Models/ImageToCaption/model_v14.h5") #Load model
vocab_size = tokenizer.num_words #The number of vocabulary
max_length = 37 #Maximum length of caption sequence

def feature_extractions(directory):
    """
    Input: directory of images
    Return: A dictionary of features extracted by VGG-16, size 4096.
    """
    
    model = tf.keras.applications.vgg16.VGG16()
    model = keras.models.Model(inputs=model.input, outputs=model.layers[-2].output) #Remove the final layer
    
    features = {}
    for f in os.listdir(directory):
        filename = directory + "/" + f
        identifier = f.split('.')[0]
        
        image = load_img(filename, target_size=(224,224))
        arr = img_to_array(image, dtype=np.float32)
        arr = arr.reshape((1, arr.shape[0], arr.shape[1], arr.shape[2]))
        arr = keras.applications.vgg16.preprocess_input(arr)
    
        feature = model.predict(arr, verbose=0)
        features[identifier] = feature
        
        # print("feature extraction: {}".format(f))
    return(features)
#sampling
features = ''


def sample_caption(model, tokenizer, max_length, vocab_size, feature):
    """
    Input: model, photo feature: shape=[1,4096]
    Return: A generated caption of that photo feature. Remove the startseq and endseq token.
    """
    
    caption = "<startseq>"
    while 1:
        #Prepare input to model
        encoded = tokenizer.texts_to_sequences([caption])[0]
        padded = pad_sequences([encoded], maxlen=max_length, padding='pre')[0]
        padded = padded.reshape((1, max_length))
        
        pred_Y = model.predict([feature, padded])[0,-1,:]
        next_word = tokenizer.index_word[pred_Y.argmax()]
        
        #Update caption
        caption = caption + ' ' + next_word
        
        #Terminate condition: caption length reaches maximum / reach endseq
        if next_word == '<endseq>' or len(caption.split()) >= max_length:
            break
    
    #Remove the (startseq, endseq)
    caption = caption.replace('<startseq> ', '')
    caption = caption.replace(' <endseq>', '')
    
    return(caption)

def generate_caption():
    caption = ''
    features = feature_extractions("C:/React Projects/Code-/server/Python/ImageToCaption/sample_images")
    for i, filename in enumerate(features.keys()):
        caption = sample_caption(model, tokenizer, max_length, vocab_size, features[filename])
    return caption


if __name__ == '__main__':
    functionName = sys.argv[1]
    
    result = globals()[functionName]()
    print(result)