#to connect to the database
from flask import Flask, jsonify,request
from flask_pymongo import PyMongo
import certifi
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import pymongo


#for the machine learning Process
import pandas as pd
import numpy as np
import random
import os
import pickle
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, confusion_matrix, mean_squared_error
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from scipy.stats import pearsonr
import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import Adam
import datetime

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Configure MongoDB Atlas URI
app.config['MONGO_URI'] = 'mongodb+srv://nobita9699:xgFi1COLriKTuji7@cluster0.uh0srwc.mongodb.net/AcosusUserBase?retryWrites=true&w=majority'
mongo = PyMongo(app, tlsCAFile=certifi.where())


#----------------------------------------------------------
#----------------------------------------------------------
#----------------------------------------------------------
#This is the start of the machine learning code

class CollegeReadinessModel:
    def __init__(self):
        # Get the current directory of the script
        current_directory = os.path.dirname(os.path.abspath(__file__))

        csv_name = 'College-Readiness.csv'
        xlsx_name = 'majors and jobs.csv'

        # Full path to the file
        csv_file_path = os.path.join(current_directory, csv_name)
        major_file_path = os.path.join(current_directory, xlsx_name)

        self.StudentExposure={'Project':5,'Paper':4,'Extra-classes':3,'Conference':2}
        self.data = pd.read_csv(csv_file_path, encoding='utf-8')
        self.major_data = pd.read_csv(major_file_path, encoding='utf-8')
        self.transformed_data = self._preprocess_data()
        
        self.traindata_x, self.traindata_y, self.testdata_x, self.testdata_y = self._split_data()
        #self.model = self._train_model()

        #for the prediction
        self.scaler = StandardScaler()
        self.scaler.fit(self.traindata_x) 
    

    def _transform_course(self):
        index = 0
        transform = []
        for course in self.data['Course']:
            if self.data['Career'][index] in str(list(self.major_data['Job Categories'].loc[self.major_data['IT Major'] == course])):
                transform.append(1)
            else:
                transform.append(0)
            index += 1
        self.transformed_data['Career_Similarity'] = transform

    def _transform_stdexposure(self):
        self.transformed_data['Student_Exposure'] = [self.StudentExposure[values] for values in self.data['Student_Exposure']]

    def _transform_accessibility(self):
        self.transformed_data['Accessibility'] = [0 if values.lower() == 'online' or int(values) > 30 else 1 for values in self.data['Accessibility']]

    def _encode(self, col):
        encoded = pd.get_dummies(self.data[col], prefix=col)
        return pd.concat([self.transformed_data, encoded], axis=1, ignore_index=False)

    def _preprocess_data(self):
        self.transformed_data = pd.DataFrame()  # Initialize an empty DataFrame

        # Transformations
        self._transform_course()
        self._transform_stdexposure()
        self._transform_accessibility()
        self.transformed_data = self._encode('Family_Contribution')
        self.transformed_data = self._encode('Financial_Status')

        # Copy numerical features from original data
        self.transformed_data['GPA'] = self.data['GPA']
        self.transformed_data['Credit_Completion'] = self.data['Credit_Completion']
        self.transformed_data['SAT'] = self.data['SAT']
        self.transformed_data['Course_Similarity'] = self.data['Course_Similarity']
        self.transformed_data['Student_Interest'] = self.data['Student_Interest']
        self.transformed_data['PersonalityTraits_Scores'] = self.data['PersonalityTraits_Scores']
        self.transformed_data['Calculated_Success_Rate'] = self.data['Calculated_Success_Rate']

        # Copy the target variable
        self.transformed_data['Success_Rate'] = self.data['Success_Rate']

        return self.transformed_data


    def _split_data(self):
        x = self.transformed_data.loc[:, self.transformed_data.columns != 'Success_Rate'].astype('float32')
        y = self.transformed_data['Success_Rate'].astype('float32')
        return train_test_split(x, y, test_size=0.2)

    def _train_model(self):
        scale = StandardScaler()
        model = Sequential([
            Dense(units=64, input_shape=(14,), activation='relu'),
            Dense(units=64, activation='relu'),
            Dense(units=64, activation='relu'),
            Dense(units=64, activation='relu'),
            Dense(units=1)
        ])
        model.compile(optimizer='adam', loss='mse', metrics=['accuracy'])
        model.fit(x=self.traindata_x, y=self.testdata_x, epochs=100, verbose=2)
        return model

    def predict(self, input_data):
        return self.model.predict(input_data)

    #? up for deletion
    def generate_data(self):
        # You can place your data generation code here
        pass

    #creates the pickle file of the model 
    def write(self, fielName):
        with open (fielName, 'wb') as file:
            pickle.dump(self.model, file)

    #loads the model from in the flask
    @classmethod
    def load (cls, filepath):
        loaded_model = keras.models.load_model(filepath)
        instance = cls()
        instance.model = loaded_model
        return instance
    
   
    #----------------------------------------------------------
     #the following code is for making a prediction
    def _preprocess_input(self, input_data):
        transformed_input = input_data.copy()

        self._transform_course_input(transformed_input)
        self._transform_stdexposure_input(transformed_input)
        self._transform_accessibility_input(transformed_input)
        transformed_input = self._encode_input(transformed_input, 'Family_Contribution')
        transformed_input = self._encode_input(transformed_input, 'Financial_Status')

        # Copy the numerical features from the original input data
        transformed_input[:, -8:] = input_data[:, -8:]

        return transformed_input
    
    def predict(self, input_data):
        # Preprocess the input data
        input_data = np.array(input_data)  # Convert input_data to a NumPy array
        transformed_input = self._preprocess_input(input_data)

        # Call the model's predict method
        predictions = self.model.predict(transformed_input)

        return predictions.tolist()  # Convert predictions to a Python list and return


