import datetime
from app import db
from sqlalchemy.dialects.postgresql import JSON


class ParsedText(db.Model):

    __tablename__ = "parsed_texts"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(280))
    big_text = db.Column(db.String)
    text_analysis = db.Column(JSON)
    created_at = db.Column(db.DateTime)
    modified_at = db.Column(db.DateTime)

    def __init__(self, url, big_text, text_analysis):
        self.text_analysis = text_analysis
        self.big_text = big_text
        self.url = url
        self.created_at = datetime.datetime.utcnow()
        self.modified_at = datetime.datetime.utcnow()

    def save(self):
        if self not in db.session:
            db.session.add(self)
        db.session.commit()
        print("Saved")

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        self.modified_at = datetime.datetime.utcnow()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_all_results():
        return ParsedText.query.order_by(ParsedText.created_at).all()

    @staticmethod
    def get_one_result(id):
        return ParsedText.query.get(id)

    @property
    def serialize(self):
        return {
            "id": self.id,
            "url": self.url,
            "big_text": self.big_text,
            "text_analysis": self.text_analysis,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
        }

    def __repr__(self):
        return f"<id {self.id} {self.text_analysis}>"