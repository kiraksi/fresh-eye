from keras.models import Sequential, Model
from keras.layers import Dense, Dropout, Flatten, Input
from keras.layers import Conv2D, MaxPooling2D, BatchNormalization, AveragePooling2D
from keras.optimizers import Adam
from keras import regularizers
from keras.applications import MobileNetV2
import cv2
import numpy as np
from keras.preprocessing import image

def get_conv_model(dim = (150,150, 3), model_weights = 'NN_Weapon_Detection/FlaskApp/V2_NoEdge_NoAugmentation.h5'):
    '''This function will create and compile a CNN given the input dimension'''
    inp_shape = dim
    act = 'relu'
    drop = .25
    kernal_reg = regularizers.l1(.001)
    optimizer = Adam(lr=.0001)

    model = Sequential()

    model.add(Conv2D(64, kernel_size=(3, 3), activation=act, input_shape=inp_shape,
                     kernel_regularizer=kernal_reg,
                     kernel_initializer='he_uniform', padding='same', name='Input_Layer'))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(3, 3)))

    model.add(Conv2D(64, (3, 3), activation=act, kernel_regularizer=kernal_reg,
                     kernel_initializer='he_uniform', padding='same'))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(3, 3)))

    model.add(Conv2D(128, (3, 3), activation=act, kernel_regularizer=kernal_reg,
                     kernel_initializer='he_uniform', padding='same'))
    model.add(Conv2D(128, (3, 3), activation=act, kernel_regularizer=kernal_reg,
                     kernel_initializer='he_uniform', padding='same'))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(3, 3)))

    model.add(Flatten())

    model.add(Dense(128, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(32, activation='relu'))

    model.add(Dropout(drop))

    model.add(Dense(3, activation='softmax', name='Output_Layer'))

    model.compile(loss='categorical_crossentropy', optimizer=optimizer, metrics=['accuracy'])
    model.load_weights(model_weights)
    return model

def non_max_suppression(boxes, overlapThresh= .5):
    # if there are no boxes, return an empty list
    if len(boxes) == 0:
        return []
    # if the bounding boxes integers, convert them to floats --
    # this is important since we'll be doing a bunch of divisions
    if boxes.dtype.kind == "i":
        boxes = boxes.astype("float")
    # initialize the list of picked indexes
    pick = []
    # grab the coordinates of the bounding boxes
    x1 = boxes[:,0]
    y1 = boxes[:,1]
    x2 = boxes[:,2]
    y2 = boxes[:,3]
    # compute the area of the bounding boxes and sort the bounding
    # boxes by the bottom-right y-coordinate of the bounding box
    area = (x2 - x1 + 1) * (y2 - y1 + 1)
    idxs = np.argsort(y2)
    # keep looping while some indexes still remain in the indexes
    # list
    while len(idxs) > 0:
        # grab the last index in the indexes list and add the
        # index value to the list of picked indexes
        last = len(idxs) - 1
        i = idxs[last]
        pick.append(i)
        # find the largest (x, y) coordinates for the start of
        # the bounding box and the smallest (x, y) coordinates
        # for the end of the bounding box
        xx1 = np.maximum(x1[i], x1[idxs[:last]])
        yy1 = np.maximum(y1[i], y1[idxs[:last]])
        xx2 = np.minimum(x2[i], x2[idxs[:last]])
        yy2 = np.minimum(y2[i], y2[idxs[:last]])
        # compute the width and height of the bounding box
        w = np.maximum(0, xx2 - xx1 + 1)
        h = np.maximum(0, yy2 - yy1 + 1)
        # compute the ratio of overlap
        overlap = (w * h) / area[idxs[:last]]
        # delete all indexes from the index list that have
        idxs = np.delete(idxs, np.concatenate(([last],
            np.where(overlap > overlapThresh)[0])))
    # return only the bounding boxes that were picked using the
    # integer data type
    return pick

def get_image_value(path, dim, edge = False, img_type = 'normal'):
    if edge == True:
        img = cv2.imread(path)
        blurred = cv2.GaussianBlur(img, (3,3), 0)
        wide = cv2.Canny(blurred, 10,200)
        tight = cv2.Canny(blurred, 225, 250)
        auto = auto
        wide = cv2.resize(wide, dim, interpolation = cv2.INTER_CUBIC)
        tight = cv2.resize(tight, dim, interpolation = cv2.INTER_CUBIC)
        auto = cv2.resize(auto, dim, interpolation = cv2.INTER_CUBIC)
        return tight
    else:
        img = image.load_img(path, target_size = dim)
        img = image.img_to_array(img)
        if img_type =='grey':
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            img = img.reshape(img.shape[0], img.shape[1], 1)
            return img
        else:
            return img/255
