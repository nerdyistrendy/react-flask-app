from flask import Flask, request, jsonify, render_template
from gateways.realtor_gateway import RealtorGateway
from flask_cors import CORS, cross_origin
app = Flask(__name__)
realtor_GW = RealtorGateway()
cors = CORS(app)

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/details/<property_id>")

def get_property_details(property_id):
    property_details_json = realtor_GW.show_details(property_id)

    return property_details_json;

@app.route("/id/<address>")
def get_property_id(address):
    property_details_json = realtor_GW.get_property_id_by_address(address)

    return property_details_json;


# @app.route("/mls/<mls_id>")
# def get_by_mls(mls_id):
#     return realtor_GW.mls(mls_id)

if __name__ == '__main__':
    app.run(debug=True)