# create the model and write it to a pickle file
# this is for testing purposes, leave commented out 
# myModel = CollegeReadinessModel()
# myModel.model = myModel._train_model()  # Train the model and assign it to the 'model' attribute
# myModel.write('CRModel.pickle')
# print("write complete")

#----------------------------------------------------------
#----------------------------------------------------------
#----------------------------------------------------------
#end of machine learning code






#----------------------------------------------------------
#----------------------------------------------------------
#----------------------------------------------------------
#code that will insert machine learning model (in binary form) into the database
#this is where we will also call the prediction function to get the prediction for the user

#inserts the binary data into the database
@app.route('/binary_insert', methods=['POST'])
def insert_binary_data():
    try:
        # Need to get proper logic here
        #binary_data = request.data  # Assuming you're sending the binary data in the request body
        
        # for testing purposes
        # Load the pickle file from your directory
        pickle_file_path = './CRModel.pickle'
        with open(pickle_file_path, 'rb') as f:
            binary_data = f.read()

        # Create a document to store the binary data
        document = {
            'data': binary_data,
            'created_at': datetime.datetime.utcnow()
        }

        collection = mongo.db.BinaryData

        # Insert the binary data document into the collection
        collection.insert_one(document)

        return jsonify(message='Binary data inserted successfully')
    except Exception as e:
        return jsonify(error=str(e))

#this is due for deletion, I don't believe two 'GET' are necessary
#retrieves the binary data from the database
@app.route('/retrieve_binary', methods=['GET'])
def retrieve_binary_data():
    try:
        collection = mongo.db.BinaryData

        # Retrieve the binary data document from the collection
        document = collection.find_one(sort=[("created_at", pymongo.DESCENDING)])
        if document:
            binary_data = document['data']

            # Assuming you have the class definition available in your code
            # Load the pickled data and unpickle it
            import pickle
            unpickled_data = pickle.loads(binary_data)

            return jsonify(data=unpickled_data)
        else:
            return jsonify(message='No binary data found')
    except Exception as e:
        return jsonify(error=str(e))

#makes prediction by loading the latest model. 
@app.route('/retrieve_prediction', methods=['GET'])
def retrieve_prediction():
    try:
        input_data = request.json
        collection = mongo.db.BinaryData

        # Retrieve the binary data document from the collection
        document = collection.find_one(sort=[("created_at", pymongo.DESCENDING)])
        if document:
            binary_data = document['data']

            # Load the pickled data and unpickle it
            import pickle
            unpickled_data = pickle.loads(binary_data)

            # Assuming the unpickled_data includes the class definition
            instance = unpickled_data

            # Call the "predict" method if it exists
            if hasattr(instance, 'predict') and callable(getattr(instance, 'predict')):
                prediction = instance.predict(input_data)  # Call the predict method

                return jsonify(prediction=prediction)
            else:
                return jsonify(message='No "predict" method found in the pickled object')
        else:
            return jsonify(message='No binary data found')
    except Exception as e:
        return jsonify(error=str(e))







#----------------------------------------------------------
#----------------------------------------------------------
#----------------------------------------------------------
#end of ML model databse insertion code 





