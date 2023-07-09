import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

# Set up the paths to your dataset
train_data_dir = 'C:\\Users\\USER\\Downloads\\dataset\\train'
csv_file_path = 'C:\\Users\\USER\\Downloads\\dataset\\train\\data.csv'
test_image_path = 'C:\\Users\\USER\\Downloads\\train\\class1\\image2.jpg'

# Define the image size and batch size
image_size = (224, 224)
batch_size = 32

# Load the CSV file
df = pd.read_csv(csv_file_path)
category_mapping = {
    'unripe': 5,
    'freshunripe':6,
    'freshripe':4,
    'ripe':3,
    'overripe': 2,
    'rotten': 1,
    # Add more categories and their corresponding numerical values if needed
}

# Apply label encoding to the 'Class' column
df['Expiry'] = df['class'].map(category_mapping)
# Split the dataset into training and validation sets
train_df = df.sample(frac=0.8, random_state=42)
valid_df = df.drop(train_df.index)

# Set up the data generator with preprocessing and augmentation for training and validation
train_data_generator = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

valid_data_generator = ImageDataGenerator(rescale=1./255)

# Flow from dataframe with class mode 'other' to include additional columns for training and validation
train_generator = train_data_generator.flow_from_dataframe(
    dataframe=train_df,
    directory=train_data_dir,
    x_col='filename',
    y_col='Expiry',
    target_size=image_size,
    batch_size=batch_size,
    class_mode='other'
)

valid_generator = valid_data_generator.flow_from_dataframe(
    dataframe=valid_df,
    directory=train_data_dir,
    x_col='filename',
    y_col='Expiry',
    target_size=image_size,
    batch_size=batch_size,
    class_mode='other'
)

# Load the pre-trained ResNet50 model
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Add custom layers on top of the pre-trained model
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
predictions = Dense(1)(x)

# Create the final model for training
model = Model(inputs=base_model.input, outputs=predictions)

# Freeze the pre-trained layers
for layer in base_model.layers:
    layer.trainable = False

# Compile the model
model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model with early stopping
early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
model.fit(
    train_generator,
    steps_per_epoch=len(train_generator),
    epochs=20,
    callbacks=[early_stopping],
    validation_data=valid_generator,
    validation_steps=len(valid_generator)
)

# Save the trained model for future use
model.save('food_expiration_model.h5')


# Prediction code

# Load the trained model
model = tf.keras.models.load_model('food_expiration_model.h5')

# Load and preprocess the test image
image = tf.keras.preprocessing.image.load_img(test_image_path, target_size=image_size)
image = tf.keras.preprocessing.image.img_to_array(image)
image = image / 255.0
image = tf.expand_dims(image, axis=0)

# Predict the expiry date
expiry_date = model.predict(image)[0][0]

print("Predicted expiry date:", expiry_date)
