import os
from dotenv import load_dotenv

load_dotenv()

db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql://{db_user}:{db_password}@localhost:3306/{db_name}".format(
    db_user=db_user, db_password=db_password, db_name=db_name)

#     SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{db_user}:{db_password}@localhost:3306/{db_name}".format(
#     db_user=db_user, db_password=db_password, db_name=db_name)

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY= os.environ['JWT_SECRET_KEY']