#----------------------------------------------------------
#----------------------------------------------------------
#----------------------------------------------------------

#This is the start of the database connection code
#Here you will find the 'POST' and 'PUT' methods for the database
#Along with the schemas for the collections



#The following code is for UserInfo collection
#----------------------------------------------------------
mongo.db.UserInfo.create_index([('email', 1)], unique=True) 
#prevents duplicate emails, 1 means ascending order; will be used as primary key for all other collections(schemas)

#Creates UserSchema
class UserSchema:
    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Perform uniqueness check for email
        if self.is_email_unique(email):
            self.email = email
        else:
            raise ValueError(f"Email '{email}' is not unique")

    @staticmethod
    def is_email_unique(email):
        # Check if the email is unique in the database
        existing_user = mongo.db.UserInfo.find_one({'email': email})
        return existing_user is None

    def to_dict(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'password': self.password
        }


#Puts userInfo into database
@app.route('/user_insert', methods=['POST'])
def insert_data():
    try:
        data = request.json  # Assuming the JSON request contains name, age, email


        # Create a UserSchema instance
        user_data = UserSchema(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=data['password']

        )

        # Access the MongoDB collection
        collection = mongo.db.UserInfo

        # Insert the structured data into the collection
        collection.insert_one(user_data.to_dict())

        return jsonify(message='Data inserted successfully')
    except Exception as e:
        return jsonify(error=str(e))
    
#Changes userInfo in database
@app.route('/update/<email>', methods=['PUT'])
def update_data(document_id):
    try:
        data = request.json  # New data for the update

        # Access the MongoDB collection
        collection = mongo.db.UserInfo

        # Update the document based on the document_id
        result = collection.update_one({'_id': document_id}, {'$set': data})

        if result.modified_count > 0:
            return jsonify(message='Document updated successfully')
        else:
            return jsonify(message='No document was updated')
    except Exception as e:
        return jsonify(error=str(e))

#----------------------------------------------------------
#end of userInfo collection code


#Start of DemographicInfo collection code
#----------------------------------------------------------
#Creates DemoSchema
class DemoSchema:
    def __init__(self, email, international_student, age_range, transfer_school, gender, first_gen_student, ethnicity):
        self.email = email
        self.international_student = international_student
        self.age_range = age_range
        self.transfer_school = transfer_school
        self.gender = gender
        self.first_gen_student = first_gen_student
        self.ethnicity = ethnicity

    def to_dict(self):
        return{
        'email': self.email,
        'international_student': self.international_student,
        'age_range': self.age_range,
        'transfer_school': self.transfer_school,
        'gender':self.gender,
        'first_gen_student': self.first_gen_student,
        'ethnicity' : self.ethnicity
        }
#inserts demo info into database
@app.route('/demo_insert', methods=['POST'])
def insert_demo_data():
    try:
        data = request.json

        # Create a DemoSchema instance
        demo_data = DemoSchema(
            email=data['email'],
            international_student=data['international_student'],
            age_range=data['age_range'],
            transfer_school=data['transfer_school'],
            gender=data['gender'],
            first_gen_student=data['first_gen_student'],
            ethnicity=data['ethnicity']
        )  

        collection = mongo.db.DemographicInfo

        collection.insert_one(demo_data.to_dict())

        return jsonify(message='Data inserted successfully')
    except Exception as e:
        return jsonify(error=str(e))
    
 #updates demo info in database   
@app.route('/demo_update/<email>', methods=['PUT'])
def update_demo_field(email):
    try:
        data = request.json

        # Extract the field to update from the request data
        updated_field = data.get('field_to_update')

        if updated_field is None:
            return jsonify(message='Field to update not provided')

        # Update the specified field in the document
        collection = mongo.db.DemographicInfo
        collection.update_one({'email': email}, {'$set': {updated_field: data[updated_field]}})

        return jsonify(message='Field updated successfully')
    except Exception as e:
        return jsonify(error=str(e))

#----------------------------------------------------------
#end of DemographicInfo collection code




