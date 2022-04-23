from app.models import db, Event
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want
def seed_events():
    for _ in range(10):
        event = Event(
            name = (faker.name() + ' Concert'),
            text_color='black',
            background_color='white',
            user_id = 1
        )

        db.session.add(event)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
