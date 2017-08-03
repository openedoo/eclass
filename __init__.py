from flask import render_template
from openedoo.core.libs import Blueprint


eclass = Blueprint('eclass', __name__,
                   template_folder='template',
                   static_folder='static')


@eclass.route('/', defaults={'path': ''})
@eclass.route('/<path:path>')
def index(path):
    return render_template('index.html')