#----------------------------------------------------------
# Start of AcademicInfo collection code
class AcademicSchema:
    def __init__(self, GPA,Credit_Completion,SAT,
                 Course,Course_Similarity,Career,
                 Student_Interest,Student_Exposure,
                 Family_Contribution,PersonalityTraits_Scores,
                 Accessibility,Financial_Status,
                 Calculated_Success_Rate):
        
        self.GPA = GPA
        self.Credit_Completion = Credit_Completion
        self.SAT = SAT
        self.Course = Course
        self.Course_Similarity = Course_Similarity
        self.Career = Career
        self.Student_Interest = Student_Interest
        self.Student_Exposure = Student_Exposure
        self.Family_Contribution = Family_Contribution
        self.PersonalityTraits_Scores = PersonalityTraits_Scores
        self.Accessibility = Accessibility
        self.Financial_Status = Financial_Status
        self.Calculated_Success_Rate = Calculated_Success_Rate

    
    def to_dict(self):
        return{
        'GPA': self.GPA,
        'Credit_Completion': self.Credit_Completion,
        'SAT': self.SAT,
        'Course': self.Course,
        'Course_Similarity':self.Course_Similarity,
        'Career': self.Career,
        'Student_Interest': self.Student_Interest,
        'Student_Exposure': self.Student_Exposure,
        'Family_Contribution': self.Family_Contribution,
        'PersonalityTraits_Scores': self.PersonalityTraits_Scores,
        'Accessibility': self.Accessibility,
        'Financial_Status': self.Financial_Status,
        'Calculated_Success_Rate': self.Calculated_Success_Rate

        }

    
@app.route('/academic_insert', methods=['POST'])
def insert_academic_data():
    try:
        data = request.json

        # Create a AcademicSchema instance
        academic_data = AcademicSchema(
            GPA=data['GPA'],
            Credit_Completion=data['Credit_Completion'],
            SAT=data['SAT'],
            Course=data['Course'],
            Course_Similarity=data['Course_Similarity'],
            Career=data['Career'],
            Student_Interest=data['Student_Interest'],
            Student_Exposure=data['Student_Exposure'],
            Family_Contribution=data['Family_Contribution'],
            PersonalityTraits_Scores=data['PersonalityTraits_Scores'],
            Accessibility=data['Accessibility'],
            Financial_Status=data['Financial_Status'],
            Calculated_Success_Rate=data['Calculated_Success_Rate'],
            
        )  

        collection = mongo.db.AcademicInfo

        collection.insert_one(academic_data.to_dict())

        return jsonify(message='Data inserted successfully')
    except Exception as e:
        return jsonify(error=str(e))

#updates academic info in database
@app.route('/academic_update/<email>', methods=['PUT'])
def update_academic_field(email):
    #similar to demo_update
    try:    
        data = request.json

        update_academic_field = data.get('field_to_update')

        if update_academic_field is None:
            return jsonify(message='Field to update not provided')

        collection = mongo.db.AcademicInfo  
        collection.update_one({'email': email}, {'$set': {update_academic_field: data[update_academic_field]}}) 

        return jsonify(message='Field updated successfully')    
    except Exception as e:
        return jsonify(error=str(e))
    
#----------------------------------------------------------
#end of AcademicInfo collection code



    
#----------------------------------------------------------
#Will check if user exists in database and if password is correct
@app.route('/check', methods=['POST'])
def check_data():
    try:
        data = request.json  

        # Access the MongoDB collection
        collection = mongo.db.UserInfo

        # Fetch all documents from the collection
        user_data = list(collection.find({'email': data['email']}))

        if len(user_data) == 0:
            return jsonify(message='No user found')
        else:
            if bcrypt.check_password_hash(user_data[0]['password'], data['password']):
                print('success') # test print
                return jsonify(message='success')
            else:
                print('Wrong password') # test print
                return jsonify(message='Wrong password')
            
    except Exception as e:
        return jsonify(error=str(e))


#----------------------------------------------------------
#----------------------------------------------------------
#----------------------------------------------------------
#end of database code


#the following code is for testing purposes, should be removed at a later time
@app.route('/get', methods=['GET'])
def get_data():
    # Your get logic here using mongo.db
        # Access a specific collection
    collection = mongo.db.UserInfo

    # Fetch all documents from the collection
    data = list(collection.find())

    # Convert data to a list of dictionaries
    result = []
    for entry in data:
        result.append({
            'name': entry.get('name', 'N/A'),
            'age': entry.get('age', 'N/A')
        })

    return jsonify(result)

@app.route('/get_collections', methods=['GET'])
def get_collections():
    # Get a list of collection names in the database
    collection_names = mongo.db.list_collection_names()

    return jsonify(collection_names)

if __name__ == '__main__':
    app.run(debug=True)
    #manualy put model in directory, into the database
    #insert_binary_data()

