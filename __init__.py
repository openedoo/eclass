import urllib2
from flask import render_template
from openedoo.core.libs import Blueprint


eclass = Blueprint('eclass', __name__,
                   template_folder='template',
                   static_folder='static')


@eclass.route('/', methods=['GET'])
def index():
    return render_template('index.html')
