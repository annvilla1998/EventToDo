from app.models import db, Task
from faker import Faker
from datetime import datetime

faker = Faker()

# Adds a demo user, you can add other users here if you want
def seed_tasks():
    for _ in range(30):
        task = Task(
            name = faker.random_element(['Pack','Book Flight', 'Get Tickets', 'Buy Outfit', 'Buy Portable Charger', 'Book Hotel Room']),
            description = "",
            completed = False, 
            due_date = faker.future_date(),
            event_id = faker.random_int(min=1, max=10),
            user_id = 1
        )

        db.session.add(task)
        db.session.commit()

    for _ in range(5):
        today_task = Task(
            name = faker.random_element(['Book Flight', 'Get Tickets', 'Buy Outfit', 'Buy Portable Charger', 'Book Hotel Room']),
            description = "",
            completed = False, 
            due_date = datetime.today(),
            event_id = faker.random_int(min=1, max=10),
            user_id = 1
        )

        db.session.add(today_task)
        db.session.commit()
    

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()