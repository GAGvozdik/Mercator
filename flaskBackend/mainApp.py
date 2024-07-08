import sqlite3
import os
from flask import Flask, render_template, request, g, jsonify
from flask import Flask, flash, redirect, render_template, request, url_for
import jinja2
import geopandas as gpd
import folium
import sqlite3
from FDataBase import FDataBase

from flask_cors import CORS, cross_origin

# from parser1 import cut_excess, paste_layer, change_map, change_layer_control
import time
# from create_layers import create_raster, create_lines, create_poly
from flask_sqlalchemy import SQLAlchemy

# import ee
# import geemap.foliumap as geemap

# from flask.ext.wtf import Form
# from wtforms import Stringfield, SubmitField
# from wtforms.validators import DataRequired, Required


app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DEBUG = True
SECRET_KEY = 'J5@nDdv(0_=^FCCZfjkXxAQ!~~g,.?hiol;jyjjM??&|+\\_8`'
USERNAME = 'admin'
PASSWORD = '123'

app.config.from_object(__name__)

app.config["SECRET_KEY"] = SECRET_KEY
app.config.update(dict(DATABASE=os.path.join(app.root_path, 'my_db.db')))



def connect_db():
    conn = sqlite3.connect(app.config['DATABASE'])
    conn.row_factory = sqlite3.Row
    return conn


def get_db():
    '''Соединение с БД, если оно еще не установлено'''
    if not hasattr(g, 'link_db'):
        g.link_db = connect_db()
    return g.link_db


@app.route("/", methods=['GET', 'POST'])
@cross_origin()
def index():

    db = get_db()
    dbase = FDataBase(db)

    return render_template('index.html', title="My app")



@app.teardown_appcontext
def close_db(error):
    '''Закрываем соединение с БД, если оно было установлено'''
    if hasattr(g, 'link_db'):
        g.link_db.close()


if __name__ == "__main__":
    app.run(debug=True)
