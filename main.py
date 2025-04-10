from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import text
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  


## Configuracion hacia la base de datos 
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:2604@localhost:5432/incidentes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

## Definicion de la tabla incidentes 
class Incident(db.Model):
    __tablename__ = 'incidents'
    id = db.Column(db.Integer, primary_key=True)
    reporter = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='pendiente')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

## Conexion a la base de datos y un select a la tabla como confirmacion 
with app.app_context():
    print("Conectando a:", app.config['SQLALCHEMY_DATABASE_URI'])
    try:
        db.create_all()  # Crea la tabla si no existe

        result = db.session.execute(text("SELECT * FROM incidents"))
        rows = result.fetchall()

        print(f" Total de incidentes encontrados: {len(rows)}")
        for row in rows:
            print("------>", row)
    except Exception as e:
        print("XX Error al conectar con la base de datosXX", e)

##------------------------GETS---------------------------
#--------------------------------------------------------
## Metodo get para lo incidentes 
@app.route("/incidents/", methods=["GET"])
def get_all_incidents():
    incidents = Incident.query.all()
    result = []
    for incident in incidents:
        result.append({
            "id": incident.id,
            "reporter": incident.reporter,
            "description": incident.description,
            "status": incident.status,
            "created_at": incident.created_at
        })
    return jsonify(result), 200

## Metodo get por incidente_id
@app.route("/incidents/<int:incident_id>", methods=["GET"])
def get_incident_by_id(incident_id):
    try: ## se utiliza try para poder manejar errores y ya que este get solo se busca un elemento
        incident = Incident.query.get(incident_id)
        if not incident:
            return jsonify({"error": "Incident not found"}), 404

        result = {
            "id": incident.id,
            "reporter": incident.reporter,
            "description": incident.description,  
            "status": incident.status,            
            "created_at": incident.created_at     
        }
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500
#--------------------------------------------------------
## Metodo post para crear un incidente
@app.route("/incidents/", methods=["POST"])
def create_incident():
    try: ## Se utiliza try para poder manejar errores y ya que este post crea un solo elemnto en la tabla 
        data = request.get_json()
        if not data or 'reporter' not in data or 'description' not in data:
            return jsonify({"error": "Invalid input"}), 400

        new_incident = Incident(
            reporter=data['reporter'],
            description=data['description']
        )
        db.session.add(new_incident)
        db.session.commit()

        return jsonify({"message": "Incident created", "incident_id": new_incident.id}), 201
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500


##Metodo put para actualizar un incidente por id 
@app.route("/incidents/<int:incident_id>", methods=["PUT"])
def update_incident(incident_id):
    try: ## Se utiliza try para poder manejar errores y ya que este put actualiza un solo elemento
        incident = Incident.query.get(incident_id)
        if not incident:
            return jsonify({"error": "Incident not found"}), 404

        data = request.get_json()
        if 'reporter' in data:
            incident.reporter = data['reporter']
        if 'description' in data:
            incident.description = data['description']
        if 'status' in data:
            incident.status = data['status']

        db.session.commit()

        return jsonify({"message": "Incident updated"}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500
    
##Metodo delete poor id 
@app.route("/incidents/<int:incident_id>", methods=["DELETE"])
def delete_incident(incident_id):
    try: ## Se utiliza try para poder manejar errores y ya que este delete elimina un solo elemento
        incident = Incident.query.get(incident_id)
        if not incident:
            return jsonify({"error": "Incident not found"}), 404

        db.session.delete(incident)
        db.session.commit()

        return jsonify({"message": "Incident deleted"}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)