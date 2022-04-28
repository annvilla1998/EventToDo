from app.models import db, Event
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want
def seed_events():
    event1 = Event(
        name = "Coachella",
        text_color='#000000',
        background_color='#FFFFFF',
        user_id = 1
    )
    event2 = Event(
        name = "Stagecoach",
        text_color='#000000',
        background_color='#FFFFFF',
        user_id = 1
    )
    event3 = Event(
        name = "EDC",
        text_color='#000000',
        background_color='#FFFFFF',
        user_id = 1
    )
    event4 = Event(
        name = "Cali Vibe",
        text_color='#000000',
        background_color='#FFFFFF',
        user_id = 1
    )
    event5 = Event(
        name = (faker.name() + ' Concert'), 
        text_color='#000000',
        background_color='#FFFFFF',
        user_id = 1
    )
    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)
    db.session.add(event5)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
