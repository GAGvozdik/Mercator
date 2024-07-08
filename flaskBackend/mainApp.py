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


def rec(level, db, catalog, parent, max_level):
    if level > 0:
        catalog[parent] = {}
        for i in range(len(db)):
            if db[i]['parentName'] == parent:
                n = rec(level - 1, db, {}, db[i]['name'], max_level)
                catalog[parent][db[i]['name']] = n

    if parent == 'static':
        return catalog
    else:
        return catalog[parent]
    

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DEBUG = True
SECRET_KEY = 'J5@nDdv(0_=^FCCZfjkXxAQ!~~g,.?hiol;jyjjM??&|+\\_8`'
USERNAME = 'admin'
PASSWORD = '123'

app.config.from_object(__name__)

app.config["SECRET_KEY"] = SECRET_KEY
app.config.update(dict(DATABASE=os.path.join(app.root_path, 'mapsDB.db')))

dbase = None


@app.before_request
def before_request():
    """Установление соединения с БД перед выполнением запроса"""
    global dbase
    db = get_db()
    dbase = FDataBase(db)


@app.teardown_appcontext
def close_db(error):
    '''Закрываем соединение с БД, если оно было установлено'''
    if hasattr(g, 'link_db'):
        g.link_db.close()



def connect_db():
    conn = sqlite3.connect(app.config['DATABASE'])
    conn.row_factory = sqlite3.Row
    return conn


def get_db():
    '''Соединение с БД, если оно еще не установлено'''
    if not hasattr(g, 'link_db'):
        g.link_db = connect_db()
    return g.link_db



UPLOAD_FOLDER = 'uploads'  # Папка для сохранения загруженных файлов
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Файл не найден'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'Имя файла пустое'}), 400

    # Сохраняем файл
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    return jsonify({'message': 'Файл успешно загружен!'})


@app.route("/", methods=['GET', 'POST'])
@cross_origin()
def index():


    parents_list = []
    for i in dbase.getCatalog():
        parents_list.append(str(i['parentName']))
    level = len(parents_list)


    print('--------------------------------------------')
    print(rec(level, dbase.getCatalog(), {}, 'static', level))
    print('--------------------------------------------')

    return render_template('index.html',
                           dictionary=rec(level, dbase.getCatalog(), {}, 'static', level),
                           raster_names=dbase.getData(),
                           catalog=dbase.getTableName()[1:],
                           current_time=int(time.time()))



@app.route('/catalog', methods=['POST', 'GET'])
def catalog():
    # a = request.form['lyrname']


    parents_list = []
    for i in dbase.getCatalog():
        parents_list.append(str(i['parentName']))
    level = len(set(parents_list))

    return render_template('index.html',
                           dictionary=rec(level, dbase.getCatalog(), {}, 'static', level),
                           raster_names=dbase.getData(),
                           catalog=dbase.getTableName()[1:],
                           current_time=int(time.time()))


@app.route('/insert_data', methods=['POST', 'GET'])
def insert_data():
    my_lyrname = request.form['lyrname']
    my_lyrway = request.form['lyrway']
    my_type_select = request.form['type_select']
    my_folder = request.form['my_folder']

    db = get_db()
    dbase = FDataBase(db)

    parents_list = []
    for i in dbase.getCatalog():
        parents_list.append(str(i['parentName']))
    level = len(set(parents_list))

    cnx = get_db()
    cursor = cnx.cursor()

    try:
        my_id = dbase.getData()[-1]['id']
    except IndexError:
        my_id = 1

    dont_plot = 0

    for i in dbase.getData():
        if (i["id"] == my_id) and \
                (i["type"] == my_type_select) and \
                (i["name"] == my_lyrname) and \
                (i["folder"] == my_folder):
            print('file my_lyrname already exists')
            dont_plot = 1

    if dont_plot == 0:
        if (my_lyrway != '') and (my_lyrname != '') and (my_type_select != ''):
            print('dbase.getData()[\'id\'][-1] = ', my_id)
            if my_type_select == 'lines':
                create_lines(my_lyrway, str(1 + int(my_id)), start_coords)
                cursor.execute(
                    ''' INSERT INTO data (type, name, folder, link_to_html) VALUES (?, ?, ?, ?)''',
                    (my_type_select, my_lyrname, my_folder,
                     'data\\my_gdb\\' + 'id_' + str(1 + int(my_id)) + '.html'))

            elif my_type_select == 'poly':
                create_poly(my_lyrway, str(1 + int(my_id)), start_coords)
                cursor.execute(
                    ''' INSERT INTO data (type, name, folder, link_to_html) VALUES (?, ?, ?, ?)''',
                    (my_type_select, my_lyrname, my_folder,
                     'data\\my_gdb\\' + 'id_' + str(1 + int(my_id)) + '.html'))

            elif my_type_select == 'raster':
                create_raster(my_lyrway, str(1 + int(my_id)), start_coords, mecr_proj=True)
                cursor.execute(
                    ''' INSERT INTO data (type, name, folder, link_to_html) VALUES (?, ?, ?, ?)''',
                    (my_type_select, my_lyrname, my_folder,
                     'data\\my_gdb\\' + 'id_' + str(1 + int(my_id)) + '.html'))

    cnx.commit()

    return render_template('index.html',
                           dictionary=rec(level, dbase.getCatalog(), {}, 'static', level),
                           raster_names=dbase.getData(),
                           current_time=int(time.time()),
                           catalog=dbase.getTableName()[1:])





if __name__ == "__main__":
    app.run(debug=True)
