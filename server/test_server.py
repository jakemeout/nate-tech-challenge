import tempfile
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pytest_postgresql import factories
from models import ParsedText
import pytest


socket_dir = tempfile.TemporaryDirectory()
postgresql_my_proc = factories.postgresql_proc(port=None, unixsocketdir=socket_dir.name)
postgresql_my = factories.postgresql("postgresql_my_proc")


@pytest.fixture(scope="function")
def setup_database(postgresql_my):
    def dbcreator():
        return postgresql_my.cursor().connection

    engine = create_engine("postgresql+psycopg2://", creator=dbcreator)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()


def test_postgres_options(postgresql):
    """Ensure max connections exists"""
    cur = postgresql.cursor()
    cur.execute("SHOW max_connections")
    assert cur.fetchone() == ("100",)


def test_db_creation(postgresql):
    """Test if you can create a postgres db"""
    cur = postgresql.cursor()
    cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")
    postgresql.commit()
    cur.close()


def test_orm():
    """Tests creation and query of an item in ParsedText -- doing it live due to lack of time"""
    test_json = {"text": 101}
    instance = ParsedText.ParsedText(
        url="https://google.com",
        big_text="some lengthy test text",
        text_analysis=test_json,
    )
    instance.save()
    saved_item = ParsedText.ParsedText.query.first()
    assert saved_item.url == "https://google.com"