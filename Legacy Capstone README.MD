# Digital Capstone Legacy Files ReadMe

In this document, I am going to provide a basic walkthrough of the steps contained within this process in order to supplement the comments already within the code itself. I will also list which files are relevant at which stage of the process.

The code goes through the following basic steps:

# Regression Model # - see build_models.py

1) Load student enrollment and background data
2) Create dummy variables for each course number to indicate a student is enrolled in that course
3) Define list of column types and impute missing data based on column type
4) For each course number, build a logistic regression fit to the background student data and enrollment dummy variable
5) Store all the models in a folder via python process called pickling

# Probability Predictions # - see main.py or registrar-api.py

6) Load and use each model to predict probability based on particular student data
7) Build probability dataframe based on course numbers and the outputs of each predictive model
8) Left merge probability data onto current course list

# Schedule Optimization # - see build_models.py

9) Create dummy variables for Quarter, Early/Late Week, and Start Time
10) Merge overlapping dummy variables (e.g. Early Week and Monday Only)
11) Create dummy variables for Course ID, Area, and Prereq
12) Create dummy variables for each unique time slot
13) Build python optimization model to maximize probability subject to the following constraints:
    a) Max 30 credits
    b) Max 1 Spring Break Course
    c) Max 1 J-Term Course
    d) Min 4.5, Max 9 credits each quarter
    e) No duplicate courses
    f) LDSP requirement fulfilled
    g) Total bid amount <= 3000?
    h) Pre-reqs are fulfilled (not complete)
    i) No course conflicts
14) Output optimal schedule as dataframe

# Setup so that process can be called # - see registrar-api.py

This process is being loaded through Flask and I believe connected to the data through an api (This portion I am unclear on the specifics of)